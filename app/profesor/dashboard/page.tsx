"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, BookOpen, Calendar, ClipboardList, Award, Bell, Plus, Eye, Edit, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function ProfesorDashboard() {
  const profesor = {
    nombres: "Dr. Juan Carlos",
    apellidos: "García López",
    cedula: "12345678",
    especialidad: "Matemáticas",
    titulo: "Doctor en Matemáticas",
    materias: 3,
    estudiantes: 85,
    evaluacionesPendientes: 12,
  }

  const materiasAsignadas = [
    {
      nombre: "Matemática I",
      seccion: "A",
      estudiantes: 28,
      horario: "Lun-Mie-Vie 8:00-10:00",
      aula: "Aula 101",
      evaluacionesPendientes: 5,
    },
    {
      nombre: "Matemática II",
      seccion: "A",
      estudiantes: 30,
      horario: "Mar-Jue 14:00-16:00",
      aula: "Aula 104",
      evaluacionesPendientes: 4,
    },
    {
      nombre: "Cálculo Avanzado",
      seccion: "B",
      estudiantes: 27,
      horario: "Vie 10:00-14:00",
      aula: "Aula 205",
      evaluacionesPendientes: 3,
    },
  ]

  const evaluacionesRecientes = [
    { materia: "Matemática I", tipo: "Parcial 1", estudiantes: 28, promedio: 16.5, fecha: "2024-10-15" },
    { materia: "Matemática II", tipo: "Tarea 2", estudiantes: 30, promedio: 17.2, fecha: "2024-10-12" },
  ]

  const proximasClases = [
    { materia: "Matemática I", fecha: "2024-11-04", hora: "08:00", aula: "Aula 101", tema: "Derivadas" },
    { materia: "Matemática II", fecha: "2024-11-04", hora: "14:00", aula: "Aula 104", tema: "Integrales" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-800">
            Bienvenido, {profesor.nombres} {profesor.apellidos}
          </h1>
          <p className="text-slate-600">Panel de Control Docente</p>
          <Badge variant="default" className="text-sm">
            {profesor.especialidad} - {profesor.titulo}
          </Badge>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                <div>
                  <p className="text-sm opacity-90">Materias Asignadas</p>
                  <p className="text-2xl font-bold">{profesor.materias}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <div>
                  <p className="text-sm opacity-90">Estudiantes</p>
                  <p className="text-2xl font-bold">{profesor.estudiantes}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5" />
                <div>
                  <p className="text-sm opacity-90">Evaluaciones Pendientes</p>
                  <p className="text-2xl font-bold">{profesor.evaluacionesPendientes}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                <div>
                  <p className="text-sm opacity-90">Promedio General</p>
                  <p className="text-2xl font-bold">16.8</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Materias Asignadas */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Mis Materias</CardTitle>
                    <CardDescription>Materias asignadas para el período actual</CardDescription>
                  </div>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Nueva Evaluación
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {materiasAsignadas.map((materia, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-slate-50">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{materia.nombre}</h3>
                            <Badge variant="outline">Sección {materia.seccion}</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm text-slate-600">
                            <div>
                              <span className="font-medium">Estudiantes:</span> {materia.estudiantes}
                            </div>
                            <div>
                              <span className="font-medium">Aula:</span> {materia.aula}
                            </div>
                            <div className="col-span-2">
                              <span className="font-medium">Horario:</span> {materia.horario}
                            </div>
                          </div>
                          {materia.evaluacionesPendientes > 0 && (
                            <Badge variant="destructive" className="mt-2">
                              {materia.evaluacionesPendientes} evaluaciones pendientes
                            </Badge>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Evaluaciones Recientes */}
            <Card>
              <CardHeader>
                <CardTitle>Evaluaciones Recientes</CardTitle>
                <CardDescription>Últimas calificaciones registradas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {evaluacionesRecientes.map((evaluacion, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{evaluacion.materia}</p>
                        <p className="text-sm text-slate-600">{evaluacion.tipo}</p>
                        <p className="text-xs text-slate-500">
                          {evaluacion.estudiantes} estudiantes - {evaluacion.fecha}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">{evaluacion.promedio}</div>
                        <div className="text-xs text-slate-500">Promedio</div>
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
                  <Link href="/profesor/evaluaciones">
                    <Button className="w-full justify-start" variant="outline">
                      <ClipboardList className="h-4 w-4 mr-2" />
                      Calificar Evaluaciones
                    </Button>
                  </Link>
                  <Link href="/profesor/planificacion">
                    <Button className="w-full justify-start" variant="outline">
                      <Calendar className="h-4 w-4 mr-2" />
                      Planificar Clases
                    </Button>
                  </Link>
                  <Link href="/profesor/estudiantes">
                    <Button className="w-full justify-start" variant="outline">
                      <Users className="h-4 w-4 mr-2" />
                      Ver Estudiantes
                    </Button>
                  </Link>
                  <Link href="/profesor/reportes">
                    <Button className="w-full justify-start" variant="outline">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Generar Reportes
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Próximas Clases */}
            <Card>
              <CardHeader>
                <CardTitle>Próximas Clases</CardTitle>
                <CardDescription>Tu agenda de hoy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {proximasClases.map((clase, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{clase.materia}</p>
                          <p className="text-sm text-slate-600">Tema: {clase.tema}</p>
                          <p className="text-xs text-slate-500">
                            {clase.hora} - {clase.aula}
                          </p>
                        </div>
                        <Badge variant="outline">{clase.fecha}</Badge>
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
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="text-sm font-medium text-orange-800">Evaluaciones pendientes</p>
                    <p className="text-xs text-orange-600">12 evaluaciones por calificar</p>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm font-medium text-blue-800">Reunión académica</p>
                    <p className="text-xs text-blue-600">Mañana a las 10:00 AM</p>
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
