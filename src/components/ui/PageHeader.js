import Link from "next/link";
import Container from "./Container";
import { getDictionary } from "@/lib/i18n";

// "Home / …" breadcrumb bar at the top of every inner page. The page title stays as a hidden <h1> for screen readers and search.
// `crumbs` adds in-between links, e.g. [{ href: "/en/academics", label: "Academics" }].
export default function PageHeader({ title, lang, crumbs = [] }) {
  const trail = [{ href: `/${lang}`, label: getDictionary(lang).nav.home }, ...crumbs];
  return (
    <div className="border-b border-line bg-surface">
      <Container>
        <h1 className="sr-only">{title}</h1>
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 py-3 text-sm text-muted">
            {trail.map((c) => (
              <li key={c.href} className="flex items-center gap-2">
                <Link href={c.href} className="hover:text-primary hover:underline">{c.label}</Link>
                <span aria-hidden="true">/</span>
              </li>
            ))}
            <li aria-current="page" className="font-semibold text-primary">{title}</li>
          </ol>
        </nav>
      </Container>
    </div>
  );
}
