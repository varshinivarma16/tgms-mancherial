import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import AdmissionSeats from "@/components/home/AdmissionSeats";
import AdmissionInquiryForm from "@/components/content/AdmissionInquiryForm";
import WelfareHighlights from "@/components/content/WelfareHighlights";
import { getDictionary, pick } from "@/lib/i18n";
import { getSettings } from "@/lib/data";
import { whatsappLink, telLink } from "@/lib/whatsapp";

// Official Telangana Model Schools admission portal (run by CGG).
const PORTAL_URL = "https://telanganams.cgg.gov.in/";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return { title: getDictionary(lang).admissions.title };
}

export default async function AdmissionsPage({ params }) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const t = dict.admissions;
  const settings = await getSettings();

  return (
    <>
      <PageHeader lang={lang} title={t.title} />

      <AdmissionSeats settings={settings} lang={lang} dict={dict} showApply={false} />

      {/* Official portal call-out */}
      <Section spacing="sm">
        <div className="flex flex-col gap-6 rounded-3xl bg-primary p-6 text-white shadow-xl sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-xl font-bold sm:text-2xl">{t.portalTitle}</h2>
            <p className="mt-3 text-on-dark">{t.portalText}</p>
          </div>
          <Button href={PORTAL_URL} variant="outline-light" className="shrink-0">
            {t.portalButton} ↗
          </Button>
        </div>

        <p className="mt-8 max-w-4xl text-base text-body sm:text-lg">{t.intro}</p>
      </Section>

      {/* Free benefits */}
      <Section spacing="sm">
        <WelfareHighlights t={dict.welfare} title={dict.welfare.admissionsTitle} />
      </Section>

      {/* Process */}
      <Section tone="surface" spacing="sm">
        <SectionHeading title={t.process} />
        <ol className="mt-8 grid gap-5 md:grid-cols-3">
          {t.processList.map((s, i) => (
            <Card as="li" key={s.title} className="relative overflow-hidden">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                {t.step} {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-lg font-bold text-heading">{s.title}</h3>
              <p className="mt-2 text-muted">{s.text}</p>
              <span className="absolute inset-x-0 top-0 h-1 bg-primary" />
            </Card>
          ))}
        </ol>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div>
            <SectionHeading title={t.steps} as="h3" />
            <ol className="mt-6 space-y-3">
              {t.stepList.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">{i + 1}</span>
                  <span className="pt-1 text-body">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <SectionHeading title={t.documents} as="h3" />
            <ul className="mt-6 space-y-3">
              {t.documentList.map((d) => (
                <li key={d} className="flex items-start gap-3 text-body">
                  <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-primary" /> {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Inquiry form */}
      <Section spacing="sm" size="lg">
        <Card tone="raised" padding="lg" className="border-t-4 border-primary">
          <SectionHeading title={t.form.title} />
          <p role="note" className="animate-blink mt-4 rounded-lg border-2 border-danger bg-danger-light px-4 py-3 text-sm font-bold text-danger sm:text-base">
            ⚠ {t.form.intro}
          </p>
          <AdmissionInquiryForm t={t.form} whatsapp={settings.whatsapp} schoolName={pick(settings, "school_name", lang)} />
        </Card>

        <Card tone="accent" className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-bold text-heading">{t.contactOffice}</p>
            <p className="mt-1 text-sm text-muted">{t.questions}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {settings.phone && <Button href={telLink(settings.phone)} variant="outline" icon="phone">{settings.phone}</Button>}
            <Button variant="whatsapp" icon="whatsapp" href={whatsappLink(settings.whatsapp, "Hello, I have a question about admissions.")}>
              WhatsApp
            </Button>
          </div>
        </Card>
      </Section>
    </>
  );
}
