import { type NextRequest, NextResponse } from "next/server"
import { DatabaseManager } from "@/lib/database-sqlite"

export async function POST() {
  try {
    const backupPath = DatabaseManager.createBackup()

    return NextResponse.json({
      success: true,
      message: "Backup creado exitosamente",
      path: backupPath,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ error: "Error creando backup", details: error }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { backupPath } = await request.json()

    const result = DatabaseManager.restoreBackup(backupPath)

    return NextResponse.json({
      success: true,
      message: "Backup restaurado exitosamente",
      result,
    })
  } catch (error) {
    return NextResponse.json({ error: "Error restaurando backup", details: error }, { status: 500 })
  }
}
