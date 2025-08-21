"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, Plus, Save, Trash2, Printer } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function NewPrescriptionPage() {
  const [medications, setMedications] = useState([
    { id: 1, name: "", dosage: "", frequency: "", duration: "", instructions: "" },
  ])

  const addMedication = () => {
    const newId = medications.length > 0 ? Math.max(...medications.map((m) => m.id)) + 1 : 1
    setMedications([...medications, { id: newId, name: "", dosage: "", frequency: "", duration: "", instructions: "" }])
  }

  const removeMedication = (id) => {
    if (medications.length > 1) {
      setMedications(medications.filter((m) => m.id !== id))
    }
  }

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

  // Mock data for medications
  const medicationOptions = [
    { id: 1, name: "Paracetamol 500mg" },
    { id: 2, name: "Ibuprofeno 400mg" },
    { id: 3, name: "Amoxicilina 500mg" },
    { id: 4, name: "Loratadina 10mg" },
    { id: 5, name: "Omeprazol 20mg" },
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
            <Link href="/prescriptions" className="text-muted-foreground hover:text-foreground">
              Prescripciones
            </Link>
            <span className="text-muted-foreground">/</span>
            <span>Nueva Prescripción</span>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6">
          <div className="flex items-center mb-6">
            <Button variant="outline" size="sm" asChild className="mr-4">
              <Link href="/prescriptions">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Volver
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Nueva Prescripción Médica</h1>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Información General</CardTitle>
              <CardDescription>Ingrese la información básica de la prescripción</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="patient">Paciente *</Label>
                  <Select>
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
                  <Select>
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
                  <Input id="date" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="diagnosis">Diagnóstico *</Label>
                  <Input id="diagnosis" placeholder="Ingrese diagnóstico" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="notes">Notas Adicionales</Label>
                  <Textarea
                    id="notes"
                    placeholder="Ingrese notas adicionales sobre el diagnóstico o tratamiento"
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Medicamentos</CardTitle>
                <CardDescription>Agregue los medicamentos a prescribir</CardDescription>
              </div>
              <Button onClick={addMedication} size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Agregar Medicamento
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medicamento</TableHead>
                    <TableHead>Dosis</TableHead>
                    <TableHead>Frecuencia</TableHead>
                    <TableHead>Duración</TableHead>
                    <TableHead>Instrucciones</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {medications.map((medication, index) => (
                    <TableRow key={medication.id}>
                      <TableCell>
                        <Select>
                          <SelectTrigger id={`medication-${medication.id}`}>
                            <SelectValue placeholder="Seleccione medicamento" />
                          </SelectTrigger>
                          <SelectContent>
                            {medicationOptions.map((option) => (
                              <SelectItem key={option.id} value={option.id.toString()}>
                                {option.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Input placeholder="Dosis" />
                      </TableCell>
                      <TableCell>
                        <Select>
                          <SelectTrigger id={`frequency-${medication.id}`}>
                            <SelectValue placeholder="Frecuencia" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="once">Una vez al día</SelectItem>
                            <SelectItem value="twice">Dos veces al día</SelectItem>
                            <SelectItem value="three">Tres veces al día</SelectItem>
                            <SelectItem value="four">Cuatro veces al día</SelectItem>
                            <SelectItem value="other">Otra</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Input placeholder="Duración" />
                      </TableCell>
                      <TableCell>
                        <Input placeholder="Instrucciones" />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeMedication(medication.id)}
                          disabled={medications.length === 1}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                          <span className="sr-only">Eliminar</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/prescriptions">Cancelar</Link>
            </Button>
            <div className="flex gap-2">
              <Button variant="outline">
                <Printer className="mr-2 h-4 w-4" />
                Vista Previa
              </Button>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Guardar Prescripción
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
