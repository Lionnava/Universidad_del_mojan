"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Download, Database, HardDrive, FileText, Archive } from "lucide-react"

export function DatabaseManager() {
  const [loading, setLoading] = useState(false)
  const [dbInfo, setDbInfo] = useState<any>(null)
  const [exportFormat, setExportFormat] = useState<"sql" | "json" | "csv">("sql")

  const loadDatabaseInfo = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/database/info")
      const data = await response.json()
      setDbInfo(data.data)
    } catch (error) {
      console.error("Error cargando información:", error)
    } finally {
      setLoading(false)
    }
  }

  const exportDatabase = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/database/export?format=${exportFormat}`)
      const data = await response.json()

      if (data.success) {
        alert(`✅ Base de datos exportada exitosamente en formato ${exportFormat.toUpperCase()}`)
      }
    } catch (error) {
      console.error("Error exportando:", error)
      alert("❌ Error exportando base de datos")
    } finally {
      setLoading(false)
    }
  }

  const createBackup = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/database/backup", { method: "POST" })
      const data = await response.json()

      if (data.success) {
        alert("✅ Backup creado exitosamente")
      }
    } catch (error) {
      console.error("Error creando backup:", error)
      alert("❌ Error creando backup")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Gestor de Base de Datos SQLite
          </CardTitle>
          <CardDescription>Administra, exporta e importa la base de datos del sistema universitario</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={loadDatabaseInfo} disabled={loading}>
              <HardDrive className="h-4 w-4 mr-2" />
              Información de BD
            </Button>
            <Button onClick={createBackup} disabled={loading}>
              <Archive className="h-4 w-4 mr-2" />
              Crear Backup
            </Button>
          </div>

          {dbInfo && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Información General</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Base de Datos:</span>
                      <Badge variant="outline">{dbInfo.database}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Versión:</span>
                      <Badge variant="outline">{dbInfo.version}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Registros:</span>
                      <Badge variant="secondary">{dbInfo.totalRecords}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tablas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {Object.entries(dbInfo.tables).map(([table, count]) => (
                      <div key={table} className="flex justify-between text-sm">
                        <span className="capitalize">{table.replace(/_/g, " ")}</span>
                        <Badge variant="outline" className="text-xs">
                          {count as number}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Exportar Base de Datos
          </CardTitle>
          <CardDescription>Exporta la base de datos completa en diferentes formatos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium">Formato de Exportación</label>
              <Select value={exportFormat} onValueChange={(value: any) => setExportFormat(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sql">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      SQL - Estructura y Datos
                    </div>
                  </SelectItem>
                  <SelectItem value="json">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      JSON - Solo Datos
                    </div>
                  </SelectItem>
                  <SelectItem value="csv">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      CSV - Archivos Separados
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={exportDatabase} disabled={loading}>
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>
              <strong>SQL:</strong> Archivo completo con estructura y datos para recrear la BD
            </p>
            <p>
              <strong>JSON:</strong> Datos en formato JSON para integración con otros sistemas
            </p>
            <p>
              <strong>CSV:</strong> Archivos CSV separados por tabla para análisis en Excel
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
