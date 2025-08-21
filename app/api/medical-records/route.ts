import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { DatabaseService } from "@/lib/db-service"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = DatabaseService.getInstance()
    await db.initialize()

    const records = await db.getAllMedicalRecords()

    return NextResponse.json(records)
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

    const recordData = {
      patientId: data.patientId,
      doctorId: data.doctorId,
      visitDate: new Date(data.visitDate),
      chiefComplaint: data.chiefComplaint,
      symptoms: data.symptoms,
      diagnosis: data.diagnosis,
      treatment: data.treatment,
      prescriptions: data.prescriptions,
      vitalSigns: data.vitalSigns,
      notes: data.notes,
      followUpDate: data.followUpDate ? new Date(data.followUpDate) : undefined,
    }

    const newRecord = await db.createMedicalRecord(recordData)

    if (newRecord) {
      return NextResponse.json({ success: true, record: newRecord })
    } else {
      return NextResponse.json({ error: "Failed to create medical record" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error creating medical record:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
