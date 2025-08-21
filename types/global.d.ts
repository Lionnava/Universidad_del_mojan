export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "doctor" | "nurse"
  createdAt: Date
  updatedAt: Date
}

export interface Patient {
  id: string
  firstName: string
  lastName: string
  email?: string
  phone?: string
  dateOfBirth: Date
  gender: "male" | "female" | "other"
  address?: string
  emergencyContact?: string
  emergencyPhone?: string
  createdAt: Date
  updatedAt: Date
}

export interface Doctor {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  specialty: string
  licenseNumber: string
  createdAt: Date
  updatedAt: Date
}

export interface Appointment {
  id: string
  patientId: string
  doctorId: string
  appointmentDate: Date
  duration: number
  status: "scheduled" | "completed" | "cancelled" | "no-show"
  notes?: string
  createdAt: Date
  updatedAt: Date
  patient?: Patient
  doctor?: Doctor
}

export interface MedicalRecord {
  id: string
  patientId: string
  doctorId: string
  visitDate: Date
  diagnosis?: string
  symptoms?: string
  treatment?: string
  medications?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
  patient?: Patient
  doctor?: Doctor
}
