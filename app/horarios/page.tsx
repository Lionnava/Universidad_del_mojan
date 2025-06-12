"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, User, Plus, Edit, Trash2, Download, ArrowLeft, Filter } from "lucide-react"
import Link from "next/link"

export default function HorariosPage() {
  const [selectedCarrera, setSelectedCarrera] = useState("todas")
  const [selectedTrayecto, setSelectedTrayecto] = useState("todos")
  const [selectedTurno, setSelectedTurno] = useState("todos")

  const horarios = [
    {
      id: 1,
      materia: "Matemática I",
      profesor: "Dr. García",
      seccion: "A",
      carrera: "Ingeniería",
      trayecto: 1,
      dias: ["Lunes", "Miércoles", "Viernes"],
      hora_inicio: "08:00",
      hora_fin: "10:00",
      aula: "Aula 101",
      estudiantes: 28,
      turno: "Mañana",
    },
    {
      id: 2,
      materia: "Programación I",
      profesor: "Ing. Martínez",
      seccion: "A",
      carrera: "Ingeniería",
      trayecto: 1,
      dias: ["Martes", "Jueves"],
      hora_inicio: "10:00",
      hora_fin: "12:00",
      aula: "Lab 201",
      estudiantes: 25,
      turno: "Mañana",
    },
    {
      id: 3,
      materia: "Física I",
      profesor: "Dr. López",
      seccion: "A",
      carrera: "Ingeniería",
      trayecto: 1,
      dias: ["Lunes", "Miércoles"],
      hora_inicio: "14:00",
      hora_fin: "16:00",
      aula: "Aula 103",
      estudiantes: 30,
      turno: "Tarde",
    },
    {
      id: 4,
      materia: "Anatomía I",
      profesor: "Dra. Morales",
      seccion: "A",
      carrera: "Medicina",
      trayecto: 1,
      dias: ["Martes", "Jueves", "Viernes"],
      hora_inicio: "07:00",
      hora_fin: "09:00",
      aula: "Aula Med 101",
      estudiantes: 35,
      turno: "Mañana",
    },
  ]

  const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
  const horasDelDia = [
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ]

  const horariosFiltrados = horarios.filter((horario) => {
    if (selectedCarrera !== "todas" && horario.carrera !== selectedCarrera) return false
    if (selectedTrayecto !== "todos" && horario.trayecto.toString() !== selectedTrayecto) return false
    if (selectedTurno !== "todos" && horario.turno !== selectedTurno) return false
    return true
  })

  const exportarHorarios = () => {
    const csvContent = [
      ["Materia", "Profesor", "Sección", "Carrera", "Trayecto", "Días", "Horario", "Aula", "Estudiantes"],
      ...horariosFiltrados.map((h) => [
        h.materia,
        h.profesor,
        h.seccion,
        h.carrera,
        h.trayecto,
        h.dias.join(", "),
        `${h.hora_inicio} - ${h.hora_fin}`,
        h.aula,
        h.estudiantes,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `horarios_${new Date().toISOString().split("T")[0]}.csv`
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Gestión de Horarios</h1>
            <p className="text-slate-600">Administra y visualiza los horarios académicos</p>
          </div>
          <div className="flex gap-2">
            <Link href="/dashboard">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
            </Link>
            <Button onClick={exportarHorarios}>
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Horario
            </Button>
          </div>
        </div>

        {/* Filtros */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Carrera</label>
                <Select value={selectedCarrera} onValueChange={setSelectedCarrera}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas las carreras</SelectItem>
                    <SelectItem value="Ingeniería">Ingeniería en Informática</SelectItem>
                    <SelectItem value="Medicina">Medicina</SelectItem>
                    <SelectItem value="Derecho">Derecho</SelectItem>
                    <SelectItem value="Administración">Administración</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Trayecto</label>
                <Select value={selectedTrayecto} onValueChange={setSelectedTrayecto}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los trayectos</SelectItem>
                    <SelectItem value="1">Trayecto 1</SelectItem>
                    <SelectItem value="2">Trayecto 2</SelectItem>
                    <SelectItem value="3">Trayecto 3</SelectItem>
                    <SelectItem value="4">Trayecto 4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Turno</label>
                <Select value={selectedTurno} onValueChange={setSelectedTurno}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los turnos</SelectItem>
                    <SelectItem value="Mañana">Mañana</SelectItem>
                    <SelectItem value="Tarde">Tarde</SelectItem>
                    <SelectItem value="Noche">Noche</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSelectedCarrera("todas")
                    setSelectedTrayecto("todos")
                    setSelectedTurno("todos")
                  }}
                >
                  Limpiar Filtros
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contenido Principal */}
        <Tabs defaultValue="lista" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="lista">Lista de Horarios</TabsTrigger>
            <TabsTrigger value="calendario">Vista Calendario</TabsTrigger>
            <TabsTrigger value="conflictos">Detectar Conflictos</TabsTrigger>
          </TabsList>

          <TabsContent value="lista" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Horarios Programados</CardTitle>
                <CardDescription>
                  Mostrando {horariosFiltrados.length} de {horarios.length} horarios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {horariosFiltrados.map((horario) => (
                    <Card key={horario.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{horario.materia}</CardTitle>
                            <CardDescription>
                              {horario.carrera} - Trayecto {horario.trayecto}
                            </CardDescription>
                          </div>
                          <Badge variant="outline">Sección {horario.seccion}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm">
                            <User className="h-4 w-4 text-slate-500" />
                            <span>{horario.profesor}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-slate-500" />
                            <span>
                              {horario.hora_inicio} - {horario.hora_fin}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-slate-500" />
                            <span>{horario.aula}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-slate-500" />
                            <span>{horario.estudiantes} estudiantes</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {horario.dias.map((dia, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {dia.slice(0, 3)}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex gap-2 pt-2">
                            <Button size="sm" variant="outline" className="flex-1">
                              <Edit className="h-3 w-3 mr-1" />
                              Editar
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1">
                              <Trash2 className="h-3 w-3 mr-1" />
                              Eliminar
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

          <TabsContent value="calendario" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Vista de Calendario Semanal</CardTitle>
                <CardDescription>Horarios organizados por días de la semana</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="border p-2 bg-slate-50 text-left min-w-20">Hora</th>
                        {diasSemana.map((dia) => (
                          <th key={dia} className="border p-2 bg-slate-50 text-center min-w-32">
                            {dia}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {horasDelDia.map((hora) => (
                        <tr key={hora}>
                          <td className="border p-2 font-medium bg-slate-50 text-sm">{hora}</td>
                          {diasSemana.map((dia) => {
                            const clasesEnHora = horariosFiltrados.filter(
                              (h) => h.dias.includes(dia) && hora >= h.hora_inicio && hora < h.hora_fin,
                            )
                            return (
                              <td key={dia} className="border p-1 h-16 align-top">
                                {clasesEnHora.map((clase, idx) => (
                                  <div
                                    key={idx}
                                    className="bg-blue-100 border border-blue-300 p-1 rounded text-xs mb-1 hover:bg-blue-200 cursor-pointer"
                                    title={`${clase.materia} - ${clase.profesor} - ${clase.aula}`}
                                  >
                                    <div className="font-semibold truncate">{clase.materia}</div>
                                    <div className="text-slate-600 truncate">{clase.aula}</div>
                                    <div className="text-slate-500 text-xs">Sec. {clase.seccion}</div>
                                  </div>
                                ))}
                              </td>
                            )
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="conflictos" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Detección de Conflictos</CardTitle>
                <CardDescription>Identifica solapamientos y problemas en los horarios</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Conflictos de Aulas */}
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h3 className="font-semibold text-red-800 mb-2">Conflictos de Aulas</h3>
                    <div className="space-y-2">
                      <div className="text-sm text-red-700">
                        <strong>Aula 101:</strong> Matemática I (Lun 08:00-10:00) y Física II (Lun 09:00-11:00)
                      </div>
                      <div className="text-sm text-red-700">
                        <strong>Lab 201:</strong> Programación I (Mar 10:00-12:00) y Base de Datos (Mar 11:00-13:00)
                      </div>
                    </div>
                  </div>

                  {/* Conflictos de Profesores */}
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h3 className="font-semibold text-yellow-800 mb-2">Conflictos de Profesores</h3>
                    <div className="space-y-2">
                      <div className="text-sm text-yellow-700">
                        <strong>Dr. García:</strong> Asignado a 2 materias simultáneas (Mie 14:00-16:00)
                      </div>
                    </div>
                  </div>

                  {/* Horarios Optimizables */}
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2">Sugerencias de Optimización</h3>
                    <div className="space-y-2">
                      <div className="text-sm text-blue-700">• Aula 103 está libre los viernes por la mañana</div>
                      <div className="text-sm text-blue-700">• Se puede redistribuir la carga del Dr. García</div>
                      <div className="text-sm text-blue-700">• Laboratorio 202 tiene baja ocupación</div>
                    </div>
                  </div>

                  {/* Estadísticas */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-red-600">3</div>
                        <div className="text-sm text-slate-600">Conflictos Detectados</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">78%</div>
                        <div className="text-sm text-slate-600">Ocupación de Aulas</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">45</div>
                        <div className="text-sm text-slate-600">Horas Semanales</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
