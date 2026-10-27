import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Reveal from "./Reveal";
import { cn } from "@/lib/cn";

// Seat counts come from Admin → Settings → "Admission seats".
const GROUPS = [
  { key: "school", items: [6, 7, 8, 9, 10].map((n) => [n, `seats_class${n}`]) },
  { key: "college", items: [["MPC", "seats_mpc"], ["BiPC", "seats_bipc"], ["CEC", "seats_cec"], ["ACE", "seats_ace"]] },
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
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {g.items.map(([name, field], i) => (
                <Reveal key={field} delay={i * 80}>
                  {/* Class 6 is the main entry class, so it stands out in orange like the total-students card. */}
                  <div className={cn("flex h-full items-center justify-between gap-3 rounded-xl px-5 py-3", field === "seats_class6" ? "bg-orange-500 text-white shadow-lg ring-4 ring-orange-300/60" : "border-l-4 border-amber-500 bg-amber-50 text-amber-900 shadow-sm ring-1 ring-amber-200")}>
                    <span className={cn("text-lg font-bold sm:text-xl", field !== "seats_class6" && "text-amber-800")}>{typeof name === "number" ? `${t.class} ${name}` : name}</span>
                    <span className="text-right">
                      <span className="block text-2xl font-bold tabular-nums sm:text-3xl">{settings[field]}</span>
                      <span className={cn("block text-xs", field === "seats_class6" ? "text-white/90" : "text-amber-700")}>{t.seats}</span>
                    </span>
                  </div>
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
