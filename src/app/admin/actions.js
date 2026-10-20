"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin, resources, settingsSections } from "@/lib/admin";

export async function login(_prev, formData) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: String(formData.get("email")),
    password: String(formData.get("password")),
  });
  if (error) return { error: "Wrong email or password." };
  redirect("/admin");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

// Uploads a new photo if one was chosen, otherwise keeps the existing URL.
async function readImage(supabase, formData, name) {
  const file = formData.get(`${name}__file`);
  const existing = String(formData.get(name) ?? "");
  if (!file || typeof file === "string" || file.size === 0) return existing || null;

  if (!file.type.startsWith("image/")) throw new Error("Only image files can be uploaded.");
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${name}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from("media").upload(path, file, { contentType: file.type });
  if (error) throw new Error(`Upload failed: ${error.message}`);
  return supabase.storage.from("media").getPublicUrl(path).data.publicUrl;
}

async function readFields(supabase, fields, formData) {
  const values = {};
  for (const f of fields) {
    if (f.type === "checkbox") values[f.name] = formData.get(f.name) === "on";
    else if (f.type === "image") values[f.name] = await readImage(supabase, formData, f.name);
    else if (f.type === "number") values[f.name] = Number(formData.get(f.name) || 0);
    else values[f.name] = String(formData.get(f.name) ?? "").trim() || null;
  }
  return values;
}

export async function saveItem(table, _prev, formData) {
  const config = resources[table];
  if (!config) return { error: "Unknown section." };
  const { supabase } = await requireAdmin();

  let values;
  try {
    values = await readFields(supabase, config.fields, formData);
  } catch (e) {
    return { error: e.message };
  }
  const missing = config.fields.find((f) => f.required && !values[f.name]);
  if (missing) return { error: `${missing.label} is required.` };

  const id = formData.get("id");
  const { error } = id
    ? await supabase.from(table).update(values).eq("id", id)
    : await supabase.from(table).insert(values);
  if (error) return { error: error.message };

  redirect(`/admin/${table}?saved=1`);
}

export async function deleteItem(table, formData) {
  if (!resources[table]) return;
  const { supabase } = await requireAdmin();
  await supabase.from(table).delete().eq("id", formData.get("id"));
  redirect(`/admin/${table}`);
}

export async function saveSettings(_prev, formData) {
  const { supabase } = await requireAdmin();
  let values;
  try {
    values = await readFields(supabase, settingsSections.flatMap((s) => s.fields), formData);
  } catch (e) {
    return { error: e.message };
  }
  const { error } = await supabase
    .from("settings")
    .upsert({ id: 1, data: values, updated_at: new Date().toISOString() });
  if (error) return { error: error.message };
  return { ok: "Settings saved." };
}
