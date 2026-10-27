import Link from "next/link";
import Reveal from "./Reveal";
import Section from "@/components/ui/Section";
import Icon from "@/components/ui/Icon";
import { pick } from "@/lib/i18n";

// Items from the last 7 days get a "NEW" tag.
const isNew = (d) => Date.now() - new Date(d).getTime() < 7 * 24 * 60 * 60 * 1000;

// Notices dated today (India time) blink in colours.
const isToday = (d) => String(d).slice(0, 10) === new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });

// 03-08-2026 style date.
const formatDate = (d) => {
  const date = new Date(d);
  return [date.getDate(), date.getMonth() + 1].map((n) => String(n).padStart(2, "0")).concat(date.getFullYear()).join("-");
};

// Navy board with a white underlined title and a scrolling list of rows.
function Board({ title, href, viewAll, delay, empty, children }) {
  return (
    <Reveal delay={delay} className="flex flex-col rounded-2xl bg-primary p-5 text-white shadow-xl sm:p-6">
      <div className="flex items-end justify-between gap-3">
        <h2 className="border-b-2 border-white pb-0.5 text-2xl font-bold sm:text-3xl">{title}</h2>
        <Link href={href} className="text-sm font-semibold text-white/80 hover:text-white">
          {viewAll} →
        </Link>
      </div>
      <ul className="board-scroll mt-4 max-h-[340px] flex-1 divide-y divide-white/20 overflow-y-auto pr-3">
        {children}
      </ul>
      {empty}
    </Reveal>
  );
}

function Row({ icon, href, date, title, meta, fresh, newLabel, today }) {
  return (
    <li>
      <Link href={href} className="flex gap-4 py-3 transition hover:bg-white/5">
        <Icon name={icon} className="mt-1 h-7 w-7 shrink-0 text-white/90" />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white/70">{date}</p>
          <p className={`font-semibold leading-snug ${today ? "animate-blink-colors" : ""}`}>
            {title}
            {fresh && (
              <span className="ml-2 inline-block rounded-full bg-danger px-2 py-0.5 align-middle text-[10px] font-bold uppercase italic">{newLabel}</span>
            )}
          </p>
          {meta && <p className="mt-0.5 text-sm text-white/70">{meta}</p>}
        </div>
      </Link>
    </li>
  );
}

export default function NoticesEvents({ notices, events, lang, dict }) {
  const href = `/${lang}/notices`;
  const emptyText = (text) => <p className="py-6 text-white/70">{text}</p>;

  return (
    <Section tone="fade" containerClassName="grid gap-6 sm:gap-8 lg:grid-cols-2">
      <Board title={dict.home.latestNotices} href={href} viewAll={dict.home.viewAll} delay={0} empty={notices.length === 0 && emptyText(dict.home.noNotices)}>
        {notices.map((n) => (
          <Row
            key={n.id}
            icon="notice"
            href={href}
            date={formatDate(n.notice_date)}
            title={pick(n, "title", lang)}
            fresh={n.is_pinned || isNew(n.notice_date)}
            today={isToday(n.notice_date)}
            newLabel={n.is_pinned && !isNew(n.notice_date) ? dict.notices.pinned : dict.home.newTag}
          />
        ))}
      </Board>

      <Board title={dict.home.upcomingEvents} href={href} viewAll={dict.home.viewAll} delay={150} empty={events.length === 0 && emptyText(dict.home.noEvents)}>
        {events.map((e) => (
          <Row
            key={e.id}
            icon="calendar"
            href={href}
            date={formatDate(e.event_date)}
            title={pick(e, "title", lang)}
            meta={e.location}
          />
        ))}
      </Board>
    </Section>
  );
}
