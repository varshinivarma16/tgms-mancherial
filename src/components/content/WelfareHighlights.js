import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";

const tones = [
  ["bg-amber-100 ring-amber-300", "bg-amber-500"],
  ["bg-orange-100 ring-orange-300", "bg-orange-500"],
  ["bg-pink-100 ring-pink-300", "bg-pink-500"],
];

// Bright cards for free meals, breakfast and the girls hostel (home page and Admissions).
export default function WelfareHighlights({ t, title = t.title, subtitle = t.subtitle }) {
  return (
    <>
      <SectionHeading title={title} subtitle={subtitle} align="center" />
      <ul className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-6">
        {t.items.map((item, i) => (
          <li key={item.title} className={`rounded-2xl p-5 text-center shadow-sm ring-1 transition hover:-translate-y-1 hover:shadow-lg sm:p-6 ${tones[i % tones.length][0]}`}>
            <span className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-md sm:h-16 sm:w-16 ${tones[i % tones.length][1]}`}>
              <Icon name={item.icon} className="h-7 w-7 sm:h-8 sm:w-8" />
            </span>
            <h3 className="mt-3 text-lg font-bold text-heading">{item.title}</h3>
            <p className="mt-1 text-sm text-body">{item.text}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
