import { getDictionary } from "@/lib/i18n";
import { getSettings, getNotices, getUpcomingEvents, getGallery, getHeroSlides } from "@/lib/data";
import HomeHero from "@/components/home/HomeHero";
import StatsBar from "@/components/home/StatsBar";
import PrincipalMessage from "@/components/home/PrincipalMessage";
import NoticesEvents from "@/components/home/NoticesEvents";
import GalleryPreview from "@/components/home/GalleryPreview";
import FindUs from "@/components/home/FindUs";

export default async function HomePage({ params }) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const [settings, slides, notices, events, photos] = await Promise.all([
    getSettings(),
    getHeroSlides(),
    getNotices(5),
    getUpcomingEvents(5),
    getGallery(7),
  ]);

  return (
    <>
      <HomeHero slides={slides} settings={settings} lang={lang} dict={dict} />
      <StatsBar settings={settings} dict={dict} />
      <PrincipalMessage settings={settings} lang={lang} dict={dict} />
      <NoticesEvents notices={notices} events={events} lang={lang} dict={dict} />
      <GalleryPreview photos={photos} lang={lang} dict={dict} />
      <FindUs settings={settings} lang={lang} dict={dict} />
    </>
  );
}
