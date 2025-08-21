"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, Save } from "lucide-react"

export default function NewPatientPage() {
  const [activeTab, setActiveTab] = useState("personal")

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="font-bold">
              Gestor de Salud DF TAMARE
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/patients" className="text-muted-foreground hover:text-foreground">
              Pacientes
            </Link>
            <span className="text-muted-foreground">/</span>
            <span>Nuevo Paciente</span>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6">
          <div className="flex items-center mb-6">
            <Button variant="outline" size="sm" asChild className="mr-4">
              <Link href="/patients">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Volver
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Registrar Nuevo Paciente</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Formulario de Registro</CardTitle>
              <CardDescription>
                Ingrese la información del paciente. Los campos marcados con * son obligatorios.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="personal">Datos Personales</TabsTrigger>
                  <TabsTrigger value="medical">Información Médica</TabsTrigger>
                  <TabsTrigger value="contact">Contacto</TabsTrigger>
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
                      <Label htmlFor="birthDate">Fecha de Nacimiento *</Label>
                      <Input id="birthDate" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label>Género *</Label>
                      <RadioGroup defaultValue="female" className="flex gap-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="female" />
                          <Label htmlFor="female">Femenino</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="male" />
                          <Label htmlFor="male">Masculino</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="other" id="other" />
                          <Label htmlFor="other">Otro</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="medical" className="py-4">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="bloodType">Grupo Sanguíneo</Label>
                      <Select>
                        <SelectTrigger id="bloodType">
                          <SelectValue placeholder="Seleccione grupo sanguíneo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="a+">A+</SelectItem>
                          <SelectItem value="a-">A-</SelectItem>
                          <SelectItem value="b+">B+</SelectItem>
                          <SelectItem value="b-">B-</SelectItem>
                          <SelectItem value="ab+">AB+</SelectItem>
                          <SelectItem value="ab-">AB-</SelectItem>
                          <SelectItem value="o+">O+</SelectItem>
                          <SelectItem value="o-">O-</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="height">Estatura (cm)</Label>
                      <Input id="height" type="number" placeholder="Ingrese estatura" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight">Peso (kg)</Label>
                      <Input id="weight" type="number" placeholder="Ingrese peso" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="allergies">Alergias</Label>
                      <Input id="allergies" placeholder="Ingrese alergias conocidas" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="medicalHistory">Antecedentes Médicos</Label>
                      <Textarea
                        id="medicalHistory"
                        placeholder="Ingrese antecedentes médicos relevantes"
                        className="min-h-[100px]"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="currentMedications">Medicamentos Actuales</Label>
                      <Textarea
                        id="currentMedications"
                        placeholder="Ingrese medicamentos que toma actualmente"
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="contact" className="py-4">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono *</Label>
                      <Input id="phone" placeholder="Ingrese número de teléfono" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo Electrónico</Label>
                      <Input id="email" type="email" placeholder="Ingrese correo electrónico" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Dirección *</Label>
                      <Input id="address" placeholder="Ingrese dirección" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">Ciudad *</Label>
                      <Input id="city" placeholder="Ingrese ciudad" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="emergencyContact">Contacto de Emergencia</Label>
                      <Input id="emergencyContact" placeholder="Nombre del contacto de emergencia" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyPhone">Teléfono de Emergencia</Label>
                      <Input id="emergencyPhone" placeholder="Teléfono del contacto de emergencia" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="relationship">Relación</Label>
                      <Input id="relationship" placeholder="Relación con el contacto de emergencia" />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/patients">Cancelar</Link>
              </Button>
              <div className="flex gap-2">
                {activeTab !== "personal" && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      const tabs = ["personal", "medical", "contact"]
                      const currentIndex = tabs.indexOf(activeTab)
                      setActiveTab(tabs[currentIndex - 1])
                    }}
                  >
                    Anterior
                  </Button>
                )}
                {activeTab !== "contact" ? (
                  <Button
                    onClick={() => {
                      const tabs = ["personal", "medical", "contact"]
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
