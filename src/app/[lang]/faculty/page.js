import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import { getDictionary, pick } from "@/lib/i18n";
import { getStaff } from "@/lib/data";
import { staffCategories } from "@/lib/staff";
import { telLink } from "@/lib/whatsapp";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return { title: getDictionary(lang).faculty.title };
}

function Avatar({ person, lang, className }) {
  return (
    <div className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent-light text-primary ${className}`}>
      {person.photo_url ? (
        <img src={person.photo_url} alt={pick(person, "name", lang)} loading="lazy" className="h-full w-full object-cover" />
      ) : (
        <span className="text-xl font-bold">{pick(person, "name", lang).trim().charAt(0)}</span>
      )}
    </div>
  );
}

function Detail({ icon, label, children }) {
  return (
    <div className="flex items-start gap-2 text-sm">
      <Icon name={icon} className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
      <span>
        <span className="text-subtle">{label}: </span>
        <span className="text-body">{children}</span>
      </span>
    </div>
  );
}

// Teachers and trainers: photo card with qualification and experience.
function StaffCard({ person, lang, t }) {
  return (
    <Card as="li" tone="white" className="flex flex-col items-center text-center">
      <Avatar person={person} lang={lang} className="h-24 w-24 ring-4 ring-accent-light" />
      <h3 className="mt-4 font-semibold text-heading">{pick(person, "name", lang)}</h3>
      {person.role_en && <p className="mt-0.5 text-sm font-medium text-primary">{pick(person, "role", lang)}</p>}
      {(person.qualification || person.experience) && (
        <div className="mt-4 w-full space-y-2 border-t border-line pt-4 text-left">
          {person.qualification && <Detail icon="graduation" label={t.qualification}>{person.qualification}</Detail>}
          {person.experience && <Detail icon="award" label={t.experience}>{person.experience}</Detail>}
        </div>
      )}
    </Card>
  );
}

// Support staff: compact row with name, role and phone.
function SupportRow({ person, lang }) {
  return (
    <Card as="li" tone="white" padding="sm" className="flex items-center gap-4">
      <Avatar person={person} lang={lang} className="h-12 w-12" />
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold text-heading">{pick(person, "name", lang)}</h3>
        {person.role_en && <p className="text-sm text-muted">{pick(person, "role", lang)}</p>}
      </div>
      {person.phone && (
        <a href={telLink(person.phone)} className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          <Icon name="phone" className="h-4 w-4" />
          {person.phone}
        </a>
      )}
    </Card>
  );
}

export default async function FacultyPage({ params }) {
  const { lang } = await params;
  const t = getDictionary(lang).faculty;
  const staff = await getStaff();
  const groups = staffCategories
    .map((c) => ({ ...c, people: staff.filter((s) => (s.category || "teaching") === c.value) }))
    .filter((g) => g.people.length > 0);

  return (
    <>
      <PageHeader lang={lang} title={t.title} />
      <Section size="lg">
        <SectionHeading title={t.title} subtitle={t.intro} />

        {groups.length === 0 && <p className="mt-10 text-center text-subtle">{t.empty}</p>}

        {groups.length > 1 && (
          <nav className="mt-8 flex flex-wrap gap-2">
            {groups.map((g) => (
              <a key={g.value} href={`#${g.value}`} className="rounded-full bg-surface px-4 py-2 text-sm font-medium text-primary ring-1 ring-line transition hover:bg-primary hover:text-white">
                {t.groups[g.value]} <span className="opacity-70">({g.people.length})</span>
              </a>
            ))}
          </nav>
        )}

        {groups.map((g) => (
          <section key={g.value} id={g.value} className="mt-12 scroll-mt-24">
            <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
              <h2 className="text-xl font-bold text-heading sm:text-2xl">{t.groups[g.value]}</h2>
              <span className="text-sm text-subtle">{g.people.length} {t.members}</span>
            </div>
            {g.value === "support" ? (
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {g.people.map((p) => <SupportRow key={p.id} person={p} lang={lang} />)}
              </ul>
            ) : (
              <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {g.people.map((p) => <StaffCard key={p.id} person={p} lang={lang} t={t} />)}
              </ul>
            )}
          </section>
        ))}
      </Section>
    </>
  );
}
