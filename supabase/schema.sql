-- Run this once in Supabase → SQL Editor.

-- Admins: only users listed here can edit content.
create table if not exists admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text
);

create or replace function is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from admins where user_id = auth.uid());
$$;

-- Site-wide settings (single row, id = 1).
create table if not exists settings (
  id int primary key default 1 check (id = 1),
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz default now()
);
insert into settings (id) values (1) on conflict do nothing;

create table if not exists notices (
  id bigint generated always as identity primary key,
  title_en text not null,
  title_te text,
  body_en text,
  body_te text,
  notice_date date not null default current_date,
  is_pinned boolean not null default false,
  created_at timestamptz default now()
);

create table if not exists events (
  id bigint generated always as identity primary key,
  title_en text not null,
  title_te text,
  description_en text,
  description_te text,
  event_date date not null,
  location text,
  created_at timestamptz default now()
);

create table if not exists gallery (
  id bigint generated always as identity primary key,
  image_url text not null,
  caption_en text,
  caption_te text,
  created_at timestamptz default now()
);

create table if not exists staff (
  id bigint generated always as identity primary key,
  name_en text not null,
  name_te text,
  role_en text,
  role_te text,
  category text not null default 'teaching',  -- teaching | guest | vocational | support
  qualification text,
  experience text,
  phone text,
  photo_url text,
  sort_order int not null default 0,
  created_at timestamptz default now()
);

-- For databases created before these columns existed.
alter table staff add column if not exists category text not null default 'teaching';
alter table staff add column if not exists qualification text;
alter table staff add column if not exists experience text;
alter table staff add column if not exists phone text;

-- Home page slideshow.
create table if not exists hero_slides (
  id bigint generated always as identity primary key,
  image_url text not null,
  title_en text,
  title_te text,
  subtitle_en text,
  subtitle_te text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz default now()
);

-- Class-wise student strength (School Strength page).
create table if not exists class_strength (
  id bigint generated always as identity primary key,
  level text not null default 'school' check (level in ('school', 'college')),
  class_en text not null,
  class_te text,
  sections int not null default 1,
  boys int not null default 0,
  girls int not null default 0,
  transgender int not null default 0,
  section_en text,  -- e.g. "A (English)" or "B (BiPC)"
  sort_order int not null default 0,
  created_at timestamptz default now()
);

alter table class_strength add column if not exists transgender int not null default 0;
alter table class_strength add column if not exists section_en text;

-- Class timetables: one row per class per day, subjects for each period.
create table if not exists timetable (
  id bigint generated always as identity primary key,
  class_en text not null,  -- e.g. "Class 6" or "Intermediate I Year MPC"
  day text not null check (day in ('mon','tue','wed','thu','fri','sat')),
  p1 text, p2 text, p3 text, p4 text, p5 text, p6 text, p7 text, p8 text,
  sort_order int not null default 0,
  created_at timestamptz default now()
);

-- Board exam results per year (pass % is worked out from appeared/passed).
create table if not exists results (
  id bigint generated always as identity primary key,
  year text not null,  -- e.g. "2025–26"
  exam text not null default 'ssc' check (exam in ('ssc', 'inter1', 'inter2')),
  appeared int not null default 0,
  passed int not null default 0,
  distinctions int not null default 0,
  created_at timestamptz default now()
);

-- Top-scoring students shown on the Results page.
create table if not exists toppers (
  id bigint generated always as identity primary key,
  name_en text not null,
  name_te text,
  year text not null,
  exam text not null default 'ssc' check (exam in ('ssc', 'inter1', 'inter2')),
  group_en text,  -- e.g. MPC
  marks text,     -- e.g. "10/10 GPA" or "985/1000"
  photo_url text,
  sort_order int not null default 0,
  created_at timestamptz default now()
);

-- Facilities page: labs, library, hostel...
create table if not exists facilities (
  id bigint generated always as identity primary key,
  title_en text not null,
  title_te text,
  description_en text,
  description_te text,
  image_url text,
  sort_order int not null default 0,
  created_at timestamptz default now()
);

-- Frequently asked questions for parents.
create table if not exists faqs (
  id bigint generated always as identity primary key,
  question_en text not null,
  question_te text,
  answer_en text,
  answer_te text,
  sort_order int not null default 0,
  created_at timestamptz default now()
);

-- Student and school achievements (shown on the Achievements page).
create table if not exists achievements (
  id bigint generated always as identity primary key,
  title_en text not null,
  title_te text,
  description_en text,
  description_te text,
  category text not null default 'academic',  -- academic | sports | cultural | outside | other
  achievement_date date,
  image_url text,
  created_at timestamptz default now()
);

-- Former students and what they have gone on to do (shown on the Alumni page).
create table if not exists alumni (
  id bigint generated always as identity primary key,
  name_en text not null,
  name_te text,
  batch text,
  current_role_en text,
  current_role_te text,
  achievement_en text,
  achievement_te text,
  photo_url text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- Caste-wise counts (usually Intermediate), split into day scholars and hostel students.
create table if not exists caste_strength (
  id bigint generated always as identity primary key,
  group_en text not null,  -- e.g. "XI A (MPC)"
  kind text not null default 'day' check (kind in ('day', 'hostel')),
  st_boys int not null default 0,
  st_girls int not null default 0,
  sc_boys int not null default 0,
  sc_girls int not null default 0,
  gen_boys int not null default 0,
  gen_girls int not null default 0,
  sort_order int not null default 0,
  created_at timestamptz default now()
);

-- Row Level Security: everyone can read, only admins can write.
do $$
declare t text;
begin
  foreach t in array array['settings','notices','events','gallery','staff','hero_slides','class_strength','caste_strength','achievements','alumni','timetable','results','toppers','facilities','faqs'] loop
    execute format('alter table %I enable row level security', t);
    execute format('drop policy if exists "public read" on %I', t);
    execute format('create policy "public read" on %I for select using (true)', t);
    execute format('drop policy if exists "admin write" on %I', t);
    execute format('create policy "admin write" on %I for all using (is_admin()) with check (is_admin())', t);
  end loop;
end $$;

alter table admins enable row level security;
drop policy if exists "admin read self" on admins;
create policy "admin read self" on admins for select using (user_id = auth.uid());

-- Public bucket for photos.
insert into storage.buckets (id, name, public) values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "media public read" on storage.objects;
create policy "media public read" on storage.objects for select using (bucket_id = 'media');
drop policy if exists "media admin write" on storage.objects;
create policy "media admin write" on storage.objects for all
  using (bucket_id = 'media' and is_admin()) with check (bucket_id = 'media' and is_admin());

-- Page view counter (shown in the footer). Visitors can only change it through these functions.
create table if not exists page_views (
  day date primary key,
  views bigint not null default 0
);
alter table page_views enable row level security;

create or replace function page_view_stats() returns json
language sql stable security definer set search_path = public as $$
  select json_build_object(
    'total', coalesce((select sum(views) from page_views), 0),
    'today', coalesce((select views from page_views where day = (now() at time zone 'Asia/Kolkata')::date), 0)
  );
$$;

create or replace function record_page_view() returns json
language plpgsql security definer set search_path = public as $$
begin
  insert into page_views (day, views) values ((now() at time zone 'Asia/Kolkata')::date, 1)
  on conflict (day) do update set views = page_views.views + 1;
  return page_view_stats();
end $$;

grant execute on function page_view_stats() to anon, authenticated;
grant execute on function record_page_view() to anon, authenticated;

-- After creating your admin user in Authentication → Users, run:
-- insert into admins (user_id, email) select id, email from auth.users where email = 'admin@yourschool.in';
