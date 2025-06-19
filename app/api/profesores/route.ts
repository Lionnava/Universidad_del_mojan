import { type NextRequest, NextResponse } from "next/server"
import { profesoresService } from "@/lib/database"

export async function GET() {
  try {
    const profesores = await profesoresService.getAll()
    return NextResponse.json(profesores)
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener profesores" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const profesor = await profesoresService.create(data)
    return NextResponse.json(profesor)
  } catch (error) {
    return NextResponse.json({ error: "Error al crear profesor" }, { status: 500 })
  }
}
