import { cn } from "@/lib/cn";

const paddings = { none: "", sm: "p-4", md: "p-5 sm:p-6", lg: "p-6 sm:p-8 lg:p-10" };
const tones = {
  white: "bg-white shadow-sm ring-1 ring-line",
  raised: "bg-white shadow-xl ring-1 ring-line",
  surface: "bg-surface",
  accent: "bg-accent-light",
  danger: "bg-danger-light ring-1 ring-danger-border",
};

// Rounded box used for every card/panel on the site.
export default function Card({ as: Tag = "div", tone = "white", padding = "md", className, children, ...props }) {
  return (
    <Tag className={cn("rounded-2xl", tones[tone], paddings[padding], className)} {...props}>
      {children}
    </Tag>
  );
}
