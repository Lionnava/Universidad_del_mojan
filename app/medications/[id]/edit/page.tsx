"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, Save } from "lucide-react"
import { Switch } from "@/components/ui/switch"

export default function EditMedicationPage({ params }: { params: { id: string } }) {
  // Mock data for a medication
  const medication = {
    id: params.id,
    name: "Paracetamol",
    genericName: "Acetaminofén",
    category: "analgesic",
    presentation: "Tableta 500mg",
    laboratory: "Laboratorios XYZ",
    stock: 120,
    minStock: 30,
    location: "Estante A-3",
    requiresPrescription: true,
    indications:
      "Indicado para el alivio temporal de la fiebre y dolores leves a moderados como dolor de cabeza, dolor muscular, dolor de muelas, dolor menstrual, resfriado común y dolor leve de artritis.",
    contraindications:
      "Hipersensibilidad al paracetamol o a cualquiera de los componentes de la formulación. Pacientes con enfermedad hepática o renal grave.",
    sideEffects:
      "Raras: reacciones alérgicas, erupciones cutáneas. Muy raras: alteraciones sanguíneas, hipoglucemia, hepatotoxicidad.",
  }

  const [requiresPrescription, setRequiresPrescription] = useState(medication.requiresPrescription)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="font-bold">
              Gestor de Salud DF TAMARE
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/medications" className="text-muted-foreground hover:text-foreground">
              Medicamentos
            </Link>
            <span className="text-muted-foreground">/</span>
            <span>Editar Medicamento</span>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6">
          <div className="flex items-center mb-6">
            <Button variant="outline" size="sm" asChild className="mr-4">
              <Link href="/medications">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Volver
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Editar Medicamento</h1>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Información del Medicamento</CardTitle>
              <CardDescription>Modifique los detalles del medicamento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Comercial *</Label>
                  <Input id="name" defaultValue={medication.name} placeholder="Ingrese nombre comercial" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="genericName">Nombre Genérico *</Label>
                  <Input id="genericName" defaultValue={medication.genericName} placeholder="Ingrese nombre genérico" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Categoría *</Label>
                  <Select defaultValue={medication.category}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Seleccione categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="analgesic">Analgésico</SelectItem>
                      <SelectItem value="antibiotic">Antibiótico</SelectItem>
                      <SelectItem value="antiinflammatory">Antiinflamatorio</SelectItem>
                      <SelectItem value="antihistamine">Antihistamínico</SelectItem>
                      <SelectItem value="antacid">Antiácido</SelectItem>
                      <SelectItem value="antihypertensive">Antihipertensivo</SelectItem>
                      <SelectItem value="antidiabetic">Antidiabético</SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="presentation">Presentación *</Label>
                  <Input
                    id="presentation"
                    defaultValue={medication.presentation}
                    placeholder="Ej: Tableta 500mg, Jarabe 250mg/5ml"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="laboratory">Laboratorio</Label>
                  <Input
                    id="laboratory"
                    defaultValue={medication.laboratory}
                    placeholder="Ingrese laboratorio fabricante"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Actual *</Label>
                  <Input
                    id="stock"
                    type="number"
                    min="0"
                    defaultValue={medication.stock}
                    placeholder="Ingrese cantidad actual"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minStock">Stock Mínimo</Label>
                  <Input
                    id="minStock"
                    type="number"
                    min="0"
                    defaultValue={medication.minStock}
                    placeholder="Cantidad mínima antes de alerta"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Ubicación</Label>
                  <Input id="location" defaultValue={medication.location} placeholder="Ubicación en almacén" />
                </div>
                <div className="space-y-2 flex flex-col justify-end">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="prescription"
                      checked={requiresPrescription}
                      onCheckedChange={setRequiresPrescription}
                    />
                    <Label htmlFor="prescription">Requiere Prescripción Médica</Label>
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="indications">Indicaciones</Label>
                  <Textarea
                    id="indications"
                    defaultValue={medication.indications}
                    placeholder="Ingrese las indicaciones generales del medicamento"
                    className="min-h-[100px]"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="contraindications">Contraindicaciones</Label>
                  <Textarea
                    id="contraindications"
                    defaultValue={medication.contraindications}
                    placeholder="Ingrese las contraindicaciones del medicamento"
                    className="min-h-[100px]"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="sideEffects">Efectos Secundarios</Label>
                  <Textarea
                    id="sideEffects"
                    defaultValue={medication.sideEffects}
                    placeholder="Ingrese los posibles efectos secundarios"
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/medications">Cancelar</Link>
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
