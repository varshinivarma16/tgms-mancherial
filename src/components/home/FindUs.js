import Reveal from "./Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { IconTile } from "@/components/ui/Icon";
import MapEmbed from "@/components/content/MapEmbed";
import { pick } from "@/lib/i18n";
import { telLink } from "@/lib/whatsapp";

export default function FindUs({ settings, lang, dict }) {
  const t = dict.findUs;
  if (!settings.map_embed_url && !settings.map_link) return null;

  return (
    <Section tone="surface">
      <Reveal>
        <SectionHeading title={t.title} subtitle={t.subtitle} align="center" />
      </Reveal>

      <Reveal delay={150} className="mt-8 grid overflow-hidden rounded-3xl bg-white shadow-xl sm:mt-10 lg:grid-cols-[2fr_3fr]">
        <div className="flex flex-col justify-center gap-6 p-6 sm:p-8 lg:p-10">
          <div className="flex items-start gap-4">
            <IconTile name="pin" />
            <div>
              <p className="text-base font-bold text-heading sm:text-lg">{pick(settings, "school_name", lang)}</p>
              <p className="mt-1 text-muted">{pick(settings, "address", lang)}</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {settings.map_link && (
              <Button href={settings.map_link} icon="map">
                {t.directions}
              </Button>
            )}
            {settings.phone && (
              <Button href={telLink(settings.phone)} variant="outline" icon="phone">
                {t.call}
              </Button>
            )}
          </div>
        </div>
        <MapEmbed src={settings.map_embed_url} title={t.title} className="h-72 sm:h-80 lg:h-full lg:min-h-[420px]" />
      </Reveal>
    </Section>
  );
}
