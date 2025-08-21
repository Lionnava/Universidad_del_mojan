"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, User, Stethoscope } from "lucide-react"
import Link from "next/link"

interface Patient {
  id: number
  name: string
  email: string
}

interface Doctor {
  id: number
  name: string
  specialty: string
}

export default function NewMedicalRecordPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [patients, setPatients] = useState<Patient[]>([])
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    patientId: "",
    doctorId: "",
    visitDate: "",
    diagnosis: "",
    treatment: "",
    prescription: "",
    notes: "",
    vitalSigns: {
      bloodPressure: "",
      heartRate: "",
      temperature: "",
      weight: "",
      height: "",
    },
    symptoms: "",
    allergies: "",
    medications: "",
  })

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login")
      return
    }

    if (status === "authenticated") {
      fetchPatients()
      fetchDoctors()
    }
  }, [status, router])

  const fetchPatients = async () => {
    try {
      const response = await fetch("/api/patients")
      if (response.ok) {
        const data = await response.json()
        setPatients(data)
      }
    } catch (error) {
      console.error("Error fetching patients:", error)
    }
  }

  const fetchDoctors = async () => {
    try {
      const response = await fetch("/api/doctors")
      if (response.ok) {
        const data = await response.json()
        setDoctors(data)
      }
    } catch (error) {
      console.error("Error fetching doctors:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/medical-records", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push("/medical-records")
      } else {
        console.error("Error creating medical record")
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleVitalSignChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      vitalSigns: {
        ...prev.vitalSigns,
        [field]: value,
      },
    }))
  }

  if (status === "loading") {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href="/medical-records">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nuevo Historial Médico</h1>
          <p className="text-gray-600 mt-1">Registra un nuevo historial médico para un paciente</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Patient and Doctor Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Información Básica</span>
              </CardTitle>
              <CardDescription>Selecciona el paciente y médico para este registro</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="patient">Paciente *</Label>
                <Select value={formData.patientId} onValueChange={(value) => handleInputChange("patientId", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar paciente" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map((patient) => (
                      <SelectItem key={patient.id} value={patient.id.toString()}>
                        {patient.name} - {patient.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="doctor">Médico *</Label>
                <Select value={formData.doctorId} onValueChange={(value) => handleInputChange("doctorId", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar médico" />
                  </SelectTrigger>
                  <SelectContent>
                    {doctors.map((doctor) => (
                      <SelectItem key={doctor.id} value={doctor.id.toString()}>
                        Dr. {doctor.name} - {doctor.specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="visitDate">Fecha de Visita *</Label>
                <Input
                  id="visitDate"
                  type="datetime-local"
                  value={formData.visitDate}
                  onChange={(e) => handleInputChange("visitDate", e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Vital Signs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Stethoscope className="h-5 w-5" />
                <span>Signos Vitales</span>
              </CardTitle>
              <CardDescription>Registra los signos vitales del paciente</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bloodPressure">Presión Arterial</Label>
                  <Input
                    id="bloodPressure"
                    placeholder="120/80 mmHg"
                    value={formData.vitalSigns.bloodPressure}
                    onChange={(e) => handleVitalSignChange("bloodPressure", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="heartRate">Frecuencia Cardíaca</Label>
                  <Input
                    id="heartRate"
                    placeholder="72 bpm"
                    value={formData.vitalSigns.heartRate}
                    onChange={(e) => handleVitalSignChange("heartRate", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="temperature">Temperatura</Label>
                  <Input
                    id="temperature"
                    placeholder="36.5°C"
                    value={formData.vitalSigns.temperature}
                    onChange={(e) => handleVitalSignChange("temperature", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Peso</Label>
                  <Input
                    id="weight"
                    placeholder="70 kg"
                    value={formData.vitalSigns.weight}
                    onChange={(e) => handleVitalSignChange("weight", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="height">Altura</Label>
                <Input
                  id="height"
                  placeholder="170 cm"
                  value={formData.vitalSigns.height}
                  onChange={(e) => handleVitalSignChange("height", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Medical Information */}
        <Card>
          <CardHeader>
            <CardTitle>Información Médica</CardTitle>
            <CardDescription>Detalles médicos de la consulta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="symptoms">Síntomas</Label>
              <Textarea
                id="symptoms"
                placeholder="Describe los síntomas presentados por el paciente..."
                value={formData.symptoms}
                onChange={(e) => handleInputChange("symptoms", e.target.value)}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="diagnosis">Diagnóstico</Label>
              <Textarea
                id="diagnosis"
                placeholder="Diagnóstico médico..."
                value={formData.diagnosis}
                onChange={(e) => handleInputChange("diagnosis", e.target.value)}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="treatment">Tratamiento</Label>
              <Textarea
                id="treatment"
                placeholder="Plan de tratamiento recomendado..."
                value={formData.treatment}
                onChange={(e) => handleInputChange("treatment", e.target.value)}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="prescription">Prescripción</Label>
              <Textarea
                id="prescription"
                placeholder="Medicamentos prescritos..."
                value={formData.prescription}
                onChange={(e) => handleInputChange("prescription", e.target.value)}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="allergies">Alergias</Label>
              <Textarea
                id="allergies"
                placeholder="Alergias conocidas del paciente..."
                value={formData.allergies}
                onChange={(e) => handleInputChange("allergies", e.target.value)}
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="notes">Notas Adicionales</Label>
              <Textarea
                id="notes"
                placeholder="Observaciones adicionales..."
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Link href="/medical-records">
            <Button variant="outline">Cancelar</Button>
          </Link>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Guardando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Guardar Historial
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
