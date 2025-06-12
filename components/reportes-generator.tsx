"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, FileText, BarChart3, Users, GraduationCap } from "lucide-react"

interface ReportesGeneratorProps {
  onClose: () => void
}

export function ReportesGenerator({ onClose }: ReportesGeneratorProps) {
  const [reportConfig, setReportConfig] = useState({
    tipo: "",
    modulo: "",
    formato: "pdf",
    incluirGraficos: true,
    incluirEstadisticas: true,
    fechaInicio: null,
    fechaFin: null,
    filtros: {
      carrera: "",
      trayecto: "",
      estado: "",
    },
  })

  const tiposReporte = [
    { value: "general", label: "Reporte General", icon: BarChart3 },
    { value: "estudiantes", label: "Reporte de Estudiantes", icon: Users },
    { value: "academico", label: "Reporte Académico", icon: GraduationCap },
    { value: "evaluaciones", label: "Reporte de Evaluaciones", icon: FileText },
  ]

  const modulosDisponibles = {
    general: ["Dashboard", "Estadísticas Generales", "Resumen Ejecutivo"],
    estudiantes: ["Censo de Aspirantes", "Estudiantes Activos", "Inscripciones", "Historial Académico"],
    academico: ["Materias", "Secciones", "Horarios", "Planificación"],
    evaluaciones: ["Calificaciones", "Consolidado de Notas", "Rendimiento Académico"],
  }

  const handleGenerateReport = async () => {
    // Aquí iría la lógica para generar el reporte
    console.log("Configuración del reporte:", reportConfig)

    // Simular generación de reporte
    const reportData = {
      titulo: `Reporte ${tiposReporte.find((t) => t.value === reportConfig.tipo)?.label}`,
      fecha: new Date().toLocaleDateString(),
      modulo: reportConfig.modulo,
      formato: reportConfig.formato,
    }

    // Crear y descargar archivo simulado
    const content = `
UNIVERSIDAD MÓVIL
${reportData.titulo}
Fecha de generación: ${reportData.fecha}
Módulo: ${reportData.modulo}

=== DATOS DEL REPORTE ===

${
  reportConfig.tipo === "estudiantes"
    ? `
ESTADÍSTICAS DE ESTUDIANTES:
- Estudiantes Activos: 2,847
- Aspirantes: 456
- Nuevos Ingresos: 234
- Pre-inscritos: 189

DISTRIBUCIÓN POR CARRERA:
- Ingeniería en Informática: 1,245 (43.7%)
- Medicina: 892 (31.3%)
- Derecho: 456 (16.0%)
- Administración: 254 (8.9%)

DISTRIBUCIÓN POR TRAYECTO:
- Trayecto 1: 1,123 (39.4%)
- Trayecto 2: 856 (30.1%)
- Trayecto 3: 534 (18.8%)
- Trayecto 4: 334 (11.7%)
`
    : ""
}

${
  reportConfig.tipo === "academico"
    ? `
ESTADÍSTICAS ACADÉMICAS:
- Materias Activas: 89
- Secciones: 156
- Profesores: 124
- Horas Semanales: 1,248

DISTRIBUCIÓN DE MATERIAS:
- Trayecto 1: 24 materias
- Trayecto 2: 22 materias
- Trayecto 3: 21 materias
- Trayecto 4: 22 materias

OCUPACIÓN DE AULAS:
- Aulas disponibles: 45
- Laboratorios: 12
- Ocupación promedio: 78%
`
    : ""
}

${
  reportConfig.tipo === "evaluaciones"
    ? `
ESTADÍSTICAS DE EVALUACIONES:
- Evaluaciones Activas: 156
- Evaluaciones Calificadas: 134
- Promedio General: 16.8
- Porcentaje de Aprobados: 89%

DISTRIBUCIÓN DE NOTAS:
- Excelente (18-20): 23%
- Bueno (16-17): 34%
- Regular (14-15): 32%
- Deficiente (10-13): 11%

RENDIMIENTO POR MATERIA:
- Matemática I: 16.5 promedio
- Programación I: 17.2 promedio
- Física I: 15.8 promedio
`
    : ""
}

=== FIN DEL REPORTE ===

Generado por: Sistema Universitario
Formato: ${reportConfig.formato.toUpperCase()}
    `

    // Crear blob y descargar
    const blob = new Blob([content], { type: "text/plain" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `reporte_${reportConfig.tipo}_${new Date().toISOString().split("T")[0]}.${reportConfig.formato === "pdf" ? "txt" : reportConfig.formato}`
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)

    alert("Reporte generado y descargado exitosamente")
    onClose()
  }

  return (
    <div className="space-y-6">
      {/* Tipo de Reporte */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Tipo de Reporte</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {tiposReporte.map((tipo) => {
            const Icon = tipo.icon
            return (
              <Card
                key={tipo.value}
                className={`cursor-pointer transition-all ${
                  reportConfig.tipo === tipo.value ? "border-blue-500 bg-blue-50" : "hover:border-slate-300"
                }`}
                onClick={() => setReportConfig((prev) => ({ ...prev, tipo: tipo.value, modulo: "" }))}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">{tipo.label}</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Módulo Específico */}
      {reportConfig.tipo && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Módulo Específico</label>
          <Select
            value={reportConfig.modulo}
            onValueChange={(value) => setReportConfig((prev) => ({ ...prev, modulo: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar módulo" />
            </SelectTrigger>
            <SelectContent>
              {modulosDisponibles[reportConfig.tipo as keyof typeof modulosDisponibles]?.map((modulo) => (
                <SelectItem key={modulo} value={modulo}>
                  {modulo}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Configuración del Reporte */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Formato de Salida</label>
          <Select
            value={reportConfig.formato}
            onValueChange={(value) => setReportConfig((prev) => ({ ...prev, formato: value }))}
          >
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
          <label className="text-sm font-medium">Filtros Adicionales</label>
          <Select
            value={reportConfig.filtros.carrera}
            onValueChange={(value) =>
              setReportConfig((prev) => ({
                ...prev,
                filtros: { ...prev.filtros, carrera: value },
              }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por carrera" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas las carreras</SelectItem>
              <SelectItem value="ingenieria">Ingeniería</SelectItem>
              <SelectItem value="medicina">Medicina</SelectItem>
              <SelectItem value="derecho">Derecho</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Opciones Adicionales */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Opciones del Reporte</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="graficos"
              checked={reportConfig.incluirGraficos}
              onCheckedChange={(checked) =>
                setReportConfig((prev) => ({ ...prev, incluirGraficos: checked as boolean }))
              }
            />
            <label htmlFor="graficos" className="text-sm">
              Incluir gráficos y visualizaciones
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="estadisticas"
              checked={reportConfig.incluirEstadisticas}
              onCheckedChange={(checked) =>
                setReportConfig((prev) => ({ ...prev, incluirEstadisticas: checked as boolean }))
              }
            />
            <label htmlFor="estadisticas" className="text-sm">
              Incluir análisis estadístico
            </label>
          </div>
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="flex gap-3 pt-4 border-t">
        <Button variant="outline" onClick={onClose} className="flex-1">
          Cancelar
        </Button>
        <Button onClick={handleGenerateReport} className="flex-1" disabled={!reportConfig.tipo || !reportConfig.modulo}>
          <Download className="h-4 w-4 mr-2" />
          Generar Reporte
        </Button>
      </div>
    </div>
  )
}
