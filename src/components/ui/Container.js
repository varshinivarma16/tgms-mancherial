import { cn } from "@/lib/cn";

const widths = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-[100rem]", // wide pages with a filter sidebar
};

// Centered page-width wrapper with responsive side padding.
export default function Container({ size = "xl", as: Tag = "div", className, children }) {
  return <Tag className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", widths[size], className)}>{children}</Tag>;
}
