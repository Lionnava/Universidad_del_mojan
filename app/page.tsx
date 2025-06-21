"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  GraduationCap,
  Users,
  BookOpen,
  FileText,
  BarChart3,
  Settings,
  UserPlus,
  Award,
  Database,
  Globe,
  Eye,
  EyeOff,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState("")
  const [userName, setUserName] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loginForm, setLoginForm] = useState({ username: "", password: "" })
  const [isFirstTime, setIsFirstTime] = useState(false)
  const [systemConfigured, setSystemConfigured] = useState(false)

  // Configuración inicial del sistema
  const [systemConfig, setSystemConfig] = useState({
    universityName: "Universidad Móvil",
    version: "29.0.0",
    mode: "PRODUCCIÓN",
    publicAccess: true,
    registrationOpen: true,
    currentPeriod: "2024-2025",
  })

  // Usuarios predefinidos del sistema
  const systemUsers = [
    { username: "admin", password: "admin123", role: "gerencial", name: "Administrador del Sistema" },
    { username: "analista", password: "analista123", role: "analista", name: "Analista Académico" },
    { username: "profesor", password: "profesor123", role: "profesor", name: "Profesor García" },
    { username: "estudiante", password: "est123", role: "estudiante", name: "María González" },
  ]

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    // Buscar usuario en el sistema
    const user = systemUsers.find((u) => u.username === loginForm.username && u.password === loginForm.password)

    if (user) {
      setIsAuthenticated(true)
      setUserRole(user.role)
      setUserName(user.name)
      localStorage.setItem(
        "university_user",
        JSON.stringify({
          username: user.username,
          role: user.role,
          name: user.name,
        }),
      )
    } else {
      alert("Credenciales incorrectas. Verifica tu usuario y contraseña.")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUserRole("")
    setUserName("")
    localStorage.removeItem("university_user")
  }

  useEffect(() => {
    // Verificar si hay usuario logueado
    const savedUser = localStorage.getItem("university_user")
    if (savedUser) {
      const user = JSON.parse(savedUser)
      setIsAuthenticated(true)
      setUserRole(user.role)
      setUserName(user.name)
    }

    // Verificar configuración inicial
    const configured = localStorage.getItem("system_configured")
    setSystemConfigured(!!configured)

    if (!configured) {
      setIsFirstTime(true)
    }
  }, [])

  const completeInitialSetup = () => {
    localStorage.setItem("system_configured", "true")
    setSystemConfigured(true)
    setIsFirstTime(false)
    alert("¡Sistema configurado exitosamente! Ahora puedes acceder con las credenciales proporcionadas.")
  }

  // Pantalla de configuración inicial
  if (isFirstTime && !systemConfigured) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
              <Settings className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900">Configuración Inicial del Sistema</CardTitle>
            <CardDescription className="text-lg">
              Universidad Móvil V{systemConfig.version} - Primera Configuración
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">✅ Sistema Listo para Producción</h3>
              <p className="text-green-700 text-sm">
                El sistema ha sido inicializado con datos de ejemplo y está listo para uso en producción.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800">📊 Datos Iniciales Cargados:</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-blue-50 p-3 rounded">
                  <strong>👥 Estudiantes:</strong> 2,847 registros
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <strong>👨‍🏫 Profesores:</strong> 124 registros
                </div>
                <div className="bg-purple-50 p-3 rounded">
                  <strong>📚 Materias:</strong> 89 registros
                </div>
                <div className="bg-orange-50 p-3 rounded">
                  <strong>🎓 Aspirantes:</strong> 456 registros
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800">🔑 Credenciales de Acceso:</h4>
              <div className="space-y-2 text-sm bg-gray-50 p-4 rounded-lg">
                <div>
                  <strong>👨‍💼 Gerencial:</strong> admin / admin123
                </div>
                <div>
                  <strong>📊 Analista:</strong> analista / analista123
                </div>
                <div>
                  <strong>👨‍🏫 Profesor:</strong> profesor / profesor123
                </div>
                <div>
                  <strong>🎓 Estudiante:</strong> estudiante / est123
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800">🌐 Acceso Público Habilitado:</h4>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  ✅ La comunidad universitaria puede registrarse como aspirantes
                  <br />✅ Acceso a constancias y certificados
                  <br />✅ Consulta de información académica
                  <br />✅ Portal de inscripciones activo
                </p>
              </div>
            </div>

            <Button onClick={completeInitialSetup} className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3">
              🚀 Completar Configuración e Iniciar Sistema
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Pantalla de login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Público */}
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{systemConfig.universityName}</h1>
            <p className="text-xl text-gray-600 mb-4">Portal Académico Digital V{systemConfig.version}</p>
            <div className="flex justify-center gap-2 mb-6">
              <Badge variant="default" className="bg-green-600">
                <Globe className="w-3 h-3 mr-1" />
                Acceso Público Habilitado
              </Badge>
              <Badge variant="outline">Período {systemConfig.currentPeriod}</Badge>
            </div>
          </div>

          <Tabs defaultValue="login" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="login">🔐 Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="public">🌐 Acceso Público</TabsTrigger>
              <TabsTrigger value="register">📝 Registro de Aspirantes</TabsTrigger>
            </TabsList>

            {/* Tab de Login */}
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Acceso al Sistema</CardTitle>
                  <CardDescription className="text-center">
                    Ingresa con tus credenciales institucionales
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4 max-w-md mx-auto">
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
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={loginForm.password}
                          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                          placeholder="Ingresa tu contraseña"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                      Iniciar Sesión
                    </Button>
                  </form>

                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-sm text-gray-700 mb-2">Credenciales de Acceso:</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>
                        👨‍💼 <strong>Gerencial:</strong> admin / admin123
                      </p>
                      <p>
                        📊 <strong>Analista:</strong> analista / analista123
                      </p>
                      <p>
                        👨‍🏫 <strong>Profesor:</strong> profesor / profesor123
                      </p>
                      <p>
                        🎓 <strong>Estudiante:</strong> estudiante / est123
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab de Acceso Público */}
            <TabsContent value="public">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-blue-600" />
                      Constancias y Certificados
                    </CardTitle>
                    <CardDescription>
                      Solicita y descarga constancias de estudios, notas e inscripciones
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/publico/constancias">
                      <Button className="w-full">Solicitar Constancia</Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BookOpen className="w-5 h-5 mr-2 text-green-600" />
                      Información Académica
                    </CardTitle>
                    <CardDescription>Consulta carreras, materias, horarios y planificación académica</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/publico/academico">
                      <Button className="w-full" variant="outline">
                        Ver Información
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2 text-purple-600" />
                      Consulta de Notas
                    </CardTitle>
                    <CardDescription>Consulta tus calificaciones y rendimiento académico</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/publico/notas">
                      <Button className="w-full" variant="outline">
                        Consultar Notas
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Tab de Registro */}
            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Registro de Nuevos Aspirantes</CardTitle>
                  <CardDescription className="text-center">Únete a nuestra comunidad universitaria</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <UserPlus className="w-16 h-16 text-green-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-green-800 mb-2">¡Inscripciones Abiertas!</h3>
                      <p className="text-green-700 mb-4">
                        Regístrate como aspirante y forma parte de nuestra universidad. El proceso es completamente
                        digital y gratuito.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-700 mb-6">
                        <div>✅ Proceso 100% digital</div>
                        <div>✅ Registro gratuito</div>
                        <div>✅ Respuesta inmediata</div>
                        <div>✅ Múltiples carreras disponibles</div>
                      </div>
                      <Link href="/registro-nuevo">
                        <Button className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3">Iniciar Registro</Button>
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-2">📚 Carreras Disponibles</h4>
                        <ul className="text-blue-700 space-y-1">
                          <li>• Ingeniería en Informática</li>
                          <li>• Medicina</li>
                          <li>• Derecho</li>
                          <li>• Administración</li>
                          <li>• Enfermería</li>
                        </ul>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-purple-800 mb-2">⏰ Modalidades</h4>
                        <ul className="text-purple-700 space-y-1">
                          <li>• Presencial</li>
                          <li>• Semipresencial</li>
                          <li>• Virtual</li>
                          <li>• Turnos: Mañana, Tarde, Noche</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    )
  }

  // Dashboard principal para usuarios autenticados
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <GraduationCap className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">{systemConfig.universityName}</h1>
                <Badge variant="outline" className="text-xs">
                  V{systemConfig.version} - {systemConfig.mode}
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{userName}</p>
                <Badge variant="secondary" className="text-xs">
                  {userRole === "gerencial"
                    ? "👨‍💼 Gerencial"
                    : userRole === "analista"
                      ? "📊 Analista"
                      : userRole === "profesor"
                        ? "👨‍🏫 Profesor"
                        : "🎓 Estudiante"}
                </Badge>
              </div>
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
                  <p className="text-2xl font-bold text-gray-900">2,847</p>
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
                  <p className="text-2xl font-bold text-gray-900">124</p>
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
                  <p className="text-2xl font-bold text-gray-900">89</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Database className="w-8 h-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Sistema</p>
                  <p className="text-sm font-bold text-green-600">V29 Activo</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/estudiantes">
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
          </Link>

          <Link href="/profesores">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-green-600" />
                  Gestión de Profesores
                </CardTitle>
                <CardDescription>Administrar profesores, asignaciones de materias y horarios docentes</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  Gestionar Profesores
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/academico">
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
          </Link>

          <Link href="/evaluaciones">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2 text-purple-600" />
                  Sistema de Evaluaciones
                </CardTitle>
                <CardDescription>Gestionar calificaciones, evaluaciones y consolidados académicos</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  Gestionar Evaluaciones
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/reportes">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-orange-600" />
                  Centro de Reportes
                </CardTitle>
                <CardDescription>Generar reportes estadísticos, listados y análisis académicos</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  Ver Reportes
                </Button>
              </CardContent>
            </Card>
          </Link>

          {userRole === "gerencial" && (
            <Link href="/admin/dashboard">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 mr-2 text-gray-600" />
                    Panel Administrativo
                  </CardTitle>
                  <CardDescription>
                    Configurar parámetros del sistema, usuarios y datos de la universidad
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    Panel Admin
                  </Button>
                </CardContent>
              </Card>
            </Link>
          )}
        </div>

        {/* Role-specific dashboards */}
        {userRole === "profesor" && (
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Acceso Rápido - Profesor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link href="/profesor/dashboard">
                    <Button className="w-full" variant="outline">
                      Mi Dashboard
                    </Button>
                  </Link>
                  <Link href="/profesor/evaluaciones">
                    <Button className="w-full" variant="outline">
                      Mis Evaluaciones
                    </Button>
                  </Link>
                  <Link href="/profesor/horarios">
                    <Button className="w-full" variant="outline">
                      Mis Horarios
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {userRole === "analista" && (
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Acceso Rápido - Analista</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link href="/analista/dashboard">
                    <Button className="w-full" variant="outline">
                      Mi Dashboard
                    </Button>
                  </Link>
                  <Link href="/analista/reportes">
                    <Button className="w-full" variant="outline">
                      Mis Reportes
                    </Button>
                  </Link>
                  <Link href="/analista/estadisticas">
                    <Button className="w-full" variant="outline">
                      Estadísticas
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {userRole === "estudiante" && (
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Acceso Rápido - Estudiante</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link href="/estudiante/dashboard">
                    <Button className="w-full" variant="outline">
                      Mi Dashboard
                    </Button>
                  </Link>
                  <Link href="/estudiante/constancias">
                    <Button className="w-full" variant="outline">
                      Mis Constancias
                    </Button>
                  </Link>
                  <Link href="/estudiante/notas">
                    <Button className="w-full" variant="outline">
                      Mis Notas
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* System Info */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Información del Sistema V29</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Versión</p>
                  <p className="text-lg font-bold text-gray-900">{systemConfig.version}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Modo</p>
                  <Badge variant="default" className="bg-green-600">
                    {systemConfig.mode}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Universidad</p>
                  <p className="text-lg font-bold text-gray-900">{systemConfig.universityName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Acceso Público</p>
                  <Badge variant="default" className="bg-blue-600">
                    <Globe className="w-3 h-3 mr-1" />
                    Habilitado
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
