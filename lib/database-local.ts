import Database from "better-sqlite3"
import path from "path"
import fs from "fs"

// Configuración de la base de datos local
const DB_DIR = path.join(process.cwd(), "database")
const DB_PATH = path.join(DB_DIR, "universidad.db")
const BACKUP_DIR = path.join(DB_DIR, "backups")

// Crear directorios si no existen
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true })
}

if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true })
}

// Crear conexión a la base de datos
const db = new Database(DB_PATH)

// Configurar SQLite para mejor rendimiento
db.pragma("journal_mode = WAL")
db.pragma("foreign_keys = ON")
db.pragma("synchronous = FULL")
db.pragma("cache_size = 1000000")
db.pragma("temp_store = memory")

// Función para inicializar la base de datos
export function initializeDatabase() {
  console.log("🔧 Inicializando base de datos local...")

  try {
    // Crear tabla de configuración del sistema
    db.exec(`
      CREATE TABLE IF NOT EXISTS configuracion_sistema (
        id INTEGER PRIMARY KEY,
        nombre_universidad TEXT NOT NULL DEFAULT 'Mi Universidad',
        version TEXT DEFAULT '27.0.0',
        modo TEXT DEFAULT 'PRODUCCION',
        logo_url TEXT,
        direccion TEXT,
        telefono TEXT,
        email TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Crear tabla de usuarios
    db.exec(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        rol TEXT NOT NULL CHECK (rol IN ('estudiante', 'profesor', 'analista', 'gerencial')),
        activo BOOLEAN DEFAULT TRUE,
        ultimo_acceso DATETIME,
        intentos_login INTEGER DEFAULT 0,
        bloqueado_hasta DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Crear tabla de carreras
    db.exec(`
      CREATE TABLE IF NOT EXISTS carreras (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        codigo TEXT UNIQUE NOT NULL,
        duracion_trayectos INTEGER NOT NULL DEFAULT 4,
        activa BOOLEAN DEFAULT TRUE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Crear tabla de estudiantes
    db.exec(`
      CREATE TABLE IF NOT EXISTS estudiantes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cedula TEXT UNIQUE NOT NULL,
        nombres TEXT NOT NULL,
        apellidos TEXT NOT NULL,
        email TEXT,
        telefono TEXT,
        fecha_nacimiento DATE,
        direccion TEXT,
        carrera_id INTEGER REFERENCES carreras(id),
        trayecto_actual INTEGER DEFAULT 1,
        trimestre_actual INTEGER DEFAULT 1,
        estado TEXT DEFAULT 'Activo' CHECK (estado IN ('Activo', 'Inactivo', 'Graduado', 'Retirado', 'Pre-inscrito')),
        fecha_ingreso DATE DEFAULT CURRENT_DATE,
        promedio_general REAL DEFAULT 0.0,
        creditos_aprobados INTEGER DEFAULT 0,
        usuario_id INTEGER REFERENCES usuarios(id),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Crear tabla de aspirantes
    db.exec(`
      CREATE TABLE IF NOT EXISTS aspirantes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cedula TEXT UNIQUE NOT NULL,
        nombres TEXT NOT NULL,
        apellidos TEXT NOT NULL,
        email TEXT,
        telefono TEXT,
        fecha_nacimiento DATE,
        carrera_id INTEGER REFERENCES carreras(id),
        estado TEXT DEFAULT 'Pendiente' CHECK (estado IN ('Pendiente', 'Aprobado', 'Rechazado', 'En Revisión')),
        fecha_solicitud DATETIME DEFAULT CURRENT_TIMESTAMP,
        documentos_completos BOOLEAN DEFAULT FALSE,
        observaciones TEXT,
        usuario_revisor INTEGER REFERENCES usuarios(id),
        fecha_revision DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Insertar configuración inicial si no existe
    const configExists = db.prepare("SELECT COUNT(*) as count FROM configuracion_sistema").get() as { count: number }

    if (configExists.count === 0) {
      db.prepare(`
        INSERT INTO configuracion_sistema (id, nombre_universidad, version, modo) 
        VALUES (1, 'Mi Universidad', '27.0.0', 'PRODUCCION')
      `).run()
    }

    console.log("✅ Base de datos inicializada correctamente en modo PRODUCCIÓN")
    return true
  } catch (error) {
    console.error("❌ Error inicializando base de datos:", error)
    return false
  }
}

// Funciones de consulta
export function getSystemConfig() {
  try {
    return db.prepare("SELECT * FROM configuracion_sistema WHERE id = 1").get()
  } catch (error) {
    console.error("Error obteniendo configuración:", error)
    return null
  }
}

export function getStudentsCount() {
  try {
    const result = db.prepare('SELECT COUNT(*) as count FROM estudiantes WHERE estado = "Activo"').get() as {
      count: number
    }
    return result.count
  } catch (error) {
    console.error("Error contando estudiantes:", error)
    return 0
  }
}

export function getProfessorsCount() {
  try {
    const result = db.prepare('SELECT COUNT(*) as count FROM profesores WHERE estado = "Activo"').get() as {
      count: number
    }
    return result.count
  } catch (error) {
    console.error("Error contando profesores:", error)
    return 0
  }
}

// Funciones de backup y restauración
export function createBackup() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
  const backupPath = path.join(BACKUP_DIR, `backup-${timestamp}.db`)

  try {
    fs.copyFileSync(DB_PATH, backupPath)
    console.log(`✅ Backup creado: ${backupPath}`)
    return backupPath
  } catch (error) {
    console.error("❌ Error creando backup:", error)
    throw error
  }
}

export function restoreBackup(backupPath: string) {
  try {
    if (!fs.existsSync(backupPath)) {
      throw new Error("El archivo de backup no existe")
    }

    // Cerrar conexión actual
    db.close()

    // Restaurar backup
    fs.copyFileSync(backupPath, DB_PATH)

    console.log(`✅ Backup restaurado desde: ${backupPath}`)

    // Reinicializar conexión
    const newDb = new Database(DB_PATH)
    newDb.pragma("journal_mode = WAL")
    newDb.pragma("foreign_keys = ON")

    return newDb
  } catch (error) {
    console.error("❌ Error restaurando backup:", error)
    throw error
  }
}

// Exportar la instancia de la base de datos
export default db

// Inicializar automáticamente
if (process.env.NODE_ENV !== "test") {
  initializeDatabase()
}
