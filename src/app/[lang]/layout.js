import { Noto_Sans, Noto_Sans_Telugu } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import NewsTicker from "@/components/NewsTicker";
import GovtBanner from "@/components/home/GovtBanner";
import { getDictionary, hasLocale, pick } from "@/lib/i18n";
import { getSettings, getTickerItems } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

const notoSans = Noto_Sans({ variable: "--font-noto-sans", subsets: ["latin"] });
const notoTelugu = Noto_Sans_Telugu({ variable: "--font-noto-telugu", subsets: ["telugu"] });

// Content comes from the admin panel, so always render fresh.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const settings = await getSettings();
  const name = pick(settings, "school_name", lang);
  const description = pick(settings, "seo_description", lang) || pick(settings, "tagline", lang);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: name, template: `%s | ${name}` },
    description,
    keywords: ["Telangana Model School Mancherial", "TGMS Mancherial", "PM SHRI Model School", "Model School Mancherial", "Junior College Mancherial", "English medium school Mancherial"],
    alternates: { languages: { en: "/en", te: "/te" } },
    openGraph: {
      type: "website",
      siteName: name,
      title: name,
      description,
      locale: lang === "te" ? "te_IN" : "en_IN",
      images: ["/images/school-entrance.jpg"],
    },
    twitter: { card: "summary_large_image", title: name, description, images: ["/images/school-entrance.jpg"] },
    verification: settings.google_verification ? { google: settings.google_verification } : undefined,
  };
}

export default async function LangLayout({ children, params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = getDictionary(lang);
  const [settings, tickerItems] = await Promise.all([getSettings(), getTickerItems()]);

  // Tells Google this is a school, with its address and contacts.
  const schoolInfo = {
    "@context": "https://schema.org",
    "@type": "School",
    name: pick(settings, "school_name", lang),
    url: `${SITE_URL}/${lang}`,
    logo: settings.logo_url || `${SITE_URL}/images/telangana-emblem.png`,
    image: `${SITE_URL}/images/school-entrance.jpg`,
    telephone: settings.phone || undefined,
    email: settings.email || undefined,
    foundingDate: settings.established_year || undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: pick(settings, "address", lang),
      addressLocality: pick(settings, "mandal", lang),
      addressRegion: "Telangana",
      addressCountry: "IN",
    },
  };

  return (
    <html lang={lang} className={`${notoSans.variable} ${notoTelugu.variable} antialiased`}>
      <body className="flex min-h-screen flex-col font-sans">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolInfo).replace(/</g, "\\u003c") }} />
        <GovtBanner settings={settings} lang={lang} />
        <Header
          lang={lang}
          nav={dict.nav}
          switchLabel={dict.switchLang}
          schoolName={pick(settings, "school_name", lang)}
          logoUrl={settings.logo_url}
        />
        <NewsTicker items={tickerItems} lang={lang} labels={dict.ticker} />
        <main className="flex-1">{children}</main>
        <Footer lang={lang} dict={dict} settings={settings} />
        <WhatsAppButton number={settings.whatsapp} label={dict.whatsapp} />
      </body>
    </html>
  );
}
