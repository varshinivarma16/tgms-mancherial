import { createPublicClient } from "@/lib/supabase/server";

// POST records one page view and returns the totals; GET only reads them.
async function stats(fn) {
  const supabase = createPublicClient();
  if (!supabase) return Response.json(null);
  const { data, error } = await supabase.rpc(fn);
  if (error) return Response.json(null);
  return Response.json(data, { headers: { "Cache-Control": "no-store" } });
}

export const GET = () => stats("page_view_stats");
export const POST = () => stats("record_page_view");
