"use client"

import type React from "react"
import { useState } from "react"
import { signIn, setUserSession } from "@/lib/auth-basic"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const { user, error: authError } = await signIn(email, password)

      if (authError || !user) {
        setError(authError || "Error al iniciar sesión")
      } else {
        setUserSession(user)
        router.push("/dashboard")
      }
    } catch (error) {
      setError("Error al iniciar sesión")
    } finally {
      setLoading(false)
    }
  }

  const testCredentials = [
    { email: "admin@hospital.com", password: "cualquier_contraseña", role: "Administrador" },
    { email: "doctor@hospital.com", password: "cualquier_contraseña", role: "Doctor" },
    { email: "enfermera@hospital.com", password: "cualquier_contraseña", role: "Enfermera" },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xl font-bold">+</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Sistema de Gestión Médica</h1>
          <p className="mt-2 text-gray-600">Inicia sesión para acceder al sistema</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Iniciar Sesión</h2>
            <p className="text-gray-600">Ingresa tus credenciales para acceder</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="tu@email.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Tu contraseña"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </button>
          </form>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Credenciales de Prueba</h3>
          <div className="space-y-2">
            {testCredentials.map((cred, index) => (
              <div key={index} className="text-xs space-y-1">
                <p className="font-medium text-gray-700">{cred.role}:</p>
                <p className="text-gray-500">
                  {cred.email} / {cred.password}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
