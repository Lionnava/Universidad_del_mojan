"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GraduationCap, BookOpen, Users, Calendar, Plus, Search, Filter, Mail, Phone, Award } from "lucide-react"
import Link from "next/link"

export default function ProfesoresPage() {
  const profesores = [
    {
      id: 1,
      nombre: "Dr. Juan García",
      cedula: "12345678",
      email: "jgarcia@universidad.edu",
      telefono: "0412-1234567",
      especialidad: "Matemáticas",
      titulo: "Doctor en Matemáticas",
      materias: 3,
      estudiantes: 85,
      estado: "Activo",
    },
    {
      id: 2,
      nombre: "Ing. María Martínez",
      cedula: "23456789",
      email: "mmartinez@universidad.edu",
      telefono: "0414-2345678",
      especialidad: "Programación",
      titulo: "Ingeniera en Sistemas",
      materias: 4,
      estudiantes: 120,
      estado: "Activo",
    },
    {
      id: 3,
      nombre: "Dr. Pedro López",
      cedula: "34567890",
      email: "plopez@universidad.edu",
      telefono: "0416-3456789",
      especialidad: "Física",
      titulo: "Doctor en Física",
      materias: 2,
      estudiantes: 60,
      estado: "Activo",
    },
  ]

  const asignaciones = [
    {
      profesor: "Dr. Juan García",
      materia: "Matemática I",
      seccion: "A",
      horario: "Lun-Mie-Vie 8:00-10:00",
      estudiantes: 28,
      aula: "Aula 101",
    },
    {
      profesor: "Ing. María Martínez",
      materia: "Programación I",
      seccion: "A",
      horario: "Mar-Jue 10:00-12:00",
      estudiantes: 25,
      aula: "Lab 201",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Gestión de Profesores</h1>
            <p className="text-slate-600">Administra profesores y asignaciones académicas</p>
          </div>
          <Link href="/">
            <Button variant="outline">Volver al Dashboard</Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-slate-600">Profesores Activos</p>
                  <p className="text-2xl font-bold">124</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-slate-600">Materias Asignadas</p>
                  <p className="text-2xl font-bold">89</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-sm text-slate-600">Estudiantes Atendidos</p>
                  <p className="text-2xl font-bold">2,847</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-sm text-slate-600">Horas Semanales</p>
                  <p className="text-2xl font-bold">1,248</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="profesores" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profesores">Profesores</TabsTrigger>
            <TabsTrigger value="asignaciones">Asignaciones</TabsTrigger>
            <TabsTrigger value="evaluacion">Evaluación</TabsTrigger>
          </TabsList>

          <TabsContent value="profesores" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <CardTitle>Directorio de Profesores</CardTitle>
                    <CardDescription>Gestión del personal docente</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo Profesor
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input placeholder="Buscar profesor..." className="pl-10" />
                  </div>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtros
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {profesores.map((profesor) => (
                    <Card key={profesor.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{profesor.nombre}</CardTitle>
                            <CardDescription>{profesor.cedula}</CardDescription>
                          </div>
                          <Badge variant="outline">{profesor.estado}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm">
                            <Award className="h-4 w-4 text-slate-500" />
                            <span>{profesor.titulo}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <BookOpen className="h-4 w-4 text-slate-500" />
                            <span>{profesor.especialidad}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-slate-500" />
                            <span className="truncate">{profesor.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-slate-500" />
                            <span>{profesor.telefono}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 pt-2 text-center">
                            <div>
                              <div className="text-lg font-bold text-blue-600">{profesor.materias}</div>
                              <div className="text-xs text-slate-500">Materias</div>
                            </div>
                            <div>
                              <div className="text-lg font-bold text-green-600">{profesor.estudiantes}</div>
                              <div className="text-xs text-slate-500">Estudiantes</div>
                            </div>
                          </div>
                          <div className="flex gap-2 pt-2">
                            <Button size="sm" variant="outline" className="flex-1">
                              Ver Perfil
                            </Button>
                            <Button size="sm" className="flex-1">
                              Editar
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="asignaciones" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <CardTitle>Asignaciones Académicas</CardTitle>
                    <CardDescription>Gestión de materias y horarios por profesor</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Nueva Asignación
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Profesor</th>
                        <th className="text-left p-2">Materia</th>
                        <th className="text-left p-2">Sección</th>
                        <th className="text-left p-2">Horario</th>
                        <th className="text-left p-2">Estudiantes</th>
                        <th className="text-left p-2">Aula</th>
                        <th className="text-left p-2">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {asignaciones.map((asignacion, index) => (
                        <tr key={index} className="border-b hover:bg-slate-50">
                          <td className="p-2 font-medium">{asignacion.profesor}</td>
                          <td className="p-2">{asignacion.materia}</td>
                          <td className="p-2">
                            <Badge variant="outline">{asignacion.seccion}</Badge>
                          </td>
                          <td className="p-2 text-sm">{asignacion.horario}</td>
                          <td className="p-2 text-center">{asignacion.estudiantes}</td>
                          <td className="p-2">{asignacion.aula}</td>
                          <td className="p-2">
                            <div className="flex gap-1">
                              <Button size="sm" variant="outline">
                                Ver
                              </Button>
                              <Button size="sm">Editar</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="evaluacion" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Módulo de Evaluación Docente</CardTitle>
                <CardDescription>Herramientas para profesores en el proceso de evaluación</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-2 border-blue-200 bg-blue-50">
                    <CardHeader>
                      <CardTitle className="text-lg">Sistema de Calificaciones</CardTitle>
                      <CardDescription>Acceso al sistema de evaluación y notas</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-3xl font-bold text-blue-600">156</div>
                        <p className="text-sm text-slate-600">Evaluaciones pendientes</p>
                        <Button className="w-full">Acceder al Sistema</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-green-200 bg-green-50">
                    <CardHeader>
                      <CardTitle className="text-lg">Planificación de Clases</CardTitle>
                      <CardDescription>Herramientas de planificación académica</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-3xl font-bold text-green-600">89</div>
                        <p className="text-sm text-slate-600">Planes de clase activos</p>
                        <Button className="w-full">Gestionar Planes</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
