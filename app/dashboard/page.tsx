"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  BarChart3,
  UserCheck,
  ClipboardList,
  School,
  TrendingUp,
  Plus,
  Eye,
  Download,
} from "lucide-react"
import Link from "next/link"
import { RegistroRapidoForm } from "@/components/registro-rapido-form"
import { HorariosView } from "@/components/horarios-view"
import { ReportesGenerator } from "@/components/reportes-generator"

export default function Dashboard() {
  const [showRegistroRapido, setShowRegistroRapido] = useState(false)
  const [showHorarios, setShowHorarios] = useState(false)
  const [showReportes, setShowReportes] = useState(false)

  const stats = [
    { title: "Estudiantes Activos", value: "2,847", change: "+12%", icon: Users },
    { title: "Aspirantes", value: "456", change: "+8%", icon: UserCheck },
    { title: "Profesores", value: "124", change: "+3%", icon: GraduationCap },
    { title: "Materias Activas", value: "89", change: "+5%", icon: BookOpen },
  ]

  const modules = [
    {
      title: "Gestión de Estudiantes",
      description: "Censo, pre-inscripción e inscripción de estudiantes",
      icon: Users,
      href: "/estudiantes",
      color: "bg-blue-500",
    },
    {
      title: "Gestión Académica",
      description: "Materias, horarios y planificación de clases",
      icon: BookOpen,
      href: "/academico",
      color: "bg-green-500",
    },
    {
      title: "Profesores",
      description: "Gestión de profesores y asignación de materias",
      icon: GraduationCap,
      href: "/profesores",
      color: "bg-purple-500",
    },
    {
      title: "Evaluaciones",
      description: "Sistema de evaluación y consolidado de notas",
      icon: ClipboardList,
      href: "/evaluaciones",
      color: "bg-orange-500",
    },
    {
      title: "Horarios",
      description: "Programación y gestión de horarios académicos",
      icon: Calendar,
      href: "/horarios",
      color: "bg-cyan-500",
    },
    {
      title: "Reportes",
      description: "Reportes digitales y estadísticas del sistema",
      icon: BarChart3,
      href: "/reportes",
      color: "bg-red-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <School className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800">Sistema Universitario</h1>
          </div>
          <p className="text-slate-600 text-lg">Gestión Integral de Control de Estudios</p>
          <Badge variant="secondary" className="text-sm">
            Período Académico 2024-2025
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
                  <Icon className="h-4 w-4 text-slate-500" />
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

        {/* Quick Actions - Funcionales */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800">Acciones Rápidas</CardTitle>
            <CardDescription>Tareas frecuentes del sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Dialog open={showRegistroRapido} onOpenChange={setShowRegistroRapido}>
                <DialogTrigger asChild>
                  <Button className="h-12" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo Registro
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Registro Rápido de Estudiante</DialogTitle>
                    <DialogDescription>Formulario simplificado para registro inmediato</DialogDescription>
                  </DialogHeader>
                  <RegistroRapidoForm onClose={() => setShowRegistroRapido(false)} />
                </DialogContent>
              </Dialog>

              <Dialog open={showHorarios} onOpenChange={setShowHorarios}>
                <DialogTrigger asChild>
                  <Button className="h-12" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Horarios
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Horarios Académicos</DialogTitle>
                    <DialogDescription>Visualización de horarios por carrera y trayecto</DialogDescription>
                  </DialogHeader>
                  <HorariosView />
                </DialogContent>
              </Dialog>

              <Dialog open={showReportes} onOpenChange={setShowReportes}>
                <DialogTrigger asChild>
                  <Button className="h-12" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Generar Reporte
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Generador de Reportes</DialogTitle>
                    <DialogDescription>Crea reportes personalizados del sistema</DialogDescription>
                  </DialogHeader>
                  <ReportesGenerator onClose={() => setShowReportes(false)} />
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => {
            const Icon = module.icon
            return (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${module.color}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-slate-800">{module.title}</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-slate-600">{module.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={module.href}>
                    <Button className="w-full" variant="outline">
                      Acceder al Módulo
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
