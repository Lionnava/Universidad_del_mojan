import { type NextRequest, NextResponse } from "next/server"
import { aspirantesService } from "@/lib/database"

export async function GET() {
  try {
    const aspirantes = aspirantesService.getAll()
    return NextResponse.json(aspirantes)
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener aspirantes" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const aspirante = aspirantesService.create(data)
    return NextResponse.json(aspirante)
  } catch (error) {
    return NextResponse.json({ error: "Error al crear aspirante" }, { status: 500 })
  }
}
