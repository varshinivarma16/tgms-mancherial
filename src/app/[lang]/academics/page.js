import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import AcademicProgramme from "@/components/content/AcademicProgramme";
import { getDictionary } from "@/lib/i18n";
import { cn } from "@/lib/cn";

// One solid colour per school level.
const LEVEL_TONES = [
  { bar: "border-sky-500", dot: "bg-sky-500" },
  { bar: "border-violet-500", dot: "bg-violet-500" },
  { bar: "border-orange-500", dot: "bg-orange-500" },
];

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
        <p className="max-w-3xl border-l-4 border-primary pl-4 text-base text-body sm:text-lg">{t.intro}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {t.levels.map((level, i) => (
            <div key={level.name} className={cn("rounded-2xl border-t-4 bg-white p-6 shadow-sm ring-1 ring-line transition hover:-translate-y-1 hover:shadow-md", LEVEL_TONES[i % 3].bar)}>
              <span className={cn("grid h-12 w-12 place-items-center rounded-full text-white", LEVEL_TONES[i % 3].dot)}>
                <Icon name="graduation" className="h-6 w-6" />
              </span>
              <h2 className="mt-4 text-xl font-bold text-heading">{level.name}</h2>
              <p className="mt-2 text-muted">{level.text}</p>
            </div>
          ))}
        </div>

      </Section>

      <Section size="lg" spacing="sm">
        <SectionHeading title={t.vocational.title} subtitle={t.vocational.subtitle} />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-6">
          {t.vocational.trades.map((trade) => (
            <div key={trade.name} className="flex gap-4 rounded-2xl border-l-4 border-emerald-600 bg-emerald-50 p-5 ring-1 ring-emerald-200">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-emerald-600 text-white">
                <Icon name="award" className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-emerald-900">{trade.name}</h3>
                <p className="mt-1 text-emerald-800">{trade.text}</p>
              </div>
            </div>
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
            <li key={f} className="flex items-center gap-3 rounded-xl bg-amber-50 p-4 font-semibold text-amber-900 ring-1 ring-amber-200">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-amber-500 text-white">
                <Icon name="check" className="h-4 w-4" />
              </span>
              {f}
            </li>
          ))}
        </ul>
      </Section>

      <Section size="lg" spacing="sm">
        <div className="flex flex-col items-start gap-4 rounded-2xl bg-primary p-6 text-white shadow-lg sm:flex-row sm:items-center sm:p-8">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white/15">
            <Icon name="calendar" className="h-7 w-7" />
          </span>
          <div className="flex-1">
            <h2 className="text-xl font-bold sm:text-2xl">{dict.calendar.title}</h2>
            <p className="mt-1 text-on-dark">{dict.calendar.calendarHint}</p>
          </div>
          <Button href={`/${lang}/academics/calendar`} variant="outline-light">{dict.calendar.viewCalendar} →</Button>
        </div>
      </Section>
    </>
  );
}
