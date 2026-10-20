"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/ui/Icon";

// Counts this page load and shows "Total page views: N · Today: N". Hidden until data arrives.
export default function PageViews({ labels }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("/api/views", { method: "POST" })
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  if (!stats) return null;
  const fmt = (n) => Number(n).toLocaleString("en-IN");

  return (
    <p className="flex items-center gap-2">
      <Icon name="eye" className="h-4 w-4" />
      {labels.totalViews}: {fmt(stats.total)} · {labels.today}: {fmt(stats.today)}
    </p>
  );
}
