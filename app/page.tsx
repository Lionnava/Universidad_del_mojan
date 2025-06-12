"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Users,
  GraduationCap,
  BookOpen,
  FileText,
  BarChart3,
  UserCheck,
  ClipboardList,
  School,
  TrendingUp,
  LogIn,
  Shield,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"

export default function HomePage() {
  const { isDemo } = useAuth()

  const stats = [
    { title: "Estudiantes Activos", value: "2,847", change: "+12%", icon: Users },
    { title: "Aspirantes", value: "456", change: "+8%", icon: UserCheck },
    { title: "Profesores", value: "124", change: "+3%", icon: GraduationCap },
    { title: "Materias Activas", value: "89", change: "+5%", icon: BookOpen },
  ]

  const accessLevels = [
    {
      title: "Estudiantes",
      description: "Acceso a información personal, notas y constancias",
      icon: Users,
      href: "/auth/estudiante",
      color: "bg-blue-500",
      features: ["Ver notas", "Descargar constancias", "Horarios personales", "Información académica"],
      demoCredentials: { username: "est_20123456", password: "demo" },
    },
    {
      title: "Profesores",
      description: "Gestión de clases, evaluaciones y planificación",
      icon: GraduationCap,
      href: "/auth/profesor",
      color: "bg-green-500",
      features: ["Calificar estudiantes", "Planificar clases", "Ver asignaciones", "Reportes académicos"],
      demoCredentials: { username: "prof_garcia", password: "demo" },
    },
    {
      title: "Administrativo - Analista",
      description: "Gestión operativa del sistema universitario",
      icon: ClipboardList,
      href: "/auth/analista",
      color: "bg-purple-500",
      features: ["Gestión de estudiantes", "Inscripciones", "Reportes operativos", "Seguimiento académico"],
      demoCredentials: { username: "analista1", password: "demo" },
    },
    {
      title: "Administrativo - Gerencial",
      description: "Acceso completo y supervisión del sistema",
      icon: Shield,
      href: "/auth/gerencial",
      color: "bg-red-500",
      features: ["Acceso total", "Reportes ejecutivos", "Configuración sistema", "Supervisión general"],
      demoCredentials: { username: "admin", password: "demo" },
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Demo Banner */}
      {isDemo && (
        <div className="bg-orange-100 border-b border-orange-200 p-3">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-orange-800">
            <AlertCircle className="h-5 w-5" />
            <span className="font-medium">Modo Demostración</span>
            <span className="text-sm">- Configurar Supabase para funcionalidad completa</span>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3 mb-6">
              <School className="h-12 w-12" />
              <h1 className="text-4xl md:text-6xl font-bold">UPTMA - el Moján</h1>
            </div>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Sistema Integral de Gestión Universitaria
            </p>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto">
              Plataforma completa para la administración académica, gestión de estudiantes, profesores y procesos
              universitarios con acceso diferenciado por roles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/dashboard">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  <LogIn className="h-5 w-5 mr-2" />
                  Acceder al Sistema
                </Button>
              </Link>
              <Link href="/registro-nuevo">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  <UserCheck className="h-5 w-5 mr-2" />
                  Registro de Aspirante
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        {/* Stats Section */}
        <div className="text-center space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Estadísticas del Sistema</h2>
            <p className="text-slate-600">Datos en tiempo real del período académico actual</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow border-2">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-600">{stat.title}</CardTitle>
                    <Icon className="h-5 w-5 text-slate-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-slate-800">{stat.value}</div>
                    <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                      <TrendingUp className="h-3 w-3" />
                      {stat.change} vs mes anterior
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Access Levels Section */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Acceso por Categorías</h2>
            <p className="text-slate-600">Selecciona tu nivel de acceso para ingresar al sistema</p>
            {isDemo && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800 font-medium">Credenciales de Demostración:</p>
                <p className="text-blue-600 text-sm">
                  Usa las credenciales mostradas en cada tarjeta para probar el sistema
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {accessLevels.map((level, index) => {
              const Icon = level.icon
              return (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className={`p-4 rounded-lg ${level.color}`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-slate-800">{level.title}</CardTitle>
                        <CardDescription className="text-slate-600">{level.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        {level.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      {isDemo && (
                        <div className="p-3 bg-gray-50 rounded-lg border">
                          <p className="text-xs font-medium text-gray-700 mb-1">Credenciales Demo:</p>
                          <p className="text-xs text-gray-600">
                            Usuario: <code className="bg-gray-200 px-1 rounded">{level.demoCredentials.username}</code>
                          </p>
                          <p className="text-xs text-gray-600">
                            Contraseña:{" "}
                            <code className="bg-gray-200 px-1 rounded">{level.demoCredentials.password}</code>
                          </p>
                        </div>
                      )}

                      <Link href={level.href}>
                        <Button className="w-full" size="lg">
                          <LogIn className="h-4 w-4 mr-2" />
                          Iniciar Sesión
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-8">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-slate-800">Funcionalidades del Sistema</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold">Gestión Integral</h3>
                <p className="text-slate-600 text-sm">
                  Administración completa de estudiantes, profesores y procesos académicos
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold">Constancias Digitales</h3>
                <p className="text-slate-600 text-sm">
                  Generación automática de constancias de notas, estudios e inscripciones
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold">Reportes Avanzados</h3>
                <p className="text-slate-600 text-sm">
                  Análisis estadístico y reportes ejecutivos para toma de decisiones
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
