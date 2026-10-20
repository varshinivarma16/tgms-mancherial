import Link from "next/link";
import { cn } from "@/lib/cn";
import Icon from "./Icon";

const variants = {
  primary: "bg-primary text-white shadow hover:bg-primary-hover",
  accent: "bg-accent text-white shadow hover:bg-primary-hover",
  whatsapp: "bg-whatsapp text-white shadow-lg hover:brightness-95",
  outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
  "outline-light": "border-2 border-white text-white hover:bg-white hover:text-primary",
  ghost: "bg-white/15 text-white hover:bg-white/25",
};

const sizes = {
  sm: "shrink-0 gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs sm:px-4 sm:text-sm",
  md: "gap-2 rounded-lg px-4 py-2.5 text-sm sm:px-5 sm:py-3 sm:text-base",
};

/**
 * One button style for the whole site.
 * - `href` starting with http/tel/mailto → plain <a> (external links open in a new tab)
 * - other `href` → Next.js <Link>
 * - no `href` → <button>
 */
export default function Button({ href, variant = "primary", size = "md", icon, block, className, children, ...props }) {
  const classes = cn(
    "inline-flex items-center justify-center font-semibold transition hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    sizes[size],
    block && "w-full",
    className
  );
  const content = (
    <>
      {icon && <Icon name={icon} className="h-5 w-5" />}
      {children}
    </>
  );

  if (!href) {
    return (
      <button className={classes} {...props}>
        {content}
      </button>
    );
  }
  if (/^(https?:|tel:|mailto:)/.test(href)) {
    const external = href.startsWith("http");
    return (
      <a href={href} className={classes} {...(external && { target: "_blank", rel: "noopener noreferrer" })} {...props}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...props}>
      {content}
    </Link>
  );
}
