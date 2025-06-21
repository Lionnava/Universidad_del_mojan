"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Clock, Users, GraduationCap, ArrowLeft, Calendar, MapPin } from "lucide-react"
import Link from "next/link"

export default function AcademicoPublico() {
  const carreras = [
    {
      nombre: "Ingeniería en Informática",
      codigo: "INF",
      duracion: "4 Trayectos",
      modalidades: ["Presencial", "Semipresencial"],
      turnos: ["Mañana", "Tarde", "Noche"],
      descripcion: "Forma profesionales en el área de sistemas y tecnología",
      materias: 45,
      creditos: 180,
    },
    {
      nombre: "Medicina",
      codigo: "MED",
      duracion: "6 Trayectos",
      modalidades: ["Presencial"],
      turnos: ["Mañana", "Tarde"],
      descripcion: "Formación integral en ciencias médicas y salud",
      materias: 72,
      creditos: 240,
    },
    {
      nombre: "Derecho",
      codigo: "DER",
      duracion: "4 Trayectos",
      modalidades: ["Presencial", "Semipresencial", "Virtual"],
      turnos: ["Mañana", "Tarde", "Noche"],
      descripcion: "Formación en ciencias jurídicas y derecho",
      materias: 48,
      creditos: 180,
    },
    {
      nombre: "Administración",
      codigo: "ADM",
      duracion: "4 Trayectos",
      modalidades: ["Presencial", "Virtual"],
      turnos: ["Tarde", "Noche"],
      descripcion: "Gestión empresarial y administración de negocios",
      materias: 42,
      creditos: 168,
    },
    {
      nombre: "Enfermería",
      codigo: "ENF",
      duracion: "3 Trayectos",
      modalidades: ["Presencial"],
      turnos: ["Mañana", "Tarde"],
      descripcion: "Cuidados de salud y atención al paciente",
      materias: 36,
      creditos: 144,
    },
  ]

  const horarios = [
    {
      turno: "Mañana",
      horario: "7:00 AM - 12:00 PM",
      descripcion: "Ideal para estudiantes de tiempo completo",
    },
    {
      turno: "Tarde",
      horario: "1:00 PM - 6:00 PM",
      descripcion: "Perfecto para quienes trabajan en la mañana",
    },
    {
      turno: "Noche",
      horario: "6:00 PM - 10:00 PM",
      descripcion: "Diseñado para estudiantes que trabajan",
    },
  ]

  const periodoAcademico = {
    nombre: "2024-2025",
    fechaInicio: "Septiembre 2024",
    fechaFin: "Julio 2025",
    inscripcionesAbiertas: true,
    proximoTrimestre: "Enero 2025",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <Link href="/" className="inline-flex items-center gap-2 text-green-600 hover:text-green-800 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Volver al Portal Principal
          </Link>
          <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800">Información Académica</h1>
          <p className="text-slate-600">Conoce nuestras carreras, horarios y planificación académica</p>
        </div>

        {/* Período Académico Actual */}
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <Calendar className="h-5 w-5" />
              Período Académico Actual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-slate-600">Período</p>
                <p className="font-bold text-lg">{periodoAcademico.nombre}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Duración</p>
                <p className="font-medium">
                  {periodoAcademico.fechaInicio} - {periodoAcademico.fechaFin}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Próximo Trimestre</p>
                <p className="font-medium">{periodoAcademico.proximoTrimestre}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Inscripciones</p>
                <Badge variant="default" className="bg-green-600">
                  {periodoAcademico.inscripcionesAbiertas ? "Abiertas" : "Cerradas"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="carreras" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="carreras">🎓 Carreras</TabsTrigger>
            <TabsTrigger value="horarios">⏰ Horarios</TabsTrigger>
            <TabsTrigger value="modalidades">📚 Modalidades</TabsTrigger>
          </TabsList>

          {/* Tab de Carreras */}
          <TabsContent value="carreras">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {carreras.map((carrera, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{carrera.nombre}</CardTitle>
                        <CardDescription>{carrera.descripcion}</CardDescription>
                      </div>
                      <Badge variant="outline">{carrera.codigo}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-slate-700">Duración:</p>
                          <p className="text-slate-600">{carrera.duracion}</p>
                        </div>
                        <div>
                          <p className="font-medium text-slate-700">Materias:</p>
                          <p className="text-slate-600">{carrera.materias} materias</p>
                        </div>
                        <div>
                          <p className="font-medium text-slate-700">Créditos:</p>
                          <p className="text-slate-600">{carrera.creditos} créditos</p>
                        </div>
                        <div>
                          <p className="font-medium text-slate-700">Modalidades:</p>
                          <div className="flex flex-wrap gap-1">
                            {carrera.modalidades.map((modalidad, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {modalidad}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="font-medium text-slate-700 mb-1">Turnos Disponibles:</p>
                        <div className="flex flex-wrap gap-1">
                          {carrera.turnos.map((turno, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {turno}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab de Horarios */}
          <TabsContent value="horarios">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {horarios.map((horario, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-blue-600" />
                      Turno {horario.turno}
                    </CardTitle>
                    <CardDescription>{horario.descripcion}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{horario.horario}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-purple-600" />
                  Ubicaciones y Aulas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Edificio Principal</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Aulas 101-120</li>
                      <li>• Auditorio Principal</li>
                      <li>• Biblioteca</li>
                      <li>• Administración</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Laboratorios</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Lab. Informática 201-205</li>
                      <li>• Lab. Ciencias 301-303</li>
                      <li>• Lab. Idiomas 401</li>
                      <li>• Lab. Medicina 501-510</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">Servicios</h4>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• Cafetería</li>
                      <li>• Centro de Copiado</li>
                      <li>• Enfermería</li>
                      <li>• Estacionamiento</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab de Modalidades */}
          <TabsContent value="modalidades">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-600" />
                    Presencial
                  </CardTitle>
                  <CardDescription>Clases tradicionales en el campus</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-slate-700">Características:</h4>
                      <ul className="text-sm text-slate-600 space-y-1 mt-1">
                        <li>• Interacción directa con profesores</li>
                        <li>• Acceso completo a laboratorios</li>
                        <li>• Actividades grupales presenciales</li>
                        <li>• Horarios fijos establecidos</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-700">Ideal para:</h4>
                      <p className="text-sm text-slate-600">
                        Estudiantes de tiempo completo que prefieren el ambiente universitario tradicional.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    Semipresencial
                  </CardTitle>
                  <CardDescription>Combinación de clases presenciales y virtuales</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-slate-700">Características:</h4>
                      <ul className="text-sm text-slate-600 space-y-1 mt-1">
                        <li>• 60% presencial, 40% virtual</li>
                        <li>• Flexibilidad de horarios</li>
                        <li>• Plataforma educativa digital</li>
                        <li>• Evaluaciones mixtas</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-700">Ideal para:</h4>
                      <p className="text-sm text-slate-600">
                        Estudiantes que trabajan y necesitan flexibilidad sin perder la interacción presencial.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-purple-600" />
                    Virtual
                  </CardTitle>
                  <CardDescription>Educación 100% en línea</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-slate-700">Características:</h4>
                      <ul className="text-sm text-slate-600 space-y-1 mt-1">
                        <li>• Clases en línea en vivo</li>
                        <li>• Material didáctico digital</li>
                        <li>• Horarios flexibles</li>
                        <li>• Evaluaciones en línea</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-700">Ideal para:</h4>
                      <p className="text-sm text-slate-600">
                        Estudiantes que requieren máxima flexibilidad o viven lejos del campus.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Requisitos Tecnológicos para Modalidad Virtual</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-slate-700 mb-2">Requisitos Mínimos:</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• Computadora o laptop</li>
                      <li>• Conexión a internet estable (5 Mbps mínimo)</li>
                      <li>• Cámara web y micrófono</li>
                      <li>• Navegador web actualizado</li>
                      <li>• Software de oficina (Word, Excel, PDF)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-700 mb-2">Plataformas Utilizadas:</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• Aula Virtual Institucional</li>
                      <li>• Zoom para videoconferencias</li>
                      <li>• Google Classroom</li>
                      <li>• Sistema de evaluaciones en línea</li>
                      <li>• Biblioteca digital</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-bold mb-2">¿Listo para comenzar tu carrera universitaria?</h3>
            <p className="mb-4 opacity-90">Únete a nuestra comunidad académica y forma parte del futuro</p>
            <Link href="/registro-nuevo">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Registrarse Ahora
              </button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
