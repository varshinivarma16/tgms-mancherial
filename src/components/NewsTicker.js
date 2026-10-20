import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Marquee from "@/components/ui/Marquee";
import { pick, formatDate } from "@/lib/i18n";

// Seconds per item, so the scroll speed stays readable no matter how many lines there are.
const SECONDS_PER_ITEM = 7;

function TickerItem({ item, lang, labels }) {
  const isEvent = item.type === "event";
  return (
    <span className="flex shrink-0 items-center gap-3 px-4 sm:px-6">
      <Badge variant={isEvent ? "accent" : "light"} className="uppercase tracking-wide">
        {isEvent ? labels.event : labels.notice}
      </Badge>
      <span className="whitespace-nowrap">{pick(item, "title", lang)}</span>
      {item.date && <span className="whitespace-nowrap text-on-dark-muted">· {formatDate(item.date, lang)}</span>}
      <span className="text-white/30" aria-hidden="true">✦</span>
    </span>
  );
}

// Scrolling "Latest" bar at the very top of every page. Pauses on hover.
export default function NewsTicker({ items, lang, labels }) {
  if (items.length === 0) return null;
  const href = `/${lang}/notices`;

  return (
    <div className="relative flex h-9 items-stretch bg-primary-dark text-xs text-white sm:h-10 sm:text-sm">
      <Link href={href} className="relative z-10 flex shrink-0 items-center gap-2 bg-accent px-3 font-bold text-white sm:px-4">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-danger opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-danger" />
        </span>
        <span className="hidden sm:inline">{labels.label}</span>
        <span className="absolute -right-3 top-0 h-full w-3 bg-accent [clip-path:polygon(0_0,100%_50%,0_100%)]" />
      </Link>

      <Link href={href} className="flex min-w-0 flex-1 items-center" aria-label={labels.label}>
        <Marquee duration={items.length * SECONDS_PER_ITEM} className="w-full">
          {items.map((item) => (
            <TickerItem key={item.id} item={item} lang={lang} labels={labels} />
          ))}
        </Marquee>
      </Link>

    </div>
  );
}
