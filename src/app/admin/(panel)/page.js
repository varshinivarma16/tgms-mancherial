import Link from "next/link";
import { requireAdmin, resources } from "@/lib/admin";
import Card from "@/components/ui/Card";

export default async function Dashboard() {
  const { supabase } = await requireAdmin();
  const counts = await Promise.all(
    Object.keys(resources).map(async (table) => {
      const { count } = await supabase.from(table).select("*", { count: "exact", head: true });
      return [table, count ?? 0];
    })
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
      <p className="mt-1 text-muted">Choose what you want to update.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {counts.map(([table, count]) => (
          <Card as={Link} key={table} href={`/admin/${table}`} className="transition hover:shadow-md">
            <p className="text-3xl font-bold text-primary">{count}</p>
            <p className="text-muted">{resources[table].label}</p>
          </Card>
        ))}
        <Card as={Link} href="/admin/settings" tone="accent" className="transition hover:shadow-md">
          <p className="font-bold text-primary-dark">Settings & Pages</p>
          <p className="text-sm text-muted">School name, principal, about, contact, WhatsApp</p>
        </Card>
      </div>
    </div>
  );
}
