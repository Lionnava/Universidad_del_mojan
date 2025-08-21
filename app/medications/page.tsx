import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Search, Edit, Trash2 } from "lucide-react"

export default function MedicationsPage() {
  const medications = [
    {
      id: 1,
      name: "Paracetamol",
      presentation: "Tableta 500mg",
      category: "Analgésico",
      stock: 120,
      status: "Disponible",
    },
    {
      id: 2,
      name: "Ibuprofeno",
      presentation: "Tableta 400mg",
      category: "Antiinflamatorio",
      stock: 85,
      status: "Disponible",
    },
    {
      id: 3,
      name: "Amoxicilina",
      presentation: "Cápsula 500mg",
      category: "Antibiótico",
      stock: 42,
      status: "Disponible",
    },
    {
      id: 4,
      name: "Loratadina",
      presentation: "Tableta 10mg",
      category: "Antihistamínico",
      stock: 30,
      status: "Disponible",
    },
    {
      id: 5,
      name: "Omeprazol",
      presentation: "Cápsula 20mg",
      category: "Antiácido",
      stock: 0,
      status: "Agotado",
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
            <span>Medicamentos</span>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Inventario de Medicamentos</h1>
            <Button asChild>
              <Link href="/medications/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Nuevo Medicamento
              </Link>
            </Button>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Buscar Medicamentos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="relative md:col-span-2">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Buscar por nombre o presentación..." className="pl-8" />
                </div>
                <div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="analgesic">Analgésico</SelectItem>
                      <SelectItem value="antibiotic">Antibiótico</SelectItem>
                      <SelectItem value="antiinflammatory">Antiinflamatorio</SelectItem>
                      <SelectItem value="antihistamine">Antihistamínico</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="available">Disponible</SelectItem>
                      <SelectItem value="low">Stock bajo</SelectItem>
                      <SelectItem value="out">Agotado</SelectItem>
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
                    <TableHead>Presentación</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {medications.map((medication) => (
                    <TableRow key={medication.id}>
                      <TableCell>{medication.id}</TableCell>
                      <TableCell className="font-medium">{medication.name}</TableCell>
                      <TableCell>{medication.presentation}</TableCell>
                      <TableCell>{medication.category}</TableCell>
                      <TableCell>{medication.stock}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            medication.status === "Disponible"
                              ? medication.stock < 50
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {medication.status === "Disponible"
                            ? medication.stock < 50
                              ? "Stock bajo"
                              : "Disponible"
                            : "Agotado"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/medications/${medication.id}/edit`}>
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
