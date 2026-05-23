import { createClient } from "@supabase/supabase-js"

function getSupabaseUrl() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!url) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL")
  return url
}

/** Anon client — respects RLS (public reads, inquiry inserts) */
export function createPublicClient() {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!key) throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY")
  return createClient(getSupabaseUrl(), key)
}

/** Service role — admin API routes only; bypasses RLS */
export function createServiceClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!key) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY")
  return createClient(getSupabaseUrl(), key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
