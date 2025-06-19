"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  GraduationCap,
  Users,
  BookOpen,
  FileText,
  BarChart3,
  Settings,
  UserPlus,
  Calendar,
  Award,
  Database,
} from "lucide-react"

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState("")
  const [loginForm, setLoginForm] = useState({ username: "", password: "" })
  const [systemInfo, setSystemInfo] = useState({
    version: "27.0.0",
    mode: "PRODUCCIÓN",
    university: "Mi Universidad",
    totalStudents: 0,
    totalProfessors: 0,
    totalSubjects: 0,
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    // Simulación de login - En producción esto conectaría con la base de datos
    if (loginForm.username === "admin" && loginForm.password === "admin123") {
      setIsAuthenticated(true)
      setUserRole("gerencial")
      localStorage.setItem("user", JSON.stringify({ username: "admin", role: "gerencial" }))
    } else {
      alert("Credenciales incorrectas. Usuario: admin, Contraseña: admin123")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUserRole("")
    localStorage.removeItem("user")
  }

  useEffect(() => {
    // Verificar si hay usuario logueado
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      const user = JSON.parse(savedUser)
      setIsAuthenticated(true)
      setUserRole(user.role)
    }
  }, [])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Universidad Móvil</CardTitle>
            <CardDescription>
              <Badge variant="default" className="bg-green-600">
                V{systemInfo.version} - {systemInfo.mode}
              </Badge>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Usuario</Label>
                <Input
                  id="username"
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  placeholder="Ingresa tu usuario"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  placeholder="Ingresa tu contraseña"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Iniciar Sesión
              </Button>
            </form>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-sm text-gray-700 mb-2">Credenciales de Prueba:</h4>
              <p className="text-sm text-gray-600">
                Usuario: <code className="bg-gray-200 px-1 rounded">admin</code>
              </p>
              <p className="text-sm text-gray-600">
                Contraseña: <code className="bg-gray-200 px-1 rounded">admin123</code>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <GraduationCap className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Universidad Móvil</h1>
                <Badge variant="outline" className="text-xs">
                  V{systemInfo.version} - {systemInfo.mode}
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">Rol: {userRole}</Badge>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Estudiantes</p>
                  <p className="text-2xl font-bold text-gray-900">{systemInfo.totalStudents}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BookOpen className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Profesores</p>
                  <p className="text-2xl font-bold text-gray-900">{systemInfo.totalProfessors}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="w-8 h-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Materias</p>
                  <p className="text-2xl font-bold text-gray-900">{systemInfo.totalSubjects}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Database className="w-8 h-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Estado BD</p>
                  <p className="text-sm font-bold text-green-600">Activa</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserPlus className="w-5 h-5 mr-2 text-blue-600" />
                Gestión de Estudiantes
              </CardTitle>
              <CardDescription>
                Registrar nuevos estudiantes, gestionar inscripciones y consultar información académica
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Acceder al Módulo
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-green-600" />
                Inscripciones
              </CardTitle>
              <CardDescription>
                Gestionar pre-inscripciones, inscripciones formales y asignación de secciones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Gestionar Inscripciones
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="w-5 h-5 mr-2 text-purple-600" />
                Constancias
              </CardTitle>
              <CardDescription>Generar constancias de notas, estudios y certificados académicos</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Generar Constancias
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-orange-600" />
                Reportes
              </CardTitle>
              <CardDescription>Generar reportes estadísticos, listados y análisis académicos</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Ver Reportes
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-indigo-600" />
                Gestión Académica
              </CardTitle>
              <CardDescription>Administrar materias, horarios, profesores y planificación académica</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Gestión Académica
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2 text-gray-600" />
                Configuración
              </CardTitle>
              <CardDescription>Configurar parámetros del sistema, usuarios y datos de la universidad</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Configurar Sistema
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* System Info */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Información del Sistema V27</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Versión</p>
                  <p className="text-lg font-bold text-gray-900">{systemInfo.version}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Modo</p>
                  <Badge variant="default" className="bg-green-600">
                    {systemInfo.mode}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Universidad</p>
                  <p className="text-lg font-bold text-gray-900">{systemInfo.university}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
