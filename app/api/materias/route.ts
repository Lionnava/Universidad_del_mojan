import { type NextRequest, NextResponse } from "next/server"
import { materiasService } from "@/lib/database"

export async function GET() {
  try {
    const materias = await materiasService.getAll()
    return NextResponse.json(materias)
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener materias" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const materia = await materiasService.create(data)
    return NextResponse.json(materia)
  } catch (error) {
    return NextResponse.json({ error: "Error al crear materia" }, { status: 500 })
  }
}
