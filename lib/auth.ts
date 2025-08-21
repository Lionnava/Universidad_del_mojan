import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

const testUsers = [
  {
    id: "1",
    email: "admin@example.com",
    password: "admin123",
    name: "Administrador",
    role: "admin",
  },
  {
    id: "2",
    email: "doctor@example.com",
    password: "doctor123",
    name: "Dr. García",
    role: "doctor",
  },
  {
    id: "3",
    email: "nurse@example.com",
    password: "nurse123",
    name: "Enfermera López",
    role: "nurse",
  },
]

// Este archivo ya no es necesario, ya que toda la configuración está en app/api/auth/[...nextauth]/route.ts
// Lo mantenemos vacío para evitar errores de importación en otros archivos

export async function getAuthSession() {
  return await getServerSession(authOptions)
}

export { authOptions }
