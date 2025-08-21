import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Search, Calendar, Edit, Trash2, FileText } from "lucide-react"

export default function AppointmentsPage() {
  // Mock data for appointments
  const appointments = [
    {
      id: 1,
      patient: "María González",
      doctor: "Dr. Carlos Ramírez",
      specialty: "Medicina General",
      date: "17/03/2025",
      time: "09:00",
      status: "Programada",
    },
    {
      id: 2,
      patient: "Juan Pérez",
      doctor: "Dra. Laura Sánchez",
      specialty: "Cardiología",
      date: "17/03/2025",
      time: "10:30",
      status: "Programada",
    },
    {
      id: 3,
      patient: "Ana Rodríguez",
      doctor: "Dr. Roberto Mendoza",
      specialty: "Pediatría",
      date: "17/03/2025",
      time: "11:45",
      status: "En espera",
    },
    {
      id: 4,
      patient: "Carlos Martínez",
      doctor: "Dr. Carlos Ramírez",
      specialty: "Medicina General",
      date: "17/03/2025",
      time: "14:15",
      status: "Completada",
    },
    {
      id: 5,
      patient: "Sofía López",
      doctor: "Dra. Laura Sánchez",
      specialty: "Cardiología",
      date: "18/03/2025",
      time: "09:30",
      status: "Programada",
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
            <span>Citas</span>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Gestión de Citas</h1>
            <Button asChild>
              <Link href="/appointments/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Nueva Cita
              </Link>
            </Button>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Buscar Citas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Buscar por paciente..." className="pl-8" />
                </div>
                <div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Médico" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="1">Dr. Carlos Ramírez</SelectItem>
                      <SelectItem value="2">Dra. Laura Sánchez</SelectItem>
                      <SelectItem value="3">Dr. Roberto Mendoza</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Input type="date" />
                </div>
                <div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="scheduled">Programada</SelectItem>
                      <SelectItem value="waiting">En espera</SelectItem>
                      <SelectItem value="completed">Completada</SelectItem>
                      <SelectItem value="cancelled">Cancelada</SelectItem>
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
                    <TableHead>Paciente</TableHead>
                    <TableHead>Médico</TableHead>
                    <TableHead>Especialidad</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Hora</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>{appointment.id}</TableCell>
                      <TableCell className="font-medium">{appointment.patient}</TableCell>
                      <TableCell>{appointment.doctor}</TableCell>
                      <TableCell>{appointment.specialty}</TableCell>
                      <TableCell>{appointment.date}</TableCell>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            appointment.status === "Programada"
                              ? "bg-blue-100 text-blue-800"
                              : appointment.status === "En espera"
                                ? "bg-yellow-100 text-yellow-800"
                                : appointment.status === "Completada"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {appointment.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/appointments/${appointment.id}`}>
                              <Calendar className="h-4 w-4" />
                              <span className="sr-only">Ver detalles</span>
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/prescriptions/new?appointmentId=${appointment.id}`}>
                              <FileText className="h-4 w-4" />
                              <span className="sr-only">Nueva prescripción</span>
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/appointments/${appointment.id}/edit`}>
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
