// Supabase Edge Function "claude" – reads the slips with the company Claude API key.
// The key stays on the server (secret ANTHROPIC_API_KEY); only signed-in users can use it.
// Deploy: Supabase → Edge Functions → Deploy a new function → Via Editor → name: claude → paste this → Deploy.
import { createClient } from "jsr:@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (body: unknown, status = 200, extra: Record<string, string> = {}) =>
  new Response(typeof body === "string" ? body : JSON.stringify(body), {
    status, headers: { ...cors, "Content-Type": "application/json", ...extra },
  });

// models the app may ask for; anything else falls back to Opus
const MODELS = ["claude-opus-5-5", "claude-sonnet-5-5", "claude-haiku-4-5-20251001"];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: { message: "Use POST" } }, 405);

  // only people signed in to the register
  const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, {
    global: { headers: { Authorization: req.headers.get("Authorization") ?? "" } },
  });
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return json({ error: { message: "Sign in first" } }, 401);

  const key = Deno.env.get("ANTHROPIC_API_KEY");
  if (!key) return json({ error: { message: "ANTHROPIC_API_KEY secret is not set in Supabase" } }, 500);

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return json({ error: { message: "Bad request" } }, 400); }
  if (!MODELS.includes(String(body.model))) body.model = "claude-opus-5-5";
  body.max_tokens = Math.min(Number(body.max_tokens) || 4000, 8000);
  delete body.stream;

  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
    body: JSON.stringify(body),
  });
  const ra = r.headers.get("retry-after");
  return json(await r.text(), r.status, ra ? { "retry-after": ra } : {});
});
