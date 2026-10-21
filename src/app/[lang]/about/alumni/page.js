import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import { getDictionary, pick } from "@/lib/i18n";
import { getAlumni } from "@/lib/data";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return { title: getDictionary(lang).alumni.title };
}

export default async function AlumniPage({ params }) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const t = dict.alumni;
  const alumni = await getAlumni();

  return (
    <>
      <PageHeader lang={lang} title={t.title} crumbs={[{ href: `/${lang}/about`, label: dict.nav.ourSchool }]} />
      <Section size="lg">
        <SectionHeading title={t.title} subtitle={t.subtitle} />
        {alumni.length === 0 && <p className="mt-8 text-center text-subtle">{t.empty}</p>}

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {alumni.map((a) => {
            const name = pick(a, "name", lang);
            const role = pick(a, "current_role", lang);
            const achievement = pick(a, "achievement", lang);
            return (
              <Card key={a.id} className="flex flex-col items-center text-center">
                <div className="h-28 w-28 overflow-hidden rounded-full bg-surface">
                  {a.photo_url && <img src={a.photo_url} alt={name} loading="lazy" className="h-full w-full object-cover" />}
                </div>
                <h3 className="mt-4 text-lg font-bold text-heading">{name}</h3>
                {a.batch && <p className="text-xs font-semibold uppercase tracking-wide text-primary">{t.batch} {a.batch}</p>}
                {role && <p className="mt-1 text-sm font-medium text-body">{role}</p>}
                {achievement && <p className="mt-3 whitespace-pre-line text-sm text-subtle">{achievement}</p>}
              </Card>
            );
          })}
        </div>
      </Section>
    </>
  );
}
