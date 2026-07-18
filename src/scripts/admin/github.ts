/**
 * Minimal GitHub REST client for the admin page. Everything runs in the
 * browser against api.github.com (CORS-enabled), authenticated with a
 * fine-grained PAT the owner pastes once. Commits use the Git Data API so
 * any number of files (JSON + images) land as ONE commit = ONE Pages build.
 */
import { ADMIN_REPO, ADMIN_BRANCH } from "./config";

export class GitHubError extends Error {
	constructor(
		message: string,
		public status: number
	) {
		super(message);
	}
}

const b64encodeBytes = (bytes: Uint8Array): string => {
	let bin = "";
	for (let i = 0; i < bytes.length; i += 0x8000)
		bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
	return btoa(bin);
};

export const encodeText = (s: string): string =>
	b64encodeBytes(new TextEncoder().encode(s));

export const decodeText = (b64: string): string =>
	new TextDecoder().decode(
		Uint8Array.from(atob(b64.replace(/\s/g, "")), (c) => c.charCodeAt(0))
	);

export const blobToBase64 = (blob: Blob): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(String(reader.result).split(",", 2)[1]);
		reader.onerror = () => reject(reader.error);
		reader.readAsDataURL(blob);
	});

export interface CommitFile {
	/** Repo-relative path, e.g. "src/data/content/routes.json". */
	path: string;
	base64: string;
}

export interface AssetEntry {
	name: string;
	path: string;
	downloadUrl: string;
}

export interface WorkflowRun {
	status: "queued" | "in_progress" | "completed" | string;
	conclusion: string | null;
	html_url: string;
}

export class GitHub {
	constructor(
		private token: string,
		public repo: string = ADMIN_REPO,
		public branch: string = ADMIN_BRANCH
	) {}

	private async api<T>(path: string, init?: RequestInit): Promise<T> {
		const res = await fetch(`https://api.github.com${path}`, {
			...init,
			headers: {
				Authorization: `Bearer ${this.token}`,
				Accept: "application/vnd.github+json",
				"X-GitHub-Api-Version": "2022-11-28",
				...(init?.body ? { "Content-Type": "application/json" } : {}),
			},
		});
		if (!res.ok) {
			let message = `${res.status} ${res.statusText}`;
			try {
				message = (await res.json()).message || message;
			} catch {
				/* keep the status text */
			}
			throw new GitHubError(message, res.status);
		}
		return res.status === 204 ? (undefined as T) : res.json();
	}

	/** Confirms the token works and can push to the repo. */
	async verify(): Promise<{ login: string; canPush: boolean }> {
		const user = await this.api<{ login: string }>("/user");
		const repo = await this.api<{ permissions?: { push?: boolean } }>(
			`/repos/${this.repo}`
		);
		return { login: user.login, canPush: repo.permissions?.push === true };
	}

	/** Reads a text file (≤1 MB) at the admin branch. */
	async getFile(path: string): Promise<{ text: string; sha: string }> {
		const data = await this.api<{ content: string; sha: string }>(
			`/repos/${this.repo}/contents/${path}?ref=${this.branch}`
		);
		return { text: decodeText(data.content), sha: data.sha };
	}

	/** Just the current blob sha of a file (for stale-edit detection). */
	async fileSha(path: string): Promise<string | null> {
		try {
			const data = await this.api<{ sha: string }>(
				`/repos/${this.repo}/contents/${path}?ref=${this.branch}`
			);
			return data.sha;
		} catch (e) {
			if (e instanceof GitHubError && e.status === 404) return null;
			throw e;
		}
	}

	async listDir(path: string): Promise<AssetEntry[]> {
		const entries = await this.api<
			{ type: string; name: string; path: string; download_url: string }[]
		>(`/repos/${this.repo}/contents/${path}?ref=${this.branch}`);
		return entries
			.filter((e) => e.type === "file")
			.map((e) => ({ name: e.name, path: e.path, downloadUrl: e.download_url }));
	}

	/** One atomic commit of many files via the Git Data API. */
	async commitFiles(
		files: CommitFile[],
		message: string
	): Promise<{ sha: string; htmlUrl: string }> {
		const repo = `/repos/${this.repo}`;
		const ref = await this.api<{ object: { sha: string } }>(
			`${repo}/git/ref/heads/${this.branch}`
		);
		const parentSha = ref.object.sha;
		const parent = await this.api<{ tree: { sha: string } }>(
			`${repo}/git/commits/${parentSha}`
		);

		const tree = await Promise.all(
			files.map(async (file) => {
				const blob = await this.api<{ sha: string }>(`${repo}/git/blobs`, {
					method: "POST",
					body: JSON.stringify({ content: file.base64, encoding: "base64" }),
				});
				return {
					path: file.path,
					mode: "100644",
					type: "blob",
					sha: blob.sha,
				};
			})
		);

		const newTree = await this.api<{ sha: string }>(`${repo}/git/trees`, {
			method: "POST",
			body: JSON.stringify({ base_tree: parent.tree.sha, tree }),
		});
		const commit = await this.api<{ sha: string; html_url: string }>(
			`${repo}/git/commits`,
			{
				method: "POST",
				body: JSON.stringify({
					message,
					tree: newTree.sha,
					parents: [parentSha],
				}),
			}
		);
		await this.api(`${repo}/git/refs/heads/${this.branch}`, {
			method: "PATCH",
			body: JSON.stringify({ sha: commit.sha }),
		});
		return { sha: commit.sha, htmlUrl: commit.html_url };
	}

	/** The Pages workflow run triggered by a commit, once GitHub registers it. */
	async runForCommit(sha: string): Promise<WorkflowRun | null> {
		const data = await this.api<{ workflow_runs: WorkflowRun[] }>(
			`/repos/${this.repo}/actions/runs?head_sha=${sha}&per_page=1`
		);
		return data.workflow_runs[0] ?? null;
	}
}
