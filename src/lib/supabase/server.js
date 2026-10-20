import "server-only";
import { createServerClient } from "@supabase/ssr";
import { createClient as createPlainClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

// Cookie-less client for public pages (read-only, anonymous).
export function createPublicClient() {
  if (!isSupabaseConfigured) return null;
  return createPlainClient(url, anonKey, { auth: { persistSession: false } });
}

// Cookie-aware client for the admin panel (acts as the logged-in user).
export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(url, anonKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Called from a Server Component; proxy.js refreshes the session instead.
        }
      },
    },
  });
}
