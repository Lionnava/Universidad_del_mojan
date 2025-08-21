// Simple authentication system using direct database queries
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export interface User {
  id: number
  username: string
  email: string
  rol: string
  activo: boolean
}

export async function signIn(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
  try {
    // Query the usuarios table directly
    const { data, error } = await supabase.from("usuarios").select("*").eq("email", email).eq("activo", true).single()

    if (error || !data) {
      return { user: null, error: "Usuario no encontrado o inactivo" }
    }

    // In a real app, you'd hash and compare passwords
    // For demo purposes, we'll do a simple comparison
    if (data.password_hash === password) {
      const user: User = {
        id: data.id,
        username: data.username,
        email: data.email,
        rol: data.rol,
        activo: data.activo,
      }
      return { user, error: null }
    } else {
      return { user: null, error: "Contraseña incorrecta" }
    }
  } catch (error) {
    return { user: null, error: "Error de conexión" }
  }
}

export function setUserSession(user: User) {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(user))
  }
}

export function getUserSession(): User | null {
  if (typeof window !== "undefined") {
    const userStr = localStorage.getItem("user")
    return userStr ? JSON.parse(userStr) : null
  }
  return null
}

export function clearUserSession() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user")
  }
}
