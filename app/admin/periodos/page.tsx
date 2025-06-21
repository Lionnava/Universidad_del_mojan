// Archivo: app/admin/periodos/page.tsx

"use client";

import { useState, useEffect, FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle } from "lucide-react";

// Definimos el tipo de dato para un período académico, basado en tu tabla SQL
interface PeriodoAcademico {
  id: number;
  nombre: string;
  fecha_inicio: string;
  fecha_fin: string;
  activo: boolean;
  created_at: string;
}

export default function GestionPeriodosPage() {
  const [periodos, setPeriodos] = useState<PeriodoAcademico[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Función para obtener los períodos desde nuestra API
  const fetchPeriodos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/periodos-academicos');
      if (!response.ok) {
        throw new Error('Error al obtener los datos');
      }
      const data = await response.json();
      setPeriodos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Un error desconocido ocurrió');
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect para cargar los datos cuando el componente se monta
  useEffect(() => {
    fetchPeriodos();
  }, []);

  // Función para manejar el envío del formulario de creación
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nuevoPeriodo = {
      nombre: formData.get('nombre') as string,
      fecha_inicio: formData.get('fecha_inicio') as string,
      fecha_fin: formData.get('fecha_fin') as string,
      activo: (formData.get('activo') as string) === 'on',
    };
    
    try {
      const response = await fetch('/api/periodos-academicos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoPeriodo),
      });

      if (!response.ok) {
        throw new Error('No se pudo crear el período');
      }

      const createdPeriodo = await response.json();
      // Actualizamos el estado local para reflejar el cambio instantáneamente
      setPeriodos([createdPeriodo, ...periodos]);
      setIsDialogOpen(false); // Cerrar el diálogo
    } catch (error) {
      console.error("Error al crear:", error);
      // Aquí podrías mostrar una notificación de error al usuario
    }
  };

  if (error) {
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  }

  return (
    <div className="p-4 md:p-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Gestión de Períodos Académicos</CardTitle>
            <CardDescription>
              Crea y administra los trimestres de la universidad.
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1">
                <PlusCircle className="h-4 w-4" />
                Crear Período
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Crear Nuevo Período</DialogTitle>
                <DialogDescription>
                  Completa los datos para el nuevo período académico.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="nombre" className="text-right">Nombre</Label>
                    <Input id="nombre" name="nombre" className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="fecha_inicio" className="text-right">Fecha de Inicio</Label>
                    <Input id="fecha_inicio" name="fecha_inicio" type="date" className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="fecha_fin" className="text-right">Fecha de Fin</Label>
                    <Input id="fecha_fin" name="fecha_fin" type="date" className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="activo" className="text-right">Activo para Inscripción</Label>
                    <Checkbox id="activo" name="activo" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">Cancelar</Button>
                  </DialogClose>
                  <Button type="submit">Crear</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre del Período</TableHead>
                <TableHead>Fecha de Inicio</TableHead>
                <TableHead>Fecha de Fin</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">Cargando períodos...</TableCell>
                </TableRow>
              ) : periodos.length === 0 ? (
                 <TableRow>
                  <TableCell colSpan={4} className="text-center">No se encontraron períodos académicos.</TableCell>
                </TableRow>
              ) : (
                periodos.map((periodo) => (
                  <TableRow key={periodo.id}>
                    <TableCell className="font-medium">{periodo.nombre}</TableCell>
                    <TableCell>{new Date(periodo.fecha_inicio).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(periodo.fecha_fin).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${periodo.activo ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {periodo.activo ? 'Activo' : 'Inactivo'}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}