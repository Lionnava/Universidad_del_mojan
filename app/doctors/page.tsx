import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Search, Calendar, Edit, Trash2, FileText } from "lucide-react"

export default function DoctorsPage() {
  // Mock data for doctors
  const doctors = [
    {
      id: 1,
      name: "Dr. Carlos Ramírez",
      specialty: "Medicina General",
      license: "MG-12345",
      phone: "+58 412-555-1234",
      status: "Activo",
    },
    {
      id: 2,
      name: "Dra. Laura Sánchez",
      specialty: "Cardiología",
      license: "CAR-23456",
      phone: "+58 414-555-2345",
      status: "Activo",
    },
    {
      id: 3,
      name: "Dr. Roberto Mendoza",
      specialty: "Pediatría",
      license: "PED-34567",
      phone: "+58 416-555-3456",
      status: "Activo",
    },
    {
      id: 4,
      name: "Dra. María Fernández",
      specialty: "Ginecología",
      license: "GIN-45678",
      phone: "+58 424-555-4567",
      status: "Activo",
    },
    {
      id: 5,
      name: "Dr. Javier Torres",
      specialty: "Traumatología",
      license: "TRA-56789",
      phone: "+58 426-555-5678",
      status: "Inactivo",
    },
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
            <span>Médicos</span>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Gestión de Médicos</h1>
            <Button asChild>
              <Link href="/doctors/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Nuevo Médico
              </Link>
            </Button>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Buscar Médicos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="relative md:col-span-2">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Buscar por nombre o número de licencia..." className="pl-8" />
                </div>
                <div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Especialidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="general">Medicina General</SelectItem>
                      <SelectItem value="cardiology">Cardiología</SelectItem>
                      <SelectItem value="pediatrics">Pediatría</SelectItem>
                      <SelectItem value="gynecology">Ginecología</SelectItem>
                      <SelectItem value="traumatology">Traumatología</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Especialidad</TableHead>
                    <TableHead>Licencia</TableHead>
                    <TableHead>Teléfono</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {doctors.map((doctor) => (
                    <TableRow key={doctor.id}>
                      <TableCell>{doctor.id}</TableCell>
                      <TableCell className="font-medium">{doctor.name}</TableCell>
                      <TableCell>{doctor.specialty}</TableCell>
                      <TableCell>{doctor.license}</TableCell>
                      <TableCell>{doctor.phone}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            doctor.status === "Activo" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {doctor.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/appointments?doctorId=${doctor.id}`}>
                              <Calendar className="h-4 w-4" />
                              <span className="sr-only">Ver citas</span>
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/doctors/${doctor.id}`}>
                              <FileText className="h-4 w-4" />
                              <span className="sr-only">Ver detalles</span>
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/doctors/${doctor.id}/edit`}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Editar</span>
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                            <span className="sr-only">Eliminar</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
