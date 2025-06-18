import { type NextRequest, NextResponse } from "next/server"
import { aspirantesService } from "@/lib/database"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const result = aspirantesService.aprobarAspirante(id)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: "Error al aprobar aspirante" }, { status: 500 })
  }
}
