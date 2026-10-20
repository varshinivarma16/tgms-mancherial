import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import AcademicCalendar from "@/components/content/AcademicCalendar";
import { getDictionary } from "@/lib/i18n";
import { academicCalendar, academicYear } from "@/lib/academicCalendar";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return { title: `${getDictionary(lang).calendar.title} ${academicYear}` };
}

export default async function CalendarPage({ params }) {
  const { lang } = await params;
  const t = getDictionary(lang).calendar;
  // Today's date in India, so past/next entries are right regardless of server timezone.
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });

  return (
    <>
      <PageHeader lang={lang} title={`${t.title} ${academicYear}`} crumbs={[{ href: `/${lang}/academics`, label: getDictionary(lang).nav.academics }]} />
      <Section tone="surface" size="md">
        <AcademicCalendar entries={academicCalendar} today={today} year={academicYear.replace("–", "-")} lang={lang} labels={t} />
      </Section>
    </>
  );
}
