import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import { getDictionary, pick } from "@/lib/i18n";
import { getFacilities } from "@/lib/data";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return { title: getDictionary(lang).facilities.title };
}

export default async function FacilitiesPage({ params }) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const t = dict.facilities;
  const items = await getFacilities();

  return (
    <>
      <PageHeader lang={lang} title={t.title} crumbs={[{ href: `/${lang}/about`, label: dict.nav.ourSchool }]} />
      <Section size="lg">
        <SectionHeading title={t.title} subtitle={t.subtitle} />
        {items.length === 0 && <p className="mt-8 text-subtle">{t.empty}</p>}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((r) => {
            const title = pick(r, "title", lang);
            const description = pick(r, "description", lang);
            return (
              <Card key={r.id} padding="none" className="flex flex-col overflow-hidden">
                {r.image_url && <img src={r.image_url} alt={title} loading="lazy" className="aspect-video w-full object-cover" />}
                <div className="flex-1 border-t-4 border-accent p-5">
                  <h3 className="text-lg font-semibold text-heading">{title}</h3>
                  {description && <p className="mt-2 whitespace-pre-line text-sm text-body">{description}</p>}
                </div>
              </Card>
            );
          })}
        </div>
      </Section>
    </>
  );
}
