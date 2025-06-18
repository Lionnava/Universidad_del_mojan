// Cliente para manejar la conexión SQLite en el lado del cliente
export const sqliteClient = {
  // Funciones que llaman a las APIs del servidor
  async getCarreras() {
    const response = await fetch("/api/carreras")
    return response.json()
  },

  async getEstudiantes() {
    const response = await fetch("/api/estudiantes")
    return response.json()
  },

  async createEstudiante(data: any) {
    const response = await fetch("/api/estudiantes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    return response.json()
  },

  async getAspirantes() {
    const response = await fetch("/api/aspirantes")
    return response.json()
  },

  async createAspirante(data: any) {
    const response = await fetch("/api/aspirantes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    return response.json()
  },

  async aprobarAspirante(id: number) {
    const response = await fetch(`/api/aspirantes/${id}/aprobar`, {
      method: "POST",
    })
    return response.json()
  },

  async getProfesores() {
    const response = await fetch("/api/profesores")
    return response.json()
  },

  async getMaterias() {
    const response = await fetch("/api/materias")
    return response.json()
  },

  async getInscripciones() {
    const response = await fetch("/api/inscripciones")
    return response.json()
  },

  async createInscripcion(data: any) {
    const response = await fetch("/api/inscripciones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    return response.json()
  },

  async getSecciones() {
    const response = await fetch("/api/secciones")
    return response.json()
  },

  async getReporte(tipo: string, formato = "json") {
    const response = await fetch(`/api/reportes/${tipo}?formato=${formato}`)
    if (formato === "json") {
      return response.json()
    }
    return response.blob()
  },

  async authenticate(username: string, password: string) {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
    return response.json()
  },

  async getConstancias(estudianteId: number) {
    const response = await fetch(`/api/constancias?estudiante_id=${estudianteId}`)
    return response.json()
  },

  async createConstancia(data: any) {
    const response = await fetch("/api/constancias", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    return response.json()
  },
}
