"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { BarChart, Calendar, Download, FileText, Printer, Users, PillIcon as Pills } from "lucide-react"

export default function ReportsPage() {
  const [reportType, setReportType] = useState("patients")
  const [dateRange, setDateRange] = useState("month")

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="font-bold">
              Gestor de Salud DF TAMARE
            </Link>
            <span className="text-muted-foreground">/</span>
            <span>Reportes</span>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6">
          <h1 className="text-3xl font-bold mb-6">Generación de Reportes</h1>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Configuración del Reporte</CardTitle>
              <CardDescription>Seleccione el tipo de reporte y el período de tiempo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tipo de Reporte</label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione tipo de reporte" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="patients">Pacientes</SelectItem>
                      <SelectItem value="appointments">Citas</SelectItem>
                      <SelectItem value="prescriptions">Prescripciones</SelectItem>
                      <SelectItem value="medications">Medicamentos</SelectItem>
                      <SelectItem value="doctors">Médicos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Período</label>
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day">Día actual</SelectItem>
                      <SelectItem value="week">Semana actual</SelectItem>
                      <SelectItem value="month">Mes actual</SelectItem>
                      <SelectItem value="quarter">Trimestre actual</SelectItem>
                      <SelectItem value="year">Año actual</SelectItem>
                      <SelectItem value="custom">Personalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {dateRange === "custom" && (
                  <div className="space-y-2 md:col-span-3 md:grid md:grid-cols-2 md:gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Fecha Inicio</label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Fecha Fin</label>
                      <Input type="date" />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="preview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="preview">Vista Previa</TabsTrigger>
              <TabsTrigger value="chart">Gráficos</TabsTrigger>
              <TabsTrigger value="export">Exportar</TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="py-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>
                      {reportType === "patients" && "Reporte de Pacientes"}
                      {reportType === "appointments" && "Reporte de Citas"}
                      {reportType === "prescriptions" && "Reporte de Prescripciones"}
                      {reportType === "medications" && "Reporte de Medicamentos"}
                      {reportType === "doctors" && "Reporte de Médicos"}
                    </CardTitle>
                    <CardDescription>
                      {dateRange === "day" && "Día actual"}
                      {dateRange === "week" && "Semana actual"}
                      {dateRange === "month" && "Mes actual"}
                      {dateRange === "quarter" && "Trimestre actual"}
                      {dateRange === "year" && "Año actual"}
                      {dateRange === "custom" && "Período personalizado"}
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Printer className="mr-2 h-4 w-4" />
                    Imprimir
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center p-12 text-center">
                    {reportType === "patients" && <Users className="h-16 w-16 text-muted-foreground mb-4" />}
                    {reportType === "appointments" && <Calendar className="h-16 w-16 text-muted-foreground mb-4" />}
                    {reportType === "prescriptions" && <FileText className="h-16 w-16 text-muted-foreground mb-4" />}
                    {reportType === "medications" && <Pills className="h-16 w-16 text-muted-foreground mb-4" />}
                    {reportType === "doctors" && <Users className="h-16 w-16 text-muted-foreground mb-4" />}
                    <h3 className="text-lg font-medium">Vista previa del reporte</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Seleccione los parámetros y genere el reporte para ver los resultados
                    </p>
                    <Button className="mt-4">Generar Reporte</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="chart" className="py-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Visualización de Datos</CardTitle>
                    <CardDescription>Gráficos estadísticos basados en los datos seleccionados</CardDescription>
                  </div>
                  <Select defaultValue="bar">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Tipo de gráfico" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bar">Gráfico de Barras</SelectItem>
                      <SelectItem value="line">Gráfico de Líneas</SelectItem>
                      <SelectItem value="pie">Gráfico Circular</SelectItem>
                    </SelectContent>
                  </Select>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center p-12 text-center">
                    <BarChart className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Visualización de datos</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Genere el reporte para visualizar los gráficos estadísticos
                    </p>
                    <Button className="mt-4">Generar Gráficos</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="export" className="py-4">
              <Card>
                <CardHeader>
                  <CardTitle>Exportar Reporte</CardTitle>
                  <CardDescription>Exporte el reporte en diferentes formatos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card className="flex flex-col items-center p-6 hover:bg-muted/50 transition-colors cursor-pointer">
                      <FileText className="h-12 w-12 text-primary mb-4" />
                      <h3 className="text-lg font-medium">PDF</h3>
                      <p className="text-sm text-muted-foreground text-center mt-2">Exportar como documento PDF</p>
                      <Button variant="outline" className="mt-4" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Exportar PDF
                      </Button>
                    </Card>
                    <Card className="flex flex-col items-center p-6 hover:bg-muted/50 transition-colors cursor-pointer">
                      <FileText className="h-12 w-12 text-primary mb-4" />
                      <h3 className="text-lg font-medium">Excel</h3>
                      <p className="text-sm text-muted-foreground text-center mt-2">Exportar como hoja de cálculo</p>
                      <Button variant="outline" className="mt-4" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Exportar Excel
                      </Button>
                    </Card>
                    <Card className="flex flex-col items-center p-6 hover:bg-muted/50 transition-colors cursor-pointer">
                      <FileText className="h-12 w-12 text-primary mb-4" />
                      <h3 className="text-lg font-medium">CSV</h3>
                      <p className="text-sm text-muted-foreground text-center mt-2">Exportar como archivo CSV</p>
                      <Button variant="outline" className="mt-4" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Exportar CSV
                      </Button>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
