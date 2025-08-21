import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, role } = await request.json()

    // Validaciones básicas
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { message: "Todos los campos son requeridos" },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "La contraseña debe tener al menos 6 caracteres" },
        { status: 400 }
      )
    }

    // En un entorno real, aquí guardarías en la base de datos
    // Por ahora, solo simulamos el registro exitoso
    const hashedPassword = await bcrypt.hash(password, 12)

    // Simular guardado en base de datos
    console.log("Nuevo usuario registrado:", {
      name,
      email,
      role,
      hashedPassword,
    })

    return NextResponse.json(
      { message: "Usuario registrado exitosamente" },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error en registro:", error)
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    )
  }
}
