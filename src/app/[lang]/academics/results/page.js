import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import { getDictionary, pick } from "@/lib/i18n";
import { getResults, getToppers } from "@/lib/data";
import { cn } from "@/lib/cn";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return { title: getDictionary(lang).results.title };
}

const EXAMS = ["ssc", "inter1", "inter2"];
const th = "px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide";
const td = "px-3 py-2.5 text-left";
const percent = (r) => (r.appeared ? Math.round((r.passed / r.appeared) * 1000) / 10 : 0);

export default async function ResultsPage({ params }) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const t = dict.results;
  const [results, toppers] = await Promise.all([getResults(), getToppers()]);

  const resultGroups = EXAMS.map((e) => ({ exam: e, rows: results.filter((r) => r.exam === e) })).filter((g) => g.rows.length);
  // Toppers grouped by year (newest first), then by exam.
  const years = [...new Set(toppers.map((r) => r.year))];

  return (
    <>
      <PageHeader lang={lang} title={t.title} crumbs={[{ href: `/${lang}/academics`, label: dict.nav.academics }]} />
      <Section size="lg">
        <SectionHeading title={t.passTitle} subtitle={t.subtitle} />
        {results.length === 0 && toppers.length === 0 && <p className="mt-8 text-subtle">{t.empty}</p>}

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {resultGroups.map((g) => (
            <Card key={g.exam} padding="none" className="overflow-hidden">
              <div className="bg-primary px-4 py-3 sm:px-6">
                <h3 className="font-semibold text-white">{t.exams[g.exam]}</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[480px] text-sm tabular-nums sm:text-base">
                  <thead className="bg-surface text-subtle">
                    <tr>
                      <th className={cn(th, "pl-4 sm:pl-6")}>{t.year}</th>
                      <th className={th}>{t.appeared}</th>
                      <th className={th}>{t.passed}</th>
                      <th className={th}>{t.distinctions}</th>
                      <th className={cn(th, "pr-4 sm:pr-6")}>{t.passPercent}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line text-body">
                    {g.rows.map((r) => (
                      <tr key={r.id}>
                        <td className={cn(td, "pl-4 font-semibold text-heading sm:pl-6")}>{r.year}</td>
                        <td className={td}>{r.appeared}</td>
                        <td className={td}>{r.passed}</td>
                        <td className={td}>{r.distinctions || "—"}</td>
                        <td className={cn(td, "pr-4 font-bold text-primary sm:pr-6")}>{percent(r)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          ))}
        </div>

        {years.length > 0 && <SectionHeading title={t.toppersTitle} as="h2" className="mt-14" />}
        {years.map((y) => (
          <div key={y} className="mt-8">
            <h3 className="text-lg font-bold text-heading">{y}</h3>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {toppers.filter((r) => r.year === y).map((r) => {
                const name = pick(r, "name", lang);
                return (
                  <Card key={r.id} padding="none" className="overflow-hidden text-center">
                    {r.photo_url ? (
                      <img src={r.photo_url} alt={name} loading="lazy" className="aspect-square w-full object-cover" />
                    ) : (
                      <div className="flex aspect-square w-full items-center justify-center bg-accent-light text-4xl font-bold text-primary">
                        {name.charAt(0)}
                      </div>
                    )}
                    <div className="p-3">
                      <p className="font-semibold text-heading">{name}</p>
                      <p className="mt-0.5 text-xs text-subtle">{[t.exams[r.exam], r.group_en].filter(Boolean).join(" · ")}</p>
                      {r.marks && <p className="mt-1 text-lg font-bold text-primary">{r.marks}</p>}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </Section>
    </>
  );
}
