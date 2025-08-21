"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, FileText, User, Stethoscope, Calendar, Pill, AlertTriangle } from "lucide-react"
import Link from "next/link"

interface MedicalRecord {
  id: number
  patient_id: number
  doctor_id: number
  patient_name: string
  doctor_name: string
  visit_date: string
  diagnosis: string
  treatment: string
  prescription: string
  notes: string
  symptoms: string
  allergies: string
  vital_signs: {
    blood_pressure: string
    heart_rate: string
    temperature: string
    weight: string
    height: string
  }
  created_at: string
}

export default function MedicalRecordDetailPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const [record, setRecord] = useState<MedicalRecord | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login")
      return
    }

    if (status === "authenticated" && params.id) {
      fetchMedicalRecord()
    }
  }, [status, router, params.id])

  const fetchMedicalRecord = async () => {
    try {
      const response = await fetch(`/api/medical-records/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setRecord(data)
      } else {
        router.push("/medical-records")
      }
    } catch (error) {
      console.error("Error fetching medical record:", error)
      router.push("/medical-records")
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (status === "loading" || loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  if (!record) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-8">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Historial médico no encontrado</p>
          <Link href="/medical-records">
            <Button className="mt-4">Volver a Historiales</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-4">
          <Link href="/medical-records">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Historial Médico</h1>
            <p className="text-gray-600 mt-1">Detalles completos del registro médico</p>
          </div>
        </div>
        <Link href={`/medical-records/${record.id}/edit`}>
          <Button>
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient and Doctor Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Información del Paciente</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-semibold text-lg">{record.patient_name}</p>
                <Badge variant="outline">ID: {record.patient_id}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Stethoscope className="h-5 w-5" />
                <span>Médico Tratante</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-semibold text-lg">Dr. {record.doctor_name}</p>
                <Badge variant="outline">ID: {record.doctor_id}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Fecha de Consulta</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold">{formatDate(record.visit_date)}</p>
              <p className="text-sm text-gray-600 mt-1">Registrado: {formatDate(record.created_at)}</p>
            </CardContent>
          </Card>

          {/* Vital Signs */}
          {record.vital_signs && (
            <Card>
              <CardHeader>
                <CardTitle>Signos Vitales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {record.vital_signs.blood_pressure && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Presión Arterial:</span>
                    <span className="font-medium">{record.vital_signs.blood_pressure}</span>
                  </div>
                )}
                {record.vital_signs.heart_rate && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Frecuencia Cardíaca:</span>
                    <span className="font-medium">{record.vital_signs.heart_rate}</span>
                  </div>
                )}
                {record.vital_signs.temperature && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Temperatura:</span>
                    <span className="font-medium">{record.vital_signs.temperature}</span>
                  </div>
                )}
                {record.vital_signs.weight && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Peso:</span>
                    <span className="font-medium">{record.vital_signs.weight}</span>
                  </div>
                )}
                {record.vital_signs.height && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Altura:</span>
                    <span className="font-medium">{record.vital_signs.height}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Medical Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Symptoms */}
          {record.symptoms && (
            <Card>
              <CardHeader>
                <CardTitle>Síntomas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-wrap">{record.symptoms}</p>
              </CardContent>
            </Card>
          )}

          {/* Diagnosis */}
          <Card>
            <CardHeader>
              <CardTitle>Diagnóstico</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 whitespace-pre-wrap">
                {record.diagnosis || "No se ha registrado diagnóstico"}
              </p>
            </CardContent>
          </Card>

          {/* Treatment */}
          <Card>
            <CardHeader>
              <CardTitle>Tratamiento</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 whitespace-pre-wrap">
                {record.treatment || "No se ha registrado tratamiento"}
              </p>
            </CardContent>
          </Card>

          {/* Prescription */}
          {record.prescription && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Pill className="h-5 w-5" />
                  <span>Prescripción</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-wrap">{record.prescription}</p>
              </CardContent>
            </Card>
          )}

          {/* Allergies */}
          {record.allergies && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <span>Alergias</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800 whitespace-pre-wrap">{record.allergies}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Additional Notes */}
          {record.notes && (
            <Card>
              <CardHeader>
                <CardTitle>Notas Adicionales</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-wrap">{record.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
