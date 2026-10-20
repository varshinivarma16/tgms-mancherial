import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin, resources } from "@/lib/admin";
import { saveItem, saveBulk, deleteItem } from "../../actions";
import AdminForm from "@/components/admin/AdminForm";
import Field from "@/components/admin/Field";

// Shared fields once, then numbered blocks; blank blocks are skipped on save.
function BulkForm({ resource, config }) {
  const field = (name) => config.fields.find((f) => f.name === name);
  return (
    <AdminForm action={saveBulk.bind(null, resource)} submitLabel={`Save all ${config.label.toLowerCase()}`}>
      <div className="grid gap-4 sm:grid-cols-2">
        {config.bulk.shared.map((n) => <Field key={n} field={field(n)} />)}
      </div>
      <p className="text-sm text-subtle">Fill as many as you need — empty ones are skipped. Order here is the order on the website.</p>
      {Array.from({ length: config.bulk.rows }, (_, i) => (
        <fieldset key={i} className="rounded-lg border border-line p-4">
          <legend className="px-1 text-sm font-semibold text-primary">#{i + 1}</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {config.bulk.each.map((n) => (
              <Field key={n} field={{ ...field(n), name: `${n}__${i}`, required: false }} />
            ))}
          </div>
        </fieldset>
      ))}
    </AdminForm>
  );
}

export default async function ResourcePage({ params, searchParams }) {
  const { resource } = await params;
  const { edit, saved } = await searchParams;
  const config = resources[resource];
  if (!config) notFound();

  const { supabase } = await requireAdmin();
  const { data } = await supabase.from(resource).select("*").order(...config.order);
  const rows = data ?? [];
  const editing = edit ? rows.find((r) => String(r.id) === edit) : null;

  return (
    <div className="grid gap-8 xl:grid-cols-[1fr_1fr]">
      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h1 className="text-xl font-bold text-primary">
          {editing ? "Edit" : "Add"} {config.singular ?? config.label.replace(/s$/, "")}
        </h1>
        {saved && <p className="mt-2 rounded bg-success-light p-2 text-sm text-success">Saved successfully.</p>}
        <div className="mt-4">
          {config.bulk && !editing ? (
            <BulkForm resource={resource} config={config} />
          ) : (
          <AdminForm key={editing?.id ?? "new"} action={saveItem.bind(null, resource)}>
            {editing && <input type="hidden" name="id" value={editing.id} />}
            {config.fields.map((f) => (
              <Field key={f.name} field={f} value={editing?.[f.name]} />
            ))}
          </AdminForm>
          )}
          {editing && (
            <Link href={`/admin/${resource}`} className="mt-3 inline-block text-sm text-muted hover:underline">
              Cancel editing
            </Link>
          )}
        </div>
      </section>

      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-primary">
          All {config.label} ({rows.length})
        </h2>
        <ul className="mt-4 divide-y">
          {rows.length === 0 && <li className="py-3 text-subtle">Nothing added yet.</li>}
          {rows.map((row) => {
            const [title, sub] = config.summary(row);
            return (
              <li key={row.id} className="flex items-center gap-3 py-3">
                {config.image && row[config.image] && (
                  <img src={row[config.image]} alt="" className="h-12 w-12 shrink-0 rounded object-cover" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-heading">{title}</p>
                  {sub && <p className="text-xs text-subtle">{sub}</p>}
                </div>
                <Link href={`/admin/${resource}?edit=${row.id}`} className="text-sm font-medium text-primary hover:underline">
                  Edit
                </Link>
                <form action={deleteItem.bind(null, resource)}>
                  <input type="hidden" name="id" value={row.id} />
                  <button className="text-sm font-medium text-danger hover:underline">Delete</button>
                </form>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
