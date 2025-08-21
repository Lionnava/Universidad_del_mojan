import initSqlJs from "sql.js"

let SQL: any = null
let db: any = null

export async function initializeDatabase() {
  if (typeof window === "undefined") {
    return null // Server-side, return null
  }

  try {
    if (!SQL) {
      SQL = await initSqlJs({
        locateFile: (file: string) => `/sql-js-wasm.${file.split(".").pop()}`,
      })
    }

    if (!db) {
      db = new SQL.Database()

      // Create tables
      const createTablesSQL = `
        -- Create users table
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          role TEXT NOT NULL CHECK (role IN ('admin', 'doctor', 'nurse')),
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        -- Create patients table
        CREATE TABLE IF NOT EXISTS patients (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          first_name TEXT NOT NULL,
          last_name TEXT NOT NULL,
          email TEXT,
          phone TEXT,
          date_of_birth DATE,
          gender TEXT CHECK (gender IN ('male', 'female', 'other')),
          address TEXT,
          emergency_contact_name TEXT,
          emergency_contact_phone TEXT,
          medical_history TEXT,
          allergies TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        -- Create doctors table
        CREATE TABLE IF NOT EXISTS doctors (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER,
          first_name TEXT NOT NULL,
          last_name TEXT NOT NULL,
          specialization TEXT,
          license_number TEXT UNIQUE,
          phone TEXT,
          email TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users (id)
        );

        -- Create appointments table
        CREATE TABLE IF NOT EXISTS appointments (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          patient_id INTEGER NOT NULL,
          doctor_id INTEGER NOT NULL,
          appointment_date DATETIME NOT NULL,
          duration INTEGER DEFAULT 30,
          status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'no-show')),
          notes TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (patient_id) REFERENCES patients (id),
          FOREIGN KEY (doctor_id) REFERENCES doctors (id)
        );

        -- Create medical_records table
        CREATE TABLE IF NOT EXISTS medical_records (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          patient_id INTEGER NOT NULL,
          doctor_id INTEGER NOT NULL,
          visit_date DATE NOT NULL,
          chief_complaint TEXT,
          symptoms TEXT,
          diagnosis TEXT,
          treatment TEXT,
          prescriptions TEXT,
          vital_signs TEXT,
          notes TEXT,
          follow_up_date DATE,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (patient_id) REFERENCES patients (id),
          FOREIGN KEY (doctor_id) REFERENCES doctors (id)
        );

        -- Create medications table
        CREATE TABLE IF NOT EXISTS medications (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          description TEXT,
          dosage_form TEXT,
          strength TEXT,
          manufacturer TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        -- Create prescriptions table
        CREATE TABLE IF NOT EXISTS prescriptions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          patient_id INTEGER NOT NULL,
          doctor_id INTEGER NOT NULL,
          medication_id INTEGER NOT NULL,
          dosage TEXT NOT NULL,
          frequency TEXT NOT NULL,
          duration TEXT,
          instructions TEXT,
          prescribed_date DATE NOT NULL,
          status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (patient_id) REFERENCES patients (id),
          FOREIGN KEY (doctor_id) REFERENCES doctors (id),
          FOREIGN KEY (medication_id) REFERENCES medications (id)
        );

        -- Insert sample data
        INSERT OR IGNORE INTO users (id, name, email, password, role) VALUES
        (1, 'Administrador', 'admin@example.com', 'admin123', 'admin'),
        (2, 'Dr. García', 'doctor@example.com', 'doctor123', 'doctor'),
        (3, 'Enfermera López', 'nurse@example.com', 'nurse123', 'nurse');

        INSERT OR IGNORE INTO patients (id, first_name, last_name, email, phone, date_of_birth, gender) VALUES
        (1, 'Juan', 'Pérez', 'juan.perez@email.com', '555-0101', '1985-03-15', 'male'),
        (2, 'María', 'González', 'maria.gonzalez@email.com', '555-0102', '1990-07-22', 'female'),
        (3, 'Carlos', 'Rodríguez', 'carlos.rodriguez@email.com', '555-0103', '1978-11-08', 'male');

        INSERT OR IGNORE INTO doctors (id, user_id, first_name, last_name, specialization, license_number) VALUES
        (1, 2, 'Dr. García', 'Martínez', 'Medicina General', 'MED-001'),
        (2, NULL, 'Dra. Ana', 'López', 'Cardiología', 'MED-002');

        INSERT OR IGNORE INTO medications (id, name, description, dosage_form, strength) VALUES
        (1, 'Paracetamol', 'Analgésico y antipirético', 'Tableta', '500mg'),
        (2, 'Ibuprofeno', 'Antiinflamatorio no esteroideo', 'Tableta', '400mg'),
        (3, 'Amoxicilina', 'Antibiótico', 'Cápsula', '500mg');
      `

      db.exec(createTablesSQL)
      console.log("Database initialized successfully")
    }

    return db
  } catch (error) {
    console.error("Error initializing database:", error)
    return null
  }
}

export function getDatabase() {
  return db
}
