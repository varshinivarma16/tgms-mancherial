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

function TopperCard({ r, t, lang }) {
  const name = pick(r, "name", lang);
  return (
    <Card padding="none" className="overflow-hidden text-center">
      {r.photo_url ? (
        <img src={r.photo_url} alt={name} loading="lazy" className="aspect-square w-full object-cover" />
      ) : (
        <div className="flex aspect-square w-full items-center justify-center bg-accent-light text-4xl font-bold text-primary">
          {name.charAt(0)}
        </div>
      )}
      <div className="p-3">
        <p className="font-semibold text-heading">{name}</p>
        {r.group_en && <p className="mt-0.5 text-xs text-subtle">{r.group_en}</p>}
        {r.marks && <p className="mt-1 text-lg font-bold text-primary">{r.marks}</p>}
      </div>
    </Card>
  );
}

export default async function ResultsPage({ params }) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const t = dict.results;
  const [results, toppers] = await Promise.all([getResults(), getToppers()]);

  const resultGroups = EXAMS.map((e) => ({ exam: e, rows: results.filter((r) => r.exam === e) })).filter((g) => g.rows.length);
  // Toppers: newest year first, then one block per exam within that year.
  const years = [...new Set(toppers.map((r) => r.year))].map((y) => ({
    year: y,
    exams: EXAMS.map((e) => ({ exam: e, rows: toppers.filter((r) => r.year === y && r.exam === e) })).filter((g) => g.rows.length),
  }));

  return (
    <>
      <PageHeader lang={lang} title={t.title} crumbs={[{ href: `/${lang}/academics`, label: dict.nav.academics }]} />
      <Section size="lg">
        {results.length === 0 && toppers.length === 0 && <p className="text-subtle">{t.empty}</p>}

        {years.length > 0 && <SectionHeading title={t.toppersTitle} subtitle={t.subtitle} />}
        {years.map((y) => (
          <div key={y.year} className="mt-8">
            <h3 className="text-lg font-bold text-heading">{y.year}</h3>
            {y.exams.map((g) => (
              <div key={g.exam} className="mt-4">
                <p className="text-sm font-semibold uppercase tracking-wide text-primary">{t.exams[g.exam]}</p>
                <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                  {g.rows.map((r) => <TopperCard key={r.id} r={r} t={t} lang={lang} />)}
                </div>
              </div>
            ))}
          </div>
        ))}

        {resultGroups.length > 0 && <SectionHeading title={t.passTitle} as="h2" className={cn(years.length > 0 && "mt-14")} />}
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
      </Section>
    </>
  );
}
