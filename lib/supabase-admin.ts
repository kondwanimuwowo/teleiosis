import { createClient } from '@supabase/supabase-js'

// Admin client — uses service_role key to bypass RLS
// NEVER expose this client on the browser/client side
function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY — add it to your .env file')
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

export const supabaseAdmin = new Proxy({} as ReturnType<typeof createAdminClient>, {
  get(_, prop) {
    return createAdminClient()[prop as keyof ReturnType<typeof createAdminClient>]
  }
})
