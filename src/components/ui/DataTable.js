import Card from "./Card";
import { cn } from "@/lib/cn";

/**
 * One table style for the whole site.
 * - `columns`: [{ key, label, className?, render?(row) }] — cell shows render(row) or row[key]
 * - `rows`: array of objects; `rowKey(row, i)` gives each a React key
 * - `footer`: optional totals row, same shape as a row
 * - `title` / `note`: optional slim bar above the table
 * - `rowClassName(row, i)`: optional extra classes per row
 */
export default function DataTable({ title, note, columns, rows, footer, rowKey = (_, i) => i, rowClassName, minWidth = 520, className }) {
  const cell = (c, i) => cn("px-3 py-2 text-left", i === 0 && "pl-4 sm:pl-5", i === columns.length - 1 && "pr-4 sm:pr-5", c.className);
  const value = (c, row) => (c.render ? c.render(row) : row[c.key]);

  return (
    <Card padding="none" className={cn("overflow-hidden", className)}>
      {title && (
        <div className="bg-primary px-4 py-2 sm:px-5">
          <h3 className="text-sm font-semibold text-white sm:text-base">{title}</h3>
          {note && <p className="text-xs text-on-dark sm:text-sm">{note}</p>}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm tabular-nums" style={{ minWidth }}>
          <thead className="bg-primary-hover text-white">
            <tr>
              {columns.map((c, i) => (
                <th key={c.key} className={cn(cell(c, i), "text-xs font-semibold uppercase tracking-wide")}>{c.label}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line text-body">
            {rows.map((row, r) => (
              <tr key={rowKey(row, r)} className={rowClassName?.(row, r)}>
                {columns.map((c, i) => <td key={c.key} className={cell(c, i)}>{value(c, row)}</td>)}
              </tr>
            ))}
          </tbody>
          {footer && (
            <tfoot className="bg-accent-light font-bold text-heading">
              <tr>
                {columns.map((c, i) => <td key={c.key} className={cell(c, i)}>{value(c, footer)}</td>)}
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </Card>
  );
}
