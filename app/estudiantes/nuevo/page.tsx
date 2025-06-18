"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, User } from "lucide-react"
import Link from "next/link"
import { sqliteClient } from "@/lib/sqlite-client"

export default function NuevoEstudiante() {
  const [carreras, setCarreras] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    cedula: "",
    nombres: "",
    apellidos: "",
    email: "",
    telefono: "",
    fecha_nacimiento: "",
    direccion: "",
    carrera_id: "",
    trayecto_actual: 1,
    trimestre_actual: 1,
    estado: "Activo",
  })

  useEffect(() => {
    loadCarreras()
  }, [])

  const loadCarreras = async () => {
    try {
      const data = await sqliteClient.getCarreras()
      setCarreras(data)
    } catch (error) {
      console.error("Error cargando carreras:", error)
    }
  }

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await sqliteClient.createEstudiante({
        ...formData,
        carrera_id: Number.parseInt(formData.carrera_id),
        fecha_ingreso: new Date().toISOString().split("T")[0],
      })

      alert("Estudiante registrado exitosamente")
      window.location.href = "/estudiantes"
    } catch (error) {
      console.error("Error registrando estudiante:", error)
      alert("Error al registrar estudiante")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Nuevo Estudiante</h1>
            <p className="text-slate-600">Registrar un nuevo estudiante en el sistema</p>
          </div>
          <Link href="/estudiantes">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </Link>
        </div>

        {/* Formulario */}
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-blue-500" />
              <CardTitle>Información del Estudiante</CardTitle>
            </div>
            <CardDescription>Complete todos los campos requeridos</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Datos Personales */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cedula">Cédula de Identidad *</Label>
                  <Input
                    id="cedula"
                    value={formData.cedula}
                    onChange={(e) => handleInputChange("cedula", e.target.value)}
                    placeholder="Ej: 12345678"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nombres">Nombres *</Label>
                  <Input
                    id="nombres"
                    value={formData.nombres}
                    onChange={(e) => handleInputChange("nombres", e.target.value)}
                    placeholder="Nombres completos"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apellidos">Apellidos *</Label>
                  <Input
                    id="apellidos"
                    value={formData.apellidos}
                    onChange={(e) => handleInputChange("apellidos", e.target.value)}
                    placeholder="Apellidos completos"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fecha_nacimiento">Fecha de Nacimiento</Label>
                  <Input
                    id="fecha_nacimiento"
                    type="date"
                    value={formData.fecha_nacimiento}
                    onChange={(e) => handleInputChange("fecha_nacimiento", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="correo@ejemplo.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input
                    id="telefono"
                    value={formData.telefono}
                    onChange={(e) => handleInputChange("telefono", e.target.value)}
                    placeholder="0412-1234567"
                  />
                </div>
              </div>

              {/* Dirección */}
              <div className="space-y-2">
                <Label htmlFor="direccion">Dirección de Residencia</Label>
                <Textarea
                  id="direccion"
                  value={formData.direccion}
                  onChange={(e) => handleInputChange("direccion", e.target.value)}
                  placeholder="Dirección completa de residencia"
                  rows={3}
                />
              </div>

              {/* Datos Académicos */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="carrera">Carrera *</Label>
                  <Select onValueChange={(value) => handleInputChange("carrera_id", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar carrera" />
                    </SelectTrigger>
                    <SelectContent>
                      {carreras.map((carrera) => (
                        <SelectItem key={carrera.id} value={carrera.id.toString()}>
                          {carrera.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="trayecto">Trayecto</Label>
                  <Select
                    value={formData.trayecto_actual.toString()}
                    onValueChange={(value) => handleInputChange("trayecto_actual", Number.parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Trayecto 1</SelectItem>
                      <SelectItem value="2">Trayecto 2</SelectItem>
                      <SelectItem value="3">Trayecto 3</SelectItem>
                      <SelectItem value="4">Trayecto 4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="trimestre">Trimestre</Label>
                  <Select
                    value={formData.trimestre_actual.toString()}
                    onValueChange={(value) => handleInputChange("trimestre_actual", Number.parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Trimestre 1</SelectItem>
                      <SelectItem value="2">Trimestre 2</SelectItem>
                      <SelectItem value="3">Trimestre 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Estado */}
              <div className="space-y-2">
                <Label htmlFor="estado">Estado</Label>
                <Select value={formData.estado} onValueChange={(value) => handleInputChange("estado", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Activo">Activo</SelectItem>
                    <SelectItem value="Inactivo">Inactivo</SelectItem>
                    <SelectItem value="Pre-inscrito">Pre-inscrito</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Botones */}
              <div className="flex gap-4 pt-6 border-t">
                <Link href="/estudiantes" className="flex-1">
                  <Button type="button" variant="outline" className="w-full">
                    Cancelar
                  </Button>
                </Link>
                <Button type="submit" className="flex-1" disabled={loading}>
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? "Guardando..." : "Guardar Estudiante"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
