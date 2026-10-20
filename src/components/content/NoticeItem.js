import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { pick, formatDate } from "@/lib/i18n";
import { cn } from "@/lib/cn";

/**
 * One notice. `variant="row"` is the compact list row (home page panel),
 * `variant="card"` is the full card with all details (Notices page).
 */
export default function NoticeItem({ notice, lang, pinnedLabel, variant = "row" }) {
  const title = pick(notice, "title", lang);
  const body = pick(notice, "body", lang);
  const pinned = notice.is_pinned && <Badge variant={variant === "card" ? "danger" : "danger-soft"} className="mr-2">{pinnedLabel}</Badge>;

  if (variant === "card") {
    return (
      <Card as="article" tone={notice.is_pinned ? "danger" : "white"}>
        <p className="text-xs text-subtle">{formatDate(notice.notice_date, lang)}</p>
        <h3 className="mt-1 text-base font-semibold text-heading sm:text-lg">
          {pinned}
          {title}
        </h3>
        {body && <p className="mt-2 whitespace-pre-line text-body">{body}</p>}
      </Card>
    );
  }

  return (
    <li className="group flex gap-3 py-4 sm:gap-4 sm:py-5">
      <span className={cn("mt-1.5 h-3 w-3 shrink-0 rounded-full", notice.is_pinned ? "bg-danger" : "bg-accent")} />
      <div className="min-w-0">
        <p className="text-sm font-medium text-subtle">{formatDate(notice.notice_date, lang)}</p>
        <h3 className="mt-1 text-base font-semibold text-heading group-hover:text-primary sm:text-lg">
          {pinned}
          {title}
        </h3>
        {body && <p className="mt-1 line-clamp-2 text-sm text-muted sm:text-base">{body}</p>}
      </div>
    </li>
  );
}
