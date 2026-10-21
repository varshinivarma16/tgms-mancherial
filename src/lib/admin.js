import "server-only";
import { redirect } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { staffCategories } from "@/lib/staff";

export const PERIODS = ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"];
export const timetableDays = [
  { value: "mon", label: "Monday" },
  { value: "tue", label: "Tuesday" },
  { value: "wed", label: "Wednesday" },
  { value: "thu", label: "Thursday" },
  { value: "fri", label: "Friday" },
  { value: "sat", label: "Saturday" },
];

export const examTypes = [
  { value: "ssc", label: "SSC (Class 10)" },
  { value: "inter1", label: "Intermediate I Year" },
  { value: "inter2", label: "Intermediate II Year" },
];

export const achievementCategories = [
  { value: "academic", label: "Academic" },
  { value: "sports", label: "Sports" },
  { value: "cultural", label: "Cultural" },
  { value: "outside", label: "Students' achievements outside school" },
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
  timetable: {
    label: "Timetable",
    singular: "Class day",
    order: ["sort_order", { ascending: true }],
    summary: (r) => [
      `${r.class_en} · ${timetableDays.find((d) => d.value === r.day)?.label ?? r.day}`,
      PERIODS.map((p) => r[p]).filter(Boolean).join(", ") || "(no periods)",
    ],
    fields: [
      { name: "class_en", label: "Class e.g. Class 6 or Intermediate I Year MPC — type it exactly the same for every day of that class", type: "text", required: true },
      { name: "day", label: "Day", type: "select", options: timetableDays, required: true },
      ...PERIODS.map((p, i) => ({ name: p, label: `Period ${i + 1} subject`, type: "text" })),
      { name: "sort_order", label: "Display order (smaller shows first) — e.g. Class 6 = 6, Class 7 = 7", type: "number" },
    ],
  },
  results: {
    label: "Results",
    singular: "Result",
    order: ["year", { ascending: false }],
    summary: (r) => [
      `${r.year} · ${examTypes.find((e) => e.value === r.exam)?.label ?? r.exam}`,
      `${r.passed}/${r.appeared} passed${r.appeared ? ` (${Math.round((r.passed / r.appeared) * 1000) / 10}%)` : ""}`,
    ],
    fields: [
      { name: "year", label: "Year e.g. 2025–26", type: "text", required: true },
      { name: "exam", label: "Exam", type: "select", options: examTypes, required: true },
      { name: "appeared", label: "Students appeared", type: "number" },
      { name: "passed", label: "Students passed", type: "number" },
      { name: "distinctions", label: "Distinctions / first class (optional)", type: "number" },
    ],
  },
  toppers: {
    label: "Toppers",
    singular: "Topper",
    order: ["sort_order", { ascending: true }],
    summary: (r) => [r.name_en, [r.year, examTypes.find((e) => e.value === r.exam)?.label, r.group_en, r.marks].filter(Boolean).join(" · ")],
    image: "photo_url",
    // Add form: choose exam + year once, then fill several students at a time.
    bulk: { shared: ["year", "exam"], each: ["name_en", "name_te", "group_en", "marks", "photo_url"], rows: 5 },
    fields: [
      { name: "name_en", label: "Student name (English)", type: "text", required: true },
      { name: "name_te", label: "Student name (Telugu)", type: "text" },
      { name: "year", label: "Year e.g. 2025–26", type: "text", required: true },
      { name: "exam", label: "Exam", type: "select", options: examTypes, required: true },
      { name: "group_en", label: "Group (Intermediate only) e.g. MPC", type: "text" },
      { name: "marks", label: "Marks e.g. 10 GPA or 985/1000", type: "text" },
      { name: "photo_url", label: "Photo (optional)", type: "image" },
      { name: "sort_order", label: "Display order (smaller shows first)", type: "number" },
    ],
  },
  facilities: {
    label: "Facilities",
    singular: "Facility",
    order: ["sort_order", { ascending: true }],
    summary: (r) => [r.title_en, r.description_en?.slice(0, 80)],
    image: "image_url",
    fields: [
      { name: "title_en", label: "Name (English) e.g. Science Lab", type: "text", required: true },
      { name: "title_te", label: "Name (Telugu)", type: "text" },
      { name: "description_en", label: "Description (English)", type: "textarea" },
      { name: "description_te", label: "Description (Telugu)", type: "textarea" },
      { name: "image_url", label: "Photo", type: "image" },
      { name: "sort_order", label: "Display order (smaller shows first)", type: "number" },
    ],
  },
  faqs: {
    label: "FAQ",
    singular: "Question",
    order: ["sort_order", { ascending: true }],
    summary: (r) => [r.question_en, r.answer_en?.slice(0, 80)],
    fields: [
      { name: "question_en", label: "Question (English)", type: "text", required: true },
      { name: "question_te", label: "Question (Telugu)", type: "text" },
      { name: "answer_en", label: "Answer (English)", type: "textarea" },
      { name: "answer_te", label: "Answer (Telugu)", type: "textarea" },
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
  alumni: {
    label: "Alumni",
    singular: "Alumnus",
    order: ["sort_order", { ascending: true }],
    summary: (r) => [r.name_en, [r.batch, r.current_role_en].filter(Boolean).join(" · ")],
    image: "photo_url",
    fields: [
      { name: "name_en", label: "Name (English)", type: "text", required: true },
      { name: "name_te", label: "Name (Telugu)", type: "text" },
      { name: "batch", label: "Batch / passed out year e.g. 2018 (SSC) or 2020 (Inter MPC)", type: "text" },
      { name: "current_role_en", label: "Now working / studying as (English) e.g. Doctor at Gandhi Hospital", type: "text" },
      { name: "current_role_te", label: "Now working / studying as (Telugu)", type: "text" },
      { name: "achievement_en", label: "Achievements (English)", type: "textarea" },
      { name: "achievement_te", label: "Achievements (Telugu)", type: "textarea" },
      { name: "photo_url", label: "Photo (optional)", type: "image" },
      { name: "sort_order", label: "Display order (smaller shows first)", type: "number" },
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
      { name: "image_url", label: "Photos", type: "image", required: true, multiple: true },
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
    title: "School details",
    fields: [
      {
        name: "school_type",
        label: "Model School type",
        type: "select",
        options: [
          { value: "PM Shri Telangana Model School", label: "PM Shri Telangana Model School" },
          { value: "Telangana Model School", label: "Telangana Model School" },
        ],
      },
      { name: "udise_code", label: "UDISE+ code", type: "text" },
      { name: "established_year", label: "Year of establishment e.g. 2013", type: "text" },
      { name: "village_en", label: "Village / Town (English)", type: "text" },
      { name: "village_te", label: "Village / Town (Telugu)", type: "text" },
      { name: "mandal_en", label: "Mandal (English)", type: "text" },
      { name: "mandal_te", label: "Mandal (Telugu)", type: "text" },
      { name: "district_en", label: "District (English)", type: "text" },
      { name: "district_te", label: "District (Telugu)", type: "text" },
      { name: "affiliation_en", label: "Affiliation / recognition (English) e.g. Board of Secondary Education, Telangana; TSBIE", type: "textarea" },
      { name: "affiliation_te", label: "Affiliation / recognition (Telugu)", type: "textarea" },
      { name: "total_staff", label: "Total staff strength", type: "text" },
      { name: "non_teaching_staff", label: "Non-teaching staff strength", type: "text" },
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
      { name: "history_en", label: "School history (English)", type: "textarea" },
      { name: "history_te", label: "School history (Telugu)", type: "textarea" },
      { name: "features_en", label: "Special features (English) — one per line", type: "textarea" },
      { name: "features_te", label: "Special features (Telugu) — one per line", type: "textarea" },
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
    title: "Timetable period timings",
    fields: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({ name: `period${n}_time`, label: `Period ${n} time e.g. 9:30–10:15 (leave empty to hide this period)`, type: "text" })),
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
    title: "Google Search",
    fields: [
      { name: "seo_description_en", label: "Description shown in Google results (English, about 150 characters)", type: "textarea" },
      { name: "seo_description_te", label: "Description shown in Google results (Telugu)", type: "textarea" },
      { name: "google_verification", label: "Google Search Console verification code (only the content=\"...\" part of the HTML tag)", type: "text" },
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
