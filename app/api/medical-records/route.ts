import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { DatabaseService } from "@/lib/db-service"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = DatabaseService.getInstance()
    await db.initialize()

    // Mock data for medical records
    const mockRecords = [
      {
        id: 1,
        patient_id: 1,
        doctor_id: 2,
        patient_name: "Juan Pérez",
        doctor_name: "Dr. García",
        visit_date: "2024-01-15T10:00:00Z",
        diagnosis: "Hipertensión arterial",
        treatment: "Medicación antihipertensiva y cambios en el estilo de vida",
        prescription: "Losartán 50mg una vez al día",
        notes: "Paciente responde bien al tratamiento",
        symptoms: "Dolor de cabeza, mareos",
        allergies: "Penicilina",
        vital_signs: {
          blood_pressure: "140/90 mmHg",
          heart_rate: "78 bpm",
          temperature: "36.5°C",
          weight: "75 kg",
          height: "170 cm",
        },
        created_at: "2024-01-15T10:00:00Z",
      },
      {
        id: 2,
        patient_id: 2,
        doctor_id: 2,
        patient_name: "María González",
        doctor_name: "Dr. García",
        visit_date: "2024-01-16T14:30:00Z",
        diagnosis: "Diabetes tipo 2",
        treatment: "Control glucémico con metformina",
        prescription: "Metformina 850mg dos veces al día",
        notes: "Seguimiento en 3 meses",
        symptoms: "Sed excesiva, fatiga",
        allergies: "Ninguna conocida",
        vital_signs: {
          blood_pressure: "130/85 mmHg",
          heart_rate: "72 bpm",
          temperature: "36.8°C",
          weight: "68 kg",
          height: "165 cm",
        },
        created_at: "2024-01-16T14:30:00Z",
      },
    ]

    return NextResponse.json(mockRecords)
  } catch (error) {
    console.error("Error fetching medical records:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const db = DatabaseService.getInstance()
    await db.initialize()

    // Create medical record
    const recordData = {
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

    // In a real implementation, you would save to database
    console.log("Creating medical record:", recordData)

    return NextResponse.json({
      success: true,
      id: Math.floor(Math.random() * 1000) + 1,
    })
  } catch (error) {
    console.error("Error creating medical record:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
