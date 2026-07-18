/**
 * Browser-side photo optimization: resize to a sane web width and encode as
 * WebP on a canvas — no server, no build tooling. Browsers without WebP
 * encoding (older Safari) fall back to JPEG, which astro:assets converts to
 * WebP at build time anyway.
 */
import { blobToBase64 } from "./github";

export interface ProcessedImage {
	base64: string;
	dataUrl: string;
	ext: "webp" | "jpg";
	width: number;
	height: number;
	bytes: number;
}

const encode = (
	canvas: HTMLCanvasElement,
	type: string,
	quality: number
): Promise<Blob | null> =>
	new Promise((resolve) => canvas.toBlob(resolve, type, quality));

export async function processImage(
	file: File,
	maxWidth = 1600,
	quality = 0.82
): Promise<ProcessedImage> {
	const bitmap = await createImageBitmap(file);
	const scale = Math.min(1, maxWidth / bitmap.width);
	const width = Math.max(1, Math.round(bitmap.width * scale));
	const height = Math.max(1, Math.round(bitmap.height * scale));

	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Canvas is unavailable in this browser.");
	ctx.drawImage(bitmap, 0, 0, width, height);
	bitmap.close();

	let ext: "webp" | "jpg" = "webp";
	let blob = await encode(canvas, "image/webp", quality);
	if (!blob || blob.type !== "image/webp") {
		ext = "jpg";
		blob = await encode(canvas, "image/jpeg", 0.85);
	}
	if (!blob) throw new Error("Could not encode the image.");

	const base64 = await blobToBase64(blob);
	return {
		base64,
		dataUrl: `data:${blob.type};base64,${base64}`,
		ext,
		width,
		height,
		bytes: blob.size,
	};
}
