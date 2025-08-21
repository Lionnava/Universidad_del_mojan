import { initializeDatabase } from "./db"
import type { Patient, Doctor, MedicalRecord } from "@/types/global"

class DatabaseService {
  private db: any = null

  async init() {
    if (!this.db) {
      this.db = await initializeDatabase()
    }
    return this.db
  }

  async getDb() {
    if (!this.db) {
      await this.init()
    }
    return this.db
  }

  // Utility methods
  async query(sql: string, params: any[] = []): Promise<any> {
    const db = await this.getDb()
    if (!db) return null

    try {
      const stmt = db.prepare(sql)
      const result = stmt.getAsObject(params)
      stmt.free()
      return result
    } catch (error) {
      console.error("Database query error:", error)
      throw error
    }
  }

  async getAll(sql: string, params: any[] = []): Promise<any[]> {
    const db = await this.getDb()
    if (!db) return []

    try {
      const stmt = db.prepare(sql)
      const results = []
      stmt.bind(params)
      while (stmt.step()) {
        results.push(stmt.getAsObject())
      }
      stmt.free()
      return results
    } catch (error) {
      console.error("Database getAll error:", error)
      return []
    }
  }

  async run(sql: string, params: any[] = []): Promise<boolean> {
    const db = await this.getDb()
    if (!db) return false

    try {
      const stmt = db.prepare(sql)
      stmt.run(params)
      stmt.free()
      return true
    } catch (error) {
      console.error("Database run error:", error)
      return false
    }
  }

  // Patient methods
  async createPatient(patient: Omit<Patient, "id" | "createdAt" | "updatedAt">): Promise<Patient | null> {
    try {
      const success = await this.run(
        `
        INSERT INTO patients (first_name, last_name, email, phone, date_of_birth, gender, address, emergency_contact_name, emergency_contact_phone, medical_history, allergies)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
        [
          patient.firstName,
          patient.lastName,
          patient.email || null,
          patient.phone || null,
          patient.dateOfBirth ? patient.dateOfBirth.toISOString().split("T")[0] : null,
          patient.gender || null,
          patient.address || null,
          patient.emergencyContactName || null,
          patient.emergencyContactPhone || null,
          patient.medicalHistory || null,
          patient.allergies || null,
        ],
      )

      if (success) {
        const result = await this.query("SELECT last_insert_rowid() as id")
        return this.getPatientById(result.id.toString())
      }
      return null
    } catch (error) {
      console.error("Error creating patient:", error)
      return null
    }
  }

  async getPatientById(id: string): Promise<Patient | null> {
    try {
      const result = await this.query("SELECT * FROM patients WHERE id = ?", [id])
      return result ? this.mapPatient(result) : null
    } catch (error) {
      console.error("Error getting patient:", error)
      return null
    }
  }

  async getAllPatients(): Promise<Patient[]> {
    try {
      const results = await this.getAll("SELECT * FROM patients ORDER BY created_at DESC")
      return results.map(this.mapPatient)
    } catch (error) {
      console.error("Error getting patients:", error)
      return []
    }
  }

  // Doctor methods
  async createDoctor(doctor: Omit<Doctor, "id" | "createdAt" | "updatedAt">): Promise<Doctor | null> {
    try {
      const success = await this.run(
        `
        INSERT INTO doctors (user_id, first_name, last_name, specialization, license_number, phone, email)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
        [
          doctor.userId || null,
          doctor.firstName,
          doctor.lastName,
          doctor.specialization || null,
          doctor.licenseNumber || null,
          doctor.phone || null,
          doctor.email || null,
        ],
      )

      if (success) {
        const result = await this.query("SELECT last_insert_rowid() as id")
        return this.getDoctorById(result.id.toString())
      }
      return null
    } catch (error) {
      console.error("Error creating doctor:", error)
      return null
    }
  }

  async getDoctorById(id: string): Promise<Doctor | null> {
    try {
      const result = await this.query("SELECT * FROM doctors WHERE id = ?", [id])
      return result ? this.mapDoctor(result) : null
    } catch (error) {
      console.error("Error getting doctor:", error)
      return null
    }
  }

  async getAllDoctors(): Promise<Doctor[]> {
    try {
      const results = await this.getAll("SELECT * FROM doctors ORDER BY created_at DESC")
      return results.map(this.mapDoctor)
    } catch (error) {
      console.error("Error getting doctors:", error)
      return []
    }
  }

  // Medical Record methods
  async createMedicalRecord(
    record: Omit<MedicalRecord, "id" | "createdAt" | "updatedAt">,
  ): Promise<MedicalRecord | null> {
    try {
      const success = await this.run(
        `
        INSERT INTO medical_records (patient_id, doctor_id, visit_date, chief_complaint, symptoms, diagnosis, treatment, prescriptions, vital_signs, notes, follow_up_date)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
        [
          record.patientId,
          record.doctorId,
          record.visitDate.toISOString().split("T")[0],
          record.chiefComplaint || null,
          record.symptoms || null,
          record.diagnosis || null,
          record.treatment || null,
          record.prescriptions || null,
          record.vitalSigns || null,
          record.notes || null,
          record.followUpDate ? record.followUpDate.toISOString().split("T")[0] : null,
        ],
      )

      if (success) {
        const result = await this.query("SELECT last_insert_rowid() as id")
        return this.getMedicalRecordById(result.id.toString())
      }
      return null
    } catch (error) {
      console.error("Error creating medical record:", error)
      return null
    }
  }

  async getMedicalRecordById(id: string): Promise<MedicalRecord | null> {
    try {
      const result = await this.query("SELECT * FROM medical_records WHERE id = ?", [id])
      return result ? this.mapMedicalRecord(result) : null
    } catch (error) {
      console.error("Error getting medical record:", error)
      return null
    }
  }

  async getAllMedicalRecords(): Promise<MedicalRecord[]> {
    try {
      const results = await this.getAll("SELECT * FROM medical_records ORDER BY visit_date DESC")
      return results.map(this.mapMedicalRecord)
    } catch (error) {
      console.error("Error getting medical records:", error)
      return []
    }
  }

  // Mapping methods
  private mapPatient(row: any): Patient {
    return {
      id: row.id.toString(),
      firstName: row.first_name,
      lastName: row.last_name,
      email: row.email,
      phone: row.phone,
      dateOfBirth: row.date_of_birth ? new Date(row.date_of_birth) : undefined,
      gender: row.gender,
      address: row.address,
      emergencyContactName: row.emergency_contact_name,
      emergencyContactPhone: row.emergency_contact_phone,
      medicalHistory: row.medical_history,
      allergies: row.allergies,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    }
  }

  private mapDoctor(row: any): Doctor {
    return {
      id: row.id.toString(),
      userId: row.user_id?.toString(),
      firstName: row.first_name,
      lastName: row.last_name,
      specialization: row.specialization,
      licenseNumber: row.license_number,
      phone: row.phone,
      email: row.email,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    }
  }

  private mapMedicalRecord(row: any): MedicalRecord {
    return {
      id: row.id.toString(),
      patientId: row.patient_id.toString(),
      doctorId: row.doctor_id.toString(),
      visitDate: new Date(row.visit_date),
      chiefComplaint: row.chief_complaint,
      symptoms: row.symptoms,
      diagnosis: row.diagnosis,
      treatment: row.treatment,
      prescriptions: row.prescriptions,
      vitalSigns: row.vital_signs,
      notes: row.notes,
      followUpDate: row.follow_up_date ? new Date(row.follow_up_date) : undefined,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    }
  }
}

export const dbService = new DatabaseService()
