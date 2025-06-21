import { getDatabase } from "./database-local"

export interface CMSConfig {
  // Información institucional
  nombre_universidad: string
  siglas: string
  lema: string
  direccion: string
  telefono: string
  email: string
  website: string

  // Visual
  logo_url: string
  favicon_url: string
  color_primario: string
  color_secundario: string
  color_acento: string
  fuente_principal: string

  // Módulos
  modulos_activos: {
    estudiantes: boolean
    profesores: boolean
    academico: boolean
    evaluaciones: boolean
    reportes: boolean
    constancias: boolean
    aspirantes: boolean
    horarios: boolean
  }

  // Acceso público
  acceso_publico: {
    constancias: boolean
    informacion_academica: boolean
    consulta_notas: boolean
    registro_aspirantes: boolean
  }

  // Textos
  textos: {
    bienvenida_titulo: string
    bienvenida_descripcion: string
    footer_texto: string
    mensaje_mantenimiento: string
  }

  // Académico
  calificacion_maxima: number
  calificacion_aprobatoria: number
  sistema_creditos: boolean
  periodos_academicos: boolean

  // Seguridad
  sesion_timeout: number
  intentos_login_max: number
  backup_automatico: boolean
  logs_detallados: boolean
}

let cachedConfig: CMSConfig | null = null

export function getCMSConfig(): CMSConfig {
  if (cachedConfig) {
    return cachedConfig
  }

  try {
    const db = getDatabase()

    // Obtener configuración principal
    const config = db
      .prepare(`
      SELECT * FROM configuracion_sistema WHERE id = 1
    `)
      .get() as any

    // Obtener configuración de módulos
    const modulos = db
      .prepare(`
      SELECT * FROM configuracion_modulos WHERE id = 1
    `)
      .get() as any

    if (!config) {
      // Configuración por defecto
      cachedConfig = getDefaultConfig()
    } else {
      cachedConfig = {
        nombre_universidad: config.nombre_universidad || "Universidad Móvil",
        siglas: config.siglas || "UM",
        lema: config.lema || "Educación para el futuro",
        direccion: config.direccion || "Av. Principal, Ciudad Universitaria",
        telefono: config.telefono || "+58-212-1234567",
        email: config.email || "info@universidadmovil.edu.ve",
        website: config.website || "https://universidadmovil.edu.ve",

        logo_url: config.logo_url || "/placeholder-logo.png",
        favicon_url: config.favicon_url || "/favicon.ico",
        color_primario: config.color_primario || "#3b82f6",
        color_secundario: config.color_secundario || "#1e40af",
        color_acento: config.color_acento || "#f59e0b",
        fuente_principal: config.fuente_principal || "Inter",

        modulos_activos: {
          estudiantes: modulos?.estudiantes !== 0,
          profesores: modulos?.profesores !== 0,
          academico: modulos?.academico !== 0,
          evaluaciones: modulos?.evaluaciones !== 0,
          reportes: modulos?.reportes !== 0,
          constancias: modulos?.constancias !== 0,
          aspirantes: modulos?.aspirantes !== 0,
          horarios: modulos?.horarios !== 0,
        },

        acceso_publico: {
          constancias: modulos?.acceso_publico_constancias !== 0,
          informacion_academica: modulos?.acceso_publico_informacion !== 0,
          consulta_notas: modulos?.acceso_publico_notas !== 0,
          registro_aspirantes: modulos?.acceso_publico_registro !== 0,
        },

        textos: {
          bienvenida_titulo: config.bienvenida_titulo || "Bienvenido a Universidad Móvil",
          bienvenida_descripcion: config.bienvenida_descripcion || "Sistema integral de gestión universitaria",
          footer_texto: config.footer_texto || "© 2024 Universidad Móvil. Todos los derechos reservados.",
          mensaje_mantenimiento: config.mensaje_mantenimiento || "Sistema en mantenimiento. Disculpe las molestias.",
        },

        calificacion_maxima: config.calificacion_maxima || 20,
        calificacion_aprobatoria: config.calificacion_aprobatoria || 10,
        sistema_creditos: config.sistema_creditos !== 0,
        periodos_academicos: config.periodos_academicos !== 0,

        sesion_timeout: config.sesion_timeout || 30,
        intentos_login_max: config.intentos_login_max || 3,
        backup_automatico: config.backup_automatico !== 0,
        logs_detallados: config.logs_detallados !== 0,
      }
    }

    return cachedConfig
  } catch (error) {
    console.error("Error obteniendo configuración CMS:", error)
    return getDefaultConfig()
  }
}

function getDefaultConfig(): CMSConfig {
  return {
    nombre_universidad: "Universidad Móvil",
    siglas: "UM",
    lema: "Educación para el futuro",
    direccion: "Av. Principal, Ciudad Universitaria",
    telefono: "+58-212-1234567",
    email: "info@universidadmovil.edu.ve",
    website: "https://universidadmovil.edu.ve",

    logo_url: "/placeholder-logo.png",
    favicon_url: "/favicon.ico",
    color_primario: "#3b82f6",
    color_secundario: "#1e40af",
    color_acento: "#f59e0b",
    fuente_principal: "Inter",

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

    acceso_publico: {
      constancias: true,
      informacion_academica: true,
      consulta_notas: true,
      registro_aspirantes: true,
    },

    textos: {
      bienvenida_titulo: "Bienvenido a Universidad Móvil",
      bienvenida_descripcion: "Sistema integral de gestión universitaria",
      footer_texto: "© 2024 Universidad Móvil. Todos los derechos reservados.",
      mensaje_mantenimiento: "Sistema en mantenimiento. Disculpe las molestias.",
    },

    calificacion_maxima: 20,
    calificacion_aprobatoria: 10,
    sistema_creditos: true,
    periodos_academicos: true,

    sesion_timeout: 30,
    intentos_login_max: 3,
    backup_automatico: true,
    logs_detallados: true,
  }
}

// Función para invalidar caché
export function invalidateCMSCache() {
  cachedConfig = null
}

// Función para verificar si un módulo está activo
export function isModuleActive(module: keyof CMSConfig["modulos_activos"]): boolean {
  const config = getCMSConfig()
  return config.modulos_activos[module]
}

// Función para verificar acceso público
export function isPublicAccessEnabled(service: keyof CMSConfig["acceso_publico"]): boolean {
  const config = getCMSConfig()
  return config.acceso_publico[service]
}
