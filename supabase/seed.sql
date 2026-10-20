-- Optional sample data. Run in Supabase → SQL Editor after schema.sql.
-- Delete these from the admin panel once you add real notices and events.

insert into notices (title_en, title_te, body_en, body_te, notice_date, is_pinned) values
('Class 6 admissions 2027–28: applications open', '6వ తరగతి ప్రవేశాలు 2027–28: దరఖాస్తులు ప్రారంభం',
 'Apply online through the Telangana Model Schools portal. Entrance test date will be announced soon.',
 'తెలంగాణ మోడల్ స్కూల్స్ పోర్టల్ ద్వారా ఆన్‌లైన్‌లో దరఖాస్తు చేయండి. ప్రవేశ పరీక్ష తేదీ త్వరలో ప్రకటించబడుతుంది.',
 current_date - 1, true),
('Half-yearly examination timetable released', 'అర్ధవార్షిక పరీక్షల టైమ్‌టేబుల్ విడుదల',
 'Exams for classes 6–10 begin next month. Timetable is displayed on the school notice board.',
 '6–10 తరగతుల పరీక్షలు వచ్చే నెల ప్రారంభం. టైమ్‌టేబుల్ పాఠశాల నోటీసు బోర్డులో ఉంది.',
 current_date - 3, false),
('Holiday on account of Diwali', 'దీపావళి సందర్భంగా సెలవు',
 'School will remain closed. Classes resume as usual the next working day.',
 'పాఠశాలకు సెలవు. తదుపరి పని దినం నుండి తరగతులు యథావిధిగా జరుగుతాయి.',
 current_date - 6, false),
('Intermediate scholarship applications – last date extended', 'ఇంటర్మీడియట్ స్కాలర్‌షిప్ దరఖాస్తులు – చివరి తేదీ పొడిగింపు',
 'Eligible students should submit documents to the office before the deadline.',
 'అర్హులైన విద్యార్థులు గడువులోగా కార్యాలయంలో పత్రాలు సమర్పించాలి.',
 current_date - 10, false),
('New school uniform distribution', 'కొత్త పాఠశాల యూనిఫాం పంపిణీ',
 'Uniforms will be distributed class-wise. Parents may collect them from the office.',
 'యూనిఫాంలు తరగతుల వారీగా పంపిణీ చేయబడతాయి. తల్లిదండ్రులు కార్యాలయం నుండి తీసుకోవచ్చు.',
 current_date - 14, false);

insert into events (title_en, title_te, description_en, description_te, event_date, location) values
('Parent–Teacher Meeting', 'తల్లిదండ్రులు–ఉపాధ్యాయుల సమావేశం',
 'Discuss your child''s progress with class teachers.', 'మీ పిల్లల ప్రగతి గురించి తరగతి ఉపాధ్యాయులతో చర్చించండి.',
 current_date + 5, 'School Auditorium'),
('Annual Sports Day', 'వార్షిక క్రీడా దినోత్సవం',
 'Athletics, kabaddi, kho-kho and more. Parents are welcome.', 'అథ్లెటిక్స్, కబడ్డీ, ఖో-ఖో మరియు మరిన్ని. తల్లిదండ్రులకు స్వాగతం.',
 current_date + 12, 'Playground'),
('Science Exhibition', 'సైన్స్ ప్రదర్శన',
 'Students present models and experiments.', 'విద్యార్థులు నమూనాలు మరియు ప్రయోగాలు ప్రదర్శిస్తారు.',
 current_date + 20, 'Science Lab'),
('Children''s Day Celebrations', 'బాలల దినోత్సవ వేడుకలు',
 'Cultural programmes, games and prizes.', 'సాంస్కృతిక కార్యక్రమాలు, ఆటలు మరియు బహుమతులు.',
 current_date + 35, 'School Campus'),
('Annual Day', 'వార్షికోత్సవం',
 'Prize distribution and cultural evening.', 'బహుమతి ప్రదానం మరియు సాంస్కృతిక సాయంత్రం.',
 current_date + 50, 'Auditorium');

-- Sample class-wise strength (replace with real numbers from the admin panel → School Strength).
insert into class_strength (level, class_en, class_te, sections, boys, girls, sort_order) values
('school', 'Class VI', '6వ తరగతి', 2, 46, 52, 1),
('school', 'Class VII', '7వ తరగతి', 2, 45, 51, 2),
('school', 'Class VIII', '8వ తరగతి', 2, 48, 52, 3),
('school', 'Class IX', '9వ తరగతి', 2, 44, 53, 4),
('school', 'Class X', '10వ తరగతి', 2, 43, 52, 5),
('college', 'Intermediate 1st Year (MPC, BiPC, CEC, MEC)', 'ఇంటర్ ప్రథమ సంవత్సరం (MPC, BiPC, CEC, MEC)', 4, 70, 86, 6),
('college', 'Intermediate 2nd Year (MPC, BiPC, CEC, MEC)', 'ఇంటర్ ద్వితీయ సంవత్సరం (MPC, BiPC, CEC, MEC)', 4, 68, 82, 7);
