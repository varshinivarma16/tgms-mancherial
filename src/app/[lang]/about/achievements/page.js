import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import { getDictionary, pick } from "@/lib/i18n";
import { getAchievements } from "@/lib/data";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return { title: getDictionary(lang).achievements.title };
}

const CATEGORIES = ["academic", "sports", "cultural", "other"];

const formatDate = (d, lang) =>
  new Date(d).toLocaleDateString(lang === "te" ? "te-IN" : "en-IN", { day: "numeric", month: "long", year: "numeric" });

export default async function AchievementsPage({ params }) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const t = dict.achievements;
  const items = await getAchievements();

  // One section per category, in a fixed order, skipping empty ones.
  const groups = CATEGORIES.map((c) => ({ key: c, rows: items.filter((r) => (r.category || "other") === c) })).filter((g) => g.rows.length);

  return (
    <>
      <PageHeader lang={lang} title={t.title} crumbs={[{ href: `/${lang}/about`, label: dict.nav.ourSchool }]} />
      <Section size="lg">
        <SectionHeading title={t.title} subtitle={t.subtitle} />
        {items.length === 0 && <p className="mt-8 text-center text-subtle">{t.empty}</p>}

        {groups.map((g) => (
          <div key={g.key} className="mt-12">
            <h2 className="text-xl font-bold text-heading">{t.categories[g.key]}</h2>
            <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {g.rows.map((r) => {
                const title = pick(r, "title", lang);
                const description = pick(r, "description", lang);
                return (
                  <Card key={r.id} padding="none" className="flex flex-col overflow-hidden">
                    {r.image_url && (
                      <img src={r.image_url} alt={title} loading="lazy" className="aspect-video w-full object-cover" />
                    )}
                    <div className="flex flex-1 flex-col p-5">
                      {r.achievement_date && <p className="text-xs font-semibold uppercase tracking-wide text-primary">{formatDate(r.achievement_date, lang)}</p>}
                      <h3 className="mt-1 font-semibold text-heading">{title}</h3>
                      {description && <p className="mt-2 whitespace-pre-line text-sm text-body">{description}</p>}
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
