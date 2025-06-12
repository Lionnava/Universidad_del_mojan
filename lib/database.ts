import { supabase, isSupabaseConfigured } from "./supabase"
import type { Estudiante, Profesor, Materia, Usuario, Constancia } from "./supabase"

// Datos de demostración
const DEMO_DATA = {
  estudiantes: [
    {
      id: 1,
      cedula: "20123456",
      nombres: "María José",
      apellidos: "González Pérez",
      email: "mgonzalez@email.com",
      telefono: "0412-1234567",
      carrera_id: 1,
      trayecto_actual: 2,
      trimestre_actual: 1,
      estado: "Activo",
      fecha_ingreso: "2023-09-01",
      created_at: "2023-09-01T00:00:00Z",
      updated_at: "2023-09-01T00:00:00Z",
      carrera: { nombre: "Ingeniería en Informática", codigo: "INF" },
    },
    {
      id: 2,
      cedula: "20234567",
      nombres: "Carlos Eduardo",
      apellidos: "Rodríguez Silva",
      email: "crodriguez@email.com",
      telefono: "0414-2345678",
      carrera_id: 2,
      trayecto_actual: 1,
      trimestre_actual: 2,
      estado: "Activo",
      fecha_ingreso: "2024-01-15",
      created_at: "2024-01-15T00:00:00Z",
      updated_at: "2024-01-15T00:00:00Z",
      carrera: { nombre: "Medicina", codigo: "MED" },
    },
  ],
  profesores: [
    {
      id: 1,
      cedula: "12345678",
      nombres: "Dr. Juan Carlos",
      apellidos: "García López",
      email: "jgarcia@universidad.edu",
      telefono: "0412-1111111",
      especialidad: "Matemáticas",
      titulo_academico: "Doctor en Matemáticas",
      estado: "Activo",
      fecha_ingreso: "2020-01-01",
      created_at: "2020-01-01T00:00:00Z",
      updated_at: "2020-01-01T00:00:00Z",
    },
  ],
  carreras: [
    {
      id: 1,
      nombre: "Ingeniería en Informática",
      codigo: "INF",
      duracion_trayectos: 4,
      created_at: "2020-01-01T00:00:00Z",
      updated_at: "2020-01-01T00:00:00Z",
    },
    {
      id: 2,
      nombre: "Medicina",
      codigo: "MED",
      duracion_trayectos: 6,
      created_at: "2020-01-01T00:00:00Z",
      updated_at: "2020-01-01T00:00:00Z",
    },
    {
      id: 3,
      nombre: "Derecho",
      codigo: "DER",
      duracion_trayectos: 4,
      created_at: "2020-01-01T00:00:00Z",
      updated_at: "2020-01-01T00:00:00Z",
    },
    {
      id: 4,
      nombre: "Administración",
      codigo: "ADM",
      duracion_trayectos: 4,
      created_at: "2020-01-01T00:00:00Z",
      updated_at: "2020-01-01T00:00:00Z",
    },
  ],
  usuarios: [
    {
      id: 1,
      username: "admin",
      email: "admin@universidad.edu",
      password_hash: "demo_hash",
      rol: "gerencial" as const,
      activo: true,
      created_at: "2020-01-01T00:00:00Z",
      updated_at: "2020-01-01T00:00:00Z",
    },
    {
      id: 2,
      username: "est_20123456",
      email: "mgonzalez@email.com",
      password_hash: "demo_hash",
      rol: "estudiante" as const,
      activo: true,
      created_at: "2023-09-01T00:00:00Z",
      updated_at: "2023-09-01T00:00:00Z",
    },
  ],
}

// Funciones para Estudiantes
export const estudiantesService = {
  async getAll() {
    if (!isSupabaseConfigured) {
      // Simular delay de red
      await new Promise((resolve) => setTimeout(resolve, 500))
      return DEMO_DATA.estudiantes
    }

    const { data, error } = await supabase
      .from("estudiantes")
      .select(`
        *,
        carrera:carreras(nombre, codigo)
      `)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  },

  async getById(id: number) {
    if (!isSupabaseConfigured) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      const estudiante = DEMO_DATA.estudiantes.find((e) => e.id === id)
      if (!estudiante) throw new Error("Estudiante no encontrado")
      return estudiante
    }

    const { data, error } = await supabase
      .from("estudiantes")
      .select(`
        *,
        carrera:carreras(nombre, codigo)
      `)
      .eq("id", id)
      .single()

    if (error) throw error
    return data
  },

  async getByCedula(cedula: string) {
    if (!isSupabaseConfigured) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      const estudiante = DEMO_DATA.estudiantes.find((e) => e.cedula === cedula)
      if (!estudiante) throw new Error("Estudiante no encontrado")
      return estudiante
    }

    const { data, error } = await supabase
      .from("estudiantes")
      .select(`
        *,
        carrera:carreras(nombre, codigo)
      `)
      .eq("cedula", cedula)
      .single()

    if (error) throw error
    return data
  },

  async create(estudiante: Omit<Estudiante, "id" | "created_at" | "updated_at">) {
    if (!isSupabaseConfigured) {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const newEstudiante = {
        ...estudiante,
        id: DEMO_DATA.estudiantes.length + 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      DEMO_DATA.estudiantes.push(newEstudiante as any)
      return newEstudiante
    }

    const { data, error } = await supabase.from("estudiantes").insert(estudiante).select().single()

    if (error) throw error
    return data
  },

  async update(id: number, updates: Partial<Estudiante>) {
    if (!isSupabaseConfigured) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      const index = DEMO_DATA.estudiantes.findIndex((e) => e.id === id)
      if (index === -1) throw new Error("Estudiante no encontrado")

      DEMO_DATA.estudiantes[index] = {
        ...DEMO_DATA.estudiantes[index],
        ...updates,
        updated_at: new Date().toISOString(),
      } as any

      return DEMO_DATA.estudiantes[index]
    }

    const { data, error } = await supabase
      .from("estudiantes")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async delete(id: number) {
    if (!isSupabaseConfigured) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      const index = DEMO_DATA.estudiantes.findIndex((e) => e.id === id)
      if (index === -1) throw new Error("Estudiante no encontrado")
      DEMO_DATA.estudiantes.splice(index, 1)
      return
    }

    const { error } = await supabase.from("estudiantes").delete().eq("id", id)
    if (error) throw error
  },
}

// Funciones para Profesores
export const profesoresService = {
  async getAll() {
    if (!isSupabaseConfigured) {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return DEMO_DATA.profesores
    }

    const { data, error } = await supabase.from("profesores").select("*").order("created_at", { ascending: false })
    if (error) throw error
    return data
  },

  async getById(id: number) {
    if (!isSupabaseConfigured) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      const profesor = DEMO_DATA.profesores.find((p) => p.id === id)
      if (!profesor) throw new Error("Profesor no encontrado")
      return profesor
    }

    const { data, error } = await supabase.from("profesores").select("*").eq("id", id).single()
    if (error) throw error
    return data
  },

  async create(profesor: Omit<Profesor, "id" | "created_at" | "updated_at">) {
    if (!isSupabaseConfigured) {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const newProfesor = {
        ...profesor,
        id: DEMO_DATA.profesores.length + 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      DEMO_DATA.profesores.push(newProfesor as any)
      return newProfesor
    }

    const { data, error } = await supabase.from("profesores").insert(profesor).select().single()
    if (error) throw error
    return data
  },

  async update(id: number, updates: Partial<Profesor>) {
    if (!isSupabaseConfigured) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      const index = DEMO_DATA.profesores.findIndex((p) => p.id === id)
      if (index === -1) throw new Error("Profesor no encontrado")

      DEMO_DATA.profesores[index] = {
        ...DEMO_DATA.profesores[index],
        ...updates,
        updated_at: new Date().toISOString(),
      } as any

      return DEMO_DATA.profesores[index]
    }

    const { data, error } = await supabase
      .from("profesores")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return data
  },
}

// Funciones para Materias
export const materiasService = {
  async getAll() {
    if (!isSupabaseConfigured) {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return []
    }

    const { data, error } = await supabase
      .from("materias")
      .select(`
        *,
        carrera:carreras(nombre, codigo)
      `)
      .order("trayecto", { ascending: true })

    if (error) throw error
    return data
  },

  async getByCarrera(carreraId: number) {
    if (!isSupabaseConfigured) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return []
    }

    const { data, error } = await supabase
      .from("materias")
      .select("*")
      .eq("carrera_id", carreraId)
      .order("trayecto", { ascending: true })

    if (error) throw error
    return data
  },

  async create(materia: Omit<Materia, "id" | "created_at" | "updated_at">) {
    if (!isSupabaseConfigured) {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return { ...materia, id: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
    }

    const { data, error } = await supabase.from("materias").insert(materia).select().single()
    if (error) throw error
    return data
  },
}

// Funciones para Carreras
export const carrerasService = {
  async getAll() {
    if (!isSupabaseConfigured) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return DEMO_DATA.carreras
    }

    const { data, error } = await supabase.from("carreras").select("*").order("nombre", { ascending: true })
    if (error) throw error
    return data
  },

  async getById(id: number) {
    if (!isSupabaseConfigured) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      const carrera = DEMO_DATA.carreras.find((c) => c.id === id)
      if (!carrera) throw new Error("Carrera no encontrada")
      return carrera
    }

    const { data, error } = await supabase.from("carreras").select("*").eq("id", id).single()
    if (error) throw error
    return data
  },
}

// Funciones para Usuarios
export const usuariosService = {
  async authenticate(username: string, password: string) {
    if (!isSupabaseConfigured) {
      await new Promise((resolve) => setTimeout(resolve, 800))
      const user = DEMO_DATA.usuarios.find((u) => u.username === username)
      if (!user) throw new Error("Usuario no encontrado")
      return user
    }

    // En un entorno real, aquí verificarías el hash de la contraseña
    const { data, error } = await supabase
      .from("usuarios")
      .select("*")
      .eq("username", username)
      .eq("activo", true)
      .single()

    if (error) throw error

    // Actualizar último acceso
    await supabase.from("usuarios").update({ ultimo_acceso: new Date().toISOString() }).eq("id", data.id)

    return data
  },

  async getByEmail(email: string) {
    if (!isSupabaseConfigured) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      const user = DEMO_DATA.usuarios.find((u) => u.email === email)
      if (!user) throw new Error("Usuario no encontrado")
      return user
    }

    const { data, error } = await supabase.from("usuarios").select("*").eq("email", email).single()
    if (error) throw error
    return data
  },

  async create(usuario: Omit<Usuario, "id" | "created_at" | "updated_at">) {
    if (!isSupabaseConfigured) {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const newUser = {
        ...usuario,
        id: DEMO_DATA.usuarios.length + 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      DEMO_DATA.usuarios.push(newUser as any)
      return newUser
    }

    const { data, error } = await supabase.from("usuarios").insert(usuario).select().single()
    if (error) throw error
    return data
  },
}

// Funciones para Constancias
export const constanciasService = {
  async create(constancia: Omit<Constancia, "id" | "created_at" | "codigo_verificacion">) {
    if (!isSupabaseConfigured) {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return {
        ...constancia,
        id: 1,
        codigo_verificacion: `UNI-2024-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        created_at: new Date().toISOString(),
      }
    }

    const { data, error } = await supabase.from("constancias").insert(constancia).select().single()
    if (error) throw error
    return data
  },

  async getByEstudiante(estudianteId: number) {
    if (!isSupabaseConfigured) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return []
    }

    const { data, error } = await supabase
      .from("constancias")
      .select("*")
      .eq("estudiante_id", estudianteId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  },

  async markAsDownloaded(id: number) {
    if (!isSupabaseConfigured) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return { id, descargada: true }
    }

    const { data, error } = await supabase
      .from("constancias")
      .update({ descargada: true })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return data
  },
}

// Funciones para Estadísticas
export const estadisticasService = {
  async getResumenGeneral() {
    if (!isSupabaseConfigured) {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return {
        estudiantes: 2847,
        profesores: 124,
        materias: 89,
        aspirantes: 456,
      }
    }

    const [estudiantes, profesores, materias, aspirantes] = await Promise.all([
      supabase.from("estudiantes").select("id", { count: "exact" }),
      supabase.from("profesores").select("id", { count: "exact" }),
      supabase.from("materias").select("id", { count: "exact" }),
      supabase.from("aspirantes").select("id", { count: "exact" }),
    ])

    return {
      estudiantes: estudiantes.count || 0,
      profesores: profesores.count || 0,
      materias: materias.count || 0,
      aspirantes: aspirantes.count || 0,
    }
  },

  async getEstudiantesPorCarrera() {
    if (!isSupabaseConfigured) {
      await new Promise((resolve) => setTimeout(resolve, 400))
      return {
        "Ingeniería en Informática": 1245,
        Medicina: 892,
        Derecho: 456,
        Administración: 254,
      }
    }

    const { data, error } = await supabase.from("estudiantes").select(`
        carrera_id,
        carrera:carreras(nombre)
      `)

    if (error) throw error

    // Agrupar por carrera
    const agrupado = data.reduce((acc: any, item: any) => {
      const carrera = item.carrera?.nombre || "Sin carrera"
      acc[carrera] = (acc[carrera] || 0) + 1
      return acc
    }, {})

    return agrupado
  },

  async getEstudiantesPorTrayecto() {
    if (!isSupabaseConfigured) {
      await new Promise((resolve) => setTimeout(resolve, 400))
      return {
        "Trayecto 1": 1123,
        "Trayecto 2": 856,
        "Trayecto 3": 534,
        "Trayecto 4": 334,
      }
    }

    const { data, error } = await supabase.from("estudiantes").select("trayecto_actual")

    if (error) throw error

    // Agrupar por trayecto
    const agrupado = data.reduce((acc: any, item: any) => {
      const trayecto = `Trayecto ${item.trayecto_actual}`
      acc[trayecto] = (acc[trayecto] || 0) + 1
      return acc
    }, {})

    return agrupado
  },
}
