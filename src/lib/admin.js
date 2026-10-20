import "server-only";
import { redirect } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { staffCategories } from "@/lib/staff";

export const achievementCategories = [
  { value: "academic", label: "Academic" },
  { value: "sports", label: "Sports" },
  { value: "cultural", label: "Cultural" },
  { value: "other", label: "Other" },
];

// Field types: text, textarea, date, checkbox, number, image
export const resources = {
  class_strength: {
    label: "School Strength",
    singular: "Class section",
    order: ["sort_order", { ascending: true }],
    summary: (r) => [
      [r.class_en, r.section_en].filter(Boolean).join(" – "),
      `${r.level === "college" ? "Junior College" : "High School"} · ${r.boys} boys + ${r.girls} girls = ${r.boys + r.girls}`,
    ],
    fields: [
      {
        name: "level",
        label: "Section of the school",
        type: "select",
        required: true,
        options: [
          { value: "school", label: "High School (Classes VI–X)" },
          { value: "college", label: "Junior College (Intermediate)" },
        ],
      },
      { name: "class_en", label: "Class (English) e.g. VI or Intermediate I Year — same name for every section of a class", type: "text", required: true },
      { name: "class_te", label: "Class (Telugu) e.g. 6వ తరగతి", type: "text" },
      { name: "section_en", label: "Medium or group e.g. English or BiPC", type: "text" },
      { name: "boys", label: "Boys", type: "number" },
      { name: "girls", label: "Girls", type: "number" },
      { name: "sort_order", label: "Display order (smaller shows first)", type: "number" },
    ],
  },
  achievements: {
    label: "Achievements",
    singular: "Achievement",
    order: ["achievement_date", { ascending: false }],
    summary: (r) => [r.title_en, [achievementCategories.find((c) => c.value === r.category)?.label, r.achievement_date].filter(Boolean).join(" · ")],
    image: "image_url",
    fields: [
      { name: "title_en", label: "Title (English) e.g. State-level first prize in Science Fair", type: "text", required: true },
      { name: "title_te", label: "Title (Telugu)", type: "text" },
      { name: "description_en", label: "Details (English) — student names, class, event", type: "textarea" },
      { name: "description_te", label: "Details (Telugu)", type: "textarea" },
      { name: "category", label: "Category", type: "select", options: achievementCategories, required: true },
      { name: "achievement_date", label: "Date", type: "date" },
      { name: "image_url", label: "Photo (optional)", type: "image" },
    ],
  },
  hero_slides: {
    label: "Home Slides",
    singular: "Slide",
    order: ["sort_order", { ascending: true }],
    summary: (r) => [r.title_en || "(no title)", r.is_active ? `Order ${r.sort_order}` : "Hidden"],
    image: "image_url",
    fields: [
      { name: "image_url", label: "Photo (wide/landscape works best, e.g. 1920×1080)", type: "image", required: true },
      { name: "title_en", label: "Heading (English)", type: "text" },
      { name: "title_te", label: "Heading (Telugu)", type: "text" },
      { name: "subtitle_en", label: "Sub-heading (English)", type: "text" },
      { name: "subtitle_te", label: "Sub-heading (Telugu)", type: "text" },
      { name: "sort_order", label: "Display order (smaller shows first)", type: "number" },
      { name: "is_active", label: "Show on website", type: "checkbox", default: true },
    ],
  },
  notices: {
    label: "Notices",
    order: ["notice_date", { ascending: false }],
    summary: (r) => [r.title_en, r.notice_date],
    fields: [
      { name: "title_en", label: "Title (English)", type: "text", required: true },
      { name: "title_te", label: "Title (Telugu)", type: "text" },
      { name: "body_en", label: "Details (English)", type: "textarea" },
      { name: "body_te", label: "Details (Telugu)", type: "textarea" },
      { name: "notice_date", label: "Date", type: "date", required: true },
      { name: "is_pinned", label: "Mark as important (shows on top)", type: "checkbox" },
    ],
  },
  events: {
    label: "Events",
    order: ["event_date", { ascending: false }],
    summary: (r) => [r.title_en, r.event_date],
    fields: [
      { name: "title_en", label: "Title (English)", type: "text", required: true },
      { name: "title_te", label: "Title (Telugu)", type: "text" },
      { name: "description_en", label: "Description (English)", type: "textarea" },
      { name: "description_te", label: "Description (Telugu)", type: "textarea" },
      { name: "event_date", label: "Event date", type: "date", required: true },
      { name: "location", label: "Location", type: "text" },
    ],
  },
  gallery: {
    label: "Gallery",
    order: ["created_at", { ascending: false }],
    summary: (r) => [r.caption_en || "(no caption)"],
    image: "image_url",
    fields: [
      { name: "image_url", label: "Photo", type: "image", required: true },
      { name: "caption_en", label: "Caption (English)", type: "text" },
      { name: "caption_te", label: "Caption (Telugu)", type: "text" },
    ],
  },
  staff: {
    label: "Staff",
    order: ["sort_order", { ascending: true }],
    summary: (r) => [r.name_en, [r.role_en, staffCategories.find((c) => c.value === r.category)?.label].filter(Boolean).join(" · ")],
    image: "photo_url",
    fields: [
      { name: "name_en", label: "Name (English)", type: "text", required: true },
      { name: "name_te", label: "Name (Telugu)", type: "text" },
      { name: "role_en", label: "Designation / Subject (English)", type: "text" },
      { name: "category", label: "Staff group", type: "select", options: staffCategories, required: true },
      { name: "role_te", label: "Designation / Subject (Telugu)", type: "text" },
      { name: "qualification", label: "Qualification (e.g. M.Sc., B.Ed.)", type: "text" },
      { name: "experience", label: "Experience (e.g. 12 years)", type: "text" },
      { name: "phone", label: "Phone (optional, shown on site)", type: "text" },
      { name: "photo_url", label: "Photo", type: "image" },
      { name: "sort_order", label: "Display order (smaller shows first)", type: "number" },
    ],
  },
};

export const settingsSections = [
  {
    title: "School",
    fields: [
      { name: "school_name_en", label: "School name (English)", type: "text" },
      { name: "school_name_te", label: "School name (Telugu)", type: "text" },
      { name: "tagline_en", label: "Tagline (English)", type: "text" },
      { name: "tagline_te", label: "Tagline (Telugu)", type: "text" },
      { name: "logo_url", label: "Logo", type: "image" },
      { name: "admissions_open", label: "Show “Admissions Open” badge", type: "checkbox" },
    ],
  },
  {
    title: "Principal",
    fields: [
      { name: "principal_name_en", label: "Name (English)", type: "text" },
      { name: "principal_name_te", label: "Name (Telugu)", type: "text" },
      { name: "principal_photo", label: "Photo", type: "image" },
      { name: "principal_qualification_en", label: "Qualification (English) e.g. M.Sc., B.Ed.", type: "text" },
      { name: "principal_qualification_te", label: "Qualification (Telugu)", type: "text" },
      { name: "principal_experience_en", label: "Experience (English) e.g. 20 years in teaching", type: "text" },
      { name: "principal_experience_te", label: "Experience (Telugu)", type: "text" },
      { name: "principal_message_en", label: "Message (English)", type: "textarea" },
      { name: "principal_message_te", label: "Message (Telugu)", type: "textarea" },
    ],
  },
  {
    title: "About page",
    fields: [
      { name: "about_en", label: "About (English)", type: "textarea" },
      { name: "about_te", label: "About (Telugu)", type: "textarea" },
      { name: "vision_en", label: "Vision (English)", type: "textarea" },
      { name: "vision_te", label: "Vision (Telugu)", type: "textarea" },
      { name: "mission_en", label: "Mission (English)", type: "textarea" },
      { name: "mission_te", label: "Mission (Telugu)", type: "textarea" },
    ],
  },
  {
    title: "Numbers on home page",
    fields: [
      { name: "stat_students", label: "Students", type: "text" },
      { name: "stat_teachers", label: "Teachers", type: "text" },
      { name: "stat_years", label: "Years of service", type: "text" },
      { name: "stat_results", label: "Pass percentage", type: "text" },
    ],
  },
  {
    title: "School Strength page",
    fields: [
      { name: "strength_year", label: "Academic year shown (e.g. 2026–27)", type: "text" },
      { name: "teaching_staff", label: "Number of teaching staff", type: "text" },
    ],
  },
  {
    title: "Admission seats",
    fields: [
      { name: "seats_mpc", label: "Junior College – MPC", type: "text" },
      { name: "seats_bipc", label: "Junior College – BiPC", type: "text" },
      { name: "seats_cec", label: "Junior College – CEC", type: "text" },
      { name: "seats_ace", label: "Junior College – ACE", type: "text" },
      { name: "seats_class6", label: "School – Class 6", type: "text" },
      { name: "seats_class7", label: "School – Class 7", type: "text" },
      { name: "seats_class8", label: "School – Class 8", type: "text" },
      { name: "seats_class9", label: "School – Class 9", type: "text" },
      { name: "seats_class10", label: "School – Class 10", type: "text" },
    ],
  },
  {
    title: "Contact",
    fields: [
      { name: "address_en", label: "Address (English)", type: "textarea" },
      { name: "address_te", label: "Address (Telugu)", type: "textarea" },
      { name: "phone", label: "Phone", type: "text" },
      { name: "whatsapp", label: "WhatsApp number with country code (e.g. 919876543210)", type: "text" },
      { name: "email", label: "Email", type: "text" },
      { name: "website", label: "Website (e.g. tgmsmancherial.in)", type: "text" },
      { name: "map_link", label: "Google Maps link (Share → Copy link)", type: "text" },
      { name: "map_embed_url", label: "Google Maps embed link (Share → Embed a map → copy the src=\"...\" link)", type: "text" },
    ],
  },
];

// Returns a Supabase client acting as the logged-in admin, or redirects to login.
export async function requireAdmin() {
  if (!isSupabaseConfigured) redirect("/admin/login");
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/admin/login");

  const { data: admin } = await supabase.from("admins").select("user_id").eq("user_id", data.user.id).maybeSingle();
  if (!admin) redirect("/admin/login?error=not-admin");

  return { supabase, user: data.user };
}
