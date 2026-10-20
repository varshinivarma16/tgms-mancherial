// Sample strength figures, shown on the School Strength page until the admin adds real rows
// (Admin panel → School Strength and Caste-wise Strength). The year lives in Admin → Settings & Pages.

const row = (level, class_en, class_te, section_en, boys, girls, transgender = 0) => ({ level, class_en, class_te, section_en, boys, girls, transgender });

export const strength = {
  school: [
    row("school", "VI", "6వ తరగతి", "English", 46, 14),
    row("school", "VII", "7వ తరగతి", "English", 41, 15),
    row("school", "VIII", "8వ తరగతి", "English", 61, 21),
    row("school", "IX", "9వ తరగతి", "English", 65, 24),
    row("school", "X", "10వ తరగతి", "English", 56, 25),
  ],
  college: [
    row("college", "Intermediate I Year", "ఇంటర్ ప్రథమ సంవత్సరం", "MPC", 9, 21),
    row("college", "Intermediate I Year", "ఇంటర్ ప్రథమ సంవత్సరం", "BiPC", 4, 30),
    row("college", "Intermediate I Year", "ఇంటర్ ప్రథమ సంవత్సరం", "CEC", 7, 14),
    row("college", "Intermediate II Year", "ఇంటర్ ద్వితీయ సంవత్సరం", "MPC", 15, 19),
    row("college", "Intermediate II Year", "ఇంటర్ ద్వితీయ సంవత్సరం", "BiPC", 4, 38),
    row("college", "Intermediate II Year", "ఇంటర్ ద్వితీయ సంవత్సరం", "CEC", 8, 4),
  ],
};

// [group, st_boys, st_girls, sc_boys, sc_girls, gen_boys, gen_girls]
const caste = (kind, list) =>
  list.map(([group_en, st_boys, st_girls, sc_boys, sc_girls, gen_boys, gen_girls]) => ({ kind, group_en, st_boys, st_girls, sc_boys, sc_girls, gen_boys, gen_girls }));

export const casteStrength = [
  ...caste("day", [
    ["XI MPC", 1, 3, 3, 0, 5, 8],
    ["XI BiPC", 1, 3, 2, 0, 1, 9],
    ["XI CEC", 7, 2, 0, 2, 0, 1],
    ["XII MPC", 3, 0, 2, 0, 10, 1],
    ["XII BiPC", 2, 5, 0, 2, 2, 5],
    ["XII CEC", 0, 0, 3, 0, 5, 1],
  ]),
  ...caste("hostel", [
    ["XI MPC", 0, 1, 0, 1, 0, 8],
    ["XI BiPC", 0, 5, 0, 2, 0, 11],
    ["XI CEC", 0, 2, 0, 1, 0, 6],
    ["XII MPC", 0, 4, 0, 0, 0, 14],
    ["XII BiPC", 0, 11, 0, 2, 0, 13],
    ["XII CEC", 0, 0, 0, 2, 0, 1],
  ]),
];
