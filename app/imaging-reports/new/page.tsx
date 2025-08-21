"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, Save, Upload, Printer } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function NewImagingReportPage() {
  const [reportType, setReportType] = useState("ultrasound")

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

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="font-bold">
              Gestor de Salud DF TAMARE
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/imaging-reports" className="text-muted-foreground hover:text-foreground">
              Informes de Imágenes
            </Link>
            <span className="text-muted-foreground">/</span>
            <span>Nuevo Informe</span>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6">
          <div className="flex items-center mb-6">
            <Button variant="outline" size="sm" asChild className="mr-4">
              <Link href="/imaging-reports">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Volver
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Nuevo Informe de Imágenes</h1>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Información General</CardTitle>
              <CardDescription>Ingrese la información básica del informe</CardDescription>
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
                  <Label htmlFor="doctor">Médico Solicitante *</Label>
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
                  <Label htmlFor="date">Fecha del Estudio *</Label>
                  <Input id="date" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reportType">Tipo de Estudio *</Label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger id="reportType">
                      <SelectValue placeholder="Seleccione tipo de estudio" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ultrasound">Ecografía</SelectItem>
                      <SelectItem value="xray">Radiografía</SelectItem>
                      <SelectItem value="ct">Tomografía Computarizada</SelectItem>
                      <SelectItem value="mri">Resonancia Magnética</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="reason">Motivo del Estudio *</Label>
                  <Textarea
                    id="reason"
                    placeholder="Ingrese el motivo por el cual se solicita el estudio"
                    className="min-h-[80px]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Detalles del Estudio</CardTitle>
              <CardDescription>Ingrese los detalles específicos del estudio de imágenes</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="findings" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="findings">Hallazgos</TabsTrigger>
                  <TabsTrigger value="images">Imágenes</TabsTrigger>
                  <TabsTrigger value="conclusion">Conclusión</TabsTrigger>
                </TabsList>
                <TabsContent value="findings" className="py-4">
                  <div className="space-y-4">
                    {reportType === "ultrasound" && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="organExamined">Órgano/Área Examinada *</Label>
                          <Select>
                            <SelectTrigger id="organExamined">
                              <SelectValue placeholder="Seleccione órgano o área" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="abdomen">Abdomen</SelectItem>
                              <SelectItem value="pelvis">Pelvis</SelectItem>
                              <SelectItem value="thyroid">Tiroides</SelectItem>
                              <SelectItem value="breast">Mama</SelectItem>
                              <SelectItem value="cardiac">Cardíaca</SelectItem>
                              <SelectItem value="obstetric">Obstétrica</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="findings">Hallazgos *</Label>
                          <Textarea
                            id="findings"
                            placeholder="Describa los hallazgos del estudio ecográfico"
                            className="min-h-[200px]"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="measurements">Mediciones</Label>
                          <Textarea
                            id="measurements"
                            placeholder="Ingrese las mediciones realizadas durante el estudio"
                            className="min-h-[100px]"
                          />
                        </div>
                      </>
                    )}
                    {reportType === "xray" && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="bodyPart">Parte del Cuerpo *</Label>
                          <Select>
                            <SelectTrigger id="bodyPart">
                              <SelectValue placeholder="Seleccione parte del cuerpo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="chest">Tórax</SelectItem>
                              <SelectItem value="skull">Cráneo</SelectItem>
                              <SelectItem value="spine">Columna</SelectItem>
                              <SelectItem value="extremities">Extremidades</SelectItem>
                              <SelectItem value="abdomen">Abdomen</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="projection">Proyección *</Label>
                          <Select>
                            <SelectTrigger id="projection">
                              <SelectValue placeholder="Seleccione proyección" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ap">Anteroposterior (AP)</SelectItem>
                              <SelectItem value="pa">Posteroanterior (PA)</SelectItem>
                              <SelectItem value="lateral">Lateral</SelectItem>
                              <SelectItem value="oblique">Oblicua</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="findings">Hallazgos *</Label>
                          <Textarea
                            id="findings"
                            placeholder="Describa los hallazgos del estudio radiológico"
                            className="min-h-[200px]"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="images" className="py-4">
                  <div className="space-y-4">
                    <div className="border-2 border-dashed rounded-lg p-12 text-center">
                      <div className="flex flex-col items-center">
                        <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">Subir Imágenes</h3>
                        <p className="text-sm text-muted-foreground mt-2 mb-4">
                          Arrastre y suelte las imágenes aquí o haga clic para seleccionarlas
                        </p>
                        <Button variant="outline">Seleccionar Archivos</Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="imageDescription">Descripción de las Imágenes</Label>
                      <Textarea
                        id="imageDescription"
                        placeholder="Agregue una descripción para las imágenes subidas"
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="conclusion" className="py-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="impression">Impresión Diagnóstica *</Label>
                      <Textarea
                        id="impression"
                        placeholder="Ingrese la impresión diagnóstica basada en los hallazgos"
                        className="min-h-[150px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="recommendations">Recomendaciones</Label>
                      <Textarea
                        id="recommendations"
                        placeholder="Ingrese recomendaciones adicionales si las hay"
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/imaging-reports">Cancelar</Link>
            </Button>
            <div className="flex gap-2">
              <Button variant="outline">
                <Printer className="mr-2 h-4 w-4" />
                Vista Previa
              </Button>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Guardar Informe
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
