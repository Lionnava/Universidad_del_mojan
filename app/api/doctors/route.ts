import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Mock doctors data
    const mockDoctors = [
      {
        id: 1,
        name: "García",
        email: "dr.garcia@hospital.com",
        phone: "+34 600 111 222",
        specialty: "Cardiología",
        license_number: "COL12345",
        created_at: "2024-01-01T00:00:00Z",
      },
      {
        id: 2,
        name: "López",
        email: "dr.lopez@hospital.com",
        phone: "+34 600 333 444",
        specialty: "Medicina Interna",
        license_number: "COL67890",
        created_at: "2024-01-01T00:00:00Z",
      },
      {
        id: 3,
        name: "Martínez",
        email: "dr.martinez@hospital.com",
        phone: "+34 600 555 666",
        specialty: "Pediatría",
        license_number: "COL11111",
        created_at: "2024-01-01T00:00:00Z",
      },
    ]

    return NextResponse.json(mockDoctors)
  } catch (error) {
    console.error("Error fetching doctors:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
