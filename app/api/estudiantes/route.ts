import { type NextRequest, NextResponse } from "next/server"
import { estudiantesService } from "@/lib/database"

export async function GET() {
  try {
    const estudiantes = estudiantesService.getAll()
    return NextResponse.json(estudiantes)
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener estudiantes" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const estudiante = estudiantesService.create(data)
    return NextResponse.json(estudiante)
  } catch (error) {
    return NextResponse.json({ error: "Error al crear estudiante" }, { status: 500 })
  }
}
