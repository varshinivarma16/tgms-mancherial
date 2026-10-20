# TGMS Mancherial — School Website

Next.js (JavaScript) + Tailwind CSS + Supabase, deployed on Cloudflare Workers.

- Public site in **English** (`/en`) and **Telugu** (`/te`) with a language switch
- **Admin panel** at `/admin` to manage notices, events, gallery, staff and all page text
- Floating **WhatsApp** button and WhatsApp enquiry links

## 1. Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Without Supabase the site shows placeholder content.

## 2. Connect Supabase

1. Create a free project at https://supabase.com.
2. **SQL Editor** → paste and run `supabase/schema.sql`.
3. **Authentication → Sign In / Providers** → turn off "Allow new users to sign up".
4. **Authentication → Users → Add user** → create the admin's email and password.
5. Make that user an admin (SQL Editor):
   ```sql
   insert into admins (user_id, email)
   select id, email from auth.users where email = 'admin@yourschool.in';
   ```
6. Copy `.env.example` to `.env.local` and fill in values from **Project Settings → API**.
7. Restart `npm run dev`, go to `/admin`, and log in.

## 3. Deploy to Cloudflare

```bash
npx wrangler login
npm run deploy
```

Then in the Cloudflare dashboard → Workers → `tgms-mancherial` → Settings → Variables, add
`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (also keep them in `.env.local`, since
`NEXT_PUBLIC_` values are baked in at build time). Add your domain under **Domains & Routes**.

`npm run preview` runs the Cloudflare build locally before deploying.

## Where things live

| What | File |
| --- | --- |
| School colors | `src/app/globals.css` (`--color-primary`, `--color-accent`) |
| Fixed text (menus, academics, admissions) in both languages | `src/lib/i18n.js` |
| Default content before admin edits | `src/lib/data.js` |
| Admin sections and form fields | `src/lib/admin.js` |
| Public pages | `src/app/[lang]/` |
| Admin pages | `src/app/admin/` |
| Database tables & security rules | `supabase/schema.sql` |
