// Shared form field styles (admin panel and login).
export const inputBase =
  "w-full rounded-lg border border-line-strong bg-white px-3 py-2 text-base focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

// Same, with a small gap below its label.
export const inputClass = `mt-1 ${inputBase}`;

export function Label({ label, required, children }) {
  return (
    <label className="block text-sm font-medium text-body">
      {label}
      {required && " *"}
      {children}
    </label>
  );
}
