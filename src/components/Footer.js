import Link from "next/link";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import { pick } from "@/lib/i18n";
import { telLink } from "@/lib/whatsapp";
import PageViews from "./PageViews";

function FooterHeading({ children }) {
  return <h2 className="text-sm font-semibold uppercase tracking-wider text-white">{children}</h2>;
}

function DetailLine({ icon, href, external, children }) {
  return (
    <li className="flex items-start gap-2">
      <Icon name={icon} className="mt-0.5 h-4 w-4 shrink-0 text-on-dark" />
      <a href={href} className="break-all hover:text-white hover:underline" {...(external && { target: "_blank", rel: "noopener noreferrer" })}>
        {children}
      </a>
    </li>
  );
}

export default function Footer({ lang, dict, settings }) {
  const quick = ["about", "admissions", "notices", "gallery", "contact"];
  const website = settings.website?.replace(/^https?:\/\//, "");
  const schoolName = pick(settings, "school_name", lang);

  return (
    <footer className="bg-primary text-on-dark">
      <Container className="grid gap-10 py-10 sm:py-12 md:grid-cols-[2fr_1fr]">
        <div>
          <FooterHeading>{dict.footer.details}</FooterHeading>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start">
            {settings.logo_url && <img src={settings.logo_url} alt="" className="h-16 w-16 shrink-0 rounded-full bg-white p-0.5" />}
            <div className="text-sm">
              <p className="text-base font-bold leading-snug text-white sm:text-lg">{schoolName}</p>
              <p className="mt-1">{pick(settings, "address", lang)}</p>
              <ul className="mt-3 space-y-2">
                {settings.phone && <DetailLine icon="phone" href={telLink(settings.phone)}>{settings.phone}</DetailLine>}
                {settings.email && <DetailLine icon="mail" href={`mailto:${settings.email}`}>{settings.email}</DetailLine>}
                {website && <DetailLine icon="globe" href={`https://${website}`} external>{website}</DetailLine>}
                {settings.map_link && <DetailLine icon="pin" href={settings.map_link} external>{dict.findUs.openMaps}</DetailLine>}
              </ul>
              <div className="mt-4 text-on-dark-muted">
                <PageViews labels={dict.footer} />
              </div>
            </div>
          </div>
        </div>

        <div>
          <FooterHeading>{dict.footer.quickLinks}</FooterHeading>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm md:grid-cols-1">
            {quick.map((key) => (
              <li key={key}>
                <Link href={`/${lang}/${key}`} className="hover:text-white hover:underline">
                  {dict.nav[key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <p className="border-t border-white/20 px-4 py-4 text-center text-xs">
        © {new Date().getFullYear()} {schoolName}. {dict.footer.rights}
      </p>
    </footer>
  );
}
