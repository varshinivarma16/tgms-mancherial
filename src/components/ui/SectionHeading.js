import Link from "next/link";
import { cn } from "@/lib/cn";

// Section title with the gold underline, optional subtitle and an optional "View all →" link.
export default function SectionHeading({ title, subtitle, align = "left", action, as: Tag = "h2", className }) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        centered ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div>
        <Tag className="text-2xl font-bold text-primary sm:text-3xl">{title}</Tag>
        <div className={cn("mt-2 h-1 w-14 rounded bg-accent", centered && "mx-auto")} />
        {subtitle && <p className="mt-4 text-muted">{subtitle}</p>}
      </div>
      {action && !centered && (
        <Link href={action.href} className="shrink-0 text-sm font-medium text-primary hover:underline">
          {action.label} →
        </Link>
      )}
    </div>
  );
}
