import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import { getDictionary, pick } from "@/lib/i18n";
import { getGallery } from "@/lib/data";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return { title: getDictionary(lang).gallery.title };
}

export default async function GalleryPage({ params }) {
  const { lang } = await params;
  const t = getDictionary(lang).gallery;
  const photos = await getGallery();

  return (
    <>
      <PageHeader lang={lang} title={t.title} />
      <Section>
        {photos.length === 0 && <p className="text-center text-subtle">{t.empty}</p>}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {photos.map((p) => {
            const caption = pick(p, "caption", lang);
            return (
              <figure key={p.id}>
                <a href={p.image_url} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-xl">
                  <img
                    src={p.image_url}
                    alt={caption}
                    loading="lazy"
                    className="aspect-square w-full object-cover transition duration-500 hover:scale-105"
                  />
                </a>
                {caption && <figcaption className="mt-1 text-center text-xs text-muted sm:text-sm">{caption}</figcaption>}
              </figure>
            );
          })}
        </div>
      </Section>
    </>
  );
}
