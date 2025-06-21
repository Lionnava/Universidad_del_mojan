"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Search, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function ConstanciasPublicas() {
  const [searchForm, setSearchForm] = useState({
    cedula: "",
    tipoConstancia: "",
    email: "",
  })
  const [loading, setLoading] = useState(false)
  const [constanciaEncontrada, setConstanciaEncontrada] = useState(null)

  const tiposConstancia = [
    { value: "notas", label: "Constancia de Notas", descripcion: "Certificado de calificaciones" },
    { value: "estudios", label: "Constancia de Estudios", descripcion: "Certificado de estudios regulares" },
    { value: "inscripcion", label: "Constancia de Inscripción", descripcion: "Certificado de inscripción formal" },
    { value: "preinscripcion", label: "Constancia de Pre-inscripción", descripcion: "Certificado de pre-inscripción" },
  ]

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simular búsqueda
    setTimeout(() => {
      if (searchForm.cedula && searchForm.tipoConstancia) {
        setConstanciaEncontrada({
          id: "CONST-2024-001",
          tipo: searchForm.tipoConstancia,
          estudiante: "María José González Pérez",
          cedula: searchForm.cedula,
          carrera: "Ingeniería en Informática",
          fechaGeneracion: "2024-11-03",
          validaHasta: "2024-12-03",
          estado: "Disponible",
        })
      }
      setLoading(false)
    }, 2000)
  }

  const handleDownload = () => {
    alert("Descargando constancia... (En producción se generaría el PDF)")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Volver al Portal Principal
          </Link>
          <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800">Constancias y Certificados</h1>
          <p className="text-slate-600">Solicita y descarga tus documentos académicos oficiales</p>
        </div>

        {/* Información del Servicio */}
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <CheckCircle className="h-5 w-5" />
              Servicio de Constancias Digitales
            </CardTitle>
            <CardDescription>Obtén tus documentos académicos de forma rápida y segura</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-700">✅ Documentos Disponibles:</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Constancia de Notas</li>
                  <li>• Constancia de Estudios</li>
                  <li>• Constancia de Inscripción</li>
                  <li>• Constancia de Pre-inscripción</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-700">⚡ Características:</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Descarga inmediata</li>
                  <li>• Formato PDF oficial</li>
                  <li>• Código de verificación</li>
                  <li>• Válido por 30 días</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Formulario de Búsqueda */}
        <Card>
          <CardHeader>
            <CardTitle>Solicitar Constancia</CardTitle>
            <CardDescription>Ingresa tus datos para buscar y descargar tu constancia</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <Label htmlFor="email">Correo Electrónico *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={searchForm.email}
                    onChange={(e) => setSearchForm({ ...searchForm, email: e.target.value })}
                    placeholder="tu@email.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipoConstancia">Tipo de Constancia *</Label>
                <Select onValueChange={(value) => setSearchForm({ ...searchForm, tipoConstancia: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el tipo de constancia" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposConstancia.map((tipo) => (
                      <SelectItem key={tipo.value} value={tipo.value}>
                        <div>
                          <div className="font-medium">{tipo.label}</div>
                          <div className="text-xs text-slate-500">{tipo.descripcion}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Buscando...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Buscar Constancia
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Resultado de la Búsqueda */}
        {constanciaEncontrada && (
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <CheckCircle className="h-5 w-5" />
                Constancia Encontrada
              </CardTitle>
              <CardDescription>Tu documento está disponible para descarga</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-slate-700 mb-2">Información del Estudiante:</h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <strong>Nombre:</strong> {constanciaEncontrada.estudiante}
                      </p>
                      <p>
                        <strong>Cédula:</strong> {constanciaEncontrada.cedula}
                      </p>
                      <p>
                        <strong>Carrera:</strong> {constanciaEncontrada.carrera}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-700 mb-2">Información del Documento:</h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <strong>Código:</strong> {constanciaEncontrada.id}
                      </p>
                      <p>
                        <strong>Fecha:</strong> {constanciaEncontrada.fechaGeneracion}
                      </p>
                      <p>
                        <strong>Válida hasta:</strong> {constanciaEncontrada.validaHasta}
                      </p>
                      <div className="flex items-center gap-2">
                        <strong>Estado:</strong>
                        <Badge variant="default" className="bg-green-600">
                          {constanciaEncontrada.estado}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t">
                  <Button onClick={handleDownload} className="bg-green-600 hover:bg-green-700">
                    <Download className="h-4 w-4 mr-2" />
                    Descargar PDF
                  </Button>
                  <Button variant="outline" onClick={() => setConstanciaEncontrada(null)}>
                    Nueva Búsqueda
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
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
                <strong>📋 Requisitos:</strong> Para solicitar una constancia necesitas tu cédula de identidad y el
                correo electrónico registrado en el sistema.
              </p>
              <p>
                <strong>⏰ Vigencia:</strong> Las constancias digitales tienen una vigencia de 30 días desde su fecha de
                generación.
              </p>
              <p>
                <strong>🔒 Seguridad:</strong> Cada documento incluye un código de verificación único que garantiza su
                autenticidad.
              </p>
              <p>
                <strong>📞 Soporte:</strong> Si tienes problemas para acceder a tu constancia, contacta al departamento
                de Control de Estudios.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
