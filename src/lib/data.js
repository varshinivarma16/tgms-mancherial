import "server-only";
import { createPublicClient } from "@/lib/supabase/server";
import { strength as demoStrength, casteStrength as demoCaste } from "@/lib/schoolStrength";
import { demoSlides, demoGallery, demoNotices, demoEvents } from "@/lib/demo";

// Shown until the admin fills in Settings (or when Supabase isn't connected yet).
export const defaultSettings = {
  school_name_en: "PM SHRI Telangana Model School & Junior College, Mancherial",
  school_name_te: "పీఎం శ్రీ తెలంగాణ మోడల్ స్కూల్ & జూనియర్ కళాశాల, మంచిర్యాల",
  tagline_en: "Quality English medium education for every child",
  tagline_te: "ప్రతి బిడ్డకు నాణ్యమైన ఆంగ్ల మాధ్యమ విద్య",
  logo_url: "/images/telangana-emblem.png",
  admissions_open: true,
  principal_name_en: "Mutyam Buchanna",
  principal_name_te: "ముత్యం బుచ్చన్న",
  principal_photo: "",
  principal_qualification_en: "M.Sc. (Mathematics), M.Ed.",
  principal_qualification_te: "ఎం.ఎస్సీ (గణితం), ఎం.ఎడ్",
  principal_experience_en: "22 years in teaching, 8 years as Principal",
  principal_experience_te: "22 సంవత్సరాల బోధనానుభవం, 8 సంవత్సరాలు ప్రిన్సిపాల్‌గా",
  principal_message_en:
    "Welcome to our school. We are committed to providing quality education that nurtures every student's talents and builds strong values. Together with dedicated teachers and supportive parents, we strive to prepare our students for a bright future.",
  principal_message_te:
    "మా పాఠశాలకు స్వాగతం. ప్రతి విద్యార్థి ప్రతిభను పెంపొందించి, బలమైన విలువలను నేర్పే నాణ్యమైన విద్యను అందించడానికి మేము కట్టుబడి ఉన్నాము. అంకితభావం గల ఉపాధ్యాయులు మరియు తల్లిదండ్రుల సహకారంతో, మా విద్యార్థులను ఉజ్వల భవిష్యత్తుకు సిద్ధం చేస్తున్నాము.",
  about_en:
    "Our school is a Government of Telangana Model School providing free English medium education from Class 6 to Intermediate. With qualified teachers, well-equipped labs and a safe campus, we focus on academic excellence and all-round development of students from rural and urban backgrounds.",
  about_te:
    "మా పాఠశాల తెలంగాణ ప్రభుత్వ మోడల్ స్కూల్. 6వ తరగతి నుండి ఇంటర్మీడియట్ వరకు ఉచిత ఆంగ్ల మాధ్యమ విద్యను అందిస్తుంది. అర్హత గల ఉపాధ్యాయులు, సుసజ్జిత ప్రయోగశాలలు మరియు సురక్షితమైన ప్రాంగణంతో, గ్రామీణ మరియు పట్టణ విద్యార్థుల విద్యా ప్రగతి మరియు సర్వతోముఖాభివృద్ధిపై దృష్టి పెడతాము.",
  vision_en: "To empower every student with knowledge, skills and values to become responsible citizens.",
  vision_te: "ప్రతి విద్యార్థిని జ్ఞానం, నైపుణ్యాలు మరియు విలువలతో బాధ్యతాయుతమైన పౌరులుగా తీర్చిదిద్దడం.",
  mission_en: "To provide accessible, quality education in a safe and inspiring environment.",
  mission_te: "సురక్షితమైన మరియు స్ఫూర్తిదాయకమైన వాతావరణంలో అందరికీ నాణ్యమైన విద్యను అందించడం.",
  stat_students: "800+",
  stat_teachers: "35+",
  stat_years: "12+",
  stat_results: "95%",
  strength_year: "2026–27",
  teaching_staff: "35",
  period1_time: "9:30–10:15",
  period2_time: "10:15–11:00",
  period3_time: "11:10–11:55",
  period4_time: "11:55–12:40",
  period5_time: "1:20–2:05",
  period6_time: "2:05–2:50",
  period7_time: "2:55–3:40",
  period8_time: "3:40–4:25",
  seats_mpc: "40",
  seats_bipc: "40",
  seats_cec: "40",
  seats_ace: "40",
  seats_class6: "100",
  seats_class7: "100",
  seats_class8: "100",
  seats_class9: "100",
  seats_class10: "100",
  address_en: "Mancherial Mandal, Mancherial District, Telangana – 504208",
  address_te: "మంచిర్యాల మండలం, మంచిర్యాల జిల్లా, తెలంగాణ – 504208",
  phone: "+91 90000 00000",
  whatsapp: "919000000000",
  email: "tgmsmancherial@gmail.com",
  website: "tgmsmancherial.in",
  map_link: "https://maps.app.goo.gl/b1yeEMRPKrGvPdvS6",
  map_embed_url: "https://www.google.com/maps?q=18.9003561,79.453266&z=16&output=embed",
};

// Uses sample content while the table is empty (until the admin adds real entries).
async function withDemo(demo, limit, rowsPromise) {
  const rows = await rowsPromise;
  return rows.length > 0 ? rows : demo.slice(0, limit);
}

async function query(build, fallback) {
  const supabase = createPublicClient();
  if (!supabase) return fallback;
  const { data, error } = await build(supabase);
  if (error) {
    console.error(error.message);
    return fallback;
  }
  return data ?? fallback;
}

export async function getSettings() {
  const row = await query((s) => s.from("settings").select("data").eq("id", 1).maybeSingle(), null);
  return { ...defaultSettings, ...(row?.data ?? {}) };
}

export const getNotices = (limit = 50) =>
  withDemo(demoNotices, limit, query(
    (s) =>
      s.from("notices").select("*")
        .order("is_pinned", { ascending: false })
        .order("notice_date", { ascending: false })
        .limit(limit),
    []
  ));

export const getUpcomingEvents = (limit = 50) =>
  withDemo(demoEvents, limit, query(
    (s) =>
      s.from("events").select("*")
        .gte("event_date", new Date().toISOString().slice(0, 10))
        .order("event_date")
        .limit(limit),
    []
  ));

export const getPastEvents = (limit = 20) =>
  query(
    (s) =>
      s.from("events").select("*")
        .lt("event_date", new Date().toISOString().slice(0, 10))
        .order("event_date", { ascending: false })
        .limit(limit),
    []
  );

export async function getGallery(limit = 100) {
  const rows = await query((s) => s.from("gallery").select("*").order("created_at", { ascending: false }).limit(limit), []);
  return rows.length > 0 ? rows : demoGallery.slice(0, limit);
}

export async function getHeroSlides() {
  const rows = await query(
    (s) => s.from("hero_slides").select("*").eq("is_active", true).order("sort_order").order("id"),
    []
  );
  return rows.length > 0 ? rows : demoSlides;
}

export const getResults = () =>
  query((s) => s.from("results").select("*").order("year", { ascending: false }).order("exam"), []);

export const getToppers = () =>
  query((s) => s.from("toppers").select("*").order("year", { ascending: false }).order("sort_order").order("id"), []);

export const getFacilities = () =>
  query((s) => s.from("facilities").select("*").order("sort_order").order("id"), []);

export const getFaqs = () =>
  query((s) => s.from("faqs").select("*").order("sort_order").order("id"), []);

export const getTimetable = () =>
  query((s) => s.from("timetable").select("*").order("sort_order").order("id"), []);

export const getAchievements = () =>
  query(
    (s) => s.from("achievements").select("*").order("achievement_date", { ascending: false, nullsFirst: false }).order("id", { ascending: false }),
    []
  );

export const getStaff = () =>
  query((s) => s.from("staff").select("*").order("sort_order").order("id"), []);

// Lines for the scrolling "Latest" bar: upcoming events first, then recent notices.
export async function getTickerItems() {
  const [events, notices] = await Promise.all([getUpcomingEvents(5), getNotices(5)]);
  const items = [
    ...events.map((e) => ({ id: `e${e.id}`, type: "event", title_en: e.title_en, title_te: e.title_te, date: e.event_date })),
    ...notices.map((n) => ({ id: `n${n.id}`, type: "notice", title_en: n.title_en, title_te: n.title_te })),
  ];
  return items;
}

// Class-wise strength grouped as { school: [...], college: [...] }. Uses sample rows until the admin adds real ones.
export async function getStrength() {
  const rows = await query((s) => s.from("class_strength").select("*").order("sort_order").order("id"), []);
  if (rows.length === 0) return demoStrength;
  return {
    school: rows.filter((r) => r.level !== "college"),
    college: rows.filter((r) => r.level === "college"),
  };
}

// Caste-wise rows (day scholars and hostel). Sample rows show only while no real strength data exists at all.
export async function getCasteStrength() {
  const [rows, classes] = await Promise.all([
    query((s) => s.from("caste_strength").select("*").order("sort_order").order("id"), []),
    query((s) => s.from("class_strength").select("id").limit(1), []),
  ]);
  return rows.length || classes.length ? rows : demoCaste;
}
