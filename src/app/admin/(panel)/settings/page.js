import { requireAdmin, settingsSections } from "@/lib/admin";
import { getSettings } from "@/lib/data";
import { saveSettings } from "../../actions";
import AdminForm from "@/components/admin/AdminForm";
import Field from "@/components/admin/Field";

export default async function SettingsPage() {
  await requireAdmin();
  const settings = await getSettings();

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-primary">Settings & Pages</h1>
      <p className="mt-1 text-muted">Text shown across the website. Telugu fields are optional — English is shown if left empty.</p>
      <div className="mt-6">
        <AdminForm action={saveSettings} submitLabel="Save settings">
          {settingsSections.map((section) => (
            <fieldset key={section.title} className="space-y-4 rounded-xl bg-white p-6 shadow-sm">
              <legend className="text-lg font-bold text-primary">{section.title}</legend>
              {section.fields.map((f) => (
                <Field key={f.name} field={f} value={settings[f.name]} />
              ))}
            </fieldset>
          ))}
        </AdminForm>
      </div>
    </div>
  );
}
