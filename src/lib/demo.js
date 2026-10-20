// Sample content (free Unsplash photos in /public/images) shown until the admin
// uploads real slides/photos. As soon as a table has rows, these are no longer used.

export const demoSlides = [
  {
    id: "demo-1",
    image_url: "/images/classroom.jpg",
    title_en: "Learning Today, Leading Tomorrow",
    title_te: "నేడు నేర్చుకుందాం, రేపు నడిపిద్దాం",
    subtitle_en: "Free English medium education from Class 6 to Intermediate",
    subtitle_te: "6వ తరగతి నుండి ఇంటర్మీడియట్ వరకు ఉచిత ఆంగ్ల మాధ్యమ విద్య",
  },
  {
    id: "demo-2",
    image_url: "/images/class-participation.jpg",
    title_en: "Every Voice Matters",
    title_te: "ప్రతి గొంతుకా ముఖ్యమే",
    subtitle_en: "Interactive classrooms that build confidence and curiosity",
    subtitle_te: "ఆత్మవిశ్వాసం మరియు జిజ్ఞాసను పెంచే తరగతి గదులు",
  },
  {
    id: "demo-3",
    image_url: "/images/senior-students.jpg",
    title_en: "Ready for the Future",
    title_te: "భవిష్యత్తుకు సిద్ధం",
    subtitle_en: "MPC, BiPC, CEC and MEC with experienced lecturers",
    subtitle_te: "అనుభవజ్ఞులైన అధ్యాపకులతో MPC, BiPC, CEC మరియు MEC",
  },
  {
    id: "demo-4",
    image_url: "/images/happy-students.jpg",
    title_en: "A Happy Place to Grow",
    title_te: "ఆనందంగా ఎదిగే చోటు",
    subtitle_en: "Sports, arts and activities for all-round development",
    subtitle_te: "సర్వతోముఖాభివృద్ధికి క్రీడలు, కళలు మరియు కార్యక్రమాలు",
  },
];

export const demoGallery = [
  ["activity-learning", "Activity-based learning", "కార్యాచరణ ఆధారిత అభ్యాసం"],
  ["library", "School library", "పాఠశాల గ్రంథాలయం"],
  ["love-to-learn", "Love to learn", "నేర్చుకోవడం ఇష్టం"],
  ["empty-classroom", "Spacious classrooms", "విశాలమైన తరగతి గదులు"],
  ["books", "Books for every reader", "ప్రతి పాఠకునికి పుస్తకాలు"],
  ["learning-desk", "Ready for class", "తరగతికి సిద్ధం"],
  ["classroom", "In the classroom", "తరగతి గదిలో"],
].map(([file, caption_en, caption_te]) => ({
  id: `demo-${file}`,
  image_url: `/images/${file}.jpg`,
  caption_en,
  caption_te,
}));

// Sample notices and events (dates are relative to today so they always look current).
const daysFromNow = (n) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
};

export const demoNotices = [
  { id: "demo-n1", is_pinned: true, notice_date: daysFromNow(-1),
    title_en: "Class 6 admissions 2027–28: applications open", title_te: "6వ తరగతి ప్రవేశాలు 2027–28: దరఖాస్తులు ప్రారంభం",
    body_en: "Apply online through the Telangana Model Schools portal. Entrance test date will be announced soon.",
    body_te: "తెలంగాణ మోడల్ స్కూల్స్ పోర్టల్ ద్వారా ఆన్‌లైన్‌లో దరఖాస్తు చేయండి. ప్రవేశ పరీక్ష తేదీ త్వరలో ప్రకటించబడుతుంది." },
  { id: "demo-n2", is_pinned: false, notice_date: daysFromNow(-3),
    title_en: "Half-yearly examination timetable released", title_te: "అర్ధవార్షిక పరీక్షల టైమ్‌టేబుల్ విడుదల",
    body_en: "Exams for classes 6–10 begin next month. Timetable is displayed on the school notice board.",
    body_te: "6–10 తరగతుల పరీక్షలు వచ్చే నెల ప్రారంభం. టైమ్‌టేబుల్ పాఠశాల నోటీసు బోర్డులో ఉంది." },
  { id: "demo-n3", is_pinned: false, notice_date: daysFromNow(-6),
    title_en: "Holiday on account of Diwali", title_te: "దీపావళి సందర్భంగా సెలవు",
    body_en: "School will remain closed. Classes resume as usual the next working day.",
    body_te: "పాఠశాలకు సెలవు. తదుపరి పని దినం నుండి తరగతులు యథావిధిగా జరుగుతాయి." },
  { id: "demo-n4", is_pinned: false, notice_date: daysFromNow(-10),
    title_en: "Intermediate scholarship applications – last date extended", title_te: "ఇంటర్మీడియట్ స్కాలర్‌షిప్ దరఖాస్తులు – చివరి తేదీ పొడిగింపు",
    body_en: "Eligible students should submit documents to the office before the deadline.",
    body_te: "అర్హులైన విద్యార్థులు గడువులోగా కార్యాలయంలో పత్రాలు సమర్పించాలి." },
  { id: "demo-n5", is_pinned: false, notice_date: daysFromNow(-14),
    title_en: "New school uniform distribution", title_te: "కొత్త పాఠశాల యూనిఫాం పంపిణీ",
    body_en: "Uniforms will be distributed class-wise. Parents may collect them from the office.",
    body_te: "యూనిఫాంలు తరగతుల వారీగా పంపిణీ చేయబడతాయి. తల్లిదండ్రులు కార్యాలయం నుండి తీసుకోవచ్చు." },
];

export const demoEvents = [
  { id: "demo-e1", event_date: daysFromNow(5), location: "School Auditorium",
    title_en: "Parent–Teacher Meeting", title_te: "తల్లిదండ్రులు–ఉపాధ్యాయుల సమావేశం",
    description_en: "Discuss your child's progress with class teachers.", description_te: "మీ పిల్లల ప్రగతి గురించి తరగతి ఉపాధ్యాయులతో చర్చించండి." },
  { id: "demo-e2", event_date: daysFromNow(12), location: "Playground",
    title_en: "Annual Sports Day", title_te: "వార్షిక క్రీడా దినోత్సవం",
    description_en: "Athletics, kabaddi, kho-kho and more. Parents are welcome.", description_te: "అథ్లెటిక్స్, కబడ్డీ, ఖో-ఖో మరియు మరిన్ని. తల్లిదండ్రులకు స్వాగతం." },
  { id: "demo-e3", event_date: daysFromNow(20), location: "Science Lab",
    title_en: "Science Exhibition", title_te: "సైన్స్ ప్రదర్శన",
    description_en: "Students present models and experiments.", description_te: "విద్యార్థులు నమూనాలు మరియు ప్రయోగాలు ప్రదర్శిస్తారు." },
  { id: "demo-e4", event_date: daysFromNow(35), location: "School Campus",
    title_en: "Children's Day Celebrations", title_te: "బాలల దినోత్సవ వేడుకలు",
    description_en: "Cultural programmes, games and prizes.", description_te: "సాంస్కృతిక కార్యక్రమాలు, ఆటలు మరియు బహుమతులు." },
  { id: "demo-e5", event_date: daysFromNow(50), location: "Auditorium",
    title_en: "Annual Day", title_te: "వార్షికోత్సవం",
    description_en: "Prize distribution and cultural evening.", description_te: "బహుమతి ప్రదానం మరియు సాంస్కృతిక సాయంత్రం." },
];
