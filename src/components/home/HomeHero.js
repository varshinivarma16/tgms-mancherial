import HeroSlider from "./HeroSlider";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { pick } from "@/lib/i18n";
import { whatsappLink } from "@/lib/whatsapp";

// Translates slides; a slide without its own heading shows the school name and tagline.
function buildSlides(slides, settings, lang) {
  const schoolName = pick(settings, "school_name", lang);
  const tagline = pick(settings, "tagline", lang);
  return slides.map((s) => ({
    id: s.id,
    image: s.image_url,
    title: pick(s, "title", lang) || schoolName,
    subtitle: pick(s, "subtitle", lang) || (pick(s, "title", lang) ? "" : tagline),
  }));
}

export default function HomeHero({ slides, settings, lang, dict }) {
  return (
    <HeroSlider slides={buildSlides(slides, settings, lang)}>
      {settings.admissions_open && (
        <Badge pulse className="mb-4 rounded-full px-4 py-1 text-sm sm:mb-5">
          {dict.home.admissionsOpen}
        </Badge>
      )}
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Button variant="whatsapp" icon="whatsapp" href={whatsappLink(settings.whatsapp, "Hello, I would like to know about admissions.")}>
          {dict.home.applyNow}
        </Button>
        <Button variant="outline-light" href={`/${lang}/about`}>
          {dict.home.learnMore}
        </Button>
      </div>
    </HeroSlider>
  );
}
