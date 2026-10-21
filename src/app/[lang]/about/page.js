import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import { getDictionary, pick } from "@/lib/i18n";
import { getSettings } from "@/lib/data";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return { title: getDictionary(lang).about.title };
}

export default async function AboutPage({ params }) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const t = dict.about;
  const settings = await getSettings();

  const history = pick(settings, "history", lang);
  const features = (pick(settings, "features", lang) || "").split("\n").map((f) => f.trim()).filter(Boolean);
  const affiliation = pick(settings, "affiliation", lang);
  // Only rows the admin has filled in are shown.
  const glance = [
    [t.schoolType, settings.school_type],
    [t.udise, settings.udise_code],
    [t.established, settings.established_year],
    [t.village, pick(settings, "village", lang)],
    [t.mandal, pick(settings, "mandal", lang)],
    [t.district, pick(settings, "district", lang)],
    [t.principal, pick(settings, "principal_name", lang)],
    [t.totalStaff, settings.total_staff],
    [t.teachingStaff, settings.teaching_staff],
    [t.nonTeachingStaff, settings.non_teaching_staff],
  ].filter(([, value]) => value);

  return (
    <>
      <PageHeader lang={lang} title={t.title} />
      <Section size="md">
        <p className="whitespace-pre-line text-base leading-relaxed text-body sm:text-lg">{pick(settings, "about", lang)}</p>
        <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 md:grid-cols-2">
          {[
            [t.vision, pick(settings, "vision", lang)],
            [t.mission, pick(settings, "mission", lang)],
          ].map(([title, text]) => (
            <Card key={title} tone="surface" className="border-l-4 border-accent">
              <h2 className="text-lg font-bold text-primary sm:text-xl">{title}</h2>
              <p className="mt-2 text-body">{text}</p>
            </Card>
          ))}
        </div>

        {glance.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-bold text-heading sm:text-2xl">{t.glance}</h2>
            <dl className="mt-4 grid gap-x-6 gap-y-3 rounded-2xl border border-line p-5 sm:grid-cols-2">
              {glance.map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 border-b border-line pb-2 last:border-0 sm:[&:nth-last-child(2)]:border-0">
                  <dt className="text-subtle">{label}</dt>
                  <dd className="text-right font-semibold text-heading">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {history && (
          <div className="mt-10">
            <h2 className="text-xl font-bold text-heading sm:text-2xl">{t.history}</h2>
            <p className="mt-3 whitespace-pre-line leading-relaxed text-body">{history}</p>
          </div>
        )}

        {features.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-bold text-heading sm:text-2xl">{t.features}</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {features.map((f) => (
                <li key={f} className="flex gap-2 text-body">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}

        {affiliation && (
          <Card tone="surface" className="mt-10 border-l-4 border-primary">
            <h2 className="text-lg font-bold text-primary sm:text-xl">{t.affiliation}</h2>
            <p className="mt-2 whitespace-pre-line text-body">{affiliation}</p>
          </Card>
        )}
      </Section>
    </>
  );
}
