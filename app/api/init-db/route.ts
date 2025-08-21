import { NextResponse } from "next/server"

export async function POST() {
  try {
    // En un entorno real, aquí inicializarías la base de datos
    // Por ahora, solo simulamos la inicialización
    console.log("Base de datos inicializada")

    return NextResponse.json(
      { message: "Base de datos inicializada correctamente" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error inicializando base de datos:", error)
    return NextResponse.json(
      { message: "Error al inicializar la base de datos" },
      { status: 500 }
    )
  }
}
