"use client";

import { useMemo, useState } from "react";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import { inputBase } from "@/components/ui/Input";
import { cn } from "@/lib/cn";

// Colors per category, all from the theme in globals.css.
const categoryStyles = {
  exam: "bg-accent-light text-primary",
  holiday: "bg-danger-light text-danger",
  meeting: "bg-surface text-muted",
  sports: "bg-success-light text-success",
  day: "bg-warning-light text-warning",
};
const CATEGORIES = ["all", "exam", "holiday", "meeting", "sports", "day"];

const toDate = (iso) => new Date(`${iso}T00:00:00`);

// Builds an .xlsx of the given entries and starts the download.
// The Excel library is loaded only when the button is clicked, so it doesn't slow down the page.
async function downloadExcel(entries, { labels, locale, fileName }) {
  const { default: writeExcelFile } = await import("write-excel-file/browser");
  const header = (value) => ({ value, fontWeight: "bold", backgroundColor: "#e1f1fb" });
  const columns = [
    { header: header(labels.columns.date), width: 14, cell: ([date]) => ({ value: new Date(`${date}T00:00:00Z`), type: Date, format: "dd-mm-yyyy" }) },
    { header: header(labels.columns.day), width: 12, cell: ([date]) => ({ value: toDate(date).toLocaleDateString(locale, { weekday: "long" }) }) },
    { header: header(labels.columns.event), width: 70, cell: ([, title]) => ({ value: title, wrap: true }) },
    { header: header(labels.columns.category), width: 24, cell: ([, , cat]) => ({ value: labels.categories[cat] }) },
  ];
  await writeExcelFile(entries, { columns, sheet: "Academic Calendar", stickyRowsCount: 1 }).toFile(fileName);
}

function MonthChip({ active, disabled, onClick, children }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      className={cn(
        "shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium transition",
        active ? "border-primary bg-primary text-white" : "border-line bg-white text-body hover:border-primary hover:text-primary",
        disabled && "cursor-not-allowed opacity-40 hover:border-line hover:text-body"
      )}
    >
      {children}
    </button>
  );
}

/**
 * Searchable academic calendar with month and category filters.
 * `entries`: [[ "YYYY-MM-DD", title, category ], …] sorted by date. `today`: "YYYY-MM-DD".
 */
export default function AcademicCalendar({ entries, today, year, lang, labels }) {
  const [query, setQuery] = useState("");
  const [month, setMonth] = useState("all"); // "all" or 1–12
  const [category, setCategory] = useState("all");
  const [downloading, setDownloading] = useState(false);
  const locale = lang === "te" ? "te-IN" : "en-IN";

  const monthNames = useMemo(
    () => Array.from({ length: 12 }, (_, i) => new Date(2026, i, 1).toLocaleDateString(locale, { month: "short" })),
    [locale]
  );
  const monthsWithEntries = useMemo(() => new Set(entries.map((e) => toDate(e[0]).getMonth() + 1)), [entries]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries.filter(([date, title, cat]) => {
      if (month !== "all" && toDate(date).getMonth() + 1 !== month) return false;
      if (category !== "all" && cat !== category) return false;
      return !q || title.toLowerCase().includes(q);
    });
  }, [entries, query, month, category]);

  // Group results by month, keeping date order.
  const groups = useMemo(() => {
    const map = new Map();
    for (const e of filtered) {
      const key = e[0].slice(0, 7);
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(e);
    }
    return [...map.entries()];
  }, [filtered]);

  const nextDate = entries.find((e) => e[0] >= today)?.[0];
  const hasFilters = query || month !== "all" || category !== "all";
  const onDownload = async () => {
    setDownloading(true);
    try {
      await downloadExcel(filtered, { labels, locale, fileName: `academic-calendar-${year}.xlsx` });
    } finally {
      setDownloading(false);
    }
  };
  const clear = () => {
    setQuery("");
    setMonth("all");
    setCategory("all");
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-line sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="relative flex-1">
            <span className="sr-only">{labels.search}</span>
            <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-subtle" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={labels.search}
              className={cn(inputBase, "pl-10")}
            />
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label={labels.categories.all}
            className={cn(inputBase, "sm:w-60")}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {labels.categories[c]}
              </option>
            ))}
          </select>
        </div>

        <div className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          <MonthChip active={month === "all"} onClick={() => setMonth("all")}>
            {labels.allMonths}
          </MonthChip>
          {monthNames.map((name, i) => (
            <MonthChip key={name} active={month === i + 1} disabled={!monthsWithEntries.has(i + 1)} onClick={() => setMonth(i + 1)}>
              {name}
            </MonthChip>
          ))}
        </div>
      </div>

      {/* Result count */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-subtle">
        <p className="flex items-center gap-3">
          <span>
            {filtered.length} {labels.results}
          </span>
          {hasFilters && (
            <button onClick={clear} className="font-medium text-primary hover:underline">
              {labels.clear}
            </button>
          )}
        </p>
        <Button size="sm" variant="outline" icon="download" onClick={onDownload} disabled={downloading || filtered.length === 0}>
          {downloading ? labels.downloading : labels.download}
        </Button>
      </div>

      {/* Results */}
      {groups.length === 0 ? (
        <p className="mt-4 rounded-2xl bg-white p-8 text-center text-subtle ring-1 ring-line">{labels.empty}</p>
      ) : (
        <div className="mt-3 space-y-6">
          {groups.map(([key, items]) => (
            <section key={key} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-line">
              <h2 className="border-b border-line bg-surface px-4 py-3 text-base font-semibold text-heading sm:px-6">
                {toDate(`${key}-01`).toLocaleDateString(locale, { month: "long", year: "numeric" })}
              </h2>
              <ul className="divide-y divide-line">
                {items.map(([date, title, cat]) => {
                  const d = toDate(date);
                  const past = date < today;
                  const next = date === nextDate;
                  return (
                    <li
                      key={date + title}
                      className={cn("flex items-center gap-4 px-4 py-3 sm:px-6", next && "bg-accent-light", past && "text-subtle")}
                    >
                      <div className="w-12 shrink-0 text-center">
                        <p className={cn("text-xl font-bold leading-none", past ? "text-subtle" : "text-primary")}>{d.getDate()}</p>
                        <p className="mt-1 text-xs uppercase text-subtle">{d.toLocaleDateString(locale, { weekday: "short" })}</p>
                      </div>
                      <p className={cn("min-w-0 flex-1 text-sm sm:text-base", past ? "text-subtle" : "text-heading")}>{title}</p>
                      <span className={cn("hidden shrink-0 rounded-full px-2.5 py-1 text-xs font-medium sm:inline", categoryStyles[cat])}>
                        {labels.categories[cat]}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
