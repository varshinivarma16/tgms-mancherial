import HeroSlider from "./HeroSlider";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { pick, formatDate } from "@/lib/i18n";
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

// Bright "Today's Notice" card on the right of the hero. Set in Admin → Settings; shows only on its date (India time).
function TodayNotice({ settings, lang, label }) {
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
  // TEMP demo text so the card shows in the UI; remove once real notices are entered in admin.
  const demo = {
    daily_notice_date: today,
    daily_notice_en: "School will close at 1:00 PM today for the staff meeting. Classes 9 and 10: bring your science record books tomorrow.",
    daily_notice_te: "సిబ్బంది సమావేశం కారణంగా ఈ రోజు పాఠశాల మధ్యాహ్నం 1:00 గంటలకు మూసివేయబడుతుంది. 9 మరియు 10 తరగతులు: రేపు సైన్స్ రికార్డు పుస్తకాలు తీసుకురండి.",
  };
  if (!settings.daily_notice_en?.trim()) settings = { ...settings, ...demo };
  const text = pick(settings, "daily_notice", lang);
  if (!text?.trim() || settings.daily_notice_date !== today) return null;
  return (
    <div className="rounded-2xl bg-ticker p-4 text-heading shadow-2xl ring-4 ring-white/30 sm:p-5">
      <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-danger">
        <Icon name="notice" className="h-5 w-5" /> {label} · {formatDate(today, lang)}
      </p>
      <p className="mt-2 line-clamp-6 whitespace-pre-line text-base font-medium sm:text-lg">{text}</p>
    </div>
  );
}

export default function HomeHero({ slides, settings, lang, dict }) {
  return (
    <HeroSlider
      slides={buildSlides(slides, settings, lang)}
      aside={TodayNotice({ settings, lang, label: dict.dailyNotice })}
    >
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
