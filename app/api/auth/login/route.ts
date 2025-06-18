import { type NextRequest, NextResponse } from "next/server"
import { usuariosService } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()
    const user = usuariosService.authenticate(username, password)

    if (user) {
      return NextResponse.json({ success: true, user })
    } else {
      return NextResponse.json({ success: false, error: "Credenciales inválidas" }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ error: "Error en autenticación" }, { status: 500 })
  }
}
