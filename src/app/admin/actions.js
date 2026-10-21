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

// Photos chosen in an image field (ignores the empty entry browsers send when nothing is chosen).
const chosenFiles = (formData, name) =>
  formData.getAll(`${name}__file`).filter((f) => f && typeof f !== "string" && f.size > 0);

async function uploadImage(supabase, file, name) {
  if (!file.type.startsWith("image/")) throw new Error("Only image files can be uploaded.");
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${name}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from("media").upload(path, file, { contentType: file.type });
  if (error) throw new Error(`Upload failed: ${error.message}`);
  return supabase.storage.from("media").getPublicUrl(path).data.publicUrl;
}

// Uploads a new photo if one was chosen, otherwise keeps the existing URL.
async function readImage(supabase, formData, name) {
  const [file] = chosenFiles(formData, name);
  if (!file) return String(formData.get(name) ?? "") || null;
  return uploadImage(supabase, file, name);
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

  // Several photos chosen for a new item: one row per photo, sharing the other fields.
  const multi = !id && config.fields.find((f) => f.type === "image" && f.multiple);
  const extra = multi ? chosenFiles(formData, multi.name).slice(1) : [];
  if (extra.length > 0) {
    try {
      const urls = await Promise.all(extra.map((file) => uploadImage(supabase, file, multi.name)));
      const { error } = await supabase.from(table).insert([values, ...urls.map((url) => ({ ...values, [multi.name]: url }))]);
      if (error) return { error: error.message };
    } catch (e) {
      return { error: e.message };
    }
    redirect(`/admin/${table}?saved=1`);
  }

  const { error } = id
    ? await supabase.from(table).update(values).eq("id", id)
    : await supabase.from(table).insert(values);
  if (error) return { error: error.message };

  redirect(`/admin/${table}?saved=1`);
}

// Several rows at once: shared fields apply to all; each row's fields are named "<field>__<index>".
export async function saveBulk(table, _prev, formData) {
  const config = resources[table];
  if (!config?.bulk) return { error: "Unknown section." };
  const { supabase } = await requireAdmin();
  const field = (name) => config.fields.find((f) => f.name === name);

  try {
    const shared = await readFields(supabase, config.bulk.shared.map(field), formData);
    const missing = config.bulk.shared.map(field).find((f) => f.required && !shared[f.name]);
    if (missing) return { error: `${missing.label} is required.` };

    const rows = [];
    for (let i = 0; i < config.bulk.rows; i++) {
      const fields = config.bulk.each.map((n) => ({ ...field(n), name: `${n}__${i}` }));
      const raw = await readFields(supabase, fields, formData);
      const row = Object.fromEntries(config.bulk.each.map((n) => [n, raw[`${n}__${i}`]]));
      if (!row[config.bulk.each[0]]) continue; // empty line
      rows.push({ ...shared, ...row, sort_order: i + 1 });
    }
    if (rows.length === 0) return { error: `Fill in at least one ${field(config.bulk.each[0]).label}.` };

    const { error } = await supabase.from(table).insert(rows);
    if (error) return { error: error.message };
  } catch (e) {
    return { error: e.message };
  }
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
