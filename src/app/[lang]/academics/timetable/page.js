import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import { getDictionary } from "@/lib/i18n";
import { getSettings, getTimetable } from "@/lib/data";
import { cn } from "@/lib/cn";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return { title: getDictionary(lang).timetable.title };
}

const DAYS = ["mon", "tue", "wed", "thu", "fri", "sat"];
const PERIODS = [1, 2, 3, 4, 5, 6, 7, 8];

const th = "px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide";
const td = "px-3 py-2.5 text-left";

export default async function TimetablePage({ params, searchParams }) {
  const { lang } = await params;
  const { class: selected } = await searchParams;
  const dict = getDictionary(lang);
  const t = dict.timetable;
  const [settings, rows] = await Promise.all([getSettings(), getTimetable()]);

  // Classes in admin display order; the chosen one comes from ?class=, else the first.
  const classes = [...new Set(rows.map((r) => r.class_en))];
  const current = classes.includes(selected) ? selected : classes[0];
  const classRows = rows.filter((r) => r.class_en === current);
  const byDay = Object.fromEntries(classRows.map((r) => [r.day, r]));

  // Show a period if it has a time set or any day uses it.
  const periods = PERIODS.filter((n) => settings[`period${n}_time`] || classRows.some((r) => r[`p${n}`]));

  return (
    <>
      <PageHeader lang={lang} title={t.title} crumbs={[{ href: `/${lang}/academics`, label: dict.nav.academics }]} />
      <Section size="lg">
        <SectionHeading title={t.title} subtitle={classes.length ? t.subtitle : undefined} />
        {classes.length === 0 && <p className="mt-8 text-subtle">{t.empty}</p>}

        {classes.length > 0 && (
          <>
            <nav className="mt-8 flex flex-wrap gap-2">
              {classes.map((c) => (
                <Link
                  key={c}
                  href={`/${lang}/academics/timetable?class=${encodeURIComponent(c)}`}
                  scroll={false}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-medium transition",
                    c === current ? "border-primary bg-primary text-white" : "border-line bg-white text-heading hover:border-primary"
                  )}
                >
                  {c}
                </Link>
              ))}
            </nav>

            <Card padding="none" className="mt-6 overflow-hidden">
              <div className="bg-primary px-4 py-3 sm:px-6">
                <h3 className="font-semibold text-white">{current}</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-sm sm:text-base">
                  <thead className="bg-surface text-subtle">
                    <tr>
                      <th className={cn(th, "pl-4 sm:pl-6")}>{t.day}</th>
                      {periods.map((n) => (
                        <th key={n} className={th}>
                          {t.period} {n}
                          {settings[`period${n}_time`] && <span className="block font-normal normal-case tracking-normal">{settings[`period${n}_time`]}</span>}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line text-body">
                    {DAYS.filter((d) => byDay[d]).map((d) => (
                      <tr key={d}>
                        <td className={cn(td, "pl-4 font-semibold text-heading sm:pl-6")}>{t.days[d]}</td>
                        {periods.map((n) => (
                          <td key={n} className={td}>{byDay[d][`p${n}`] || "—"}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </>
        )}
      </Section>
    </>
  );
}
