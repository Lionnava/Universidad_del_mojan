"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, FileText, Calendar, User, Stethoscope } from "lucide-react"
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
  created_at: string
}

export default function MedicalRecordsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [records, setRecords] = useState<MedicalRecord[]>([])
  const [filteredRecords, setFilteredRecords] = useState<MedicalRecord[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login")
      return
    }

    if (status === "authenticated") {
      fetchMedicalRecords()
    }
  }, [status, router])

  useEffect(() => {
    const filtered = records.filter(
      (record) =>
        record.patient_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.doctor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.treatment.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredRecords(filtered)
  }, [searchTerm, records])

  const fetchMedicalRecords = async () => {
    try {
      const response = await fetch("/api/medical-records")
      if (response.ok) {
        const data = await response.json()
        setRecords(data)
        setFilteredRecords(data)
      }
    } catch (error) {
      console.error("Error fetching medical records:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
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

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Historiales Médicos</h1>
          <p className="text-gray-600 mt-1">Gestiona los registros médicos de los pacientes</p>
        </div>
        <Link href="/medical-records/new">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Historial
          </Button>
        </Link>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="md:col-span-2">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por paciente, médico, diagnóstico..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{records.length}</p>
                <p className="text-sm text-gray-600">Total Registros</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">
                  {
                    records.filter((r) => new Date(r.visit_date) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
                      .length
                  }
                </p>
                <p className="text-sm text-gray-600">Último Mes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Medical Records Table */}
      <Card>
        <CardHeader>
          <CardTitle>Registros Médicos</CardTitle>
          <CardDescription>Lista completa de historiales médicos registrados en el sistema</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredRecords.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No se encontraron registros médicos</p>
              <Link href="/medical-records/new">
                <Button className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Crear Primer Registro
                </Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Médico</TableHead>
                    <TableHead>Fecha de Visita</TableHead>
                    <TableHead>Diagnóstico</TableHead>
                    <TableHead>Tratamiento</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">{record.patient_name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Stethoscope className="h-4 w-4 text-blue-600" />
                          <span>{record.doctor_name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>{formatDate(record.visit_date)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="max-w-[200px] truncate">
                          {record.diagnosis || "Sin diagnóstico"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="max-w-[200px] truncate block">{record.treatment || "Sin tratamiento"}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={new Date(record.visit_date) > new Date() ? "default" : "secondary"}>
                          {new Date(record.visit_date) > new Date() ? "Programado" : "Completado"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Link href={`/medical-records/${record.id}`}>
                            <Button variant="outline" size="sm">
                              Ver
                            </Button>
                          </Link>
                          <Link href={`/medical-records/${record.id}/edit`}>
                            <Button variant="outline" size="sm">
                              Editar
                            </Button>
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
