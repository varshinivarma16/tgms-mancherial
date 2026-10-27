"use client";

import { createContext, useContext, useState } from "react";
import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

const FilterContext = createContext("all");

/**
 * Left sidebar (scrollable row on mobile) that filters the sections beside it.
 * Use inside <Section size="full"> so the content gets the full page width.
 * `options`: [{ value, label, count? }]. Wrap each section in <FilterItem value="…">.
 */
export default function SidebarFilter({ options, allLabel, browseLabel, children }) {
  const [active, setActive] = useState("all");
  const total = options.reduce((sum, o) => sum + (o.count ?? 0), 0);
  const all = [{ value: "all", label: allLabel, count: options.some((o) => o.count != null) ? total : undefined }, ...options];

  return (
    <div className="mt-8 lg:grid lg:grid-cols-[15rem_1fr] lg:items-start lg:gap-6 xl:gap-8">
      <nav className="-mx-4 overflow-x-auto px-4 lg:sticky lg:top-40 lg:mx-0 lg:overflow-visible lg:px-0">
        <p className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-subtle lg:mb-3">
          <Icon name="search" className="h-4 w-4" /> {browseLabel}
        </p>
        <ul className="flex gap-2 lg:flex-col lg:gap-1.5 lg:rounded-xl lg:bg-surface lg:p-3 lg:ring-1 lg:ring-line">
          {all.map((o) => {
            const selected = active === o.value;
            return (
              <li key={o.value} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setActive(o.value)}
                  aria-pressed={selected}
                  className={cn(
                    "group flex w-full cursor-pointer items-center justify-between gap-2 whitespace-nowrap rounded-full px-4 py-2 text-left text-sm font-semibold shadow-sm ring-1 transition hover:shadow-md lg:whitespace-normal lg:rounded-lg lg:py-2.5",
                    selected ? "bg-primary text-white ring-primary" : "bg-white text-primary ring-primary/30 hover:bg-primary hover:text-white"
                  )}
                >
                  <span>
                    {o.label} {o.count != null && <span className="opacity-70">({o.count})</span>}
                  </span>
                  <Icon name="chevronRight" className="h-4 w-4 shrink-0 transition group-hover:translate-x-1" />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <FilterContext.Provider value={active}>
        <div className="mt-8 min-w-0 space-y-10 lg:mt-0">{children}</div>
      </FilterContext.Provider>
    </div>
  );
}

// `onlyWhenSelected` hides the item under "All" (e.g. a combined view that would repeat what "All" shows).
export function FilterItem({ value, onlyWhenSelected, children }) {
  const active = useContext(FilterContext);
  if (active === "all" ? onlyWhenSelected : active !== value) return null;
  return <div className="animate-fade-up">{children}</div>;
}
