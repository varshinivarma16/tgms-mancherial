import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import AdmissionSeats from "@/components/home/AdmissionSeats";
import { getDictionary, pick } from "@/lib/i18n";
import { getSettings } from "@/lib/data";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return { title: getDictionary(lang).about.title };
}

export default async function AboutPage({ params }) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const settings = await getSettings();

  return (
    <>
      <PageHeader lang={lang} title={dict.about.title} />
      <Section size="md">
        <p className="whitespace-pre-line text-base leading-relaxed text-body sm:text-lg">{pick(settings, "about", lang)}</p>
        <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 md:grid-cols-2">
          {[
            [dict.about.vision, pick(settings, "vision", lang)],
            [dict.about.mission, pick(settings, "mission", lang)],
          ].map(([title, text]) => (
            <Card key={title} tone="surface" className="border-l-4 border-accent">
              <h2 className="text-lg font-bold text-primary sm:text-xl">{title}</h2>
              <p className="mt-2 text-body">{text}</p>
            </Card>
          ))}
        </div>
      </Section>
      <AdmissionSeats settings={settings} lang={lang} dict={dict} />
    </>
  );
}
