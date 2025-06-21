import { NextResponse } from "next/server"
import { initializeDatabase } from "@/lib/database-local"

export async function POST() {
  try {
    console.log("🚀 Inicializando base de datos local...")

    const result = initializeDatabase()

    if (result) {
      return NextResponse.json({
        success: true,
        message: "Base de datos SQLite inicializada correctamente",
        database: "SQLite Local",
        location: "./database/universidad.db",
      })
    } else {
      return NextResponse.json(
        {
          error: "Error al inicializar la base de datos",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error inicializando base de datos:", error)
    return NextResponse.json(
      {
        error: "Error interno del servidor",
        details: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Endpoint para inicializar base de datos SQLite local",
    method: "POST",
    description: "Envía una petición POST para inicializar la base de datos",
  })
}
