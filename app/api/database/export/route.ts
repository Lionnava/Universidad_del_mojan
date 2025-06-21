import { type NextRequest, NextResponse } from "next/server"
import { DatabaseManager } from "@/lib/database-sqlite"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const format = (searchParams.get("format") as "sql" | "json" | "csv") || "sql"

    const exportPath = DatabaseManager.exportDatabase(format)

    return NextResponse.json({
      success: true,
      message: `Base de datos exportada en formato ${format.toUpperCase()}`,
      path: exportPath,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ error: "Error exportando base de datos", details: error }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { filePath } = await request.json()

    const result = DatabaseManager.importDatabase(filePath)

    return NextResponse.json({
      success: true,
      message: "Base de datos importada exitosamente",
      result,
    })
  } catch (error) {
    return NextResponse.json({ error: "Error importando base de datos", details: error }, { status: 500 })
  }
}
