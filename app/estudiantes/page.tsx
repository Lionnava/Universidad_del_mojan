"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Plus,
  Filter,
  Download,
  Users,
  UserPlus,
  GraduationCap,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

export default function EstudiantesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [aspirantes, setAspirantes] = useState<any[]>([])
  const [estudiantes, setEstudiantes] = useState<any[]>([])
  const [inscripciones, setInscripciones] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Datos de ejemplo para desarrollo
  const aspirantesEjemplo = [
    {
      id: 1,
      nombres: "Carlos Eduardo",
      apellidos: "Rodríguez Silva",
      cedula: "21123456",
      carrera_nombre: "Medicina",
      estado: "Pendiente",
      fecha_solicitud: "2024-01-15",
    },
    {
      id: 2,
      nombres: "Ana Lucía",
      apellidos: "Martínez López",
      cedula: "21234567",
      carrera_nombre: "Derecho",
      estado: "En Revisión",
      fecha_solicitud: "2024-01-20",
    },
  ]

  const estudiantesEjemplo = [
    {
      id: 1,
      nombres: "María José",
      apellidos: "González Pérez",
      cedula: "20123456",
      carrera_nombre: "Ingeniería en Informática",
      trayecto_actual: 2,
      trimestre_actual: 1,
      estado: "Activo",
    },
    {
      id: 2,
      nombres: "Pedro José",
      apellidos: "Sánchez García",
      cedula: "18123456",
      carrera_nombre: "Ingeniería en Informática",
      trayecto_actual: 3,
      trimestre_actual: 2,
      estado: "Activo",
    },
  ]

  const inscripcionesEjemplo = [
    {
      id: 1,
      estudiante_nombre: "María José González",
      materia_nombre: "Base de Datos I",
      seccion: "A",
      tipo: "Inscripcion",
      estado: "Activa",
      fecha_inscripcion: "2024-02-01",
    },
  ]

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setAspirantes(aspirantesEjemplo)
      setEstudiantes(estudiantesEjemplo)
      setInscripciones(inscripcionesEjemplo)
      setLoading(false)
    }, 1000)
  }, [])

  const handleAprobarAspirante = async (id: number) => {
    try {
      alert("Aspirante aprobado y convertido a estudiante exitosamente")
      // Recargar datos
      const aspirante = aspirantes.find((a) => a.id === id)
      if (aspirante) {
        aspirante.estado = "Aprobado"
        setAspirantes([...aspirantes])
      }
    } catch (error) {
      console.error("Error aprobando aspirante:", error)
      alert("Error al aprobar aspirante")
    }
  }

  const getEstadoBadge = (estado: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      Activo: "default",
      Inactivo: "secondary",
      Pendiente: "outline",
      Aprobado: "default",
      "En Revisión": "secondary",
      "Pre-inscrito": "outline",
    }
    return <Badge variant={variants[estado] || "outline"}>{estado}</Badge>
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-slate-600">Cargando datos...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Gestión de Estudiantes</h1>
            <p className="text-slate-600">Administra aspirantes, inscripciones y estudiantes activos</p>
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
                <UserPlus className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-slate-600">Aspirantes</p>
                  <p className="text-2xl font-bold">{aspirantes.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-slate-600">Estudiantes Activos</p>
                  <p className="text-2xl font-bold">{estudiantes.filter((e) => e.estado === "Activo").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-sm text-slate-600">Pre-inscritos</p>
                  <p className="text-2xl font-bold">{estudiantes.filter((e) => e.estado === "Pre-inscrito").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-sm text-slate-600">Inscripciones</p>
                  <p className="text-2xl font-bold">{inscripciones.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="aspirantes" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="aspirantes">Aspirantes</TabsTrigger>
            <TabsTrigger value="estudiantes">Estudiantes</TabsTrigger>
            <TabsTrigger value="inscripciones">Inscripciones</TabsTrigger>
          </TabsList>

          <TabsContent value="aspirantes" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <CardTitle>Censo de Aspirantes</CardTitle>
                    <CardDescription>Gestión de solicitudes de ingreso</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Link href="/registro-nuevo">
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Nuevo Aspirante
                      </Button>
                    </Link>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Exportar
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Buscar por nombre o cédula..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtros
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Nombre</th>
                        <th className="text-left p-2">Cédula</th>
                        <th className="text-left p-2">Carrera</th>
                        <th className="text-left p-2">Estado</th>
                        <th className="text-left p-2">Fecha</th>
                        <th className="text-left p-2">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {aspirantes
                        .filter(
                          (aspirante) =>
                            aspirante.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            aspirante.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            aspirante.cedula.includes(searchTerm),
                        )
                        .map((aspirante) => (
                          <tr key={aspirante.id} className="border-b hover:bg-slate-50">
                            <td className="p-2 font-medium">
                              {aspirante.nombres} {aspirante.apellidos}
                            </td>
                            <td className="p-2">{aspirante.cedula}</td>
                            <td className="p-2">{aspirante.carrera_nombre || "No especificada"}</td>
                            <td className="p-2">{getEstadoBadge(aspirante.estado)}</td>
                            <td className="p-2">{new Date(aspirante.fecha_solicitud).toLocaleDateString()}</td>
                            <td className="p-2">
                              <div className="flex gap-1">
                                <Button size="sm" variant="ghost">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="ghost">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                {aspirante.estado === "Pendiente" && (
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleAprobarAspirante(aspirante.id)}
                                    className="text-green-600 hover:text-green-700"
                                  >
                                    <CheckCircle className="h-4 w-4" />
                                  </Button>
                                )}
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

          <TabsContent value="estudiantes" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <CardTitle>Estudiantes Regulares</CardTitle>
                    <CardDescription>Gestión de estudiantes activos por trayecto y trimestre</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Link href="/estudiantes/nuevo">
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Nuevo Estudiante
                      </Button>
                    </Link>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Exportar
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input placeholder="Buscar estudiante..." className="pl-10" />
                  </div>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtros
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Nombre</th>
                        <th className="text-left p-2">Cédula</th>
                        <th className="text-left p-2">Carrera</th>
                        <th className="text-left p-2">Trayecto</th>
                        <th className="text-left p-2">Trimestre</th>
                        <th className="text-left p-2">Estado</th>
                        <th className="text-left p-2">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {estudiantes.map((estudiante) => (
                        <tr key={estudiante.id} className="border-b hover:bg-slate-50">
                          <td className="p-2 font-medium">
                            {estudiante.nombres} {estudiante.apellidos}
                          </td>
                          <td className="p-2">{estudiante.cedula}</td>
                          <td className="p-2">{estudiante.carrera_nombre || "No especificada"}</td>
                          <td className="p-2">Trayecto {estudiante.trayecto_actual}</td>
                          <td className="p-2">Trimestre {estudiante.trimestre_actual}</td>
                          <td className="p-2">{getEstadoBadge(estudiante.estado)}</td>
                          <td className="p-2">
                            <div className="flex gap-1">
                              <Button size="sm" variant="ghost">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <Trash2 className="h-4 w-4" />
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

          <TabsContent value="inscripciones" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Proceso de Inscripciones</CardTitle>
                <CardDescription>Pre-inscripción e inscripción para el período académico</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <Card className="border-2 border-blue-200 bg-blue-50">
                    <CardHeader>
                      <CardTitle className="text-lg">Pre-inscripción</CardTitle>
                      <CardDescription>Reserva de cupos para estudiantes</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-3xl font-bold text-blue-600">
                          {inscripciones.filter((i) => i.tipo === "Pre-inscripcion").length}
                        </div>
                        <p className="text-sm text-slate-600">Estudiantes pre-inscritos</p>
                        <Button className="w-full">Gestionar Pre-inscripciones</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-green-200 bg-green-50">
                    <CardHeader>
                      <CardTitle className="text-lg">Inscripción Formal</CardTitle>
                      <CardDescription>Confirmación de matrícula</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-3xl font-bold text-green-600">
                          {inscripciones.filter((i) => i.tipo === "Inscripcion").length}
                        </div>
                        <p className="text-sm text-slate-600">Estudiantes inscritos</p>
                        <Button className="w-full">Gestionar Inscripciones</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Lista de inscripciones */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Estudiante</th>
                        <th className="text-left p-2">Materia</th>
                        <th className="text-left p-2">Sección</th>
                        <th className="text-left p-2">Tipo</th>
                        <th className="text-left p-2">Estado</th>
                        <th className="text-left p-2">Fecha</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inscripciones.slice(0, 10).map((inscripcion) => (
                        <tr key={inscripcion.id} className="border-b hover:bg-slate-50">
                          <td className="p-2 font-medium">{inscripcion.estudiante_nombre}</td>
                          <td className="p-2">{inscripcion.materia_nombre}</td>
                          <td className="p-2">{inscripcion.seccion}</td>
                          <td className="p-2">{getEstadoBadge(inscripcion.tipo)}</td>
                          <td className="p-2">{getEstadoBadge(inscripcion.estado)}</td>
                          <td className="p-2">{new Date(inscripcion.fecha_inscripcion).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
