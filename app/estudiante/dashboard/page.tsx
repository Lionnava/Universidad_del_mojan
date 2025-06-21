"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { User, BookOpen, Calendar, Award, FileText, Clock, CheckCircle, AlertCircle, Download, Eye } from "lucide-react"
import Link from "next/link"

export default function EstudianteDashboard() {
  const estudiante = {
    nombres: "María José",
    apellidos: "González Pérez",
    cedula: "20123456",
    carrera: "Ingeniería en Informática",
    trayecto: 2,
    trimestre: 1,
    promedio: 17.5,
    creditos: 45,
    estado: "Activo",
  }

  const materiasInscritas = [
    {
      nombre: "Base de Datos I",
      codigo: "INF201",
      creditos: 4,
      profesor: "Ing. Martínez",
      horario: "Mar-Jue 10:00-12:00",
      aula: "Lab 201",
      nota: 18.5,
      estado: "Cursando",
    },
    {
      nombre: "Algoritmos y Estructuras",
      codigo: "INF202",
      creditos: 5,
      profesor: "Dr. García",
      horario: "Lun-Mie-Vie 8:00-10:00",
      aula: "Aula 101",
      nota: 16.8,
      estado: "Cursando",
    },
    {
      nombre: "Matemática III",
      codigo: "MAT201",
      creditos: 4,
      profesor: "Dr. López",
      horario: "Mar-Jue 14:00-16:00",
      aula: "Aula 104",
      nota: 17.2,
      estado: "Cursando",
    },
  ]

  const evaluacionesPendientes = [
    {
      materia: "Base de Datos I",
      tipo: "Parcial 2",
      fecha: "2024-11-15",
      peso: "30%",
      estado: "Próxima",
    },
    {
      materia: "Algoritmos y Estructuras",
      tipo: "Proyecto Final",
      fecha: "2024-11-20",
      peso: "40%",
      estado: "En Proceso",
    },
  ]

  const constanciasDisponibles = [
    {
      tipo: "Constancia de Notas",
      descripcion: "Certificado de calificaciones del período actual",
      disponible: true,
    },
    {
      tipo: "Constancia de Estudios",
      descripcion: "Certificado de estudios regulares",
      disponible: true,
    },
    {
      tipo: "Constancia de Inscripción",
      descripcion: "Certificado de inscripción formal",
      disponible: true,
    },
  ]

  const proximasClases = [
    {
      materia: "Base de Datos I",
      fecha: "Hoy",
      hora: "10:00",
      aula: "Lab 201",
      tema: "Normalización de BD",
    },
    {
      materia: "Algoritmos y Estructuras",
      fecha: "Mañana",
      hora: "08:00",
      aula: "Aula 101",
      tema: "Árboles Binarios",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-800">
            Bienvenida, {estudiante.nombres} {estudiante.apellidos}
          </h1>
          <p className="text-slate-600">Portal Estudiantil V29</p>
          <div className="flex justify-center gap-2">
            <Badge variant="default" className="text-sm">
              {estudiante.carrera}
            </Badge>
            <Badge variant="outline" className="text-sm">
              Trayecto {estudiante.trayecto} - Trimestre {estudiante.trimestre}
            </Badge>
            <Badge variant="outline" className="text-sm">
              Promedio: {estudiante.promedio}
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                <div>
                  <p className="text-sm opacity-90">Materias Inscritas</p>
                  <p className="text-2xl font-bold">{materiasInscritas.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                <div>
                  <p className="text-sm opacity-90">Promedio</p>
                  <p className="text-2xl font-bold">{estudiante.promedio}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <div>
                  <p className="text-sm opacity-90">Créditos</p>
                  <p className="text-2xl font-bold">{estudiante.creditos}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <div>
                  <p className="text-sm opacity-90">Estado</p>
                  <p className="text-lg font-bold">{estudiante.estado}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Materias Inscritas */}
            <Card>
              <CardHeader>
                <CardTitle>Mis Materias</CardTitle>
                <CardDescription>Materias inscritas en el período actual</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {materiasInscritas.map((materia, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-slate-50">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{materia.nombre}</h3>
                            <Badge variant="outline">{materia.codigo}</Badge>
                            <Badge variant="secondary">{materia.creditos} créditos</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm text-slate-600">
                            <div>
                              <span className="font-medium">Profesor:</span> {materia.profesor}
                            </div>
                            <div>
                              <span className="font-medium">Aula:</span> {materia.aula}
                            </div>
                            <div className="col-span-2">
                              <span className="font-medium">Horario:</span> {materia.horario}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">{materia.nota}</div>
                          <div className="text-xs text-slate-500">Nota Actual</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Evaluaciones Pendientes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                  Evaluaciones Pendientes
                </CardTitle>
                <CardDescription>Próximas evaluaciones y proyectos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {evaluacionesPendientes.map((evaluacion, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{evaluacion.materia}</p>
                        <p className="text-sm text-slate-600">{evaluacion.tipo}</p>
                        <p className="text-xs text-slate-500">
                          {evaluacion.fecha} - Peso: {evaluacion.peso}
                        </p>
                      </div>
                      <Badge
                        variant={evaluacion.estado === "Próxima" ? "destructive" : "secondary"}
                        className="text-xs"
                      >
                        {evaluacion.estado}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Progreso Académico */}
            <Card>
              <CardHeader>
                <CardTitle>Progreso Académico</CardTitle>
                <CardDescription>Avance en tu carrera universitaria</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Trayecto Actual</span>
                      <span className="text-sm text-slate-600">{estudiante.trayecto} de 4</span>
                    </div>
                    <Progress value={(estudiante.trayecto / 4) * 100} className="h-3" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Créditos Acumulados</span>
                      <span className="text-sm text-slate-600">{estudiante.creditos} de 180</span>
                    </div>
                    <Progress value={(estudiante.creditos / 180) * 100} className="h-3" />
                  </div>
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
                      Solicitar Constancias
                    </Button>
                  </Link>
                  <Link href="/estudiante/notas">
                    <Button className="w-full justify-start" variant="outline">
                      <Award className="h-4 w-4 mr-2" />
                      Ver Mis Notas
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
                      Mi Perfil
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

            {/* Constancias Disponibles */}
            <Card>
              <CardHeader>
                <CardTitle>Constancias Disponibles</CardTitle>
                <CardDescription>Documentos que puedes descargar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {constanciasDisponibles.map((constancia, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{constancia.tipo}</p>
                          <p className="text-xs text-slate-600">{constancia.descripcion}</p>
                        </div>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Próximas Clases */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Próximas Clases
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {proximasClases.map((clase, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-sm">{clase.materia}</p>
                          <p className="text-xs text-slate-600">Tema: {clase.tema}</p>
                          <p className="text-xs text-slate-500">
                            {clase.hora} - {clase.aula}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {clase.fecha}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Información Personal */}
            <Card>
              <CardHeader>
                <CardTitle>Mi Información</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Cédula:</span>
                    <span className="font-medium">{estudiante.cedula}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Carrera:</span>
                    <span className="font-medium">{estudiante.carrera}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Trayecto:</span>
                    <span className="font-medium">{estudiante.trayecto}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Estado:</span>
                    <Badge variant="outline" className="text-xs">
                      {estudiante.estado}
                    </Badge>
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
