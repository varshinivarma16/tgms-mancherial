// Sample content (free Unsplash photos in /public/images) shown until the admin
// uploads real slides/photos. As soon as a table has rows, these are no longer used.

export const demoSlides = [
  {
    id: "demo-entrance",
    image_url: "/images/school-entrance.jpg",
  },
  {
    id: "demo-hero2",
    image_url: "/images/hero2.jpg",
  },
  {
    id: "demo-assembly",
    image_url: "/images/school-assembly.jpg",
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

// Sample board results and toppers for the Results page.
export const demoResults = [
  { id: "demo-r1", year: "2025–26", exam: "ssc", appeared: 98, passed: 96, distinctions: 41 },
  { id: "demo-r2", year: "2024–25", exam: "ssc", appeared: 95, passed: 92, distinctions: 36 },
  { id: "demo-r3", year: "2025–26", exam: "inter2", appeared: 152, passed: 141, distinctions: 58 },
  { id: "demo-r4", year: "2024–25", exam: "inter2", appeared: 148, passed: 135, distinctions: 50 },
];

export const demoToppers = [
  { id: "demo-t1", year: "2025–26", exam: "ssc", name_en: "K. Sri Lakshmi", name_te: "కె. శ్రీ లక్ష్మి", marks: "10 GPA" },
  { id: "demo-t2", year: "2025–26", exam: "inter2", group_en: "MPC", name_en: "B. Rahul", name_te: "బి. రాహుల్", marks: "982/1000" },
  { id: "demo-t3", year: "2025–26", exam: "inter2", group_en: "BiPC", name_en: "M. Anusha", name_te: "ఎం. అనూష", marks: "975/1000" },
];

// Sample labs shown until the admin adds real ones.
export const demoLabs = [
  ["Physics Lab", "భౌతిక శాస్త్ర ప్రయోగశాల", "Experiments in mechanics, light, electricity and magnetism with apparatus for every student group.", "యాంత్రికశాస్త్రం, కాంతి, విద్యుత్ మరియు అయస్కాంతత్వంపై ప్రయోగాలు."],
  ["Chemistry Lab", "రసాయన శాస్త్ర ప్రయోగశాల", "Safe, well-ventilated lab for titrations, salt analysis and chemical reactions.", "టైట్రేషన్లు, లవణ విశ్లేషణ మరియు రసాయన చర్యల కోసం సురక్షితమైన ప్రయోగశాల."],
  ["Atal Tinkering Lab", "అటల్ టింకరింగ్ ల్యాబ్", "Hands-on innovation space with robotics, electronics, sensors and 3D printing.", "రోబోటిక్స్, ఎలక్ట్రానిక్స్, సెన్సార్లు మరియు 3D ప్రింటింగ్‌తో ఆవిష్కరణల కేంద్రం."],
  ["Botany Lab", "వృక్ష శాస్త్ర ప్రయోగశాల", "Microscopes, specimens and slides for the study of plant life.", "మొక్కల అధ్యయనానికి సూక్ష్మదర్శినులు, నమూనాలు మరియు స్లైడ్లు."],
  ["Zoology Lab", "జంతు శాస్త్ర ప్రయోగశాల", "Preserved specimens, models and charts for the study of animal life.", "జంతు జీవ అధ్యయనానికి నమూనాలు, మోడళ్లు మరియు చార్టులు."],
  ["Maths Lab", "గణిత ప్రయోగశాల", "Models, kits and activities that make mathematical concepts easy to see and understand.", "గణిత భావనలను సులభంగా అర్థం చేసుకునేలా మోడళ్లు మరియు కార్యకలాపాలు."],
  ["Biology Lab", "జీవ శాస్త్ర ప్రయోగశాల", "Microscopes, models and practical work for high school biology.", "ఉన్నత పాఠశాల జీవశాస్త్రానికి సూక్ష్మదర్శినులు మరియు ప్రయోగాలు."],
  ["ICT Lab", "ICT ల్యాబ్", "Computers with internet for digital literacy, coding and online learning.", "డిజిటల్ అక్షరాస్యత, కోడింగ్ మరియు ఆన్‌లైన్ అభ్యాసానికి ఇంటర్నెట్‌తో కంప్యూటర్లు."],
].map(([title_en, title_te, description_en, description_te], i) => ({ id: `demo-lab-${i}`, title_en, title_te, description_en, description_te, image_url: "" }));

// Sample activities shown until the admin adds real ones.
export const demoActivities = [
  ["Sports & Games", "క్రీడలు", "Cricket, kabaddi, kho-kho, volleyball and athletics with regular inter-school competitions.", "క్రికెట్, కబడ్డీ, ఖో-ఖో, వాలీబాల్ మరియు అథ్లెటిక్స్, అంతర్ పాఠశాల పోటీలతో."],
  ["Yoga & Fitness", "యోగా & ఫిట్‌నెస్", "Daily yoga and physical training for health, focus and discipline.", "ఆరోగ్యం, ఏకాగ్రత మరియు క్రమశిక్షణ కోసం రోజువారీ యోగా మరియు శారీరక శిక్షణ."],
  ["Cultural Programmes", "సాంస్కృతిక కార్యక్రమాలు", "Dance, music, drama and celebrations of national and festival days.", "నృత్యం, సంగీతం, నాటకం మరియు జాతీయ, పండుగ దినోత్సవాలు."],
  ["Science Fair", "సైన్స్ ఫెయిర్", "Students build models and projects and present them at school and district science fairs.", "విద్యార్థులు మోడళ్లు, ప్రాజెక్టులు తయారు చేసి పాఠశాల మరియు జిల్లా సైన్స్ ఫెయిర్‌లలో ప్రదర్శిస్తారు."],
  ["Eco Club", "ఎకో క్లబ్", "Tree planting, cleanliness drives and awareness about saving water and energy.", "మొక్కలు నాటడం, పరిశుభ్రత కార్యక్రమాలు మరియు నీరు, శక్తి పొదుపుపై అవగాహన."],
  ["Debates & Quiz", "డిబేట్ & క్విజ్", "Elocution, essay writing, debates and quiz competitions to build confidence.", "ఆత్మవిశ్వాసం పెంచేందుకు వక్తృత్వం, వ్యాసరచన, డిబేట్ మరియు క్విజ్ పోటీలు."],
].map(([title_en, title_te, description_en, description_te], i) => ({ id: `demo-activity-${i}`, title_en, title_te, description_en, description_te, image_url: "" }));

// Sample facilities shown until the admin adds real ones.
export const demoFacilities = [
  ["Digital Classrooms", "డిజిటల్ తరగతి గదులు", "Smart boards and projectors that bring lessons to life with videos, animations and e-content.", "వీడియోలు, యానిమేషన్లు మరియు ఇ-కంటెంట్‌తో పాఠాలను ఆసక్తికరంగా చేసే స్మార్ట్ బోర్డులు మరియు ప్రొజెక్టర్లు."],
  ["Computer Room", "కంప్యూటర్ గది", "Desktop computers where students practise typing, office tools and basic programming.", "టైపింగ్, ఆఫీస్ టూల్స్ మరియు ప్రాథమిక ప్రోగ్రామింగ్ సాధన చేయడానికి కంప్యూటర్లు."],
  ["Mid-Day Meals", "మధ్యాహ్న భోజనం", "Free, nutritious hot lunch served to students every school day.", "ప్రతి పాఠశాల రోజు విద్యార్థులకు ఉచితంగా పోషకాహారంతో కూడిన వేడి భోజనం."],
  ["Free Breakfast", "ఉచిత అల్పాహారం", "Free morning tiffin so that no child starts classes hungry.", "ఏ విద్యార్థీ ఆకలితో తరగతులు మొదలుపెట్టకుండా ఉచిత ఉదయం టిఫిన్."],
  ["Girls Hostel", "బాలికల వసతి గృహం", "Safe residential hostel with 100 seats for Intermediate 1st and 2nd year girls, looked after by separate women staff.", "ఇంటర్మీడియట్ మొదటి మరియు రెండవ సంవత్సరం బాలికలకు 100 సీట్లతో సురక్షితమైన వసతి గృహం, ప్రత్యేక మహిళా సిబ్బంది పర్యవేక్షణలో."],
].map(([title_en, title_te, description_en, description_te], i) => ({ id: `demo-facility-${i}`, title_en, title_te, description_en, description_te, image_url: "" }));
