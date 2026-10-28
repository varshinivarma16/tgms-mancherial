// Academic programme shown on the Academics page.
// Class-wise courses, final group list and seat details are pending school confirmation.

export const subjects = [
  { en: "Mathematics", te: "గణితం" },
  { en: "Physics", te: "భౌతిక శాస్త్రం" },
  { en: "Chemistry", te: "రసాయన శాస్త్రం" },
  { en: "Botany", te: "వృక్ష శాస్త్రం" },
  { en: "Zoology", te: "జంతు శాస్త్రం" },
  { en: "Economics", te: "అర్థశాస్త్రం" },
  { en: "Civics", te: "పౌరశాస్త్రం" },
  { en: "Commerce", te: "వాణిజ్య శాస్త్రం" },
  { en: "English", te: "ఆంగ్లం" },
  { en: "Telugu", te: "తెలుగు" },
  { en: "Hindi", te: "హిందీ" },
  { en: "Social Studies", te: "సాంఘిక శాస్త్రం" },
];

// Vocational (skill) courses.
export const vocational = [
  { en: "Media & Entertainment", te: "మీడియా & ఎంటర్‌టైన్‌మెంట్", icon: "eye" },
  { en: "Health Care", te: "ఆరోగ్య సంరక్షణ", icon: "award" },
];

// Intermediate groups. `subjects` are the group's main (optional) subjects.
export const groups = [
  {
    code: "MPC",
    en: "Mathematics, Physics, Chemistry",
    te: "గణితం, భౌతిక శాస్త్రం, రసాయన శాస్త్రం",
    for_en: "Engineering, technology and pure sciences",
    for_te: "ఇంజనీరింగ్, సాంకేతిక విద్య మరియు శాస్త్రాలు",
  },
  {
    code: "BiPC",
    en: "Botany, Zoology, Physics, Chemistry",
    te: "వృక్ష శాస్త్రం, జంతు శాస్త్రం, భౌతిక శాస్త్రం, రసాయన శాస్త్రం",
    for_en: "Medicine, pharmacy, agriculture and life sciences",
    for_te: "వైద్యం, ఫార్మసీ, వ్యవసాయం మరియు జీవ శాస్త్రాలు",
  },
  {
    code: "CEC",
    en: "Civics, Economics, Commerce",
    te: "పౌరశాస్త్రం, అర్థశాస్త్రం, వాణిజ్య శాస్త్రం",
    for_en: "Commerce, law, civil services and business",
    for_te: "వాణిజ్యం, న్యాయ విద్య, సివిల్ సర్వీసెస్ మరియు వ్యాపారం",
  },
  {
    code: "ACE",
    en: "Accountancy, Commerce, Economics",
    te: "అకౌంటెన్సీ, వాణిజ్య శాస్త్రం, అర్థశాస్త్రం",
    for_en: "Accounting, commerce, banking and business careers",
    for_te: "అకౌంటింగ్, వాణిజ్యం, బ్యాంకింగ్ మరియు వ్యాపార రంగాలు",
  },
];
