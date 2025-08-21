"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, Save, Upload } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function NewDoctorPage() {
  const [activeTab, setActiveTab] = useState("personal")

  // Días de la semana para el horario
  const weekdays = [
    { id: "monday", name: "Lunes" },
    { id: "tuesday", name: "Martes" },
    { id: "wednesday", name: "Miércoles" },
    { id: "thursday", name: "Jueves" },
    { id: "friday", name: "Viernes" },
    { id: "saturday", name: "Sábado" },
    { id: "sunday", name: "Domingo" },
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
            <Link href="/doctors" className="text-muted-foreground hover:text-foreground">
              Médicos
            </Link>
            <span className="text-muted-foreground">/</span>
            <span>Nuevo Médico</span>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6">
          <div className="flex items-center mb-6">
            <Button variant="outline" size="sm" asChild className="mr-4">
              <Link href="/doctors">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Volver
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Registrar Nuevo Médico</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Formulario de Registro</CardTitle>
              <CardDescription>
                Ingrese la información del médico. Los campos marcados con * son obligatorios.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="personal">Datos Personales</TabsTrigger>
                  <TabsTrigger value="professional">Información Profesional</TabsTrigger>
                  <TabsTrigger value="schedule">Horario</TabsTrigger>
                </TabsList>
                <TabsContent value="personal" className="py-4">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nombre(s) *</Label>
                      <Input id="firstName" placeholder="Ingrese nombre(s)" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Apellido(s) *</Label>
                      <Input id="lastName" placeholder="Ingrese apellido(s)" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="idType">Tipo de Documento *</Label>
                      <Select>
                        <SelectTrigger id="idType">
                          <SelectValue placeholder="Seleccione tipo de documento" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dni">DNI</SelectItem>
                          <SelectItem value="passport">Pasaporte</SelectItem>
                          <SelectItem value="other">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="idNumber">Número de Documento *</Label>
                      <Input id="idNumber" placeholder="Ingrese número de documento" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
                      <Input id="birthDate" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Género</Label>
                      <Select>
                        <SelectTrigger id="gender">
                          <SelectValue placeholder="Seleccione género" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="female">Femenino</SelectItem>
                          <SelectItem value="male">Masculino</SelectItem>
                          <SelectItem value="other">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono *</Label>
                      <Input id="phone" placeholder="Ingrese número de teléfono" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo Electrónico *</Label>
                      <Input id="email" type="email" placeholder="Ingrese correo electrónico" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Dirección</Label>
                      <Input id="address" placeholder="Ingrese dirección" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="photo">Fotografía</Label>
                      <div className="border-2 border-dashed rounded-lg p-6 text-center">
                        <div className="flex flex-col items-center">
                          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground mt-2 mb-2">
                            Arrastre y suelte la imagen aquí o haga clic para seleccionarla
                          </p>
                          <Button variant="outline" size="sm">
                            Seleccionar Archivo
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="professional" className="py-4">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="specialty">Especialidad *</Label>
                      <Select>
                        <SelectTrigger id="specialty">
                          <SelectValue placeholder="Seleccione especialidad" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">Medicina General</SelectItem>
                          <SelectItem value="cardiology">Cardiología</SelectItem>
                          <SelectItem value="pediatrics">Pediatría</SelectItem>
                          <SelectItem value="gynecology">Ginecología</SelectItem>
                          <SelectItem value="traumatology">Traumatología</SelectItem>
                          <SelectItem value="dermatology">Dermatología</SelectItem>
                          <SelectItem value="neurology">Neurología</SelectItem>
                          <SelectItem value="other">Otra</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="licenseNumber">Número de Licencia Médica *</Label>
                      <Input id="licenseNumber" placeholder="Ingrese número de licencia" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="licenseExpiry">Fecha de Vencimiento de Licencia</Label>
                      <Input id="licenseExpiry" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="yearsExperience">Años de Experiencia</Label>
                      <Input id="yearsExperience" type="number" min="0" placeholder="Ingrese años de experiencia" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="education">Formación Académica</Label>
                      <Textarea
                        id="education"
                        placeholder="Ingrese información sobre su formación académica"
                        className="min-h-[100px]"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="certifications">Certificaciones</Label>
                      <Textarea
                        id="certifications"
                        placeholder="Ingrese certificaciones relevantes"
                        className="min-h-[100px]"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="biography">Biografía Profesional</Label>
                      <Textarea
                        id="biography"
                        placeholder="Ingrese una breve biografía profesional"
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="schedule" className="py-4">
                  <div className="space-y-6">
                    <div className="grid gap-4">
                      <h3 className="text-lg font-medium">Horario de Atención</h3>
                      <p className="text-sm text-muted-foreground">
                        Configure los días y horarios en que el médico estará disponible para atender pacientes.
                      </p>
                    </div>

                    {weekdays.map((day) => (
                      <div key={day.id} className="grid gap-4 border-b pb-4">
                        <div className="flex items-center justify-between">
                          <Label htmlFor={day.id} className="text-base font-medium">
                            {day.name}
                          </Label>
                          <Select defaultValue="available">
                            <SelectTrigger id={day.id} className="w-[180px]">
                              <SelectValue placeholder="Disponibilidad" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="available">Disponible</SelectItem>
                              <SelectItem value="unavailable">No Disponible</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`${day.id}-morning-start`}>Mañana - Inicio</Label>
                            <Select>
                              <SelectTrigger id={`${day.id}-morning-start`}>
                                <SelectValue placeholder="Hora inicio" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="08:00">08:00</SelectItem>
                                <SelectItem value="08:30">08:30</SelectItem>
                                <SelectItem value="09:00">09:00</SelectItem>
                                <SelectItem value="09:30">09:30</SelectItem>
                                <SelectItem value="10:00">10:00</SelectItem>
                                <SelectItem value="10:30">10:30</SelectItem>
                                <SelectItem value="11:00">11:00</SelectItem>
                                <SelectItem value="11:30">11:30</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`${day.id}-morning-end`}>Mañana - Fin</Label>
                            <Select>
                              <SelectTrigger id={`${day.id}-morning-end`}>
                                <SelectValue placeholder="Hora fin" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="11:30">11:30</SelectItem>
                                <SelectItem value="12:00">12:00</SelectItem>
                                <SelectItem value="12:30">12:30</SelectItem>
                                <SelectItem value="13:00">13:00</SelectItem>
                                <SelectItem value="13:30">13:30</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`${day.id}-afternoon-start`}>Tarde - Inicio</Label>
                            <Select>
                              <SelectTrigger id={`${day.id}-afternoon-start`}>
                                <SelectValue placeholder="Hora inicio" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="14:00">14:00</SelectItem>
                                <SelectItem value="14:30">14:30</SelectItem>
                                <SelectItem value="15:00">15:00</SelectItem>
                                <SelectItem value="15:30">15:30</SelectItem>
                                <SelectItem value="16:00">16:00</SelectItem>
                                <SelectItem value="16:30">16:30</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`${day.id}-afternoon-end`}>Tarde - Fin</Label>
                            <Select>
                              <SelectTrigger id={`${day.id}-afternoon-end`}>
                                <SelectValue placeholder="Hora fin" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="16:30">16:30</SelectItem>
                                <SelectItem value="17:00">17:00</SelectItem>
                                <SelectItem value="17:30">17:30</SelectItem>
                                <SelectItem value="18:00">18:00</SelectItem>
                                <SelectItem value="18:30">18:30</SelectItem>
                                <SelectItem value="19:00">19:00</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="space-y-2">
                      <Label htmlFor="appointmentDuration">Duración Predeterminada de Citas</Label>
                      <Select defaultValue="30">
                        <SelectTrigger id="appointmentDuration">
                          <SelectValue placeholder="Duración de citas" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutos</SelectItem>
                          <SelectItem value="30">30 minutos</SelectItem>
                          <SelectItem value="45">45 minutos</SelectItem>
                          <SelectItem value="60">60 minutos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Notas sobre Disponibilidad</Label>
                      <Textarea
                        id="notes"
                        placeholder="Ingrese notas adicionales sobre la disponibilidad del médico"
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/doctors">Cancelar</Link>
              </Button>
              <div className="flex gap-2">
                {activeTab !== "personal" && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      const tabs = ["personal", "professional", "schedule"]
                      const currentIndex = tabs.indexOf(activeTab)
                      setActiveTab(tabs[currentIndex - 1])
                    }}
                  >
                    Anterior
                  </Button>
                )}
                {activeTab !== "schedule" ? (
                  <Button
                    onClick={() => {
                      const tabs = ["personal", "professional", "schedule"]
                      const currentIndex = tabs.indexOf(activeTab)
                      setActiveTab(tabs[currentIndex + 1])
                    }}
                  >
                    Siguiente
                  </Button>
                ) : (
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Guardar
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
