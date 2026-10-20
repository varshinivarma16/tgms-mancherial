import { Noto_Sans, Noto_Sans_Telugu } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import NewsTicker from "@/components/NewsTicker";
import { getDictionary, hasLocale, pick } from "@/lib/i18n";
import { getSettings, getTickerItems } from "@/lib/data";

const notoSans = Noto_Sans({ variable: "--font-noto-sans", subsets: ["latin"] });
const notoTelugu = Noto_Sans_Telugu({ variable: "--font-noto-telugu", subsets: ["telugu"] });

// Content comes from the admin panel, so always render fresh.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const settings = await getSettings();
  const name = pick(settings, "school_name", lang);
  return {
    title: { default: name, template: `%s | ${name}` },
    description: pick(settings, "tagline", lang),
    alternates: { languages: { en: "/en", te: "/te" } },
  };
}

export default async function LangLayout({ children, params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = getDictionary(lang);
  const [settings, tickerItems] = await Promise.all([getSettings(), getTickerItems()]);

  return (
    <html lang={lang} className={`${notoSans.variable} ${notoTelugu.variable} antialiased`}>
      <body className="flex min-h-screen flex-col font-sans">
        <NewsTicker items={tickerItems} lang={lang} labels={dict.ticker} />
        <Header
          lang={lang}
          nav={dict.nav}
          switchLabel={dict.switchLang}
          schoolName={pick(settings, "school_name", lang)}
          logoUrl={settings.logo_url}
        />
        <main className="flex-1">{children}</main>
        <Footer lang={lang} dict={dict} settings={settings} />
        <WhatsAppButton number={settings.whatsapp} label={dict.whatsapp} />
      </body>
    </html>
  );
}
