import { cn } from "@/lib/cn";

// Embedded Google Map (lazy-loaded). Renders nothing when no embed link is set.
export default function MapEmbed({ src, title, className }) {
  if (!src) return null;
  return (
    <iframe
      src={src}
      title={title}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className={cn("w-full border-0", className)}
    />
  );
}
