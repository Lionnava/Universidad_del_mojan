import { NextResponse } from "next/server"
import { DatabaseManager } from "@/lib/database-sqlite"

export async function GET() {
  try {
    const info = DatabaseManager.getDatabaseInfo()

    return NextResponse.json({
      success: true,
      data: info,
    })
  } catch (error) {
    return NextResponse.json({ error: "Error obteniendo información de la base de datos" }, { status: 500 })
  }
}
