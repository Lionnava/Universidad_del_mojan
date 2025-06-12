"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, CreditCard, GraduationCap, UserCheck, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ConstanciasPage() {
  const [selectedType, setSelectedType] = useState("")

  const tiposConstancia = [
    {
      id: "notas",
      titulo: "Constancia de Notas",
      descripcion: "Certificado oficial de calificaciones obtenidas",
      icon: FileText,
      color: "bg-blue-500",
      disponible: true,
    },
    {
      id: "estudios",
      titulo: "Constancia de Estudios",
      descripcion: "Certificado de inscripción y estudios regulares",
      icon: GraduationCap,
      color: "bg-green-500",
      disponible: true,
    },
    {
      id: "preinscripcion",
      titulo: "Constancia de Pre-inscripción",
      descripcion: "Certificado de proceso de pre-inscripción",
      icon: UserCheck,
      color: "bg-purple-500",
      disponible: true,
    },
    {
      id: "inscripcion",
      titulo: "Constancia de Inscripción",
      descripción: "Certificado oficial de inscripción con carnet estudiantil",
      icon: CreditCard,
      color: "bg-orange-500",
      disponible: true,
    },
  ]

  const generateConstancia = async (tipo: string) => {
    // Datos del estudiante (normalmente vendrían de la base de datos)
    const estudiante = {
      nombres: "María José",
      apellidos: "González Pérez",
      cedula: "20123456",
      carrera: "Ingeniería en Informática",
      trayecto: "2",
      trimestre: "1",
      periodo: "2024-2025",
      fechaIngreso: "2023-09-01",
      promedio: "17.5",
    }

    let contenido = ""

    switch (tipo) {
      case "notas":
        contenido = `
UNIVERSIDAD MÓVIL
CONSTANCIA DE NOTAS

Por medio de la presente se certifica que el/la estudiante:

NOMBRES Y APELLIDOS: ${estudiante.nombres} ${estudiante.apellidos}
CÉDULA DE IDENTIDAD: ${estudiante.cedula}
CARRERA: ${estudiante.carrera}
TRAYECTO: ${estudiante.trayecto}
TRIMESTRE: ${estudiante.trimestre}
PERÍODO ACADÉMICO: ${estudiante.periodo}

Ha obtenido las siguientes calificaciones:

MATERIAS CURSADAS:
- Matemática II: 18 puntos
- Programación II: 17 puntos  
- Base de Datos I: 16 puntos
- Algoritmos y Estructuras: 19 puntos

PROMEDIO GENERAL: ${estudiante.promedio} puntos

Esta constancia se expide a solicitud del interesado para los fines que estime conveniente.

Fecha: ${new Date().toLocaleDateString()}

_________________________________
Coordinación Académica
Universidad Móvil
        `
        break

      case "estudios":
        contenido = `
UNIVERSIDAD MÓVIL
CONSTANCIA DE ESTUDIOS

Por medio de la presente se hace constar que el/la ciudadano/a:

NOMBRES Y APELLIDOS: ${estudiante.nombres} ${estudiante.apellidos}
CÉDULA DE IDENTIDAD: ${estudiante.cedula}
CARRERA: ${estudiante.carrera}
TRAYECTO ACTUAL: ${estudiante.trayecto}
TRIMESTRE ACTUAL: ${estudiante.trimestre}
PERÍODO ACADÉMICO: ${estudiante.periodo}
FECHA DE INGRESO: ${new Date(estudiante.fechaIngreso).toLocaleDateString()}

Se encuentra inscrito/a y cursando estudios regulares en esta institución, 
manteniendo su condición de estudiante activo/a.

Esta constancia se expide a solicitud del interesado para los fines que estime conveniente.

Fecha: ${new Date().toLocaleDateString()}

_________________________________
Registro y Control de Estudios
Universidad Móvil
        `
        break

      case "inscripcion":
        contenido = `
UNIVERSIDAD MÓVIL
CONSTANCIA DE INSCRIPCIÓN

Por medio de la presente se certifica que el/la estudiante:

NOMBRES Y APELLIDOS: ${estudiante.nombres} ${estudiante.apellidos}
CÉDULA DE IDENTIDAD: ${estudiante.cedula}
CARRERA: ${estudiante.carrera}
TRAYECTO: ${estudiante.trayecto}
PERÍODO ACADÉMICO: ${estudiante.periodo}

Ha completado satisfactoriamente el proceso de inscripción formal para el período académico vigente.

DATOS DEL CARNET ESTUDIANTIL:
┌─────────────────────────────────────┐
│        UNIVERSIDAD MÓVIL            │
│                                     │
│  CARNET ESTUDIANTIL                 │
│                                     │
│  ${estudiante.nombres} ${estudiante.apellidos}           │
│  C.I.: ${estudiante.cedula}                    │
│  Carrera: ${estudiante.carrera}     │
│  Trayecto: ${estudiante.trayecto} - Período: ${estudiante.periodo}      │
│                                     │
│  Válido hasta: Julio 2025           │
│                                     │
│  ________________                   │
│  Firma del Portador                 │
└─────────────────────────────────────┘

Esta constancia incluye el facsímil del carnet estudiantil vigente.

Fecha: ${new Date().toLocaleDateString()}

_________________________________
Registro y Control de Estudios
Universidad Móvil
        `
        break
    }

    // Crear y descargar el archivo
    const blob = new Blob([contenido], { type: "text/plain;charset=utf-8" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `constancia_${tipo}_${estudiante.cedula}_${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)

    alert("Constancia generada y descargada exitosamente")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Constancias Estudiantiles</h1>
            <p className="text-slate-600">Genera y descarga tus constancias oficiales</p>
          </div>
          <Link href="/estudiante/dashboard">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </Link>
        </div>

        {/* Información del Estudiante */}
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800">Información del Estudiante</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Nombre:</span> María José González Pérez
              </div>
              <div>
                <span className="font-medium">Cédula:</span> 20123456
              </div>
              <div>
                <span className="font-medium">Carrera:</span> Ingeniería en Informática
              </div>
              <div>
                <span className="font-medium">Trayecto:</span> 2 - Trimestre 1
              </div>
              <div>
                <span className="font-medium">Período:</span> 2024-2025
              </div>
              <div>
                <span className="font-medium">Estado:</span>
                <Badge className="ml-2" variant="default">
                  Activo
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tipos de Constancias */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tiposConstancia.map((constancia) => {
            const Icon = constancia.icon
            return (
              <Card key={constancia.id} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${constancia.color}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{constancia.titulo}</CardTitle>
                      <CardDescription>{constancia.descripcion}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {constancia.disponible ? (
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        Disponible
                      </Badge>
                    ) : (
                      <Badge variant="secondary">No Disponible</Badge>
                    )}

                    <div className="text-sm text-slate-600">
                      {constancia.id === "inscripcion" && (
                        <p className="mb-2">
                          <strong>Incluye:</strong> Facsímil del carnet estudiantil vigente para el período académico
                          actual.
                        </p>
                      )}
                      <p>
                        Documento oficial con validez institucional. Formato PDF con firma digital y código de
                        verificación.
                      </p>
                    </div>

                    <Button
                      className="w-full"
                      onClick={() => generateConstancia(constancia.id)}
                      disabled={!constancia.disponible}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Descargar Constancia
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Información Adicional */}
        <Card>
          <CardHeader>
            <CardTitle>Información Importante</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <p>Las constancias son documentos oficiales con validez institucional.</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <p>Cada constancia incluye un código de verificación único.</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <p>El carnet estudiantil incluido en la constancia de inscripción tiene validez hasta julio 2025.</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <p>Para consultas o verificación de documentos, contactar a Registro y Control de Estudios.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
