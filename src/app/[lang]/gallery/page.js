import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import SidebarFilter, { FilterItem } from "@/components/ui/SidebarFilter";
import { getDictionary, pick } from "@/lib/i18n";
import { getGallery } from "@/lib/data";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return { title: getDictionary(lang).gallery.title };
}

// Photos are grouped into albums by their English album name (e.g. "Bathukamma 2026"); photos without one go to "School Life".
function groupByAlbum(photos, lang, fallback) {
  const albums = new Map();
  for (const p of photos) {
    const key = p.album_en?.trim() || "";
    if (!albums.has(key)) albums.set(key, { key, label: key ? pick(p, "album", lang) || key : fallback, photos: [] });
    albums.get(key).photos.push(p);
  }
  // Untitled photos go last.
  return [...albums.values()].sort((a, b) => (a.key === "") - (b.key === ""));
}

export default async function GalleryPage({ params }) {
  const { lang } = await params;
  const t = getDictionary(lang).gallery;
  const photos = await getGallery(500);
  const albums = groupByAlbum(photos, lang, t.other);

  return (
    <>
      <PageHeader lang={lang} title={t.title} />
      <Section size="full">
        {photos.length === 0 && <p className="text-center text-subtle">{t.empty}</p>}
        <SidebarFilter
          allLabel={t.all}
          browseLabel={t.browse}
          options={albums.map((a) => ({ value: a.key || "other", label: a.label, count: a.photos.length }))}
        >
          {albums.map((a) => (
            <FilterItem key={a.key || "other"} value={a.key || "other"}>
              <section>
                <SectionHeading title={a.label} />
                <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
                  {a.photos.map((p) => {
                    const caption = pick(p, "caption", lang);
                    return (
                      <figure key={p.id}>
                        <a href={p.image_url} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-xl">
                          <img
                            src={p.image_url}
                            alt={caption || a.label}
                            loading="lazy"
                            className="aspect-square w-full object-cover transition duration-500 hover:scale-105"
                          />
                        </a>
                        {caption && <figcaption className="mt-1 text-center text-xs text-muted sm:text-sm">{caption}</figcaption>}
                      </figure>
                    );
                  })}
                </div>
              </section>
            </FilterItem>
          ))}
        </SidebarFilter>
      </Section>
    </>
  );
}
