import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import DataTable from "@/components/ui/DataTable";
import { getDictionary, pick } from "@/lib/i18n";
import { getSettings, getStrength } from "@/lib/data";
import { cn } from "@/lib/cn";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return { title: getDictionary(lang).strength.title };
}

const sum = (rows, key) => rows.reduce((n, r) => n + (Number(typeof key === "function" ? key(r) : r[key]) || 0), 0);
const totals = (rows) => {
  const boys = sum(rows, "boys"), girls = sum(rows, "girls");
  return { boys, girls, total: boys + girls };
};

// Summary number card. `strong` = solid blue card for the headline total.
function StatCard({ label, value, strong }) {
  return (
    <div className={cn("rounded-2xl p-5 text-center", strong ? "bg-primary text-white" : "bg-accent-light text-primary ring-1 ring-line")}>
      <p className="text-3xl font-bold tabular-nums sm:text-4xl">{value.toLocaleString("en-IN")}</p>
      <p className={cn("mt-1 text-sm font-medium", strong ? "text-on-dark" : "text-muted")}>{label}</p>
    </div>
  );
}

// Boys / girls / total columns, shared by the summary and class-wise tables.
const countColumns = (t) => [
  { key: "boys", label: t.boys },
  { key: "girls", label: t.girls },
  { key: "total", label: t.total, className: "font-semibold text-primary" },
];

export default async function StrengthPage({ params }) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const t = dict.strength;

  const [settings, strength] = await Promise.all([getSettings(), getStrength()]);
  const all = [...strength.school, ...strength.college];
  const grand = totals(all);

  // Summary by division: the whole school, then each Intermediate year.
  const collegeClasses = [...new Set(strength.college.map((r) => r.class_en))];
  const divisions = [
    ...(strength.school.length ? [{ label: t.schoolDivision, ...totals(strength.school) }] : []),
    ...collegeClasses.map((c) => {
      const rows = strength.college.filter((r) => r.class_en === c);
      return { label: pick(rows[0], "class", lang), ...totals(rows) };
    }),
  ];

  return (
    <>
      <PageHeader lang={lang} title={t.title} crumbs={[{ href: `/${lang}/about`, label: dict.nav.ourSchool }]} />
      <Section size="lg">
        <SectionHeading title={t.title} subtitle={`${t.subtitle} · ${t.asOf} ${settings.strength_year}`} />

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard label={t.totalStudents} value={grand.total} strong />
          <StatCard label={t.boys} value={grand.boys} />
          <StatCard label={t.girls} value={grand.girls} />
        </div>

        {/* Division summary and class-wise tables, side by side on large screens */}
        <div className="mt-8 grid items-start gap-6 lg:grid-cols-2">
          <DataTable
            title={t.consolidated}
            minWidth={360}
            columns={[{ key: "label", label: t.division, className: "font-medium text-heading" }, ...countColumns(t)]}
            rows={divisions}
            rowKey={(d) => d.label}
            footer={{ label: t.grandTotal, ...grand }}
          />
          <DataTable
            title={t.classWise}
            minWidth={420}
            columns={[
              { key: "class", label: t.className, className: "font-semibold text-heading" },
              { key: "section", label: t.section, className: "text-muted" },
              ...countColumns(t),
            ]}
            rows={all.map((r, i) => ({
              id: r.id ?? `${r.class_en}-${r.section_en}`,
              newClass: i === 0 || all[i - 1].class_en !== r.class_en,
              class: i === 0 || all[i - 1].class_en !== r.class_en ? pick(r, "class", lang) : "",
              section: r.section_en || "—",
              ...totals([r]),
            }))}
            rowKey={(r) => r.id}
            rowClassName={(r, i) => cn(r.newClass && i > 0 && "border-t-2 border-line")}
            footer={{ class: t.grandTotal, section: "", ...grand }}
          />
        </div>
      </Section>
    </>
  );
}
