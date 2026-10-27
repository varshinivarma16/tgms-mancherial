import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import SidebarFilter, { FilterItem } from "@/components/ui/SidebarFilter";
import { getDictionary, pick } from "@/lib/i18n";
import { getLabs } from "@/lib/data";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return { title: getDictionary(lang).labs.title };
}

export default async function LabsPage({ params }) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const t = dict.labs;
  const labs = await getLabs();

  return (
    <>
      <PageHeader lang={lang} title={t.title} crumbs={[{ href: `/${lang}/academics`, label: dict.nav.academics }]} />
      <Section size="full">
        <SectionHeading title={t.title} subtitle={t.subtitle} />

        <SidebarFilter
          allLabel={t.all}
          browseLabel={t.browse}
          options={labs.map((lab) => ({ value: String(lab.id), label: pick(lab, "title", lang) }))}
        >
          {labs.map((lab, i) => {
            const title = pick(lab, "title", lang);
            const description = pick(lab, "description", lang);
            return (
              <FilterItem key={lab.id} value={String(lab.id)}>
                <Card as="section" padding="none" className="grid overflow-hidden md:grid-cols-2">
                  <div className={`flex aspect-video items-center justify-center bg-accent-light md:aspect-auto md:min-h-64 ${i % 2 ? "md:order-2" : ""}`}>
                    {lab.image_url ? (
                      <img src={lab.image_url} alt={title} loading="lazy" className="h-full w-full object-cover" />
                    ) : (
                      <Icon name="graduation" className="h-16 w-16 text-primary/40" />
                    )}
                  </div>
                  <div className="flex flex-col justify-center border-t-4 border-accent p-6 md:border-t-0 md:p-8">
                    <h2 className="text-xl font-bold text-heading sm:text-2xl">{title}</h2>
                    {description && <p className="mt-3 whitespace-pre-line text-body">{description}</p>}
                  </div>
                </Card>
              </FilterItem>
            );
          })}
        </SidebarFilter>
      </Section>
    </>
  );
}
