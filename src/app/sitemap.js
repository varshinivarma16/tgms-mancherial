import { SITE_URL, PUBLIC_PATHS } from "@/lib/site";

export default function sitemap() {
  return PUBLIC_PATHS.flatMap((path) =>
    ["en", "te"].map((lang) => ({
      url: `${SITE_URL}/${lang}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" || path === "/notices" ? "daily" : "weekly",
      priority: path === "" ? 1 : 0.7,
      alternates: { languages: { en: `${SITE_URL}/en${path}`, te: `${SITE_URL}/te${path}` } },
    }))
  );
}
