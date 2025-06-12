"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Clock, Users, Plus, Search, Filter, Calendar, MapPin, User } from "lucide-react"
import Link from "next/link"

export default function AcademicoPage() {
  const materias = [
    {
      id: 1,
      nombre: "Cálculo I",
      codigo: "MAT101",
      trayecto: "1",
      trimestre: "1",
      creditos: 4,
      profesor: "Dr. García",
      secciones: 3,
      estudiantes: 85,
    },
    {
      id: 2,
      nombre: "Programación I",
      codigo: "INF101",
      trayecto: "1",
      trimestre: "1",
      creditos: 5,
      profesor: "Ing. Martínez",
      secciones: 2,
      estudiantes: 60,
    },
    {
      id: 3,
      nombre: "Física I",
      codigo: "FIS101",
      trayecto: "1",
      trimestre: "2",
      creditos: 4,
      profesor: "Dr. López",
      secciones: 2,
      estudiantes: 45,
    },
  ]

  const secciones = [
    {
      id: 1,
      materia: "Cálculo I",
      seccion: "A",
      horario: "Lun-Mie-Vie 8:00-10:00",
      aula: "Aula 101",
      profesor: "Dr. García",
      cupos: 30,
      inscritos: 28,
    },
    {
      id: 2,
      materia: "Programación I",
      seccion: "B",
      horario: "Mar-Jue 10:00-12:00",
      aula: "Lab 201",
      profesor: "Ing. Martínez",
      cupos: 25,
      inscritos: 25,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Gestión Académica</h1>
            <p className="text-slate-600">Administra materias, secciones y planificación académica</p>
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
                <BookOpen className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-slate-600">Materias Activas</p>
                  <p className="text-2xl font-bold">89</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-slate-600">Secciones</p>
                  <p className="text-2xl font-bold">156</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-sm text-slate-600">Horarios</p>
                  <p className="text-2xl font-bold">234</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-sm text-slate-600">Horas Semanales</p>
                  <p className="text-2xl font-bold">1,248</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="materias" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="materias">Materias</TabsTrigger>
            <TabsTrigger value="secciones">Secciones</TabsTrigger>
            <TabsTrigger value="planificacion">Planificación</TabsTrigger>
          </TabsList>

          <TabsContent value="materias" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <CardTitle>Gestión de Materias</CardTitle>
                    <CardDescription>Administra las asignaturas por trayecto y trimestre</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Nueva Materia
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input placeholder="Buscar materia..." className="pl-10" />
                  </div>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtros
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {materias.map((materia) => (
                    <Card key={materia.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{materia.nombre}</CardTitle>
                            <CardDescription>{materia.codigo}</CardDescription>
                          </div>
                          <Badge variant="outline">
                            T{materia.trayecto}-Tr{materia.trimestre}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm">
                            <BookOpen className="h-4 w-4 text-slate-500" />
                            <span>{materia.creditos} créditos</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <User className="h-4 w-4 text-slate-500" />
                            <span>{materia.profesor}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Users className="h-4 w-4 text-slate-500" />
                            <span>
                              {materia.secciones} secciones • {materia.estudiantes} estudiantes
                            </span>
                          </div>
                          <div className="flex gap-2 pt-2">
                            <Button size="sm" variant="outline" className="flex-1">
                              Ver Detalles
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

          <TabsContent value="secciones" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <CardTitle>Gestión de Secciones</CardTitle>
                    <CardDescription>Administra secciones, horarios y asignación de aulas</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Nueva Sección
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Materia</th>
                        <th className="text-left p-2">Sección</th>
                        <th className="text-left p-2">Horario</th>
                        <th className="text-left p-2">Aula</th>
                        <th className="text-left p-2">Profesor</th>
                        <th className="text-left p-2">Cupos</th>
                        <th className="text-left p-2">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {secciones.map((seccion) => (
                        <tr key={seccion.id} className="border-b hover:bg-slate-50">
                          <td className="p-2 font-medium">{seccion.materia}</td>
                          <td className="p-2">
                            <Badge variant="outline">{seccion.seccion}</Badge>
                          </td>
                          <td className="p-2">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-slate-500" />
                              <span className="text-sm">{seccion.horario}</span>
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4 text-slate-500" />
                              <span className="text-sm">{seccion.aula}</span>
                            </div>
                          </td>
                          <td className="p-2">{seccion.profesor}</td>
                          <td className="p-2">
                            <div className="text-sm">
                              <span className={seccion.inscritos >= seccion.cupos ? "text-red-600" : "text-green-600"}>
                                {seccion.inscritos}/{seccion.cupos}
                              </span>
                            </div>
                          </td>
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

          <TabsContent value="planificacion" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Planificación Académica</CardTitle>
                <CardDescription>Herramientas de planificación y organización académica</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-2 border-blue-200 bg-blue-50">
                    <CardHeader>
                      <CardTitle className="text-lg">Calendario Académico</CardTitle>
                      <CardDescription>Gestión del calendario y períodos</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-blue-600" />
                          <span className="font-medium">Período 2024-2025</span>
                        </div>
                        <p className="text-sm text-slate-600">3 trimestres programados</p>
                        <Button className="w-full">Gestionar Calendario</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-green-200 bg-green-50">
                    <CardHeader>
                      <CardTitle className="text-lg">Asignación de Recursos</CardTitle>
                      <CardDescription>Aulas, laboratorios y equipos</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-green-600" />
                          <span className="font-medium">45 Aulas disponibles</span>
                        </div>
                        <p className="text-sm text-slate-600">12 laboratorios especializados</p>
                        <Button className="w-full">Gestionar Recursos</Button>
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
