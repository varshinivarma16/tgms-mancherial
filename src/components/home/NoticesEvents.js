import Reveal from "./Reveal";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { IconTile } from "@/components/ui/Icon";
import NoticeItem from "@/components/content/NoticeItem";
import EventItem from "@/components/content/EventItem";

// Big card with a navy header bar; the body scrolls when the list is long.
function Panel({ title, icon, href, viewAll, delay, children }) {
  return (
    <Reveal delay={delay} className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-line">
      <div className="flex items-center justify-between gap-3 bg-primary px-5 py-4 sm:px-8 sm:py-5">
        <h2 className="flex items-center gap-3 text-lg font-bold text-white sm:text-2xl">
          <IconTile name={icon} tone="accent" />
          {title}
        </h2>
        <Button variant="ghost" size="sm" href={href}>
          {viewAll} →
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-3 sm:px-8 sm:py-4 lg:max-h-[560px] lg:min-h-[460px]">{children}</div>
    </Reveal>
  );
}

export default function NoticesEvents({ notices, events, lang, dict }) {
  const href = `/${lang}/notices`;

  return (
    <Section tone="fade" containerClassName="grid gap-6 sm:gap-8 lg:grid-cols-2">
      <Panel title={dict.home.latestNotices} icon="notice" href={href} viewAll={dict.home.viewAll} delay={0}>
        {notices.length === 0 && <p className="py-6 text-subtle">{dict.home.noNotices}</p>}
        <ul className="divide-y divide-line">
          {notices.map((n) => (
            <NoticeItem key={n.id} notice={n} lang={lang} pinnedLabel={dict.notices.pinned} />
          ))}
        </ul>
      </Panel>

      <Panel title={dict.home.upcomingEvents} icon="calendar" href={href} viewAll={dict.home.viewAll} delay={150}>
        {events.length === 0 && <p className="py-6 text-subtle">{dict.home.noEvents}</p>}
        <ul className="space-y-2 py-2 sm:space-y-4">
          {events.map((e) => (
            <EventItem key={e.id} event={e} lang={lang} clamp />
          ))}
        </ul>
      </Panel>
    </Section>
  );
}
