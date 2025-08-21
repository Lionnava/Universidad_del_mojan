import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = Number.parseInt(params.id)

    // Mock data for specific medical record
    const mockRecord = {
      id: id,
      patient_id: 1,
      doctor_id: 2,
      patient_name: "Juan Pérez",
      doctor_name: "Dr. García",
      visit_date: "2024-01-15T10:00:00Z",
      diagnosis: "Hipertensión arterial leve. Se recomienda seguimiento regular y cambios en el estilo de vida.",
      treatment:
        "Medicación antihipertensiva (Losartán 50mg) una vez al día. Dieta baja en sodio, ejercicio regular 30 minutos diarios, reducción de peso.",
      prescription:
        "Losartán 50mg - Una tableta al día por la mañana con el desayuno. Duración: 3 meses con seguimiento.",
      notes:
        "Paciente colaborador, comprende las indicaciones. Refiere mejoría en síntomas desde inicio del tratamiento. Próxima cita en 4 semanas.",
      symptoms:
        "Dolor de cabeza matutino, mareos ocasionales, sensación de presión en el pecho durante actividad física.",
      allergies: "Penicilina (rash cutáneo), Aspirina (problemas gastrointestinales)",
      vital_signs: {
        blood_pressure: "140/90 mmHg",
        heart_rate: "78 bpm",
        temperature: "36.5°C",
        weight: "75 kg",
        height: "170 cm",
      },
      created_at: "2024-01-15T10:00:00Z",
    }

    return NextResponse.json(mockRecord)
  } catch (error) {
    console.error("Error fetching medical record:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const id = Number.parseInt(params.id)

    // Update medical record
    const updateData = {
      patient_id: Number.parseInt(data.patientId),
      doctor_id: Number.parseInt(data.doctorId),
      visit_date: data.visitDate,
      diagnosis: data.diagnosis,
      treatment: data.treatment,
      prescription: data.prescription,
      notes: data.notes,
      symptoms: data.symptoms,
      allergies: data.allergies,
      vital_signs: JSON.stringify(data.vitalSigns),
    }

    // In a real implementation, you would update in database
    console.log("Updating medical record:", id, updateData)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating medical record:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = Number.parseInt(params.id)

    // In a real implementation, you would delete from database
    console.log("Deleting medical record:", id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting medical record:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
