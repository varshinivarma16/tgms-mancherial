import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import Icon from "@/components/ui/Icon";
import { getDictionary, pick, formatDate } from "@/lib/i18n";
import { getNotices, getUpcomingEvents, getPastEvents } from "@/lib/data";
import { cn } from "@/lib/cn";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return { title: getDictionary(lang).notices.title };
}

// Notices from the last 7 days get a "New" tag.
const isNew = (d) => Date.now() - new Date(d).getTime() < 7 * 24 * 60 * 60 * 1000;

// Rotating card colours so the list doesn't look flat; important notices are always red.
const TONES = [
  { bar: "border-sky-500", icon: "bg-sky-100 text-sky-700" },
  { bar: "border-emerald-500", icon: "bg-emerald-100 text-emerald-700" },
  { bar: "border-violet-500", icon: "bg-violet-100 text-violet-700" },
  { bar: "border-amber-500", icon: "bg-amber-100 text-amber-700" },
];

function Heading({ icon, title, count, className }) {
  return (
    <div className={cn("flex items-center gap-3 rounded-xl px-4 py-3 text-white shadow", className)}>
      <Icon name={icon} className="h-6 w-6" />
      <h2 className="text-lg font-bold sm:text-xl">{title}</h2>
      <span className="ml-auto rounded-full bg-white/20 px-2.5 py-0.5 text-sm font-semibold">{count}</span>
    </div>
  );
}

function NoticeCard({ notice, lang, t, i }) {
  const tone = notice.is_pinned ? { bar: "border-danger", icon: "bg-danger-light text-danger" } : TONES[i % TONES.length];
  const body = pick(notice, "body", lang);
  return (
    <article className={cn("flex gap-4 rounded-xl border-l-4 bg-white p-4 shadow-sm ring-1 ring-line transition hover:-translate-y-0.5 hover:shadow-md sm:p-5", tone.bar, notice.is_pinned && "bg-danger-light/60")}>
      <span className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-full", tone.icon)}>
        <Icon name="notice" className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span className="text-subtle">{formatDate(notice.notice_date, lang)}</span>
          {notice.is_pinned && <span className="rounded-full bg-danger px-2 py-0.5 uppercase text-white">{t.pinned}</span>}
          {isNew(notice.notice_date) && <span className="rounded-full bg-emerald-600 px-2 py-0.5 uppercase text-white">{t.newTag}</span>}
        </div>
        <h3 className="mt-1 text-base font-bold text-heading sm:text-lg">{pick(notice, "title", lang)}</h3>
        {body && <p className="mt-1.5 whitespace-pre-line text-body">{body}</p>}
      </div>
    </article>
  );
}

function EventCard({ event, lang, past }) {
  const date = new Date(event.event_date);
  const description = pick(event, "description", lang);
  return (
    <li className={cn("flex gap-4 rounded-xl bg-white p-3 shadow-sm ring-1 ring-line", past && "opacity-75")}>
      <div className={cn("flex w-16 shrink-0 flex-col items-center justify-center rounded-lg py-2 text-white", past ? "bg-slate-500" : "bg-emerald-600")}>
        <span className="text-2xl font-bold leading-none">{date.getDate()}</span>
        <span className="mt-1 text-xs font-semibold uppercase">{date.toLocaleString(lang === "te" ? "te-IN" : "en-IN", { month: "short" })}</span>
        <span className="text-[10px] opacity-80">{date.getFullYear()}</span>
      </div>
      <div className="min-w-0 py-1">
        <h3 className="font-bold text-heading">{pick(event, "title", lang)}</h3>
        {event.location && (
          <p className="mt-0.5 flex items-center gap-1 text-sm text-primary">
            <Icon name="pin" className="h-4 w-4 shrink-0" />
            {event.location}
          </p>
        )}
        {description && <p className="mt-1 line-clamp-3 whitespace-pre-line text-sm text-muted">{description}</p>}
      </div>
    </li>
  );
}

export default async function NoticesPage({ params }) {
  const { lang } = await params;
  const t = getDictionary(lang).notices;
  const [notices, upcoming, past] = await Promise.all([getNotices(), getUpcomingEvents(), getPastEvents()]);
  const empty = <p className="rounded-xl bg-white p-6 text-center text-subtle ring-1 ring-line">{t.empty}</p>;

  return (
    <>
      <PageHeader lang={lang} title={t.title} />
      <Section tone="surface" size="lg" containerClassName="grid items-start gap-10 lg:grid-cols-[3fr_2fr]">
        <div>
          <Heading icon="notice" title={t.notices} count={notices.length} className="bg-primary" />
          <div className="mt-4 space-y-4">
            {notices.length === 0 && empty}
            {notices.map((n, i) => (
              <NoticeCard key={n.id} notice={n} lang={lang} t={t} i={i} />
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <Heading icon="calendar" title={t.upcoming} count={upcoming.length} className="bg-emerald-600" />
            <ul className="mt-4 space-y-3">
              {upcoming.length === 0 && empty}
              {upcoming.map((e) => (
                <EventCard key={e.id} event={e} lang={lang} />
              ))}
            </ul>
          </div>
          {past.length > 0 && (
            <div>
              <Heading icon="calendar" title={t.past} count={past.length} className="bg-slate-600" />
              <ul className="mt-4 space-y-3">
                {past.map((e) => (
                  <EventCard key={e.id} event={e} lang={lang} past />
                ))}
              </ul>
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
