import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { getDictionary, pick } from "@/lib/i18n";
import { getFaqs } from "@/lib/data";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return { title: getDictionary(lang).faq.title };
}

export default async function FaqPage({ params }) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const t = dict.faq;
  const items = await getFaqs();

  return (
    <>
      <PageHeader lang={lang} title={t.title} crumbs={[{ href: `/${lang}/about`, label: dict.nav.ourSchool }]} />
      <Section size="md">
        <SectionHeading title={t.title} subtitle={t.subtitle} />
        {items.length === 0 && <p className="mt-8 text-subtle">{t.empty}</p>}

        {/* Native <details> so it opens and closes without any JavaScript. */}
        <div className="mt-8 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white empty:hidden">
          {items.map((r) => (
            <details key={r.id} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-heading hover:bg-surface [&::-webkit-details-marker]:hidden">
                {pick(r, "question", lang)}
                <span className="shrink-0 text-xl text-primary transition group-open:rotate-45">+</span>
              </summary>
              <p className="whitespace-pre-line px-5 pb-5 text-body">{pick(r, "answer", lang)}</p>
            </details>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-muted">{t.more}</p>
          <Button href={`/${lang}/contact`} className="mt-3">{t.contact}</Button>
        </div>
      </Section>
    </>
  );
}
