import { cn } from "@/lib/cn";

/**
 * Endless right-to-left scroll. Renders `children` twice and shifts by 50% for a seamless loop.
 * Pauses on hover (needs a `group` ancestor — the wrapper here provides it).
 * `duration` is in seconds; pass something proportional to the number of items.
 */
export default function Marquee({ duration, className, trackClassName, children }) {
  return (
    <div className={cn("group relative overflow-hidden", className)}>
      <div className="animate-marquee flex w-max" style={{ animationDuration: `${duration}s` }}>
        {[0, 1].map((copy) => (
          <div key={copy} className={cn("flex shrink-0", trackClassName)} aria-hidden={copy === 1 || undefined}>
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
