"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, Save, Clock } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function EditAppointmentPage({ params }: { params: { id: string } }) {
  // Mock data for an appointment
  const appointment = {
    id: params.id,
    patientId: "1",
    patientName: "María González",
    doctorId: "1",
    doctorName: "Dr. Carlos Ramírez",
    doctorSpecialty: "Medicina General",
    date: "2025-03-20",
    time: "09:00",
    type: "consultation",
    duration: "30",
    reason: "Control de hipertensión y revisión de medicación actual.",
    notes: "Paciente debe traer resultados de análisis de sangre recientes.",
    status: "scheduled",
  }

  const [appointmentType, setAppointmentType] = useState(appointment.type)

  // Mock data for patients and doctors
  const patients = [
    { id: 1, name: "María González" },
    { id: 2, name: "Juan Pérez" },
    { id: 3, name: "Ana Rodríguez" },
  ]

  const doctors = [
    { id: 1, name: "Dr. Carlos Ramírez", specialty: "Medicina General" },
    { id: 2, name: "Dra. Laura Sánchez", specialty: "Cardiología" },
    { id: 3, name: "Dr. Roberto Mendoza", specialty: "Pediatría" },
  ]

  // Available time slots
  const timeSlots = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="font-bold">
              Gestor de Salud DF TAMARE
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/appointments" className="text-muted-foreground hover:text-foreground">
              Citas
            </Link>
            <span className="text-muted-foreground">/</span>
            <span>Editar Cita</span>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6">
          <div className="flex items-center mb-6">
            <Button variant="outline" size="sm" asChild className="mr-4">
              <Link href="/appointments">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Volver
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Editar Cita</h1>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Información de la Cita</CardTitle>
              <CardDescription>Modifique la información de la cita programada</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="patient">Paciente *</Label>
                  <Select defaultValue={appointment.patientId}>
                    <SelectTrigger id="patient">
                      <SelectValue placeholder="Seleccione paciente" />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.map((patient) => (
                        <SelectItem key={patient.id} value={patient.id.toString()}>
                          {patient.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doctor">Médico *</Label>
                  <Select defaultValue={appointment.doctorId}>
                    <SelectTrigger id="doctor">
                      <SelectValue placeholder="Seleccione médico" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors.map((doctor) => (
                        <SelectItem key={doctor.id} value={doctor.id.toString()}>
                          {doctor.name} - {doctor.specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Fecha *</Label>
                  <Input id="date" type="date" defaultValue={appointment.date} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Hora *</Label>
                  <Select defaultValue={appointment.time}>
                    <SelectTrigger id="time">
                      <SelectValue placeholder="Seleccione hora" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Tipo de Cita *</Label>
                  <RadioGroup
                    defaultValue={appointment.type}
                    value={appointmentType}
                    onValueChange={setAppointmentType}
                    className="flex flex-wrap gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="consultation" id="consultation" />
                      <Label htmlFor="consultation">Consulta</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="followup" id="followup" />
                      <Label htmlFor="followup">Seguimiento</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="emergency" id="emergency" />
                      <Label htmlFor="emergency">Emergencia</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="procedure" id="procedure" />
                      <Label htmlFor="procedure">Procedimiento</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="lab" id="lab" />
                      <Label htmlFor="lab">Laboratorio</Label>
                    </div>
                  </RadioGroup>
                </div>
                {appointmentType === "procedure" && (
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="procedureType">Tipo de Procedimiento *</Label>
                    <Select>
                      <SelectTrigger id="procedureType">
                        <SelectValue placeholder="Seleccione tipo de procedimiento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ultrasound">Ecografía</SelectItem>
                        <SelectItem value="xray">Radiografía</SelectItem>
                        <SelectItem value="ekg">Electrocardiograma</SelectItem>
                        <SelectItem value="minor">Cirugía menor</SelectItem>
                        <SelectItem value="other">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="duration">Duración Estimada</Label>
                  <div className="flex items-center gap-2">
                    <Select defaultValue={appointment.duration}>
                      <SelectTrigger id="duration" className="w-[180px]">
                        <SelectValue placeholder="Duración" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutos</SelectItem>
                        <SelectItem value="30">30 minutos</SelectItem>
                        <SelectItem value="45">45 minutos</SelectItem>
                        <SelectItem value="60">1 hora</SelectItem>
                        <SelectItem value="90">1 hora 30 minutos</SelectItem>
                        <SelectItem value="120">2 horas</SelectItem>
                      </SelectContent>
                    </Select>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Estado *</Label>
                  <Select defaultValue={appointment.status}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Seleccione estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="scheduled">Programada</SelectItem>
                      <SelectItem value="confirmed">Confirmada</SelectItem>
                      <SelectItem value="waiting">En espera</SelectItem>
                      <SelectItem value="completed">Completada</SelectItem>
                      <SelectItem value="cancelled">Cancelada</SelectItem>
                      <SelectItem value="noshow">No asistió</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="reason">Motivo de la Cita *</Label>
                  <Textarea
                    id="reason"
                    defaultValue={appointment.reason}
                    placeholder="Describa brevemente el motivo de la cita"
                    className="min-h-[100px]"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="notes">Notas Adicionales</Label>
                  <Textarea
                    id="notes"
                    defaultValue={appointment.notes}
                    placeholder="Ingrese cualquier información adicional relevante"
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/appointments">Cancelar</Link>
              </Button>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Guardar Cambios
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
