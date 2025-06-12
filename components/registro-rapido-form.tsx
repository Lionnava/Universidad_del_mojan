"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save } from "lucide-react"

interface RegistroRapidoFormProps {
  onClose: () => void
}

export function RegistroRapidoForm({ onClose }: RegistroRapidoFormProps) {
  const [formData, setFormData] = useState({
    cedula: "",
    nombres: "",
    apellidos: "",
    email: "",
    telefono: "",
    carrera: "",
    tipo: "aspirante", // aspirante, estudiante, profesor
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para guardar en la base de datos
    console.log("Registro rápido:", formData)
    alert("Registro guardado exitosamente")
    onClose()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="tipo">Tipo de Registro</Label>
          <Select onValueChange={(value) => handleInputChange("tipo", value)} defaultValue="aspirante">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="aspirante">Aspirante</SelectItem>
              <SelectItem value="estudiante">Estudiante</SelectItem>
              <SelectItem value="profesor">Profesor</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="cedula">Cédula *</Label>
          <Input
            id="cedula"
            value={formData.cedula}
            onChange={(e) => handleInputChange("cedula", e.target.value)}
            placeholder="12345678"
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
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="correo@ejemplo.com"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="telefono">Teléfono *</Label>
          <Input
            id="telefono"
            value={formData.telefono}
            onChange={(e) => handleInputChange("telefono", e.target.value)}
            placeholder="0412-1234567"
            required
          />
        </div>
        {(formData.tipo === "aspirante" || formData.tipo === "estudiante") && (
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="carrera">Carrera</Label>
            <Select onValueChange={(value) => handleInputChange("carrera", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar carrera" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ingenieria">Ingeniería en Informática</SelectItem>
                <SelectItem value="medicina">Medicina</SelectItem>
                <SelectItem value="derecho">Derecho</SelectItem>
                <SelectItem value="administracion">Administración</SelectItem>
                <SelectItem value="enfermeria">Enfermería</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose} className="flex-1">
          Cancelar
        </Button>
        <Button type="submit" className="flex-1">
          <Save className="h-4 w-4 mr-2" />
          Guardar Registro
        </Button>
      </div>
    </form>
  )
}
