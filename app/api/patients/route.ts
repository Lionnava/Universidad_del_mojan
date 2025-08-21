import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Mock patients data
    const mockPatients = [
      {
        id: 1,
        name: "Juan Pérez",
        email: "juan.perez@email.com",
        phone: "+34 600 123 456",
        date_of_birth: "1985-03-15",
        gender: "male",
        address: "Calle Mayor 123, Madrid",
        emergency_contact: "María Pérez",
        emergency_phone: "+34 600 654 321",
        medical_history: "Hipertensión familiar",
        allergies: "Penicilina",
        created_at: "2024-01-01T00:00:00Z",
      },
      {
        id: 2,
        name: "María González",
        email: "maria.gonzalez@email.com",
        phone: "+34 600 789 012",
        date_of_birth: "1978-07-22",
        gender: "female",
        address: "Avenida de la Paz 45, Barcelona",
        emergency_contact: "Carlos González",
        emergency_phone: "+34 600 210 987",
        medical_history: "Diabetes tipo 2",
        allergies: "Ninguna conocida",
        created_at: "2024-01-02T00:00:00Z",
      },
      {
        id: 3,
        name: "Carlos Rodríguez",
        email: "carlos.rodriguez@email.com",
        phone: "+34 600 345 678",
        date_of_birth: "1992-11-08",
        gender: "male",
        address: "Plaza España 12, Valencia",
        emergency_contact: "Ana Rodríguez",
        emergency_phone: "+34 600 876 543",
        medical_history: "Asma bronquial",
        allergies: "Polen, ácaros",
        created_at: "2024-01-03T00:00:00Z",
      },
    ]

    return NextResponse.json(mockPatients)
  } catch (error) {
    console.error("Error fetching patients:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
