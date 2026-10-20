import Link from "next/link";
import Reveal from "./Reveal";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Marquee from "@/components/ui/Marquee";
import { pick } from "@/lib/i18n";

// Seconds per photo, so the scroll speed stays the same however many photos there are.
const SECONDS_PER_PHOTO = 5;

function PhotoCard({ photo, lang, href }) {
  const caption = pick(photo, "caption", lang);
  return (
    <Link href={href} className="group/photo relative mr-3 block h-44 w-64 shrink-0 overflow-hidden rounded-2xl shadow-md sm:mr-4 sm:h-56 sm:w-80 lg:h-64 lg:w-96">
      <img src={photo.image_url} alt={caption} className="h-full w-full object-cover transition duration-700 group-hover/photo:scale-110" />
      {caption && (
        <span className="absolute inset-x-0 bottom-0 bg-black/60 p-3 text-sm font-medium text-white sm:p-4">
          {caption}
        </span>
      )}
    </Link>
  );
}

// Single row of photos scrolling right-to-left in an endless loop. Pauses on hover.
export default function GalleryPreview({ photos, lang, dict }) {
  if (photos.length === 0) return null;
  const href = `/${lang}/gallery`;

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <Container>
        <Reveal>
          <SectionHeading title={dict.home.galleryPreview} action={{ href, label: dict.home.viewAll }} />
        </Reveal>
      </Container>

      <div className="relative mt-6 sm:mt-8">
        <Marquee duration={photos.length * SECONDS_PER_PHOTO}>
          {photos.map((p) => (
            <PhotoCard key={p.id} photo={p} lang={lang} href={href} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
