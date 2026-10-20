"use client";

import { useState } from "react";

const MAX_SIZE = 1920; // longest side in pixels
const QUALITY = 0.82;

// Re-encodes a photo as WebP in the browser (scaled down if larger than MAX_SIZE).
// Returns null if the browser can't read the format, so the original is uploaded instead.
async function toWebp(file) {
  if (file.type === "image/webp" || file.type === "image/gif" || file.type === "image/svg+xml") return null;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_SIZE / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/webp", QUALITY));
    if (!blob || blob.type !== "image/webp") return null;
    const name = file.name.replace(/\.[^.]+$/, "") + ".webp";
    return new File([blob], name, { type: "image/webp" });
  } catch {
    return null;
  }
}

const kb = (bytes) => (bytes < 1024 * 1024 ? `${Math.round(bytes / 1024)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`);

export default function ImageInput({ name }) {
  const [status, setStatus] = useState("");

  async function handleChange(e) {
    const input = e.target;
    const file = input.files?.[0];
    if (!file) return setStatus("");
    setStatus("Converting to WebP…");
    const webp = await toWebp(file);
    if (!webp) return setStatus(`Will upload as is (${kb(file.size)}).`);
    const dt = new DataTransfer();
    dt.items.add(webp);
    input.files = dt.files;
    setStatus(`Converted to WebP: ${kb(file.size)} → ${kb(webp.size)}`);
  }

  return (
    <span className="flex flex-col gap-1">
      <input type="file" name={name} accept="image/*" onChange={handleChange} className="text-sm" />
      {status && <span className="text-xs font-normal text-subtle">{status}</span>}
    </span>
  );
}
