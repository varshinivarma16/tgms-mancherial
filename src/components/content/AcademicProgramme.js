import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Icon, { IconTile } from "@/components/ui/Icon";
import { pick } from "@/lib/i18n";
import { subjects, groups, vocational } from "@/lib/academicProgramme";

function SubHeading({ children }) {
  return <h3 className="text-lg font-bold text-heading sm:text-xl">{children}</h3>;
}

// Subjects, Intermediate groups and vocational courses (Academics page).
export default function AcademicProgramme({ lang, t }) {
  const name = (o) => (lang === "te" && o.te) || o.en;

  return (
    <div>
      <SectionHeading title={t.title} subtitle={t.subtitle} />

      {/* Intermediate groups */}
      <div className="mt-8">
        <SubHeading>{t.groups}</SubHeading>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((g) => (
            <Card key={g.code} tone="raised" className="flex flex-col">
              <span className="w-fit rounded-lg bg-primary px-3 py-1 text-lg font-bold tracking-wide text-white">{g.code}</span>
              <p className="mt-3 font-semibold text-heading">{name(g)}</p>
              <p className="mt-2 text-sm text-muted">
                <span className="font-medium text-body">{t.leadsTo}:</span> {pick(g, "for", lang)}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Subjects */}
      <div className="mt-10">
        <SubHeading>{t.subjects}</SubHeading>
        <ul className="mt-4 flex flex-wrap gap-2">
          {subjects.map((s) => (
            <li key={s.en} className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-body">
              <Icon name="check" className="h-4 w-4 text-primary" />
              {name(s)}
            </li>
          ))}
        </ul>
      </div>

      {/* Vocational */}
      <div className="mt-10">
        <SubHeading>{t.vocational}</SubHeading>
        <p className="mt-1 text-muted">{t.vocationalHint}</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {vocational.map((v) => (
            <Card key={v.en} padding="sm" className="flex items-center gap-4">
              <IconTile name={v.icon} />
              <span className="font-semibold text-heading">{name(v)}</span>
            </Card>
          ))}
        </div>
      </div>

      <p className="mt-8 flex items-start gap-2 rounded-xl border border-dashed border-line-strong bg-white px-4 py-3 text-sm text-muted">
        <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        {t.pending}
      </p>
    </div>
  );
}
