import { type NextRequest, NextResponse } from "next/server"
import { constanciasService } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const estudianteId = searchParams.get("estudiante_id")

    if (estudianteId) {
      const constancias = await constanciasService.getByEstudiante(Number.parseInt(estudianteId))
      return NextResponse.json(constancias)
    }

    return NextResponse.json({ error: "estudiante_id requerido" }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener constancias" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const constancia = await constanciasService.create(data)
    return NextResponse.json(constancia)
  } catch (error) {
    return NextResponse.json({ error: "Error al crear constancia" }, { status: 500 })
  }
}
