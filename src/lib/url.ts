/** Prefix a site-relative path with the deploy base ("" in production). */
export const withBase = (path: string): string =>
	import.meta.env.BASE_URL.replace(/\/$/, "") + path;
