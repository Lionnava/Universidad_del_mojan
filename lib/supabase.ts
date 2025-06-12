import { createClient } from "@supabase/supabase-js"

// Valores por defecto para desarrollo local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://demo.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "demo-key"

// Crear cliente con manejo de errores
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // Desactivar para demo
  },
})

// Flag para verificar si Supabase está configurado
export const isSupabaseConfigured =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://demo.supabase.co"

// Tipos para la base de datos (mantener los existentes)
export interface Estudiante {
  id: number
  cedula: string
  nombres: string
  apellidos: string
  email?: string
  telefono?: string
  fecha_nacimiento?: string
  direccion?: string
  carrera_id: number
  trayecto_actual: number
  trimestre_actual: number
  estado: string
  fecha_ingreso: string
  created_at: string
  updated_at: string
}

export interface Profesor {
  id: number
  cedula: string
  nombres: string
  apellidos: string
  email?: string
  telefono?: string
  especialidad?: string
  titulo_academico?: string
  estado: string
  fecha_ingreso: string
  created_at: string
  updated_at: string
}

export interface Materia {
  id: number
  nombre: string
  codigo: string
  creditos: number
  horas_teoricas: number
  horas_practicas: number
  trayecto: number
  trimestre: number
  carrera_id: number
  prerequisitos?: string
  descripcion?: string
  estado: string
  created_at: string
  updated_at: string
}

export interface Carrera {
  id: number
  nombre: string
  codigo: string
  duracion_trayectos: number
  created_at: string
  updated_at: string
}

export interface Usuario {
  id: number
  username: string
  email: string
  password_hash: string
  rol: "estudiante" | "profesor" | "analista" | "gerencial"
  activo: boolean
  ultimo_acceso?: string
  created_at: string
  updated_at: string
}

export interface Constancia {
  id: number
  estudiante_id: number
  tipo: "notas" | "estudios" | "preinscripcion" | "inscripcion"
  codigo_verificacion: string
  contenido?: string
  fecha_generacion: string
  valida_hasta?: string
  descargada: boolean
  ip_generacion?: string
  created_at: string
}
