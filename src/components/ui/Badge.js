import { cn } from "@/lib/cn";

const variants = {
  accent: "bg-accent text-white",
  danger: "bg-danger text-white",
  "danger-soft": "bg-danger-light text-danger",
  light: "bg-white/15 text-white",
};

// Small label: "Important", "Event", "Admissions Open"…
export default function Badge({ variant = "accent", pulse, className, children }) {
  return (
    <span className={cn("inline-flex items-center gap-2 rounded px-2 py-0.5 align-middle text-xs font-bold", variants[variant], className)}>
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
        </span>
      )}
      {children}
    </span>
  );
}
