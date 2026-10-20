// Calendar-style date block: big day number with the month below.
export default function DateBadge({ date, lang }) {
  const d = new Date(date);
  return (
    <div className="flex h-fit w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-primary py-1.5 text-white shadow-sm sm:w-14 sm:py-2">
      <span className="text-lg font-bold leading-none sm:text-xl">{d.getDate()}</span>
      <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-on-dark sm:text-xs">
        {d.toLocaleString(lang === "te" ? "te-IN" : "en-IN", { month: "short" })}
      </span>
    </div>
  );
}
