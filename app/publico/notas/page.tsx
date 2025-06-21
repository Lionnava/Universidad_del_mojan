"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Award, Search, ArrowLeft, CheckCircle, AlertCircle, TrendingUp, TrendingDown } from "lucide-react"
import Link from "next/link"

export default function NotasPublicas() {
  const [searchForm, setSearchForm] = useState({
    cedula: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [notasEncontradas, setNotasEncontradas] = useState(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simular búsqueda
    setTimeout(() => {
      if (searchForm.cedula && searchForm.password) {
        setNotasEncontradas({
          estudiante: {
            nombre: "María José González Pérez",
            cedula: searchForm.cedula,
            carrera: "Ingeniería en Informática",
            trayecto: 2,
            trimestre: 1,
            promedioGeneral: 17.5,
            creditosAprobados: 45,
            creditosTotales: 180,
          },
          materias: [
            {
              nombre: "Base de Datos I",
              codigo: "INF201",
              creditos: 4,
              nota: 18.5,
              estado: "Aprobada",
              trimestre: "2024-1",
            },
            {
              nombre: "Algoritmos y Estructuras",
              codigo: "INF202",
              creditos: 5,
              nota: 16.8,
              estado: "Aprobada",
              trimestre: "2024-1",
            },
            {
              nombre: "Matemática III",
              codigo: "MAT201",
              creditos: 4,
              nota: 17.2,
              estado: "Aprobada",
              trimestre: "2024-1",
            },
            {
              nombre: "Programación Avanzada",
              codigo: "INF301",
              creditos: 5,
              nota: 19.0,
              estado: "Cursando",
              trimestre: "2024-2",
            },
            {
              nombre: "Redes de Computadoras",
              codigo: "INF302",
              creditos: 4,
              nota: 16.5,
              estado: "Cursando",
              trimestre: "2024-2",
            },
          ],
        })
      }
      setLoading(false)
    }, 2000)
  }

  const getNotaColor = (nota: number) => {
    if (nota >= 18) return "text-green-600"
    if (nota >= 15) return "text-blue-600"
    if (nota >= 12) return "text-orange-600"
    return "text-red-600"
  }

  const getNotaBadge = (nota: number) => {
    if (nota >= 18) return "bg-green-600"
    if (nota >= 15) return "bg-blue-600"
    if (nota >= 12) return "bg-orange-600"
    return "bg-red-600"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <Link href="/" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Volver al Portal Principal
          </Link>
          <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
            <Award className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800">Consulta de Notas</h1>
          <p className="text-slate-600">Consulta tu rendimiento académico y calificaciones</p>
        </div>

        {/* Información del Servicio */}
        <Card className="border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-700">
              <CheckCircle className="h-5 w-5" />
              Sistema de Consulta de Calificaciones
            </CardTitle>
            <CardDescription>Accede a tu historial académico de forma segura</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-700">📊 Información Disponible:</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Calificaciones por materia</li>
                  <li>• Promedio general actualizado</li>
                  <li>• Créditos aprobados</li>
                  <li>• Historial por trimestre</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-700">🔒 Seguridad:</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Acceso con credenciales</li>
                  <li>• Información actualizada</li>
                  <li>• Datos oficiales</li>
                  <li>• Consulta en tiempo real</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Formulario de Búsqueda */}
        {!notasEncontradas && (
          <Card>
            <CardHeader>
              <CardTitle>Acceso a Calificaciones</CardTitle>
              <CardDescription>Ingresa tus credenciales para consultar tus notas</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-4 max-w-md mx-auto">
                <div className="space-y-2">
                  <Label htmlFor="cedula">Cédula de Identidad *</Label>
                  <Input
                    id="cedula"
                    value={searchForm.cedula}
                    onChange={(e) => setSearchForm({ ...searchForm, cedula: e.target.value })}
                    placeholder="Ej: 20123456"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={searchForm.password}
                    onChange={(e) => setSearchForm({ ...searchForm, password: e.target.value })}
                    placeholder="Tu contraseña de estudiante"
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={loading}>
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Consultando...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Consultar Notas
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center">
                <p className="text-sm text-gray-600">
                  <strong>Credenciales de prueba:</strong> 20123456 / est123
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Resultado de la Consulta */}
        {notasEncontradas && (
          <div className="space-y-6">
            {/* Información del Estudiante */}
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="h-5 w-5" />
                  Información del Estudiante
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-slate-600">Estudiante</p>
                    <p className="font-bold">{notasEncontradas.estudiante.nombre}</p>
                    <p className="text-sm text-slate-500">C.I: {notasEncontradas.estudiante.cedula}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Carrera</p>
                    <p className="font-bold">{notasEncontradas.estudiante.carrera}</p>
                    <p className="text-sm text-slate-500">
                      Trayecto {notasEncontradas.estudiante.trayecto} - Trimestre{" "}
                      {notasEncontradas.estudiante.trimestre}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Promedio General</p>
                    <p className={`text-2xl font-bold ${getNotaColor(notasEncontradas.estudiante.promedioGeneral)}`}>
                      {notasEncontradas.estudiante.promedioGeneral}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Progreso</p>
                    <p className="font-bold">
                      {notasEncontradas.estudiante.creditosAprobados} / {notasEncontradas.estudiante.creditosTotales}{" "}
                      créditos
                    </p>
                    <Progress
                      value={
                        (notasEncontradas.estudiante.creditosAprobados / notasEncontradas.estudiante.creditosTotales) *
                        100
                      }
                      className="h-2 mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Calificaciones por Materia */}
            <Card>
              <CardHeader>
                <CardTitle>Calificaciones por Materia</CardTitle>
                <CardDescription>Historial completo de notas y estado académico</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notasEncontradas.materias.map((materia, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-slate-50">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{materia.nombre}</h3>
                            <Badge variant="outline">{materia.codigo}</Badge>
                            <Badge variant="secondary">{materia.creditos} créditos</Badge>
                            <Badge variant="outline">{materia.trimestre}</Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={materia.estado === "Aprobada" ? "default" : "secondary"}
                              className={materia.estado === "Aprobada" ? "bg-green-600" : "bg-blue-600"}
                            >
                              {materia.estado}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-3xl font-bold ${getNotaColor(materia.nota)}`}>{materia.nota}</div>
                          <div className="text-xs text-slate-500">
                            {materia.nota >= 18
                              ? "Excelente"
                              : materia.nota >= 15
                                ? "Bueno"
                                : materia.nota >= 12
                                  ? "Regular"
                                  : "Deficiente"}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Materias Aprobadas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">
                      {notasEncontradas.materias.filter((m) => m.estado === "Aprobada").length}
                    </p>
                    <p className="text-sm text-slate-600">de {notasEncontradas.materias.length} materias</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-blue-600" />
                    Nota Más Alta
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">
                      {Math.max(...notasEncontradas.materias.map((m) => m.nota))}
                    </p>
                    <p className="text-sm text-slate-600">Mejor calificación</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingDown className="h-5 w-5 text-orange-600" />
                    Materias Cursando
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-orange-600">
                      {notasEncontradas.materias.filter((m) => m.estado === "Cursando").length}
                    </p>
                    <p className="text-sm text-slate-600">en progreso</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex gap-4 justify-center">
              <Button onClick={() => setNotasEncontradas(null)} variant="outline">
                Nueva Consulta
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">Descargar Reporte</Button>
            </div>
          </div>
        )}

        {/* Información Adicional */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              Información Importante
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-slate-600">
              <p>
                <strong>🔐 Privacidad:</strong> Tus calificaciones son confidenciales y solo tú puedes acceder a ellas
                con tus credenciales de estudiante.
              </p>
              <p>
                <strong>📊 Escala de Notas:</strong> Las calificaciones van de 0 a 20 puntos. La nota mínima aprobatoria
                es 12 puntos.
              </p>
              <p>
                <strong>⏰ Actualización:</strong> Las notas se actualizan en tiempo real cuando los profesores
                registran las calificaciones.
              </p>
              <p>
                <strong>📞 Soporte:</strong> Si encuentras alguna inconsistencia en tus notas, contacta inmediatamente
                al departamento de Control de Estudios.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
