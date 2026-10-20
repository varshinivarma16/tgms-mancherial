import Reveal from "./Reveal";
import Container from "@/components/ui/Container";

// Floating white card of key numbers that overlaps the bottom of the slideshow.
export default function StatsBar({ settings, dict }) {
  const stats = [
    [settings.stat_students, dict.stats.students],
    [settings.stat_teachers, dict.stats.teachers],
    [settings.stat_years, dict.stats.years],
    [settings.stat_results, dict.stats.results],
  ];

  return (
    <Container size="lg" className="relative z-10 -mt-10 sm:-mt-12">
      <div className="grid grid-cols-2 divide-line overflow-hidden rounded-2xl bg-white shadow-xl md:grid-cols-4 md:divide-x">
        {stats.map(([value, label], i) => (
          <Reveal key={label} delay={i * 100} className="p-4 text-center sm:p-6">
            <p className="text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">{value}</p>
            <p className="mt-1 text-xs font-medium text-subtle sm:text-sm">{label}</p>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
