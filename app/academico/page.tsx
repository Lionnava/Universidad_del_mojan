"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { BookOpen, Clock, Users, Plus, Search, Filter, Calendar, MapPin, User, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

export default function AcademicoPage() {
  const [materias, setMaterias] = useState([
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
  ])

  const [secciones, setSecciones] = useState([
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
  ])

  const [showNuevaMateriaDialog, setShowNuevaMateriaDialog] = useState(false)
  const [showNuevaSeccionDialog, setShowNuevaSeccionDialog] = useState(false)
  const [showCalendarioDialog, setShowCalendarioDialog] = useState(false)
  const [showRecursosDialog, setShowRecursosDialog] = useState(false)

  const handleNuevaMateria = () => {
    const nuevaMateria = {
      id: materias.length + 1,
      nombre: "Nueva Materia",
      codigo: "NUE001",
      trayecto: "1",
      trimestre: "1",
      creditos: 3,
      profesor: "Por asignar",
      secciones: 0,
      estudiantes: 0,
    }
    setMaterias([...materias, nuevaMateria])
    setShowNuevaMateriaDialog(false)
    alert("Materia creada exitosamente")
  }

  const handleNuevaSeccion = () => {
    const nuevaSeccion = {
      id: secciones.length + 1,
      materia: "Cálculo I",
      seccion: "C",
      horario: "Lun-Mie 14:00-16:00",
      aula: "Aula 105",
      profesor: "Dr. García",
      cupos: 30,
      inscritos: 0,
    }
    setSecciones([...secciones, nuevaSeccion])
    setShowNuevaSeccionDialog(false)
    alert("Sección creada exitosamente")
  }

  const handleEditarMateria = (id: number) => {
    alert(`Editando materia con ID: ${id}`)
  }

  const handleVerDetalles = (id: number) => {
    alert(`Mostrando detalles de materia con ID: ${id}`)
  }

  const handleGestionarCalendario = () => {
    setShowCalendarioDialog(true)
  }

  const handleGestionarRecursos = () => {
    setShowRecursosDialog(true)
  }

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
                  <Dialog open={showNuevaMateriaDialog} onOpenChange={setShowNuevaMateriaDialog}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Nueva Materia
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Crear Nueva Materia</DialogTitle>
                        <DialogDescription>Completa los datos de la nueva materia</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="nombre" className="text-right">
                            Nombre
                          </Label>
                          <Input id="nombre" className="col-span-3" placeholder="Nombre de la materia" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="codigo" className="text-right">
                            Código
                          </Label>
                          <Input id="codigo" className="col-span-3" placeholder="Código de la materia" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="creditos" className="text-right">
                            Créditos
                          </Label>
                          <Input id="creditos" type="number" className="col-span-3" placeholder="Número de créditos" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="trayecto" className="text-right">
                            Trayecto
                          </Label>
                          <Select>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Seleccionar trayecto" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">Trayecto 1</SelectItem>
                              <SelectItem value="2">Trayecto 2</SelectItem>
                              <SelectItem value="3">Trayecto 3</SelectItem>
                              <SelectItem value="4">Trayecto 4</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="trimestre" className="text-right">
                            Trimestre
                          </Label>
                          <Select>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Seleccionar trimestre" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">Trimestre 1</SelectItem>
                              <SelectItem value="2">Trimestre 2</SelectItem>
                              <SelectItem value="3">Trimestre 3</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="descripcion" className="text-right">
                            Descripción
                          </Label>
                          <Textarea id="descripcion" className="col-span-3" placeholder="Descripción de la materia" />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setShowNuevaMateriaDialog(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleNuevaMateria}>Crear Materia</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
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
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1"
                              onClick={() => handleVerDetalles(materia.id)}
                            >
                              Ver Detalles
                            </Button>
                            <Button size="sm" className="flex-1" onClick={() => handleEditarMateria(materia.id)}>
                              <Edit className="h-3 w-3 mr-1" />
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
                  <Dialog open={showNuevaSeccionDialog} onOpenChange={setShowNuevaSeccionDialog}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Nueva Sección
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Crear Nueva Sección</DialogTitle>
                        <DialogDescription>Configura una nueva sección para una materia</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="materia" className="text-right">
                            Materia
                          </Label>
                          <Select>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Seleccionar materia" />
                            </SelectTrigger>
                            <SelectContent>
                              {materias.map((materia) => (
                                <SelectItem key={materia.id} value={materia.nombre}>
                                  {materia.nombre}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="seccion" className="text-right">
                            Sección
                          </Label>
                          <Input id="seccion" className="col-span-3" placeholder="A, B, C..." />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="profesor" className="text-right">
                            Profesor
                          </Label>
                          <Select>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Seleccionar profesor" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="garcia">Dr. García</SelectItem>
                              <SelectItem value="martinez">Ing. Martínez</SelectItem>
                              <SelectItem value="lopez">Dr. López</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="aula" className="text-right">
                            Aula
                          </Label>
                          <Input id="aula" className="col-span-3" placeholder="Aula 101, Lab 201..." />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="cupos" className="text-right">
                            Cupos
                          </Label>
                          <Input id="cupos" type="number" className="col-span-3" placeholder="Número de cupos" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="horario" className="text-right">
                            Horario
                          </Label>
                          <Input id="horario" className="col-span-3" placeholder="Lun-Mie-Vie 8:00-10:00" />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setShowNuevaSeccionDialog(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleNuevaSeccion}>Crear Sección</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
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
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Trash2 className="h-3 w-3" />
                              </Button>
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
                        <Button className="w-full" onClick={handleGestionarCalendario}>
                          Gestionar Calendario
                        </Button>
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
                        <Button className="w-full" onClick={handleGestionarRecursos}>
                          Gestionar Recursos
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Dialog para Gestionar Calendario */}
        <Dialog open={showCalendarioDialog} onOpenChange={setShowCalendarioDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Gestión del Calendario Académico</DialogTitle>
              <DialogDescription>Configura períodos, trimestres y fechas importantes</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Período Académico</Label>
                  <Input value="2024-2025" />
                </div>
                <div>
                  <Label>Estado</Label>
                  <Select defaultValue="activo">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="activo">Activo</SelectItem>
                      <SelectItem value="planificacion">En Planificación</SelectItem>
                      <SelectItem value="cerrado">Cerrado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Fecha de Inicio</Label>
                  <Input type="date" defaultValue="2024-09-01" />
                </div>
                <div>
                  <Label>Fecha de Fin</Label>
                  <Input type="date" defaultValue="2025-07-31" />
                </div>
              </div>
              <div>
                <Label>Trimestres</Label>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center justify-between p-2 border rounded">
                    <span>Trimestre I: Sep 2024 - Dic 2024</span>
                    <Button size="sm" variant="outline">
                      Editar
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-2 border rounded">
                    <span>Trimestre II: Ene 2025 - Abr 2025</span>
                    <Button size="sm" variant="outline">
                      Editar
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-2 border rounded">
                    <span>Trimestre III: May 2025 - Jul 2025</span>
                    <Button size="sm" variant="outline">
                      Editar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowCalendarioDialog(false)}>
                Cerrar
              </Button>
              <Button
                onClick={() => {
                  alert("Calendario actualizado exitosamente")
                  setShowCalendarioDialog(false)
                }}
              >
                Guardar Cambios
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Dialog para Gestionar Recursos */}
        <Dialog open={showRecursosDialog} onOpenChange={setShowRecursosDialog}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Gestión de Recursos</DialogTitle>
              <DialogDescription>Administra aulas, laboratorios y equipos disponibles</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Tabs defaultValue="aulas">
                <TabsList>
                  <TabsTrigger value="aulas">Aulas</TabsTrigger>
                  <TabsTrigger value="laboratorios">Laboratorios</TabsTrigger>
                  <TabsTrigger value="equipos">Equipos</TabsTrigger>
                </TabsList>
                <TabsContent value="aulas" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Aulas Disponibles</h3>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Nueva Aula
                    </Button>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {["Aula 101", "Aula 102", "Aula 103", "Aula 201", "Aula 202", "Aula 301"].map((aula) => (
                      <Card key={aula}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{aula}</span>
                            <Badge variant="outline">Disponible</Badge>
                          </div>
                          <p className="text-sm text-slate-600 mt-1">Capacidad: 35 estudiantes</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="laboratorios" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Laboratorios</h3>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Nuevo Laboratorio
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {["Lab Informática 201", "Lab Física 301", "Lab Química 302", "Lab Idiomas 401"].map((lab) => (
                      <Card key={lab}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{lab}</span>
                            <Badge variant="outline">Activo</Badge>
                          </div>
                          <p className="text-sm text-slate-600 mt-1">Equipos especializados disponibles</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="equipos" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Inventario de Equipos</h3>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Registrar Equipo
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {[
                      { nombre: "Proyectores", cantidad: 25, estado: "Operativo" },
                      { nombre: "Computadoras", cantidad: 120, estado: "Operativo" },
                      { nombre: "Microscopios", cantidad: 15, estado: "Mantenimiento" },
                      { nombre: "Equipos de Audio", cantidad: 8, estado: "Operativo" },
                    ].map((equipo, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <span className="font-medium">{equipo.nombre}</span>
                          <span className="text-sm text-slate-600 ml-2">Cantidad: {equipo.cantidad}</span>
                        </div>
                        <Badge variant={equipo.estado === "Operativo" ? "default" : "secondary"}>{equipo.estado}</Badge>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowRecursosDialog(false)}>
                Cerrar
              </Button>
              <Button
                onClick={() => {
                  alert("Recursos actualizados exitosamente")
                  setShowRecursosDialog(false)
                }}
              >
                Guardar Cambios
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
