import { type NextRequest, NextResponse } from "next/server"
import { carrerasService } from "@/lib/database"

export async function GET() {
  try {
    const carreras = carrerasService.getAll()
    return NextResponse.json(carreras)
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener carreras" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const carrera = carrerasService.create(data)
    return NextResponse.json(carrera)
  } catch (error) {
    return NextResponse.json({ error: "Error al crear carrera" }, { status: 500 })
  }
}
