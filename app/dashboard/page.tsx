"use client"

import { useState, useEffect } from "react"
import { getUserSession, clearUserSession } from "@/lib/auth-basic"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const currentUser = getUserSession()
    if (!currentUser) {
      router.push("/login")
    } else {
      setUser(currentUser)
    }
    setLoading(false)
  }, [router])

  const handleSignOut = () => {
    clearUserSession()
    router.push("/login")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">+</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Sistema de Gestión Médica</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                <p className="font-medium">{user.username}</p>
                <p className="text-gray-500">{user.rol}</p>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <span className="mr-2">🚪</span>
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Bienvenido, {user.username}</h2>
          <p className="text-gray-600">Panel de control del sistema de gestión médica</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Pacientes</p>
                <p className="text-2xl font-bold text-gray-900">1,234</p>
              </div>
              <span className="text-2xl">👥</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Citas Hoy</p>
                <p className="text-2xl font-bold text-gray-900">23</p>
              </div>
              <span className="text-2xl">📅</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Historiales</p>
                <p className="text-2xl font-bold text-gray-900">856</p>
              </div>
              <span className="text-2xl">📋</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Doctores</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <span className="text-2xl">👨‍⚕️</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200">
                <span className="font-medium text-blue-900">➕ Registrar Nuevo Paciente</span>
              </button>
              <button className="w-full text-left px-4 py-3 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200">
                <span className="font-medium text-green-900">📅 Programar Cita</span>
              </button>
              <button className="w-full text-left px-4 py-3 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200">
                <span className="font-medium text-purple-900">📋 Crear Historial Médico</span>
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Navegación Principal</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 text-center bg-gray-50 hover:bg-gray-100 rounded-lg border">
                <div className="text-2xl mb-2">👥</div>
                <span className="text-sm font-medium text-gray-900">Pacientes</span>
              </button>
              <button className="p-4 text-center bg-gray-50 hover:bg-gray-100 rounded-lg border">
                <div className="text-2xl mb-2">📅</div>
                <span className="text-sm font-medium text-gray-900">Citas</span>
              </button>
              <button className="p-4 text-center bg-gray-50 hover:bg-gray-100 rounded-lg border">
                <div className="text-2xl mb-2">📋</div>
                <span className="text-sm font-medium text-gray-900">Historiales</span>
              </button>
              <button className="p-4 text-center bg-gray-50 hover:bg-gray-100 rounded-lg border">
                <div className="text-2xl mb-2">👨‍⚕️</div>
                <span className="text-sm font-medium text-gray-900">Doctores</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
