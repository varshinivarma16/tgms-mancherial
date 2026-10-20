import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { IconTile } from "@/components/ui/Icon";
import MapEmbed from "@/components/content/MapEmbed";
import { getDictionary, pick } from "@/lib/i18n";
import { getSettings } from "@/lib/data";
import { whatsappLink, telLink } from "@/lib/whatsapp";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return { title: getDictionary(lang).contact.title };
}

function ContactItem({ icon, label, value, href }) {
  const external = href?.startsWith("http");
  return (
    <Card tone="surface" padding="sm" className="flex items-start gap-4">
      <IconTile name={icon} size="sm" />
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">{label}</p>
        <p className="mt-0.5 break-words text-heading">
          {href ? (
            <a href={href} className="hover:underline" {...(external && { target: "_blank", rel: "noopener noreferrer" })}>
              {value}
            </a>
          ) : (
            value
          )}
        </p>
      </div>
    </Card>
  );
}

export default async function ContactPage({ params }) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const t = dict.contact;
  const settings = await getSettings();
  const website = settings.website?.replace(/^https?:\/\//, "");

  const items = [
    { icon: "pin", label: t.address, value: pick(settings, "address", lang) },
    settings.phone && { icon: "phone", label: t.phone, value: settings.phone, href: telLink(settings.phone) },
    settings.whatsapp && { icon: "whatsapp", label: t.whatsapp, value: settings.phone, href: whatsappLink(settings.whatsapp) },
    settings.email && { icon: "mail", label: t.email, value: settings.email, href: `mailto:${settings.email}` },
    website && { icon: "globe", label: t.website, value: website, href: `https://${website}` },
    { icon: "clock", label: t.hours, value: t.hoursText },
  ].filter(Boolean);

  return (
    <>
      <PageHeader lang={lang} title={t.title} />
      <Section size="lg" containerClassName="grid gap-8 lg:grid-cols-2">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {items.map((item) => (
            <ContactItem key={item.label} {...item} />
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <MapEmbed src={settings.map_embed_url} title={dict.findUs.title} className="h-80 flex-1 rounded-2xl sm:h-96" />
          {settings.map_link && (
            <Button href={settings.map_link} icon="map" block>
              {dict.findUs.openMaps}
            </Button>
          )}
        </div>
      </Section>
    </>
  );
}
