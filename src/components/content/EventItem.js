import DateBadge from "@/components/ui/DateBadge";
import Icon from "@/components/ui/Icon";
import { pick } from "@/lib/i18n";
import { cn } from "@/lib/cn";

// One event: date block, title, location and description. `clamp` shortens the description.
export default function EventItem({ event, lang, clamp = false, as: Tag = "li", className }) {
  const description = pick(event, "description", lang);
  return (
    <Tag className={cn("flex gap-4 rounded-2xl p-2 transition hover:bg-surface sm:gap-5 sm:p-3", className)}>
      <DateBadge date={event.event_date} lang={lang} />
      <div className="min-w-0 py-1">
        <h3 className="text-base font-semibold text-heading sm:text-lg">{pick(event, "title", lang)}</h3>
        {event.location && (
          <p className="mt-0.5 flex items-center gap-1 text-sm text-primary">
            <Icon name="pin" className="h-4 w-4 shrink-0" />
            {event.location}
          </p>
        )}
        {description && (
          <p className={cn("mt-1 whitespace-pre-line text-sm text-muted sm:text-base", clamp && "line-clamp-2")}>{description}</p>
        )}
      </div>
    </Tag>
  );
}
