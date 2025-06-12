"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { usuariosService } from "@/lib/database"
import { isSupabaseConfigured } from "@/lib/supabase"
import type { Usuario } from "@/lib/supabase"

interface AuthContextType {
  user: Usuario | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
  isDemo: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar si hay un usuario guardado en localStorage
    const savedUser = localStorage.getItem("university_user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Error parsing saved user:", error)
        localStorage.removeItem("university_user")
      }
    }
    setLoading(false)
  }, [])

  const login = async (username: string, password: string) => {
    try {
      const userData = await usuariosService.authenticate(username, password)
      setUser(userData)
      localStorage.setItem("university_user", JSON.stringify(userData))
    } catch (error) {
      throw new Error("Credenciales inválidas")
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("university_user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        isDemo: !isSupabaseConfigured,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
