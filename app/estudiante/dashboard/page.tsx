"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { User, BookOpen, Calendar, FileText, Award, Bell, Eye, Clock, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function EstudianteDashboard() {
  const estudiante = {
    nombres: "María José",
    apellidos: "González Pérez",
    cedula: "20123456",
    carrera: "Ingeniería en Informática",
    trayecto: 2,
    trimestre: 1,
    periodo: "2024-2025",
    promedio: 17.5,
    creditosAprobados: 45,
    creditosTotales: 120,
    estado: "Activo",
  }

  const materiasActuales = [
    { nombre: "Base de Datos I", profesor: "Ing. Martínez", horario: "Mar-Jue 10:00-12:00", aula: "Lab 204" },
    { nombre: "Algoritmos y Estructuras", profesor: "Dr. García", horario: "Lun-Mie 14:00-16:00", aula: "Aula 205" },
    { nombre: "Ingeniería de Software I", profesor: "Ing. López", horario: "Vie 08:00-12:00", aula: "Aula 301" },
  ]

  const notasRecientes = [
    { materia: "Base de Datos I", evaluacion: "Parcial 1", nota: 18, fecha: "2024-10-15" },
    { materia: "Algoritmos", evaluacion: "Proyecto 1", nota: 17, fecha: "2024-10-12" },
    { materia: "Ing. Software", evaluacion: "Tarea 1", nota: 19, fecha: "2024-10-10" },
  ]

  const proximasEvaluaciones = [
    { materia: "Base de Datos I", tipo: "Parcial 2", fecha: "2024-11-15", dias: 12 },
    { materia: "Algoritmos", tipo: "Proyecto Final", fecha: "2024-11-20", dias: 17 },
  ]

  const progresoCarrera = (estudiante.creditosAprobados / estudiante.creditosTotales) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-800">
            Bienvenido, {estudiante.nombres} {estudiante.apellidos}
          </h1>
          <p className="text-slate-600">Panel de Control Estudiantil</p>
          <Badge variant="default" className="text-sm">
            {estudiante.carrera} - Trayecto {estudiante.trayecto}
          </Badge>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                <div>
                  <p className="text-sm opacity-90">Promedio General</p>
                  <p className="text-2xl font-bold">{estudiante.promedio}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                <div>
                  <p className="text-sm opacity-90">Materias Actuales</p>
                  <p className="text-2xl font-bold">{materiasActuales.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                <div>
                  <p className="text-sm opacity-90">Créditos Aprobados</p>
                  <p className="text-2xl font-bold">{estudiante.creditosAprobados}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <div>
                  <p className="text-sm opacity-90">Período</p>
                  <p className="text-lg font-bold">{estudiante.periodo}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progreso de Carrera */}
            <Card>
              <CardHeader>
                <CardTitle>Progreso de Carrera</CardTitle>
                <CardDescription>Avance en créditos académicos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Créditos completados</span>
                    <span>
                      {estudiante.creditosAprobados} / {estudiante.creditosTotales}
                    </span>
                  </div>
                  <Progress value={progresoCarrera} className="h-3" />
                  <p className="text-sm text-slate-600">{Math.round(progresoCarrera)}% completado</p>
                </div>
              </CardContent>
            </Card>

            {/* Materias Actuales */}
            <Card>
              <CardHeader>
                <CardTitle>Materias del Trimestre Actual</CardTitle>
                <CardDescription>Tus clases programadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {materiasActuales.map((materia, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-slate-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{materia.nombre}</h3>
                          <p className="text-sm text-slate-600">{materia.profesor}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {materia.horario}
                            </span>
                            <span>{materia.aula}</span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Ver Detalles
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Notas Recientes */}
            <Card>
              <CardHeader>
                <CardTitle>Calificaciones Recientes</CardTitle>
                <CardDescription>Últimas evaluaciones registradas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notasRecientes.map((nota, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{nota.materia}</p>
                        <p className="text-sm text-slate-600">{nota.evaluacion}</p>
                        <p className="text-xs text-slate-500">{nota.fecha}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">{nota.nota}</div>
                        <div className="text-xs text-slate-500">/ 20</div>
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
                  <Link href="/estudiante/constancias">
                    <Button className="w-full justify-start" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Descargar Constancias
                    </Button>
                  </Link>
                  <Link href="/estudiante/notas">
                    <Button className="w-full justify-start" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      Ver Todas las Notas
                    </Button>
                  </Link>
                  <Link href="/estudiante/horarios">
                    <Button className="w-full justify-start" variant="outline">
                      <Calendar className="h-4 w-4 mr-2" />
                      Mi Horario
                    </Button>
                  </Link>
                  <Link href="/estudiante/perfil">
                    <Button className="w-full justify-start" variant="outline">
                      <User className="h-4 w-4 mr-2" />
                      Actualizar Perfil
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Próximas Evaluaciones */}
            <Card>
              <CardHeader>
                <CardTitle>Próximas Evaluaciones</CardTitle>
                <CardDescription>No olvides estas fechas importantes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {proximasEvaluaciones.map((evaluacion, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{evaluacion.materia}</p>
                          <p className="text-sm text-slate-600">{evaluacion.tipo}</p>
                          <p className="text-xs text-slate-500">{evaluacion.fecha}</p>
                        </div>
                        <Badge variant={evaluacion.dias <= 7 ? "destructive" : "secondary"}>
                          {evaluacion.dias} días
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Notificaciones */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Notificaciones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm font-medium text-blue-800">Nueva calificación disponible</p>
                    <p className="text-xs text-blue-600">Base de Datos I - Parcial 1</p>
                  </div>
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm font-medium text-yellow-800">Recordatorio de evaluación</p>
                    <p className="text-xs text-yellow-600">Algoritmos - Proyecto Final en 17 días</p>
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
