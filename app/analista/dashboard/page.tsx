"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  Users,
  GraduationCap,
  BookOpen,
  TrendingUp,
  FileText,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
} from "lucide-react"
import Link from "next/link"

export default function AnalistaDashboard() {
  const analista = {
    nombres: "María Elena",
    apellidos: "Rodríguez Silva",
    cedula: "18765432",
    departamento: "Control de Estudios",
    cargo: "Analista Senior",
  }

  const estadisticasGenerales = {
    totalEstudiantes: 2847,
    estudiantesActivos: 2654,
    aspirantesPendientes: 456,
    profesoresActivos: 124,
    materiasActivas: 89,
    seccionesAbiertas: 156,
  }

  const reportesRecientes = [
    {
      nombre: "Consolidado de Inscripciones",
      fecha: "2024-11-01",
      tipo: "Mensual",
      estado: "Completado",
      descargas: 23,
    },
    {
      nombre: "Estadísticas por Carrera",
      fecha: "2024-10-28",
      tipo: "Semanal",
      estado: "Completado",
      descargas: 15,
    },
    {
      nombre: "Rendimiento Académico",
      fecha: "2024-10-25",
      tipo: "Trimestral",
      estado: "En Proceso",
      descargas: 0,
    },
  ]

  const alertasImportantes = [
    {
      tipo: "warning",
      titulo: "Inscripciones Incompletas",
      descripcion: "23 estudiantes con documentos faltantes",
      prioridad: "Alta",
    },
    {
      tipo: "info",
      titulo: "Período de Evaluaciones",
      descripcion: "Inicia el 15 de noviembre",
      prioridad: "Media",
    },
    {
      tipo: "success",
      titulo: "Backup Completado",
      descripcion: "Respaldo de BD realizado exitosamente",
      prioridad: "Baja",
    },
  ]

  const procesosPendientes = [
    { nombre: "Validación de Notas", progreso: 75, total: 156, completados: 117 },
    { nombre: "Revisión de Expedientes", progreso: 60, total: 89, completados: 53 },
    { nombre: "Generación de Constancias", progreso: 90, total: 45, completados: 41 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-800">
            Bienvenida, {analista.nombres} {analista.apellidos}
          </h1>
          <p className="text-slate-600">Panel de Control Analítico V29</p>
          <div className="flex justify-center gap-2">
            <Badge variant="default" className="text-sm">
              {analista.departamento}
            </Badge>
            <Badge variant="outline" className="text-sm">
              {analista.cargo}
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <div>
                  <p className="text-sm opacity-90">Estudiantes</p>
                  <p className="text-xl font-bold">{estadisticasGenerales.totalEstudiantes}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <div>
                  <p className="text-sm opacity-90">Activos</p>
                  <p className="text-xl font-bold">{estadisticasGenerales.estudiantesActivos}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                <div>
                  <p className="text-sm opacity-90">Aspirantes</p>
                  <p className="text-xl font-bold">{estadisticasGenerales.aspirantesPendientes}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <div>
                  <p className="text-sm opacity-90">Profesores</p>
                  <p className="text-xl font-bold">{estadisticasGenerales.profesoresActivos}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                <div>
                  <p className="text-sm opacity-90">Materias</p>
                  <p className="text-xl font-bold">{estadisticasGenerales.materiasActivas}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <div>
                  <p className="text-sm opacity-90">Secciones</p>
                  <p className="text-xl font-bold">{estadisticasGenerales.seccionesAbiertas}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Procesos Pendientes */}
            <Card>
              <CardHeader>
                <CardTitle>Procesos en Curso</CardTitle>
                <CardDescription>Estado actual de los procesos administrativos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {procesosPendientes.map((proceso, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{proceso.nombre}</h3>
                        <span className="text-sm text-slate-600">
                          {proceso.completados}/{proceso.total}
                        </span>
                      </div>
                      <Progress value={proceso.progreso} className="h-2" />
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>{proceso.progreso}% completado</span>
                        <span>{proceso.total - proceso.completados} pendientes</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reportes Recientes */}
            <Card>
              <CardHeader>
                <CardTitle>Reportes Generados</CardTitle>
                <CardDescription>Últimos reportes creados y su estado</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {reportesRecientes.map((reporte, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{reporte.nombre}</p>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Calendar className="h-3 w-3" />
                          <span>{reporte.fecha}</span>
                          <Badge variant="outline" className="text-xs">
                            {reporte.tipo}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={reporte.estado === "Completado" ? "default" : "secondary"} className="text-xs">
                          {reporte.estado}
                        </Badge>
                        {reporte.estado === "Completado" && (
                          <Button size="sm" variant="outline">
                            <Download className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

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
                  {alertasImportantes.map((alerta, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border ${
                        alerta.tipo === "warning"
                          ? "bg-orange-50 border-orange-200"
                          : alerta.tipo === "info"
                            ? "bg-blue-50 border-blue-200"
                            : "bg-green-50 border-green-200"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p
                            className={`font-medium ${
                              alerta.tipo === "warning"
                                ? "text-orange-800"
                                : alerta.tipo === "info"
                                  ? "text-blue-800"
                                  : "text-green-800"
                            }`}
                          >
                            {alerta.titulo}
                          </p>
                          <p
                            className={`text-sm ${
                              alerta.tipo === "warning"
                                ? "text-orange-600"
                                : alerta.tipo === "info"
                                  ? "text-blue-600"
                                  : "text-green-600"
                            }`}
                          >
                            {alerta.descripcion}
                          </p>
                        </div>
                        <Badge
                          variant={
                            alerta.prioridad === "Alta"
                              ? "destructive"
                              : alerta.prioridad === "Media"
                                ? "secondary"
                                : "outline"
                          }
                          className="text-xs"
                        >
                          {alerta.prioridad}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Acciones Rápidas */}
            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link href="/reportes">
                    <Button className="w-full justify-start" variant="outline">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Generar Reportes
                    </Button>
                  </Link>
                  <Link href="/analista/estadisticas">
                    <Button className="w-full justify-start" variant="outline">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Ver Estadísticas
                    </Button>
                  </Link>
                  <Link href="/estudiantes">
                    <Button className="w-full justify-start" variant="outline">
                      <Users className="h-4 w-4 mr-2" />
                      Gestionar Estudiantes
                    </Button>
                  </Link>
                  <Link href="/analista/validaciones">
                    <Button className="w-full justify-start" variant="outline">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Validar Procesos
                    </Button>
                  </Link>
                  <Link href="/analista/auditoria">
                    <Button className="w-full justify-start" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Auditoría
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button className="w-full justify-start" variant="outline">
                      🏠 Volver al Inicio
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Resumen del Día */}
            <Card>
              <CardHeader>
                <CardTitle>Resumen del Día</CardTitle>
                <CardDescription>Actividades y métricas de hoy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Reportes generados</span>
                    <Badge variant="outline">+5</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Validaciones completadas</span>
                    <Badge variant="outline">+23</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Expedientes revisados</span>
                    <Badge variant="outline">+18</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Constancias emitidas</span>
                    <Badge variant="outline">+12</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Próximas Tareas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Próximas Tareas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm font-medium text-yellow-800">Cierre de Inscripciones</p>
                    <p className="text-xs text-yellow-600">Mañana - 15 Nov 2024</p>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm font-medium text-blue-800">Reporte Mensual</p>
                    <p className="text-xs text-blue-600">30 Nov 2024</p>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm font-medium text-green-800">Backup Semanal</p>
                    <p className="text-xs text-green-600">Domingo - Automático</p>
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
