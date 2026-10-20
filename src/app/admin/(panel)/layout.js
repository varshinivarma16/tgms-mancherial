import Link from "next/link";
import { requireAdmin, resources } from "@/lib/admin";
import { logout } from "../actions";

export default async function PanelLayout({ children }) {
  const { user } = await requireAdmin();

  const links = [
    ["/admin", "Dashboard"],
    ...Object.entries(resources).map(([key, r]) => [`/admin/${key}`, r.label]),
    ["/admin/settings", "Settings & Pages"],
  ];

  return (
    <div className="md:flex">
      <aside className="bg-primary-dark text-white md:min-h-screen md:w-60 md:shrink-0">
        <div className="p-4">
          <p className="font-bold text-accent">Admin Panel</p>
          <p className="truncate text-xs text-on-dark-muted">{user.email}</p>
        </div>
        <nav className="flex flex-wrap gap-1 px-2 pb-3 md:flex-col">
          {links.map(([href, label]) => (
            <Link key={href} href={href} className="rounded px-3 py-2 text-sm hover:bg-white/10">
              {label}
            </Link>
          ))}
          <a href="/" target="_blank" className="rounded px-3 py-2 text-sm text-on-dark-muted hover:bg-white/10">
            View website ↗
          </a>
          <form action={logout}>
            <button className="w-full rounded px-3 py-2 text-left text-sm text-danger-soft hover:bg-white/10">Log out</button>
          </form>
        </nav>
      </aside>
      <div className="flex-1 p-4 md:p-8">{children}</div>
    </div>
  );
}
