"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  ClipboardList,
  TrendingUp,
  Users,
  Award,
  Plus,
  Search,
  Filter,
  FileText,
  BarChart3,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

export default function EvaluacionesPage() {
  const evaluaciones = [
    {
      id: 1,
      materia: "Cálculo I",
      tipo: "Parcial 1",
      fecha: "2024-02-15",
      profesor: "Dr. García",
      estudiantes: 85,
      calificadas: 78,
      promedio: 16.5,
    },
    {
      id: 2,
      materia: "Programación I",
      tipo: "Proyecto",
      fecha: "2024-02-20",
      profesor: "Ing. Martínez",
      estudiantes: 60,
      calificadas: 60,
      promedio: 17.2,
    },
  ]

  const consolidado = [
    {
      estudiante: "María González",
      cedula: "12345678",
      materia: "Cálculo I",
      parcial1: 18,
      parcial2: 16,
      proyecto: 19,
      final: 17.5,
      estado: "Aprobado",
    },
    {
      estudiante: "Carlos Rodríguez",
      cedula: "87654321",
      materia: "Programación I",
      parcial1: 15,
      parcial2: 14,
      proyecto: 16,
      final: 15.0,
      estado: "Aprobado",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Sistema de Evaluaciones</h1>
            <p className="text-slate-600">Gestión de evaluaciones y consolidado de notas</p>
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
                <ClipboardList className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-slate-600">Evaluaciones Activas</p>
                  <p className="text-2xl font-bold">156</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-slate-600">Calificadas</p>
                  <p className="text-2xl font-bold">134</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-sm text-slate-600">Promedio General</p>
                  <p className="text-2xl font-bold">16.8</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-sm text-slate-600">Aprobados</p>
                  <p className="text-2xl font-bold">89%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="evaluaciones" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="evaluaciones">Evaluaciones</TabsTrigger>
            <TabsTrigger value="consolidado">Consolidado</TabsTrigger>
            <TabsTrigger value="reportes">Reportes</TabsTrigger>
          </TabsList>

          <TabsContent value="evaluaciones" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <CardTitle>Gestión de Evaluaciones</CardTitle>
                    <CardDescription>Administra evaluaciones por materia y profesor</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Nueva Evaluación
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input placeholder="Buscar evaluación..." className="pl-10" />
                  </div>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtros
                  </Button>
                </div>

                <div className="space-y-4">
                  {evaluaciones.map((evaluacion) => (
                    <Card key={evaluacion.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-semibold">{evaluacion.materia}</h3>
                              <Badge variant="outline">{evaluacion.tipo}</Badge>
                            </div>
                            <p className="text-sm text-slate-600">
                              Profesor: {evaluacion.profesor} • Fecha: {evaluacion.fecha}
                            </p>
                          </div>
                          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-blue-600">{evaluacion.promedio}</div>
                              <p className="text-xs text-slate-500">Promedio</p>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                <Users className="h-4 w-4" />
                                <span>
                                  {evaluacion.calificadas}/{evaluacion.estudiantes} calificadas
                                </span>
                              </div>
                              <Progress
                                value={(evaluacion.calificadas / evaluacion.estudiantes) * 100}
                                className="w-32"
                              />
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                Ver Detalles
                              </Button>
                              <Button size="sm">Calificar</Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="consolidado" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <CardTitle>Consolidado de Notas</CardTitle>
                    <CardDescription>Registro completo de calificaciones por estudiante</CardDescription>
                  </div>
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Exportar Consolidado
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Estudiante</th>
                        <th className="text-left p-2">Cédula</th>
                        <th className="text-left p-2">Materia</th>
                        <th className="text-left p-2">Parcial 1</th>
                        <th className="text-left p-2">Parcial 2</th>
                        <th className="text-left p-2">Proyecto</th>
                        <th className="text-left p-2">Final</th>
                        <th className="text-left p-2">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {consolidado.map((registro, index) => (
                        <tr key={index} className="border-b hover:bg-slate-50">
                          <td className="p-2 font-medium">{registro.estudiante}</td>
                          <td className="p-2">{registro.cedula}</td>
                          <td className="p-2">{registro.materia}</td>
                          <td className="p-2 text-center">{registro.parcial1}</td>
                          <td className="p-2 text-center">{registro.parcial2}</td>
                          <td className="p-2 text-center">{registro.proyecto}</td>
                          <td className="p-2 text-center font-bold">{registro.final}</td>
                          <td className="p-2">
                            <Badge variant={registro.estado === "Aprobado" ? "default" : "destructive"}>
                              {registro.estado}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reportes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Reportes de Evaluación</CardTitle>
                <CardDescription>Genera reportes y estadísticas del rendimiento académico</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card className="border-2 border-blue-200 bg-blue-50">
                    <CardHeader>
                      <CardTitle className="text-lg">Reporte por Materia</CardTitle>
                      <CardDescription>Estadísticas de rendimiento por asignatura</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Generar Reporte
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-green-200 bg-green-50">
                    <CardHeader>
                      <CardTitle className="text-lg">Reporte por Estudiante</CardTitle>
                      <CardDescription>Historial académico individual</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full">
                        <FileText className="h-4 w-4 mr-2" />
                        Generar Reporte
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-purple-200 bg-purple-50">
                    <CardHeader>
                      <CardTitle className="text-lg">Estadísticas Generales</CardTitle>
                      <CardDescription>Análisis global del rendimiento</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Ver Estadísticas
                      </Button>
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
