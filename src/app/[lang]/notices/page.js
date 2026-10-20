import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import NoticeItem from "@/components/content/NoticeItem";
import EventItem from "@/components/content/EventItem";
import { getDictionary } from "@/lib/i18n";
import { getNotices, getUpcomingEvents, getPastEvents } from "@/lib/data";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return { title: getDictionary(lang).notices.title };
}

export default async function NoticesPage({ params }) {
  const { lang } = await params;
  const t = getDictionary(lang).notices;
  const [notices, upcoming, past] = await Promise.all([getNotices(), getUpcomingEvents(), getPastEvents()]);
  const events = [...upcoming, ...past];

  return (
    <>
      <PageHeader lang={lang} title={t.title} />
      <Section size="lg" containerClassName="grid gap-10 lg:grid-cols-[3fr_2fr]">
        <div>
          <SectionHeading title={t.notices} />
          <div className="mt-6 space-y-4">
            {notices.length === 0 && <p className="text-subtle">{t.empty}</p>}
            {notices.map((n) => (
              <NoticeItem key={n.id} notice={n} lang={lang} pinnedLabel={t.pinned} variant="card" />
            ))}
          </div>
        </div>

        <div>
          <SectionHeading title={t.events} />
          <Card className="mt-6" padding="sm">
            {events.length === 0 && <p className="text-subtle">{t.empty}</p>}
            <ul className="space-y-2">
              {events.map((e) => (
                <EventItem key={e.id} event={e} lang={lang} />
              ))}
            </ul>
          </Card>
        </div>
      </Section>
    </>
  );
}
