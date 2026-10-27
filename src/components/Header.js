"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

// Menu structure. Items with `children` open a dropdown.
const menu = [
  { key: "home" },
  { key: "ourSchool", children: [{ key: "about", path: "about" }, { key: "strength", path: "about/strength" }, { key: "achievements", path: "about/achievements" }, { key: "alumni", path: "about/alumni" }, { key: "faq", path: "about/faq" }] },
  { key: "academics", children: [{ key: "academicsOverview", path: "academics" }, { key: "calendar", path: "academics/calendar" }, { key: "timetable", path: "academics/timetable" }, { key: "labs", path: "academics/labs" }, { key: "activities", path: "academics/activities" }] },
  {
    key: "facilities",
    children: [
      { key: "allFacilities", path: "about/facilities" },
      ...[
        ["digitalClassrooms", "digital-classrooms"],
        ["computerRoom", "computer-room"],
        ["midDayMeals", "mid-day-meals"],
        ["freeBreakfast", "free-breakfast"],
        ["girlsHostel", "girls-hostel"],
      ].map(([key, id]) => ({ key, path: `about/facilities#${id}` })),
    ],
  },
  { key: "admissions" },
  { key: "faculty" },
  { key: "gallery" },
  { key: "notices" },
  { key: "results", path: "academics/results" },
  { key: "contact" },
];

const itemClass = "flex w-full items-center justify-between gap-1 rounded px-3 py-3 text-sm font-medium text-white transition hover:bg-white hover:text-primary lg:rounded-none xl:px-4";
const activeClass = "bg-primary-hover text-white";

function Dropdown({ item, nav, hrefFor, pathname, onNavigate }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const active = item.children.some((c) => pathname === hrefFor(c.path));

  // Close when clicking outside or pressing Escape.
  useEffect(() => {
    if (!open) return;
    const onClick = (e) => !ref.current?.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <li ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button onClick={() => setOpen(!open)} aria-expanded={open} className={cn(itemClass, active && activeClass)}>
        {nav[item.key]}
        <Icon name="chevronDown" className={cn("h-4 w-4 transition", open && "rotate-180")} />
      </button>
      <ul
        className={cn(
          "overflow-hidden lg:absolute lg:left-0 lg:top-full lg:z-50 lg:min-w-56 lg:rounded-b-xl lg:bg-white lg:py-2 lg:shadow-xl lg:ring-1 lg:ring-line",
          open ? "block" : "hidden"
        )}
      >
        {item.children.map((child) => {
          const href = hrefFor(child.path);
          return (
            <li key={child.key}>
              <Link
                href={href}
                onClick={() => {
                  setOpen(false);
                  onNavigate();
                }}
                className={cn(
                  "block py-2.5 pl-8 pr-4 text-sm font-medium text-white/90 transition hover:bg-white/10 lg:pl-4 lg:text-body lg:hover:bg-surface lg:hover:text-primary",
                  pathname === href && "text-white lg:bg-surface lg:text-primary"
                )}
              >
                {nav[child.key]}
              </Link>
            </li>
          );
        })}
      </ul>
    </li>
  );
}

export default function Header({ lang, nav, switchLabel, schoolName, logoUrl }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const otherLang = lang === "en" ? "te" : "en";
  const switchHref = pathname.replace(/^\/(en|te)(?=\/|$)/, `/${otherLang}`);
  const hrefFor = (path) => (path === "home" ? `/${lang}` : `/${lang}/${path}`);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <Container className="grid grid-cols-[auto_1fr_auto] items-center gap-3 py-2 sm:py-3">
        <Link href={`/${lang}`} className="shrink-0" aria-hidden="true" tabIndex={-1}>
          {logoUrl && <img src={logoUrl} alt="" className="h-11 w-11 rounded-full object-contain sm:h-16 sm:w-16" />}
        </Link>

        <Link href={`/${lang}`} className="min-w-0 text-center">
          <span className="line-clamp-2 block text-base font-bold leading-tight text-primary sm:text-xl lg:text-2xl">{schoolName}</span>
          <span className="mt-0.5 block text-xs font-medium text-muted sm:text-sm lg:text-base">Mancherial - 504208</span>
        </Link>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href={switchHref}
            onClick={() => (document.cookie = `lang=${otherLang}; path=/; max-age=31536000`)}
            className="rounded-full border border-primary px-3 py-1 text-sm font-medium text-primary transition hover:bg-primary hover:text-white"
          >
            {switchLabel}
          </Link>
          <button onClick={() => setOpen(!open)} className="rounded-md p-2 text-primary lg:hidden" aria-label="Menu" aria-expanded={open}>
            <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
          </button>
        </div>
      </Container>

      <nav className={cn("border-t bg-primary lg:block", open ? "block" : "hidden")}>
        <Container as="ul" className="flex flex-col py-2 lg:flex-row lg:flex-wrap lg:py-0">
          {menu.map((item) =>
            item.children ? (
              <Dropdown key={item.key} item={item} nav={nav} hrefFor={hrefFor} pathname={pathname} onNavigate={() => setOpen(false)} />
            ) : (
              <li key={item.key}>
                <Link
                  href={hrefFor(item.path ?? item.key)}
                  onClick={() => setOpen(false)}
                  className={cn(itemClass, pathname === hrefFor(item.path ?? item.key) && activeClass)}
                >
                  {nav[item.key]}
                </Link>
              </li>
            )
          )}
        </Container>
      </nav>
    </header>
  );
}
