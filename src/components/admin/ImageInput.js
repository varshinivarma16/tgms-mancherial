"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/Icon";

const MAX_SIZE = 1920; // longest side in pixels
const QUALITY = 0.82;

// Re-encodes a photo as WebP in the browser (scaled down if larger than MAX_SIZE).
// Returns the original file if the browser can't convert it.
async function toWebp(file) {
  if (file.type === "image/webp" || file.type === "image/gif" || file.type === "image/svg+xml") return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_SIZE / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/webp", QUALITY));
    if (!blob || blob.type !== "image/webp") return file;
    return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".webp", { type: "image/webp" });
  } catch {
    return file;
  }
}

const kb = (bytes) => (bytes < 1024 * 1024 ? `${Math.round(bytes / 1024)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`);

// Click-or-drop photo picker with previews. `multiple` lets several photos be chosen at once.
export default function ImageInput({ name, multiple = false }) {
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]); // [{ file, url }]
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => () => files.forEach((f) => URL.revokeObjectURL(f.url)), [files]);

  // Converts the chosen files and puts the converted versions back into the real <input>.
  async function pickFiles(list) {
    const chosen = [...list].filter((f) => f.type.startsWith("image/")).slice(0, multiple ? undefined : 1);
    if (chosen.length === 0) return;
    setBusy(true);
    const converted = await Promise.all(chosen.map(toWebp));
    const dt = new DataTransfer();
    converted.forEach((f) => dt.items.add(f));
    inputRef.current.files = dt.files;
    setFiles(converted.map((file) => ({ file, url: URL.createObjectURL(file) })));
    setBusy(false);
  }

  function clear() {
    inputRef.current.value = "";
    setFiles([]);
  }

  const total = files.reduce((n, f) => n + f.file.size, 0);

  return (
    <div className="w-full">
      <label
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); pickFiles(e.dataTransfer.files); }}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-6 text-center transition ${
          dragging ? "border-primary bg-accent-light" : "border-line-strong bg-surface hover:border-primary hover:bg-accent-light"
        }`}
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary shadow-sm">
          <Icon name="upload" className="h-5 w-5" />
        </span>
        <span className="text-sm font-semibold text-primary">
          {busy ? "Preparing photos…" : multiple ? "Choose photos or drag them here" : "Choose a photo or drag it here"}
        </span>
        <span className="text-xs font-normal text-subtle">
          JPG, PNG or WebP{multiple && " · select many at once with Ctrl / Shift"} · converted to WebP automatically
        </span>
        <input ref={inputRef} type="file" name={name} accept="image/*" multiple={multiple} onChange={(e) => pickFiles(e.target.files)} className="sr-only" />
      </label>

      {files.length > 0 && (
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs font-normal text-subtle">
            <span>{files.length} photo{files.length > 1 && "s"} ready · {kb(total)}</span>
            <button type="button" onClick={clear} className="font-medium text-danger hover:underline">Remove</button>
          </div>
          <ul className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-6">
            {files.map((f) => (
              <li key={f.url} className="aspect-square overflow-hidden rounded-lg ring-1 ring-line">
                <img src={f.url} alt="" className="h-full w-full object-cover" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
