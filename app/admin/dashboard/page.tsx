"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  GraduationCap,
  BookOpen,
  ClipboardList,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Settings,
  Database,
} from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const stats = [
    { title: "Estudiantes Activos", value: "2,847", change: "+12%", icon: Users, color: "text-blue-600" },
    { title: "Aspirantes Pendientes", value: "456", change: "+8%", icon: GraduationCap, color: "text-green-600" },
    { title: "Profesores", value: "124", change: "+3%", icon: Users, color: "text-purple-600" },
    { title: "Materias Activas", value: "89", change: "+5%", icon: BookOpen, color: "text-orange-600" },
  ]

  const alertas = [
    {
      tipo: "warning",
      titulo: "Evaluaciones Pendientes",
      descripcion: "156 evaluaciones sin calificar",
      urgencia: "media",
    },
    {
      tipo: "error",
      titulo: "Inscripciones Incompletas",
      descripcion: "23 estudiantes con documentos faltantes",
      urgencia: "alta",
    },
    {
      tipo: "info",
      titulo: "Backup Programado",
      descripcion: "Respaldo de base de datos a las 02:00",
      urgencia: "baja",
    },
  ]

  const procesosActivos = [
    { nombre: "Período de Inscripciones", estado: "activo", progreso: 75, fecha: "Hasta 15 Nov" },
    { nombre: "Evaluaciones Finales", estado: "programado", progreso: 0, fecha: "Inicia 20 Nov" },
    { nombre: "Censo de Aspirantes", estado: "activo", progreso: 60, fecha: "Hasta 30 Nov" },
  ]

  const modulosRapidos = [
    {
      titulo: "Gestión de Estudiantes",
      descripcion: "Administrar estudiantes y aspirantes",
      icon: Users,
      href: "/estudiantes",
      color: "bg-blue-500",
    },
    {
      titulo: "Control Académico",
      descripcion: "Materias, horarios y planificación",
      icon: BookOpen,
      href: "/academico",
      color: "bg-green-500",
    },
    {
      titulo: "Sistema de Evaluaciones",
      descripcion: "Calificaciones y reportes",
      icon: ClipboardList,
      href: "/evaluaciones",
      color: "bg-purple-500",
    },
    {
      titulo: "Reportes Ejecutivos",
      descripcion: "Análisis y estadísticas",
      icon: BarChart3,
      href: "/reportes",
      color: "bg-orange-500",
    },
    {
      titulo: "Configuración",
      descripcion: "Ajustes del sistema",
      icon: Settings,
      href: "/admin/configuracion",
      color: "bg-gray-500",
    },
    {
      titulo: "Base de Datos",
      descripcion: "Gestión y respaldos",
      icon: Database,
      href: "/admin/database",
      color: "bg-red-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-800">Panel de Administración</h1>
          <p className="text-slate-600">Control y supervisión del sistema universitario</p>
          <Badge variant="default" className="text-sm">
            Acceso Gerencial - Período 2024-2025
          </Badge>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">{stat.title}</CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <TrendingUp className="h-3 w-3" />
                    {stat.change} vs mes anterior
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Alertas del Sistema */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  Alertas del Sistema
                </CardTitle>
                <CardDescription>Notificaciones importantes que requieren atención</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {alertas.map((alerta, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border ${
                        alerta.urgencia === "alta"
                          ? "bg-red-50 border-red-200"
                          : alerta.urgencia === "media"
                            ? "bg-yellow-50 border-yellow-200"
                            : "bg-blue-50 border-blue-200"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p
                            className={`font-medium ${
                              alerta.urgencia === "alta"
                                ? "text-red-800"
                                : alerta.urgencia === "media"
                                  ? "text-yellow-800"
                                  : "text-blue-800"
                            }`}
                          >
                            {alerta.titulo}
                          </p>
                          <p
                            className={`text-sm ${
                              alerta.urgencia === "alta"
                                ? "text-red-600"
                                : alerta.urgencia === "media"
                                  ? "text-yellow-600"
                                  : "text-blue-600"
                            }`}
                          >
                            {alerta.descripcion}
                          </p>
                        </div>
                        <Badge
                          variant={
                            alerta.urgencia === "alta"
                              ? "destructive"
                              : alerta.urgencia === "media"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {alerta.urgencia}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Procesos Activos */}
            <Card>
              <CardHeader>
                <CardTitle>Procesos Académicos Activos</CardTitle>
                <CardDescription>Estado actual de los procesos del sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {procesosActivos.map((proceso, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">{proceso.nombre}</h3>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={proceso.estado === "activo" ? "default" : "secondary"}
                            className="flex items-center gap-1"
                          >
                            {proceso.estado === "activo" ? (
                              <CheckCircle className="h-3 w-3" />
                            ) : (
                              <Clock className="h-3 w-3" />
                            )}
                            {proceso.estado}
                          </Badge>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progreso</span>
                          <span>{proceso.progreso}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${proceso.progreso}%` }}></div>
                        </div>
                        <p className="text-xs text-slate-500">{proceso.fecha}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Acceso Rápido a Módulos */}
            <Card>
              <CardHeader>
                <CardTitle>Acceso Rápido</CardTitle>
                <CardDescription>Módulos principales del sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  {modulosRapidos.map((modulo, index) => {
                    const Icon = modulo.icon
                    return (
                      <Link key={index} href={modulo.href}>
                        <Button variant="outline" className="w-full justify-start h-auto p-3">
                          <div className={`p-2 rounded-md ${modulo.color} mr-3`}>
                            <Icon className="h-4 w-4 text-white" />
                          </div>
                          <div className="text-left">
                            <div className="font-medium">{modulo.titulo}</div>
                            <div className="text-xs text-slate-500">{modulo.descripcion}</div>
                          </div>
                        </Button>
                      </Link>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Estadísticas Rápidas */}
            <Card>
              <CardHeader>
                <CardTitle>Resumen del Día</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Nuevos registros</span>
                    <Badge variant="outline">+23</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Evaluaciones calificadas</span>
                    <Badge variant="outline">+45</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Constancias generadas</span>
                    <Badge variant="outline">+12</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Reportes descargados</span>
                    <Badge variant="outline">+8</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
