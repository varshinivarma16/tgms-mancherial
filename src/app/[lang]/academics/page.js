import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import { IconTile } from "@/components/ui/Icon";
import AcademicProgramme from "@/components/content/AcademicProgramme";
import { getDictionary } from "@/lib/i18n";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return { title: getDictionary(lang).academics.title };
}

export default async function AcademicsPage({ params }) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const t = dict.academics;

  return (
    <>
      <PageHeader lang={lang} title={t.title} />
      <Section size="lg">
        <p className="text-base text-body sm:text-lg">{t.intro}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {t.levels.map((level) => (
            <Card key={level.name} tone="raised">
              <h2 className="text-lg font-bold text-primary">{level.name}</h2>
              <p className="mt-2 text-muted">{level.text}</p>
            </Card>
          ))}
        </div>

      </Section>

      <Section tone="surface" size="lg">
        <AcademicProgramme lang={lang} t={dict.programme} />
      </Section>

      <Section size="lg">
        <SectionHeading title={t.facilities} />
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {t.facilityList.map((f) => (
            <Card as="li" key={f} tone="accent" padding="sm" className="flex items-center gap-3 font-medium text-primary-dark">
              <Icon name="check" className="h-5 w-5 shrink-0 text-accent" /> {f}
            </Card>
          ))}
        </ul>
      </Section>

      <Section size="lg" spacing="sm">
        <Card tone="raised" className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <IconTile name="calendar" size="lg" />
          <div className="flex-1">
            <h2 className="text-lg font-bold text-heading sm:text-xl">{dict.calendar.title}</h2>
            <p className="mt-1 text-muted">{dict.calendar.calendarHint}</p>
          </div>
          <Button href={`/${lang}/academics/calendar`}>{dict.calendar.viewCalendar} →</Button>
        </Card>
      </Section>
    </>
  );
}
