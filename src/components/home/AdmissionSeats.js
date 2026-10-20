import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Reveal from "./Reveal";

// Seat counts come from Admin → Settings → "Admission seats".
const GROUPS = [
  { key: "college", items: [["MPC", "seats_mpc"], ["BiPC", "seats_bipc"], ["CEC", "seats_cec"], ["ACE", "seats_ace"]] },
  { key: "school", items: [6, 7, 8, 9, 10].map((n) => [n, `seats_class${n}`]) },
];

export default function AdmissionSeats({ settings, lang, dict, showApply = true }) {
  const t = dict.seats;
  return (
    <Section tone="surface" size="lg">
      <SectionHeading title={t.title} subtitle={t.subtitle} align="center" />
      <div className="mt-10 grid gap-8">
        {GROUPS.map((g) => (
          <div key={g.key}>
            <h3 className="text-lg font-bold text-heading">{t[g.key]}</h3>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {g.items.map(([name, field], i) => (
                <Reveal key={field} delay={i * 80}>
                  <Card padding="md" className="h-full border-t-4 border-accent text-center">
                    <p className="font-semibold text-heading">{typeof name === "number" ? `${t.class} ${name}` : name}</p>
                    <p className="mt-2 text-4xl font-bold tabular-nums text-primary">{settings[field]}</p>
                    <p className="mt-1 text-sm text-subtle">{t.seats}</p>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>
      {showApply && (
        <div className="mt-10 text-center">
          <Button href={`/${lang}/admissions`}>{t.apply}</Button>
        </div>
      )}
    </Section>
  );
}
