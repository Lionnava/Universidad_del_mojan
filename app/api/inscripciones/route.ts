import { type NextRequest, NextResponse } from "next/server"
import { inscripcionesService } from "@/lib/database"

export async function GET() {
  try {
    const inscripciones = inscripcionesService.getAll()
    return NextResponse.json(inscripciones)
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener inscripciones" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const inscripcion = inscripcionesService.create(data)
    return NextResponse.json(inscripcion)
  } catch (error) {
    return NextResponse.json({ error: "Error al crear inscripción" }, { status: 500 })
  }
}
