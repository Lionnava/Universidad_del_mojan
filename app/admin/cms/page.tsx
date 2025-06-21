"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Settings,
  Palette,
  Layout,
  FileText,
  Globe,
  Save,
  Upload,
  Eye,
  Smartphone,
  Monitor,
  Tablet,
  RefreshCw,
} from "lucide-react"

export default function CMSAdmin() {
  const [config, setConfig] = useState({
    // Información institucional
    nombre_universidad: "Universidad Móvil",
    siglas: "UM",
    lema: "Educación para el futuro",
    direccion: "Av. Principal, Ciudad Universitaria",
    telefono: "+58-212-1234567",
    email: "info@universidadmovil.edu.ve",
    website: "https://universidadmovil.edu.ve",

    // Configuración visual
    logo_url: "/placeholder-logo.png",
    favicon_url: "/favicon.ico",
    color_primario: "#3b82f6",
    color_secundario: "#1e40af",
    color_acento: "#f59e0b",
    fuente_principal: "Inter",

    // Configuración de módulos
    modulos_activos: {
      estudiantes: true,
      profesores: true,
      academico: true,
      evaluaciones: true,
      reportes: true,
      constancias: true,
      aspirantes: true,
      horarios: true,
    },

    // Configuración pública
    acceso_publico: {
      constancias: true,
      informacion_academica: true,
      consulta_notas: true,
      registro_aspirantes: true,
    },

    // Textos personalizables
    textos: {
      bienvenida_titulo: "Bienvenido a Universidad Móvil",
      bienvenida_descripcion: "Sistema integral de gestión universitaria",
      footer_texto: "© 2024 Universidad Móvil. Todos los derechos reservados.",
      mensaje_mantenimiento: "Sistema en mantenimiento. Disculpe las molestias.",
    },

    // Configuración académica
    periodos_academicos: true,
    sistema_creditos: true,
    calificacion_maxima: 20,
    calificacion_aprobatoria: 10,

    // Configuración de seguridad
    sesion_timeout: 30,
    intentos_login_max: 3,
    backup_automatico: true,
    logs_detallados: true,
  })

  const [loading, setLoading] = useState(false)
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop")

  const handleSave = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/cms/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      })

      if (response.ok) {
        alert("✅ Configuración guardada exitosamente")
      } else {
        alert("❌ Error guardando configuración")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("❌ Error de conexión")
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = (field: string) => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        // Aquí iría la lógica de upload
        const url = URL.createObjectURL(file)
        setConfig({ ...config, [field]: url })
      }
    }
    input.click()
  }

  const resetToDefaults = () => {
    if (confirm("¿Está seguro de restaurar la configuración por defecto?")) {
      // Restaurar configuración por defecto
      window.location.reload()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Administrador de Contenido</h1>
            <p className="text-slate-600">Personaliza completamente tu institución</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={resetToDefaults}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Restaurar
            </Button>
            <Button onClick={handleSave} disabled={loading}>
              <Save className="h-4 w-4 mr-2" />
              {loading ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="institucion" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="institucion" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Institución
            </TabsTrigger>
            <TabsTrigger value="visual" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Diseño
            </TabsTrigger>
            <TabsTrigger value="modulos" className="flex items-center gap-2">
              <Layout className="h-4 w-4" />
              Módulos
            </TabsTrigger>
            <TabsTrigger value="publico" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Público
            </TabsTrigger>
            <TabsTrigger value="textos" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Textos
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Vista Previa
            </TabsTrigger>
          </TabsList>

          {/* Configuración Institucional */}
          <TabsContent value="institucion">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Información Básica</CardTitle>
                  <CardDescription>Datos principales de la institución</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nombre">Nombre de la Universidad</Label>
                      <Input
                        id="nombre"
                        value={config.nombre_universidad}
                        onChange={(e) => setConfig({ ...config, nombre_universidad: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="siglas">Siglas</Label>
                      <Input
                        id="siglas"
                        value={config.siglas}
                        onChange={(e) => setConfig({ ...config, siglas: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="lema">Lema Institucional</Label>
                    <Input
                      id="lema"
                      value={config.lema}
                      onChange={(e) => setConfig({ ...config, lema: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="direccion">Dirección</Label>
                    <Textarea
                      id="direccion"
                      value={config.direccion}
                      onChange={(e) => setConfig({ ...config, direccion: e.target.value })}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contacto</CardTitle>
                  <CardDescription>Información de contacto</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="telefono">Teléfono</Label>
                    <Input
                      id="telefono"
                      value={config.telefono}
                      onChange={(e) => setConfig({ ...config, telefono: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={config.email}
                      onChange={(e) => setConfig({ ...config, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Sitio Web</Label>
                    <Input
                      id="website"
                      value={config.website}
                      onChange={(e) => setConfig({ ...config, website: e.target.value })}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Configuración Académica</CardTitle>
                  <CardDescription>Parámetros del sistema académico</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cal_max">Calificación Máxima</Label>
                      <Input
                        id="cal_max"
                        type="number"
                        value={config.calificacion_maxima}
                        onChange={(e) => setConfig({ ...config, calificacion_maxima: Number.parseInt(e.target.value) })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cal_aprob">Calificación Aprobatoria</Label>
                      <Input
                        id="cal_aprob"
                        type="number"
                        value={config.calificacion_aprobatoria}
                        onChange={(e) =>
                          setConfig({ ...config, calificacion_aprobatoria: Number.parseInt(e.target.value) })
                        }
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="creditos"
                      checked={config.sistema_creditos}
                      onCheckedChange={(checked) => setConfig({ ...config, sistema_creditos: checked })}
                    />
                    <Label htmlFor="creditos">Sistema de Créditos</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="periodos"
                      checked={config.periodos_academicos}
                      onCheckedChange={(checked) => setConfig({ ...config, periodos_academicos: checked })}
                    />
                    <Label htmlFor="periodos">Períodos Académicos</Label>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Seguridad</CardTitle>
                  <CardDescription>Configuración de seguridad del sistema</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="timeout">Timeout de Sesión (minutos)</Label>
                    <Input
                      id="timeout"
                      type="number"
                      value={config.sesion_timeout}
                      onChange={(e) => setConfig({ ...config, sesion_timeout: Number.parseInt(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="intentos">Máximo Intentos de Login</Label>
                    <Input
                      id="intentos"
                      type="number"
                      value={config.intentos_login_max}
                      onChange={(e) => setConfig({ ...config, intentos_login_max: Number.parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="backup"
                      checked={config.backup_automatico}
                      onCheckedChange={(checked) => setConfig({ ...config, backup_automatico: checked })}
                    />
                    <Label htmlFor="backup">Backup Automático</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="logs"
                      checked={config.logs_detallados}
                      onCheckedChange={(checked) => setConfig({ ...config, logs_detallados: checked })}
                    />
                    <Label htmlFor="logs">Logs Detallados</Label>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Configuración Visual */}
          <TabsContent value="visual">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Identidad Visual</CardTitle>
                  <CardDescription>Logo, colores y tipografía</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Logo Principal</Label>
                    <div className="flex items-center gap-4 mt-2">
                      <img
                        src={config.logo_url || "/placeholder.svg"}
                        alt="Logo"
                        className="h-16 w-16 object-contain border rounded"
                      />
                      <Button variant="outline" onClick={() => handleImageUpload("logo_url")}>
                        <Upload className="h-4 w-4 mr-2" />
                        Cambiar Logo
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label>Favicon</Label>
                    <div className="flex items-center gap-4 mt-2">
                      <img
                        src={config.favicon_url || "/placeholder.svg"}
                        alt="Favicon"
                        className="h-8 w-8 object-contain border rounded"
                      />
                      <Button variant="outline" onClick={() => handleImageUpload("favicon_url")}>
                        <Upload className="h-4 w-4 mr-2" />
                        Cambiar Favicon
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="fuente">Fuente Principal</Label>
                    <Select
                      value={config.fuente_principal}
                      onValueChange={(value) => setConfig({ ...config, fuente_principal: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Inter">Inter</SelectItem>
                        <SelectItem value="Roboto">Roboto</SelectItem>
                        <SelectItem value="Open Sans">Open Sans</SelectItem>
                        <SelectItem value="Lato">Lato</SelectItem>
                        <SelectItem value="Montserrat">Montserrat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Paleta de Colores</CardTitle>
                  <CardDescription>Personaliza los colores del sistema</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="primario">Color Primario</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input
                        id="primario"
                        type="color"
                        value={config.color_primario}
                        onChange={(e) => setConfig({ ...config, color_primario: e.target.value })}
                        className="w-16 h-10"
                      />
                      <Input
                        value={config.color_primario}
                        onChange={(e) => setConfig({ ...config, color_primario: e.target.value })}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="secundario">Color Secundario</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input
                        id="secundario"
                        type="color"
                        value={config.color_secundario}
                        onChange={(e) => setConfig({ ...config, color_secundario: e.target.value })}
                        className="w-16 h-10"
                      />
                      <Input
                        value={config.color_secundario}
                        onChange={(e) => setConfig({ ...config, color_secundario: e.target.value })}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="acento">Color de Acento</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input
                        id="acento"
                        type="color"
                        value={config.color_acento}
                        onChange={(e) => setConfig({ ...config, color_acento: e.target.value })}
                        className="w-16 h-10"
                      />
                      <Input
                        value={config.color_acento}
                        onChange={(e) => setConfig({ ...config, color_acento: e.target.value })}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <Label>Vista Previa de Colores</Label>
                    <div className="flex gap-2 mt-2">
                      <div
                        className="w-16 h-16 rounded border-2 border-gray-300"
                        style={{ backgroundColor: config.color_primario }}
                        title="Color Primario"
                      />
                      <div
                        className="w-16 h-16 rounded border-2 border-gray-300"
                        style={{ backgroundColor: config.color_secundario }}
                        title="Color Secundario"
                      />
                      <div
                        className="w-16 h-16 rounded border-2 border-gray-300"
                        style={{ backgroundColor: config.color_acento }}
                        title="Color de Acento"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Configuración de Módulos */}
          <TabsContent value="modulos">
            <Card>
              <CardHeader>
                <CardTitle>Módulos del Sistema</CardTitle>
                <CardDescription>Activa o desactiva módulos según las necesidades de tu institución</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(config.modulos_activos).map(([modulo, activo]) => (
                    <div key={modulo} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium capitalize">{modulo.replace("_", " ")}</h3>
                        <p className="text-sm text-gray-500">
                          {modulo === "estudiantes" && "Gestión de estudiantes y matrículas"}
                          {modulo === "profesores" && "Gestión de profesores y asignaciones"}
                          {modulo === "academico" && "Carreras, materias y planificación"}
                          {modulo === "evaluaciones" && "Sistema de calificaciones"}
                          {modulo === "reportes" && "Reportes y estadísticas"}
                          {modulo === "constancias" && "Generación de documentos"}
                          {modulo === "aspirantes" && "Proceso de admisión"}
                          {modulo === "horarios" && "Gestión de horarios"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={activo}
                          onCheckedChange={(checked) =>
                            setConfig({
                              ...config,
                              modulos_activos: { ...config.modulos_activos, [modulo]: checked },
                            })
                          }
                        />
                        <Badge variant={activo ? "default" : "secondary"}>{activo ? "Activo" : "Inactivo"}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Configuración Pública */}
          <TabsContent value="publico">
            <Card>
              <CardHeader>
                <CardTitle>Acceso Público</CardTitle>
                <CardDescription>Configura qué servicios están disponibles sin autenticación</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(config.acceso_publico).map(([servicio, activo]) => (
                    <div key={servicio} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium capitalize">{servicio.replace("_", " ")}</h3>
                        <p className="text-sm text-gray-500">
                          {servicio === "constancias" && "Solicitud de constancias digitales"}
                          {servicio === "informacion_academica" && "Información de carreras y materias"}
                          {servicio === "consulta_notas" && "Consulta de calificaciones"}
                          {servicio === "registro_aspirantes" && "Registro de nuevos aspirantes"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={activo}
                          onCheckedChange={(checked) =>
                            setConfig({
                              ...config,
                              acceso_publico: { ...config.acceso_publico, [servicio]: checked },
                            })
                          }
                        />
                        <Badge variant={activo ? "default" : "secondary"}>{activo ? "Público" : "Privado"}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Configuración de Textos */}
          <TabsContent value="textos">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Textos de Bienvenida</CardTitle>
                  <CardDescription>Personaliza los mensajes principales</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="bienvenida_titulo">Título de Bienvenida</Label>
                    <Input
                      id="bienvenida_titulo"
                      value={config.textos.bienvenida_titulo}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          textos: { ...config.textos, bienvenida_titulo: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="bienvenida_desc">Descripción de Bienvenida</Label>
                    <Textarea
                      id="bienvenida_desc"
                      value={config.textos.bienvenida_descripcion}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          textos: { ...config.textos, bienvenida_descripcion: e.target.value },
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Otros Textos</CardTitle>
                  <CardDescription>Footer y mensajes del sistema</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="footer">Texto del Footer</Label>
                    <Input
                      id="footer"
                      value={config.textos.footer_texto}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          textos: { ...config.textos, footer_texto: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="mantenimiento">Mensaje de Mantenimiento</Label>
                    <Textarea
                      id="mantenimiento"
                      value={config.textos.mensaje_mantenimiento}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          textos: { ...config.textos, mensaje_mantenimiento: e.target.value },
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Vista Previa */}
          <TabsContent value="preview">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Vista Previa del Sistema
                  <div className="flex gap-2">
                    <Button
                      variant={previewMode === "desktop" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreviewMode("desktop")}
                    >
                      <Monitor className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={previewMode === "tablet" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreviewMode("tablet")}
                    >
                      <Tablet className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={previewMode === "mobile" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreviewMode("mobile")}
                    >
                      <Smartphone className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
                <CardDescription>Visualiza cómo se verá tu sistema con la configuración actual</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`mx-auto border rounded-lg overflow-hidden ${
                    previewMode === "desktop" ? "w-full" : previewMode === "tablet" ? "w-3/4" : "w-1/3"
                  }`}
                >
                  <div className="p-6 text-white text-center" style={{ backgroundColor: config.color_primario }}>
                    <img src={config.logo_url || "/placeholder.svg"} alt="Logo" className="h-12 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold" style={{ fontFamily: config.fuente_principal }}>
                      {config.textos.bienvenida_titulo}
                    </h1>
                    <p className="mt-2 opacity-90">{config.textos.bienvenida_descripcion}</p>
                  </div>
                  <div className="p-6 bg-white">
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(config.modulos_activos)
                        .filter(([_, activo]) => activo)
                        .slice(0, 4)
                        .map(([modulo]) => (
                          <div
                            key={modulo}
                            className="p-4 border rounded-lg text-center"
                            style={{ borderColor: config.color_secundario }}
                          >
                            <h3 className="font-medium capitalize">{modulo.replace("_", " ")}</h3>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div
                    className="p-4 text-center text-sm"
                    style={{ backgroundColor: config.color_secundario, color: "white" }}
                  >
                    {config.textos.footer_texto}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
