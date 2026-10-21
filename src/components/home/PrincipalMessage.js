import Reveal from "./Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import { IconTile } from "@/components/ui/Icon";
import { pick } from "@/lib/i18n";

function Credential({ icon, label, value }) {
  if (!value) return null;
  return (
    <Card tone="surface" padding="sm" className="flex items-start gap-3">
      <IconTile name={icon} size="sm" />
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-subtle">{label}</p>
        <p className="font-semibold text-heading">{value}</p>
      </div>
    </Card>
  );
}

export default function PrincipalMessage({ settings, lang, dict }) {
  const name = pick(settings, "principal_name", lang);

  return (
    <Section>
      <div className="grid items-center gap-10 md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr] lg:gap-12">
        <Reveal className="mx-auto text-center">
          <div className="relative">
            <div className="relative h-60 w-52 overflow-hidden rounded-3xl bg-surface shadow-lg sm:h-72 sm:w-60">
              {settings.principal_photo && <img src={settings.principal_photo} alt={name} className="h-full w-full object-cover" />}
            </div>
          </div>
          <p className="mt-6 text-lg font-bold text-primary">{name}</p>
          <p className="text-sm font-medium text-subtle">{dict.home.principal}</p>
        </Reveal>

        <Reveal delay={150}>
          <SectionHeading title={dict.home.principalMessage} />
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Credential icon="graduation" label={dict.home.qualification} value={pick(settings, "principal_qualification", lang)} />
            <Credential icon="award" label={dict.home.experience} value={pick(settings, "principal_experience", lang)} />
          </div>
          <blockquote className="mt-6 whitespace-pre-line border-l-4 border-accent pl-4 text-base leading-relaxed text-body sm:pl-5 sm:text-lg">
            {pick(settings, "principal_message", lang)}
          </blockquote>
          <p className="mt-6 font-semibold text-primary">— {name}</p>
        </Reveal>
      </div>
    </Section>
  );
}
