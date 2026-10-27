import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import DataTable from "@/components/ui/DataTable";
import SidebarFilter, { FilterItem } from "@/components/ui/SidebarFilter";
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

// Summary number card. `strong` = solid blue card for a total; `highlight` = solid orange card for the headline total students.
function StatCard({ label, value, strong, highlight }) {
  // Headline total, label and number side by side.
  if (highlight) {
    return (
      <div className="flex h-full items-center justify-between gap-3 rounded-xl bg-orange-500 px-5 py-3 text-white shadow-lg ring-4 ring-orange-300/60">
        <span className="text-lg font-bold uppercase tracking-wide sm:text-xl">{label}</span>
        <span className="text-3xl font-bold tabular-nums drop-shadow sm:text-4xl">{value.toLocaleString("en-IN")}</span>
      </div>
    );
  }
  // Compact one-line card: "Boys  46".
  return (
      <div
        className={cn(
          "flex h-full items-center justify-between gap-3 rounded-xl px-5 py-3 shadow-sm",
          strong ? "bg-primary text-white" : "border-l-4 border-amber-500 bg-amber-50 text-amber-900 ring-1 ring-amber-200"
        )}
      >
        <span className={cn("text-lg font-bold sm:text-xl", strong ? "text-on-dark" : "text-amber-800")}>{label}</span>
        <span className="text-2xl font-bold tabular-nums sm:text-3xl">{value.toLocaleString("en-IN")}</span>
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

  // One sidebar entry per class (Class VI … Intermediate II Year), in the order the admin set.
  const classes = [...new Set(all.map((r) => r.class_en))].map((c) => {
    const rows = all.filter((r) => r.class_en === c);
    const name = pick(rows[0], "class", lang);
    return {
      key: c,
      label: rows[0].level === "college" || !t.classPrefix ? name : `${t.classPrefix} ${name}`,
      split: { column: t.section, rows: rows.map((r) => ({ id: r.id ?? `${c}-${r.section_en}`, name: r.section_en || "—", ...totals([r]) })) },
      ...totals(rows),
    };
  });

  // Combined entries: Classes VI–X together, and Intermediate 1st + 2nd year together, each split by class.
  const combined = (key, label, level) => {
    const list = classes.filter((c) => all.find((r) => r.class_en === c.key).level === level);
    const rows = level === "college" ? strength.college : strength.school;
    return list.length > 1 && {
      key, label, combined: true,
      split: { column: t.className, rows: list.map((c) => ({ id: c.key, name: c.label, boys: c.boys, girls: c.girls, total: c.total })) },
      ...totals(rows),
    };
  };
  const schoolAll = combined("school-all", t.school, "school");
  const collegeAll = combined("college-all", t.college, "college");
  const isCollege = (c) => all.find((r) => r.class_en === c.key)?.level === "college";
  const entries = [
    schoolAll,
    ...classes.filter((c) => !isCollege(c)),
    collegeAll,
    ...classes.filter(isCollege),
  ].filter(Boolean);

  return (
    <>
      <PageHeader lang={lang} title={t.title} crumbs={[{ href: `/${lang}/about`, label: dict.nav.ourSchool }]} />
      <Section size="full">
        <SectionHeading title={t.title} subtitle={`${t.subtitle} · ${t.asOf} ${settings.strength_year}`} />

        <SidebarFilter
          allLabel={t.allClasses}
          browseLabel={t.browse}
          options={entries.map((c) => ({ value: c.key, label: c.label, count: c.total }))}
        >
          <FilterItem value="all">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <StatCard label={t.totalStudents} value={grand.total} highlight />
              <StatCard label={t.boys} value={grand.boys} />
              <StatCard label={t.girls} value={grand.girls} />
            </div>
            <DataTable
              title={t.consolidated}
              minWidth={360}
              className="mt-6"
              columns={[{ key: "label", label: t.division, className: "font-medium text-heading" }, ...countColumns(t)]}
              rows={divisions}
              rowKey={(d) => d.label}
              footer={{ label: t.grandTotal, ...grand }}
            />
          </FilterItem>

          {/* One card per class (or combined view): boys, girls and total, plus a split by group or class */}
          {entries.map((c) => (
            <FilterItem key={c.key} value={c.key} onlyWhenSelected={c.combined}>
              <section className="rounded-2xl bg-surface p-5 ring-1 ring-line sm:p-6">
                <h2 className="text-xl font-bold text-heading">{c.label}</h2>
                <div className="mt-4 grid grid-cols-3 gap-3 sm:gap-4">
                  <StatCard label={t.boys} value={c.boys} />
                  <StatCard label={t.girls} value={c.girls} />
                  <StatCard label={t.total} value={c.total} strong />
                </div>
                {c.split.rows.length > 1 && (
                  <DataTable
                    className="mt-4"
                    minWidth={360}
                    columns={[{ key: "name", label: c.split.column, className: "font-medium text-heading" }, ...countColumns(t)]}
                    rows={c.split.rows}
                    rowKey={(r) => r.id}
                    footer={{ name: t.total, boys: c.boys, girls: c.girls, total: c.total }}
                  />
                )}
              </section>
            </FilterItem>
          ))}
        </SidebarFilter>
      </Section>
    </>
  );
}
