import { isSupabaseConfigured } from "@/lib/supabase/server";
import LoginForm from "./LoginForm";

export default async function LoginPage({ searchParams }) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-center text-2xl font-bold text-primary">Admin Login</h1>
        {!isSupabaseConfigured ? (
          <p className="mt-6 rounded bg-warning-light p-3 text-sm text-warning">
            Supabase is not connected yet. Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
            <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to <code>.env.local</code> and restart the server.
          </p>
        ) : (
          <>
            {error === "not-admin" && (
              <p className="mt-4 rounded bg-danger-light p-3 text-sm text-danger">
                This account is not an admin. Ask the site owner to add you to the admins list.
              </p>
            )}
            <LoginForm />
          </>
        )}
      </div>
    </div>
  );
}
