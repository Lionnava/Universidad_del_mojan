// Basic authentication system without external dependencies
export interface User {
  id: number
  username: string
  email: string
  rol: string
  activo: boolean
}

// Mock users for testing (in production, this would come from database)
const mockUsers: User[] = [
  {
    id: 1,
    username: "admin",
    email: "admin@hospital.com",
    rol: "administrador",
    activo: true,
  },
  {
    id: 2,
    username: "doctor1",
    email: "doctor@hospital.com",
    rol: "doctor",
    activo: true,
  },
  {
    id: 3,
    username: "enfermera1",
    email: "enfermera@hospital.com",
    rol: "enfermera",
    activo: true,
  },
]

export async function signIn(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const user = mockUsers.find((u) => u.email === email && u.activo)

  if (!user) {
    return { user: null, error: "Usuario no encontrado o inactivo" }
  }

  // For demo purposes, accept any password for existing users
  // In production, you'd verify against hashed passwords
  if (password.length > 0) {
    return { user, error: null }
  } else {
    return { user: null, error: "Contraseña requerida" }
  }
}

export function setUserSession(user: User) {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(user))
  }
}

export function getUserSession(): User | null {
  if (typeof window !== "undefined") {
    const userStr = localStorage.getItem("user")
    return userStr ? JSON.parse(userStr) : null
  }
  return null
}

export function clearUserSession() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user")
  }
}
