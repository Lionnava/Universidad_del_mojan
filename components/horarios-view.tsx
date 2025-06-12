"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, User } from "lucide-react"

export function HorariosView() {
  const [selectedCarrera, setSelectedCarrera] = useState("ingenieria")
  const [selectedTrayecto, setSelectedTrayecto] = useState("1")

  const horarios = {
    ingenieria: {
      1: [
        {
          materia: "Matemática I",
          profesor: "Dr. García",
          seccion: "A",
          dias: ["Lunes", "Miércoles", "Viernes"],
          hora: "08:00 - 10:00",
          aula: "Aula 101",
        },
        {
          materia: "Programación I",
          profesor: "Ing. Martínez",
          seccion: "A",
          dias: ["Martes", "Jueves"],
          hora: "10:00 - 12:00",
          aula: "Lab 201",
        },
        {
          materia: "Física I",
          profesor: "Dr. López",
          seccion: "A",
          dias: ["Lunes", "Miércoles"],
          hora: "14:00 - 16:00",
          aula: "Aula 103",
        },
      ],
    },
  }

  const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
  const horasDelDia = [
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ]

  const currentHorarios =
    horarios[selectedCarrera as keyof typeof horarios]?.[selectedTrayecto as keyof typeof horarios.ingenieria] || []

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Carrera</label>
          <Select value={selectedCarrera} onValueChange={setSelectedCarrera}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ingenieria">Ingeniería en Informática</SelectItem>
              <SelectItem value="medicina">Medicina</SelectItem>
              <SelectItem value="derecho">Derecho</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Trayecto</label>
          <Select value={selectedTrayecto} onValueChange={setSelectedTrayecto}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Trayecto 1</SelectItem>
              <SelectItem value="2">Trayecto 2</SelectItem>
              <SelectItem value="3">Trayecto 3</SelectItem>
              <SelectItem value="4">Trayecto 4</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Vista de Horarios en Tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentHorarios.map((horario, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">{horario.materia}</CardTitle>
              <CardDescription>Sección {horario.seccion}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-slate-500" />
                  <span>{horario.profesor}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-slate-500" />
                  <span>{horario.hora}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-slate-500" />
                  <span>{horario.aula}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {horario.dias.map((dia, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {dia}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Vista de Calendario Semanal */}
      <Card>
        <CardHeader>
          <CardTitle>Vista Semanal</CardTitle>
          <CardDescription>Horario organizado por días de la semana</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2 bg-slate-50 text-left">Hora</th>
                  {diasSemana.map((dia) => (
                    <th key={dia} className="border p-2 bg-slate-50 text-center min-w-32">
                      {dia}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {horasDelDia.map((hora) => (
                  <tr key={hora}>
                    <td className="border p-2 font-medium bg-slate-50">{hora}</td>
                    {diasSemana.map((dia) => {
                      const claseEnHora = currentHorarios.find(
                        (h) => h.dias.includes(dia) && h.hora.includes(hora.slice(0, 5)),
                      )
                      return (
                        <td key={dia} className="border p-1 h-16 align-top">
                          {claseEnHora && (
                            <div className="bg-blue-100 p-1 rounded text-xs">
                              <div className="font-semibold">{claseEnHora.materia}</div>
                              <div className="text-slate-600">{claseEnHora.aula}</div>
                            </div>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
