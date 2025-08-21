"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function PatientsPage() {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  const fetchPatients = async (searchTerm = "") => {
    try {
      setLoading(true)
      const url = searchTerm ? `/api/patients?search=${encodeURIComponent(searchTerm)}` : "/api/patients"

      const response = await fetch(url)
      const data = await response.json()

      if (response.ok) {
        setPatients(data.patients)
      } else {
        console.error("Error fetching patients:", data.error)
      }
    } catch (error) {
      console.error("Error fetching patients:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPatients()
  }, [])

  const handleSearch = () => {
    fetchPatients(search)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="font-bold">
              Gestor de Salud DF TAMARE
            </Link>
            <span className="text-muted-foreground">/</span>
            <span>Pacientes</span>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Gestión de Pacientes</h1>
            <Button asChild>
              <Link href="/patients/new">Nuevo Paciente</Link>
            </Button>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Buscar Pacientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex-1">
                  <Input
                    type="search"
                    placeholder="Buscar por nombre, apellido o número de documento..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>
                <Button onClick={handleSearch} disabled={loading}>
                  {loading ? "Buscando..." : "Buscar"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              {loading ? (
                <div className="p-8 text-center">Cargando pacientes...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Nombre Completo</TableHead>
                      <TableHead>Documento</TableHead>
                      <TableHead>Edad</TableHead>
                      <TableHead>Género</TableHead>
                      <TableHead>Teléfono</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patients.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8">
                          No se encontraron pacientes
                        </TableCell>
                      </TableRow>
                    ) : (
                      patients.map((patient: any) => (
                        <TableRow key={patient.id}>
                          <TableCell>{patient.id}</TableCell>
                          <TableCell className="font-medium">
                            {patient.nombres} {patient.apellidos}
                          </TableCell>
                          <TableCell>{patient.numero_documento}</TableCell>
                          <TableCell>{patient.edad} años</TableCell>
                          <TableCell>
                            {patient.genero === "female" ? "F" : patient.genero === "male" ? "M" : "Otro"}
                          </TableCell>
                          <TableCell>{patient.telefono}</TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                patient.estado === "Activo"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {patient.estado}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={`/medical-records?patientId=${patient.id}`}>Ver Historial</Link>
                              </Button>
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={`/appointments/new?patientId=${patient.id}`}>Agendar Cita</Link>
                              </Button>
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={`/patients/${patient.id}/edit`}>Editar</Link>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
