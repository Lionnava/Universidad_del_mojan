import { createClient } from "@/lib/supabase/server"

export async function getAuthSession() {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return null
  }

  return { user }
}

export async function requireAuth() {
  const session = await getAuthSession()
  if (!session) {
    throw new Error("Unauthorized")
  }
  return session
}
