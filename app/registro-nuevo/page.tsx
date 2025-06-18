"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { UserPlus, ArrowLeft, ArrowRight, Check, User, GraduationCap, Home, Heart } from "lucide-react"
import Link from "next/link"
import { sqliteClient } from "@/lib/sqlite-client"

export default function RegistroNuevo() {
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    // Datos Personales
    cedula: "",
    nombres: "",
    apellidos: "",
    fecha_nacimiento: "",
    lugar_nacimiento: "",
    nacionalidad: "",
    estado_civil: "",
    sexo: "",
    telefono: "",
    email: "",
    direccion: "",

    // Datos Académicos
    carrera_id: "",
    modalidad_estudio: "",
    turno_preferido: "",
    nivel_educativo_anterior: "",
    institucion_procedencia: "",
    año_graduacion: "",
    promedio_anterior: "",

    // Datos Socioeconómicos
    trabaja: "",
    ocupacion: "",
    ingresos_familiares: "",
    personas_dependen: "",
    tipo_vivienda: "",
    transporte: "",

    // Datos Familiares
    nombre_padre: "",
    cedula_padre: "",
    telefono_padre: "",
    ocupacion_padre: "",
    nombre_madre: "",
    cedula_madre: "",
    telefono_madre: "",
    ocupacion_madre: "",
    contacto_emergencia: "",
    telefono_emergencia: "",
  })

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await sqliteClient.createAspirante(formData)
      alert("Registro enviado exitosamente. Recibirás una confirmación por email.")
      window.location.href = "/estudiantes"
    } catch (error) {
      console.error("Error enviando registro:", error)
      alert("Error al enviar el registro. Por favor intenta nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <Link href="/estudiantes" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Volver a estudiantes
          </Link>
          <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
            <UserPlus className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800">Registro de Nuevo Aspirante</h1>
          <p className="text-slate-600">Completa todos los datos para procesar tu solicitud de ingreso</p>
        </div>

        {/* Progress Bar */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-slate-600">
                <span>
                  Paso {currentStep} de {totalSteps}
                </span>
                <span>{Math.round(progress)}% completado</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Form Steps */}
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              {currentStep === 1 && <User className="h-5 w-5 text-blue-500" />}
              {currentStep === 2 && <GraduationCap className="h-5 w-5 text-green-500" />}
              {currentStep === 3 && <Home className="h-5 w-5 text-purple-500" />}
              {currentStep === 4 && <Heart className="h-5 w-5 text-red-500" />}
              <CardTitle>
                {currentStep === 1 && "Datos Personales"}
                {currentStep === 2 && "Información Académica"}
                {currentStep === 3 && "Datos Socioeconómicos"}
                {currentStep === 4 && "Información Familiar"}
              </CardTitle>
            </div>
            <CardDescription>
              {currentStep === 1 && "Información básica de identificación personal"}
              {currentStep === 2 && "Historial educativo y carrera de interés"}
              {currentStep === 3 && "Situación socioeconómica y condiciones de vida"}
              {currentStep === 4 && "Datos de contacto familiar y emergencia"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Paso 1: Datos Personales */}
            {currentStep === 1 && (
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
                  <Label htmlFor="fecha_nacimiento">Fecha de Nacimiento *</Label>
                  <Input
                    id="fecha_nacimiento"
                    type="date"
                    value={formData.fecha_nacimiento}
                    onChange={(e) => handleInputChange("fecha_nacimiento", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lugar_nacimiento">Lugar de Nacimiento</Label>
                  <Input
                    id="lugar_nacimiento"
                    value={formData.lugar_nacimiento}
                    onChange={(e) => handleInputChange("lugar_nacimiento", e.target.value)}
                    placeholder="Ciudad, Estado"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nacionalidad">Nacionalidad</Label>
                  <Select onValueChange={(value) => handleInputChange("nacionalidad", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar nacionalidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="venezolana">Venezolana</SelectItem>
                      <SelectItem value="colombiana">Colombiana</SelectItem>
                      <SelectItem value="otra">Otra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estado_civil">Estado Civil</Label>
                  <Select onValueChange={(value) => handleInputChange("estado_civil", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar estado civil" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="soltero">Soltero(a)</SelectItem>
                      <SelectItem value="casado">Casado(a)</SelectItem>
                      <SelectItem value="divorciado">Divorciado(a)</SelectItem>
                      <SelectItem value="viudo">Viudo(a)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sexo">Sexo *</Label>
                  <Select onValueChange={(value) => handleInputChange("sexo", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar sexo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="masculino">Masculino</SelectItem>
                      <SelectItem value="femenino">Femenino</SelectItem>
                    </SelectContent>
                  </Select>
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
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="correo@ejemplo.com"
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="direccion">Dirección de Residencia</Label>
                  <Textarea
                    id="direccion"
                    value={formData.direccion}
                    onChange={(e) => handleInputChange("direccion", e.target.value)}
                    placeholder="Dirección completa de residencia"
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* Paso 2: Datos Académicos */}
            {currentStep === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="carrera_id">Carrera de Interés *</Label>
                  <Select onValueChange={(value) => handleInputChange("carrera_id", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar carrera" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Ingeniería en Informática</SelectItem>
                      <SelectItem value="2">Medicina</SelectItem>
                      <SelectItem value="3">Derecho</SelectItem>
                      <SelectItem value="4">Administración</SelectItem>
                      <SelectItem value="5">Enfermería</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="modalidad_estudio">Modalidad de Estudio</Label>
                  <Select onValueChange={(value) => handleInputChange("modalidad_estudio", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar modalidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="presencial">Presencial</SelectItem>
                      <SelectItem value="semipresencial">Semipresencial</SelectItem>
                      <SelectItem value="virtual">Virtual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="turno_preferido">Turno Preferido</Label>
                  <Select onValueChange={(value) => handleInputChange("turno_preferido", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar turno" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mañana">Mañana</SelectItem>
                      <SelectItem value="tarde">Tarde</SelectItem>
                      <SelectItem value="noche">Noche</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nivel_educativo_anterior">Nivel Educativo Anterior</Label>
                  <Select onValueChange={(value) => handleInputChange("nivel_educativo_anterior", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar nivel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bachillerato">Bachillerato</SelectItem>
                      <SelectItem value="tecnico">Técnico Superior</SelectItem>
                      <SelectItem value="universitario">Universitario</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="institucion_procedencia">Institución de Procedencia</Label>
                  <Input
                    id="institucion_procedencia"
                    value={formData.institucion_procedencia}
                    onChange={(e) => handleInputChange("institucion_procedencia", e.target.value)}
                    placeholder="Nombre de la institución"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="año_graduacion">Año de Graduación</Label>
                  <Input
                    id="año_graduacion"
                    type="number"
                    value={formData.año_graduacion}
                    onChange={(e) => handleInputChange("año_graduacion", e.target.value)}
                    placeholder="2023"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="promedio_anterior">Promedio o Índice Académico Anterior</Label>
                  <Input
                    id="promedio_anterior"
                    value={formData.promedio_anterior}
                    onChange={(e) => handleInputChange("promedio_anterior", e.target.value)}
                    placeholder="Ej: 18.5 o 4.2"
                  />
                </div>
              </div>
            )}

            {/* Paso 3: Datos Socioeconómicos */}
            {currentStep === 3 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="trabaja">¿Actualmente trabajas?</Label>
                  <Select onValueChange={(value) => handleInputChange("trabaja", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar opción" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="si">Sí</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ocupacion">Ocupación (si trabajas)</Label>
                  <Input
                    id="ocupacion"
                    value={formData.ocupacion}
                    onChange={(e) => handleInputChange("ocupacion", e.target.value)}
                    placeholder="Tu ocupación actual"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ingresos_familiares">Ingresos Familiares Mensuales</Label>
                  <Select onValueChange={(value) => handleInputChange("ingresos_familiares", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar rango" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="menos-1">Menos de 1 salario mínimo</SelectItem>
                      <SelectItem value="1-3">1 a 3 salarios mínimos</SelectItem>
                      <SelectItem value="3-5">3 a 5 salarios mínimos</SelectItem>
                      <SelectItem value="mas-5">Más de 5 salarios mínimos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="personas_dependen">Personas que dependen económicamente</Label>
                  <Input
                    id="personas_dependen"
                    type="number"
                    value={formData.personas_dependen}
                    onChange={(e) => handleInputChange("personas_dependen", e.target.value)}
                    placeholder="Número de personas"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipo_vivienda">Tipo de Vivienda</Label>
                  <Select onValueChange={(value) => handleInputChange("tipo_vivienda", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="propia">Propia</SelectItem>
                      <SelectItem value="alquilada">Alquilada</SelectItem>
                      <SelectItem value="familiar">Familiar</SelectItem>
                      <SelectItem value="otra">Otra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="transporte">Medio de Transporte Principal</Label>
                  <Select onValueChange={(value) => handleInputChange("transporte", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar transporte" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="publico">Transporte público</SelectItem>
                      <SelectItem value="propio">Vehículo propio</SelectItem>
                      <SelectItem value="familiar">Vehículo familiar</SelectItem>
                      <SelectItem value="caminando">Caminando</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Paso 4: Datos Familiares */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Información del Padre</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nombre_padre">Nombre Completo</Label>
                      <Input
                        id="nombre_padre"
                        value={formData.nombre_padre}
                        onChange={(e) => handleInputChange("nombre_padre", e.target.value)}
                        placeholder="Nombre completo del padre"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cedula_padre">Cédula</Label>
                      <Input
                        id="cedula_padre"
                        value={formData.cedula_padre}
                        onChange={(e) => handleInputChange("cedula_padre", e.target.value)}
                        placeholder="Cédula del padre"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefono_padre">Teléfono</Label>
                      <Input
                        id="telefono_padre"
                        value={formData.telefono_padre}
                        onChange={(e) => handleInputChange("telefono_padre", e.target.value)}
                        placeholder="Teléfono del padre"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ocupacion_padre">Ocupación</Label>
                      <Input
                        id="ocupacion_padre"
                        value={formData.ocupacion_padre}
                        onChange={(e) => handleInputChange("ocupacion_padre", e.target.value)}
                        placeholder="Ocupación del padre"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Información de la Madre</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nombre_madre">Nombre Completo</Label>
                      <Input
                        id="nombre_madre"
                        value={formData.nombre_madre}
                        onChange={(e) => handleInputChange("nombre_madre", e.target.value)}
                        placeholder="Nombre completo de la madre"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cedula_madre">Cédula</Label>
                      <Input
                        id="cedula_madre"
                        value={formData.cedula_madre}
                        onChange={(e) => handleInputChange("cedula_madre", e.target.value)}
                        placeholder="Cédula de la madre"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefono_madre">Teléfono</Label>
                      <Input
                        id="telefono_madre"
                        value={formData.telefono_madre}
                        onChange={(e) => handleInputChange("telefono_madre", e.target.value)}
                        placeholder="Teléfono de la madre"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ocupacion_madre">Ocupación</Label>
                      <Input
                        id="ocupacion_madre"
                        value={formData.ocupacion_madre}
                        onChange={(e) => handleInputChange("ocupacion_madre", e.target.value)}
                        placeholder="Ocupación de la madre"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Contacto de Emergencia</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contacto_emergencia">Nombre del Contacto *</Label>
                      <Input
                        id="contacto_emergencia"
                        value={formData.contacto_emergencia}
                        onChange={(e) => handleInputChange("contacto_emergencia", e.target.value)}
                        placeholder="Nombre completo"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefono_emergencia">Teléfono de Emergencia *</Label>
                      <Input
                        id="telefono_emergencia"
                        value={formData.telefono_emergencia}
                        onChange={(e) => handleInputChange("telefono_emergencia", e.target.value)}
                        placeholder="0412-1234567"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Anterior
              </Button>

              {currentStep < totalSteps ? (
                <Button onClick={nextStep}>
                  Siguiente
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700" disabled={loading}>
                  <Check className="h-4 w-4 mr-2" />
                  {loading ? "Enviando..." : "Enviar Solicitud"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
