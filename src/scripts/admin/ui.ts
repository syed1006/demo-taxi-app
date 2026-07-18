/**
 * Tiny DOM toolkit for the admin app: element builder, form fields that
 * live-bind to plain data objects, list editors with add/remove/reorder,
 * and a modal. No framework — same zero-dependency ethos as the site.
 */

type Child = Node | string | number | null | undefined | false;

export function el<K extends keyof HTMLElementTagNameMap>(
	tag: K,
	attrs: Record<string, unknown> = {},
	...children: (Child | Child[])[]
): HTMLElementTagNameMap[K] {
	const node = document.createElement(tag);
	for (const [key, value] of Object.entries(attrs)) {
		if (value == null || value === false) continue;
		if (key.startsWith("on") && typeof value === "function")
			node.addEventListener(key.slice(2), value as EventListener);
		else if (key === "class") node.className = String(value);
		else if (key === "value" || key === "checked" || key === "selected")
			(node as unknown as Record<string, unknown>)[key] = value;
		else node.setAttribute(key, String(value));
	}
	for (const child of children.flat())
		if (child != null && child !== false)
			node.append(child instanceof Node ? child : String(child));
	return node;
}

/* Shared class strings (literal so Tailwind picks them up). */
export const cx = {
	input:
		"w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500",
	label:
		"mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground",
	btn: "inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-colors cursor-pointer",
	btnPrimary: "bg-orange-500 text-white hover:bg-orange-600",
	btnGhost:
		"border text-foreground hover:bg-orange-50 dark:hover:bg-stone-800",
	btnDanger:
		"border border-red-300 text-red-700 hover:bg-red-50 dark:text-red-400 dark:border-red-900 dark:hover:bg-red-950",
	btnSmall: "rounded-md px-2 py-1 text-xs font-semibold",
	card: "rounded-xl border bg-card p-5",
	row: "rounded-lg border bg-background p-3",
};

export const field = (
	label: string,
	control: HTMLElement,
	help?: string
): HTMLElement =>
	el(
		"label",
		{ class: "block" },
		el("span", { class: cx.label }, label),
		control,
		help
			? el("span", { class: "mt-1 block text-xs text-muted-foreground" }, help)
			: null
	);

interface TextOpts {
	textarea?: boolean;
	rows?: number;
	placeholder?: string;
	readonly?: boolean;
	onInput?: (value: string) => void;
}

/** Text control bound through get/set (works for nested paths). */
export function textControl(
	get: () => string,
	set: (v: string) => void,
	opts: TextOpts = {}
): HTMLInputElement | HTMLTextAreaElement {
	const shared = {
		class: cx.input + (opts.readonly ? " opacity-60" : ""),
		value: get() ?? "",
		placeholder: opts.placeholder,
		readOnly: opts.readonly || null,
		oninput: (e: Event) => {
			const v = (e.target as HTMLInputElement).value;
			set(v);
			opts.onInput?.(v);
		},
	};
	return opts.textarea
		? el("textarea", { ...shared, rows: opts.rows ?? 3 })
		: el("input", { ...shared, type: "text" });
}

export const bindText = (
	obj: Record<string, unknown>,
	key: string,
	opts: TextOpts = {}
) =>
	textControl(
		() => String(obj[key] ?? ""),
		(v) => (obj[key] = v),
		opts
	);

interface NumberOpts {
	step?: number;
	/** Empty input deletes the key instead of writing 0. */
	optional?: boolean;
	placeholder?: string;
	onInput?: () => void;
}

export function bindNumber(
	obj: Record<string, unknown>,
	key: string,
	opts: NumberOpts = {}
): HTMLInputElement {
	return el("input", {
		class: cx.input,
		type: "number",
		step: opts.step ?? 1,
		placeholder: opts.placeholder,
		value: obj[key] == null ? "" : String(obj[key]),
		oninput: (e: Event) => {
			const raw = (e.target as HTMLInputElement).value.trim();
			if (raw === "") {
				if (opts.optional) delete obj[key];
				else obj[key] = 0;
			} else {
				const n = Number(raw);
				if (Number.isFinite(n)) obj[key] = n;
			}
			opts.onInput?.();
		},
	});
}

export function bindCheckbox(
	obj: Record<string, unknown>,
	key: string,
	label: string
): HTMLElement {
	return el(
		"label",
		{ class: "flex items-center gap-2 text-sm text-foreground cursor-pointer" },
		el("input", {
			type: "checkbox",
			class: "h-4 w-4 accent-orange-500",
			checked: Boolean(obj[key]),
			onchange: (e: Event) =>
				(obj[key] = (e.target as HTMLInputElement).checked),
		}),
		label
	);
}

export function bindSelect(
	obj: Record<string, unknown>,
	key: string,
	options: { value: string; label: string }[],
	opts: { nullLabel?: string } = {}
): HTMLSelectElement {
	const current = obj[key];
	const select = el(
		"select",
		{
			class: cx.input,
			onchange: (e: Event) => {
				const v = (e.target as HTMLSelectElement).value;
				if (v === "" && opts.nullLabel) obj[key] = null;
				else obj[key] = v;
			},
		},
		opts.nullLabel
			? el("option", { value: "", selected: current == null }, opts.nullLabel)
			: null,
		options.map((o) =>
			el("option", { value: o.value, selected: o.value === current }, o.label)
		)
	);
	return select;
}

/** Checkbox grid bound to an array of values; keeps options order. */
export function bindMultiCheck(
	obj: Record<string, unknown>,
	key: string,
	options: { value: string; label: string }[]
): HTMLElement {
	const selected = new Set((obj[key] as string[]) ?? []);
	const sync = () =>
		(obj[key] = options.map((o) => o.value).filter((v) => selected.has(v)));
	return el(
		"div",
		{ class: "grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-3" },
		options.map((o) =>
			el(
				"label",
				{
					class:
						"flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-sm cursor-pointer hover:bg-orange-50 dark:hover:bg-stone-800",
				},
				el("input", {
					type: "checkbox",
					class: "h-4 w-4 accent-orange-500",
					checked: selected.has(o.value),
					onchange: (e: Event) => {
						if ((e.target as HTMLInputElement).checked) selected.add(o.value);
						else selected.delete(o.value);
						sync();
					},
				}),
				el("span", { class: "truncate" }, o.label)
			)
		)
	);
}

interface ListOpts<T> {
	items: T[];
	/** Renders one row's fields; called again after any reorder/removal. */
	render: (item: T, index: number) => HTMLElement;
	create: () => T;
	addLabel: string;
	onChange?: () => void;
}

/** Generic list editor: rows with move-up/down/delete + an add button. */
export function listEditor<T>(opts: ListOpts<T>): HTMLElement {
	const wrap = el("div", { class: "space-y-2" });
	const iconBtn = (title: string, onclick: () => void, danger = false) =>
		el(
			"button",
			{
				type: "button",
				title,
				class: `${cx.btnSmall} border ${danger ? "text-red-600 dark:text-red-400" : "text-muted-foreground"} hover:bg-orange-50 dark:hover:bg-stone-800`,
				onclick,
			},
			title === "Move up" ? "↑" : title === "Move down" ? "↓" : "✕"
		);

	const redraw = () => {
		wrap.replaceChildren(
			...opts.items.map((item, i) =>
				el(
					"div",
					{ class: cx.row },
					el(
						"div",
						{ class: "mb-2 flex justify-end gap-1" },
						iconBtn("Move up", () => {
							if (i === 0) return;
							[opts.items[i - 1], opts.items[i]] = [opts.items[i], opts.items[i - 1]];
							redraw();
							opts.onChange?.();
						}),
						iconBtn("Move down", () => {
							if (i === opts.items.length - 1) return;
							[opts.items[i + 1], opts.items[i]] = [opts.items[i], opts.items[i + 1]];
							redraw();
							opts.onChange?.();
						}),
						iconBtn("Remove", () => {
							opts.items.splice(i, 1);
							redraw();
							opts.onChange?.();
						}, true)
					),
					opts.render(item, i)
				)
			)
		);
	};
	redraw();

	return el(
		"div",
		{},
		wrap,
		el(
			"button",
			{
				type: "button",
				class: `${cx.btn} ${cx.btnGhost} mt-2`,
				onclick: () => {
					opts.items.push(opts.create());
					redraw();
					opts.onChange?.();
				},
			},
			`+ ${opts.addLabel}`
		)
	);
}

/** List editor for plain string arrays (index-bound). */
export function stringListEditor(
	items: string[],
	opts: { textarea?: boolean; placeholder?: string; addLabel: string }
): HTMLElement {
	return listEditor<string>({
		items,
		create: () => "",
		addLabel: opts.addLabel,
		render: (_item, i) =>
			textControl(
				() => items[i],
				(v) => (items[i] = v),
				{ textarea: opts.textarea, placeholder: opts.placeholder }
			),
	});
}

export function modal(
	title: string,
	body: HTMLElement,
	actions: HTMLElement[]
): { close: () => void } {
	const overlay = el(
		"div",
		{
			class:
				"fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 sm:p-8",
			onclick: (e: Event) => {
				if (e.target === overlay) close();
			},
		},
		el(
			"div",
			{ class: "w-full max-w-2xl rounded-xl border bg-card p-6 shadow-xl" },
			el("h3", { class: "mb-4 text-xl font-bold text-foreground" }, title),
			body,
			el("div", { class: "mt-6 flex flex-wrap justify-end gap-3" }, actions)
		)
	);
	const close = () => overlay.remove();
	document.body.append(overlay);
	return { close };
}

export const badge = (text: string, tone: "warn" | "ok" | "info" = "info") =>
	el(
		"span",
		{
			class: `inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
				tone === "warn"
					? "bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300"
					: tone === "ok"
						? "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300"
						: "bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300"
			}`,
		},
		text
	);
