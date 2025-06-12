"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  FileText,
  Download,
  Calendar,
  Users,
  GraduationCap,
  BookOpen,
  TrendingUp,
  PieChart,
  ArrowLeft,
  Filter,
} from "lucide-react"
import Link from "next/link"

export default function ReportesPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("2024-2025")
  const [selectedFormat, setSelectedFormat] = useState("pdf")
  const [includeGraphics, setIncludeGraphics] = useState(true)
  const [includeStats, setIncludeStats] = useState(true)

  const tiposReporte = [
    {
      categoria: "Estudiantes",
      reportes: [
        {
          id: "estudiantes-general",
          nombre: "Reporte General de Estudiantes",
          descripcion: "Listado completo con estadísticas",
        },
        {
          id: "estudiantes-carrera",
          nombre: "Estudiantes por Carrera",
          descripcion: "Distribución por programa académico",
        },
        { id: "estudiantes-trayecto", nombre: "Estudiantes por Trayecto", descripcion: "Análisis por nivel académico" },
        {
          id: "estudiantes-rendimiento",
          nombre: "Rendimiento Académico",
          descripcion: "Promedios y estadísticas de notas",
        },
        { id: "aspirantes", nombre: "Censo de Aspirantes", descripcion: "Solicitudes de ingreso y estado" },
      ],
    },
    {
      categoria: "Académico",
      reportes: [
        { id: "materias", nombre: "Reporte de Materias", descripcion: "Catálogo de asignaturas por carrera" },
        { id: "horarios", nombre: "Horarios Académicos", descripcion: "Programación de clases y aulas" },
        { id: "profesores", nombre: "Carga Académica Profesores", descripcion: "Asignaciones y distribución" },
        { id: "ocupacion-aulas", nombre: "Ocupación de Aulas", descripcion: "Uso de espacios físicos" },
      ],
    },
    {
      categoria: "Evaluaciones",
      reportes: [
        {
          id: "calificaciones",
          nombre: "Consolidado de Calificaciones",
          descripcion: "Notas por materia y estudiante",
        },
        {
          id: "estadisticas-notas",
          nombre: "Estadísticas de Evaluación",
          descripcion: "Promedios y distribución de notas",
        },
        {
          id: "rendimiento-materias",
          nombre: "Rendimiento por Materia",
          descripcion: "Análisis comparativo de asignaturas",
        },
        {
          id: "evaluaciones-pendientes",
          nombre: "Evaluaciones Pendientes",
          descripcion: "Seguimiento de calificaciones",
        },
      ],
    },
    {
      categoria: "Administrativo",
      reportes: [
        { id: "inscripciones", nombre: "Proceso de Inscripciones", descripcion: "Estado y seguimiento de matrículas" },
        { id: "constancias", nombre: "Constancias Generadas", descripcion: "Registro de documentos emitidos" },
        { id: "auditoria", nombre: "Auditoría del Sistema", descripcion: "Registro de actividades y cambios" },
        { id: "usuarios", nombre: "Gestión de Usuarios", descripcion: "Accesos y roles del sistema" },
      ],
    },
  ]

  const reportesEjecutivos = [
    {
      id: "dashboard-ejecutivo",
      nombre: "Dashboard Ejecutivo",
      descripcion: "Resumen general con KPIs principales",
      icon: BarChart3,
      color: "bg-blue-500",
    },
    {
      id: "tendencias",
      nombre: "Análisis de Tendencias",
      descripcion: "Evolución histórica de indicadores",
      icon: TrendingUp,
      color: "bg-green-500",
    },
    {
      id: "comparativo",
      nombre: "Reporte Comparativo",
      descripcion: "Comparación entre períodos académicos",
      icon: PieChart,
      color: "bg-purple-500",
    },
  ]

  const generarReporte = async (reporteId: string, categoria: string) => {
    // Simular generación de reporte
    const reportData = {
      id: reporteId,
      categoria,
      fecha: new Date().toLocaleDateString(),
      periodo: selectedPeriod,
      formato: selectedFormat,
    }

    let contenido = `
UNIVERSIDAD MÓVIL
REPORTE ${categoria.toUpperCase()}
${reporteId.replace("-", " ").toUpperCase()}

Fecha de generación: ${reportData.fecha}
Período académico: ${reportData.periodo}
Formato: ${reportData.formato.toUpperCase()}

=== RESUMEN EJECUTIVO ===
`

    // Contenido específico según el tipo de reporte
    switch (reporteId) {
      case "estudiantes-general":
        contenido += `
ESTADÍSTICAS GENERALES DE ESTUDIANTES:
- Total de estudiantes activos: 2,847
- Nuevos ingresos este período: 234
- Estudiantes por carrera:
  * Ingeniería en Informática: 1,245 (43.7%)
  * Medicina: 892 (31.3%)
  * Derecho: 456 (16.0%)
  * Administración: 254 (8.9%)

DISTRIBUCIÓN POR TRAYECTO:
- Trayecto 1: 1,123 estudiantes (39.4%)
- Trayecto 2: 856 estudiantes (30.1%)
- Trayecto 3: 534 estudiantes (18.8%)
- Trayecto 4: 334 estudiantes (11.7%)

INDICADORES DE RENDIMIENTO:
- Promedio general institucional: 16.8
- Tasa de aprobación: 89%
- Tasa de retención: 94%
`
        break

      case "horarios":
        contenido += `
PROGRAMACIÓN ACADÉMICA:
- Total de materias programadas: 89
- Secciones activas: 156
- Aulas en uso: 45
- Laboratorios: 12

DISTRIBUCIÓN DE HORARIOS:
- Turno mañana: 60% de las clases
- Turno tarde: 30% de las clases
- Turno noche: 10% de las clases

OCUPACIÓN DE ESPACIOS:
- Promedio de ocupación: 78%
- Aulas con mayor demanda: Aula 101, Lab 201
- Espacios disponibles: 15 aulas, 3 laboratorios
`
        break

      case "calificaciones":
        contenido += `
CONSOLIDADO DE CALIFICACIONES:
- Evaluaciones registradas: 1,245
- Promedio institucional: 16.8
- Distribución de notas:
  * Excelente (18-20): 23%
  * Bueno (16-17): 34%
  * Regular (14-15): 32%
  * Deficiente (10-13): 11%

RENDIMIENTO POR CARRERA:
- Ingeniería: 17.2 promedio
- Medicina: 16.8 promedio
- Derecho: 16.5 promedio
- Administración: 16.9 promedio
`
        break

      default:
        contenido += `
DATOS DEL REPORTE:
Este reporte contiene información detallada sobre ${reporteId.replace("-", " ")}.
Los datos corresponden al período académico ${selectedPeriod}.

Para más información, contacte al departamento de Registro y Control de Estudios.
`
    }

    contenido += `

=== NOTAS ADICIONALES ===
- Reporte generado automáticamente por el Sistema Universitario
- Los datos son actualizados en tiempo real
- Para verificación, contacte a la Coordinación Académica

=== FIN DEL REPORTE ===
`

    // Crear y descargar archivo
    const blob = new Blob([contenido], { type: "text/plain;charset=utf-8" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${reporteId}_${selectedPeriod}_${new Date().toISOString().split("T")[0]}.${selectedFormat === "pdf" ? "txt" : selectedFormat}`
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)

    alert("Reporte generado y descargado exitosamente")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Centro de Reportes</h1>
            <p className="text-slate-600">Genera reportes detallados y análisis del sistema</p>
          </div>
          <Link href="/dashboard">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </Link>
        </div>

        {/* Configuración Global */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Configuración de Reportes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Período Académico</label>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024-2025">2024-2025</SelectItem>
                    <SelectItem value="2023-2024">2023-2024</SelectItem>
                    <SelectItem value="2022-2023">2022-2023</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Formato de Salida</label>
                <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Opciones</label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="graphics" checked={includeGraphics} onCheckedChange={setIncludeGraphics} />
                    <label htmlFor="graphics" className="text-sm">
                      Incluir gráficos
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="stats" checked={includeStats} onCheckedChange={setIncludeStats} />
                    <label htmlFor="stats" className="text-sm">
                      Incluir estadísticas
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex items-end">
                <Button className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Programar Reporte
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contenido Principal */}
        <Tabs defaultValue="categorias" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="categorias">Reportes por Categoría</TabsTrigger>
            <TabsTrigger value="ejecutivos">Reportes Ejecutivos</TabsTrigger>
            <TabsTrigger value="programados">Reportes Programados</TabsTrigger>
          </TabsList>

          <TabsContent value="categorias" className="space-y-6">
            {tiposReporte.map((categoria, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {categoria.categoria === "Estudiantes" && <Users className="h-5 w-5 text-blue-500" />}
                    {categoria.categoria === "Académico" && <BookOpen className="h-5 w-5 text-green-500" />}
                    {categoria.categoria === "Evaluaciones" && <GraduationCap className="h-5 w-5 text-purple-500" />}
                    {categoria.categoria === "Administrativo" && <FileText className="h-5 w-5 text-orange-500" />}
                    {categoria.categoria}
                  </CardTitle>
                  <CardDescription>Reportes relacionados con {categoria.categoria.toLowerCase()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoria.reportes.map((reporte) => (
                      <Card key={reporte.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <CardTitle className="text-lg">{reporte.nombre}</CardTitle>
                          <CardDescription>{reporte.descripcion}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <Calendar className="h-4 w-4" />
                              <span>Período: {selectedPeriod}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <FileText className="h-4 w-4" />
                              <span>Formato: {selectedFormat.toUpperCase()}</span>
                            </div>
                            <Button className="w-full" onClick={() => generarReporte(reporte.id, categoria.categoria)}>
                              <Download className="h-4 w-4 mr-2" />
                              Generar Reporte
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="ejecutivos" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Reportes Ejecutivos</CardTitle>
                <CardDescription>Análisis de alto nivel para toma de decisiones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {reportesEjecutivos.map((reporte) => {
                    const Icon = reporte.icon
                    return (
                      <Card key={reporte.id} className="hover:shadow-xl transition-all duration-300">
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-lg ${reporte.color}`}>
                              <Icon className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{reporte.nombre}</CardTitle>
                            </div>
                          </div>
                          <CardDescription>{reporte.descripcion}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="text-sm text-slate-600">
                              <p>• Indicadores clave de rendimiento</p>
                              <p>• Análisis comparativo</p>
                              <p>• Tendencias y proyecciones</p>
                              <p>• Recomendaciones estratégicas</p>
                            </div>
                            <Button className="w-full" onClick={() => generarReporte(reporte.id, "Ejecutivo")}>
                              <Download className="h-4 w-4 mr-2" />
                              Generar Reporte
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="programados" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Reportes Programados</CardTitle>
                <CardDescription>Automatización de reportes recurrentes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">Reporte Mensual de Estudiantes</h3>
                        <p className="text-sm text-slate-600">Estadísticas generales cada fin de mes</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                          <span>Frecuencia: Mensual</span>
                          <span>Próxima ejecución: 30 Nov 2024</span>
                          <span>Formato: PDF</span>
                        </div>
                      </div>
                      <Badge variant="default">Activo</Badge>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">Consolidado de Calificaciones</h3>
                        <p className="text-sm text-slate-600">Reporte trimestral de notas</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                          <span>Frecuencia: Trimestral</span>
                          <span>Próxima ejecución: 15 Dic 2024</span>
                          <span>Formato: Excel</span>
                        </div>
                      </div>
                      <Badge variant="default">Activo</Badge>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">Auditoría del Sistema</h3>
                        <p className="text-sm text-slate-600">Reporte semanal de actividades</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                          <span>Frecuencia: Semanal</span>
                          <span>Próxima ejecución: 10 Nov 2024</span>
                          <span>Formato: CSV</span>
                        </div>
                      </div>
                      <Badge variant="secondary">Pausado</Badge>
                    </div>
                  </div>

                  <Button className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    Programar Nuevo Reporte
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
