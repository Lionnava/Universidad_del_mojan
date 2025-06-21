import Database from "better-sqlite3"
import path from "path"
import fs from "fs"
import { join } from "path"
import { existsSync, mkdirSync } from "fs"

// Configuración SQLite optimizada para producción
const DB_DIR = path.join(process.cwd(), "database")
const DB_PATH = join(process.cwd(), "database", "universidad.db")
const BACKUP_DIR = join(process.cwd(), "database", "backups")
const EXPORT_DIR = join(process.cwd(), "database", "exports")
const EXPORTS_DIR = path.join(process.cwd(), "database", "exports")

// Crear directorios necesarios
const directories = [DB_DIR, BACKUP_DIR, EXPORTS_DIR]
directories.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
})

// Crear directorios si no existen
if (!existsSync(join(process.cwd(), "database"))) {
  mkdirSync(join(process.cwd(), "database"), { recursive: true })
}
if (!existsSync(BACKUP_DIR)) {
  mkdirSync(BACKUP_DIR, { recursive: true })
}
if (!existsSync(EXPORT_DIR)) {
  mkdirSync(EXPORT_DIR, { recursive: true })
}

// Conexión SQLite optimizada para producción
let db: Database.Database | null = null

export function getDatabase() {
  if (!db) {
    db = new Database(DB_PATH)

    // Configuración optimizada para producción
    db.pragma("journal_mode = WAL")
    db.pragma("synchronous = NORMAL")
    db.pragma("cache_size = 1000000")
    db.pragma("temp_store = memory")
    db.pragma("mmap_size = 268435456")

    initializeTables()
  }
  return db
}

// Configuración de rendimiento máximo
// db.pragma("journal_mode = WAL")
// db.pragma("foreign_keys = ON")
// db.pragma("synchronous = NORMAL")
// db.pragma("cache_size = 100000")
// db.pragma("temp_store = memory")
// db.pragma("mmap_size = 268435456") // 256MB

// Inicializar base de datos
export function initializeDatabase() {
  console.log("🚀 Inicializando SQLite para PRODUCCIÓN...")

  try {
    // Tabla de configuración del sistema
    db!.exec(`
      CREATE TABLE IF NOT EXISTS configuracion_sistema (
        id INTEGER PRIMARY KEY,
        nombre_universidad TEXT NOT NULL DEFAULT 'Universidad Móvil',
        version TEXT DEFAULT '29.0.0',
        modo TEXT DEFAULT 'PRODUCCION',
        logo_url TEXT,
        direccion TEXT,
        telefono TEXT,
        email TEXT,
        rif TEXT,
        codigo_opsu TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Tabla de usuarios con seguridad avanzada
    db!.exec(`
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
        token_session TEXT,
        ip_ultimo_acceso TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Tabla de carreras
    db!.exec(`
      CREATE TABLE IF NOT EXISTS carreras (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        codigo TEXT UNIQUE NOT NULL,
        duracion_trayectos INTEGER NOT NULL DEFAULT 4,
        modalidad TEXT DEFAULT 'Presencial',
        activa BOOLEAN DEFAULT TRUE,
        descripcion TEXT,
        perfil_egresado TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Tabla de períodos académicos
    db!.exec(`
      CREATE TABLE IF NOT EXISTS periodos_academicos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        codigo TEXT UNIQUE NOT NULL,
        fecha_inicio DATE NOT NULL,
        fecha_fin DATE NOT NULL,
        activo BOOLEAN DEFAULT FALSE,
        tipo TEXT DEFAULT 'Regular',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Tabla de estudiantes completa
    db!.exec(`
      CREATE TABLE IF NOT EXISTS estudiantes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cedula TEXT UNIQUE NOT NULL,
        nombres TEXT NOT NULL,
        apellidos TEXT NOT NULL,
        email TEXT,
        telefono TEXT,
        fecha_nacimiento DATE,
        lugar_nacimiento TEXT,
        nacionalidad TEXT DEFAULT 'Venezolana',
        estado_civil TEXT,
        sexo TEXT,
        direccion TEXT,
        carrera_id INTEGER REFERENCES carreras(id),
        trayecto_actual INTEGER DEFAULT 1,
        trimestre_actual INTEGER DEFAULT 1,
        estado TEXT DEFAULT 'Activo' CHECK (estado IN ('Activo', 'Inactivo', 'Graduado', 'Retirado', 'Pre-inscrito')),
        fecha_ingreso DATE DEFAULT CURRENT_DATE,
        promedio_general REAL DEFAULT 0.0,
        creditos_aprobados INTEGER DEFAULT 0,
        creditos_totales INTEGER DEFAULT 0,
        usuario_id INTEGER REFERENCES usuarios(id),
        foto_url TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Tabla de profesores
    db!.exec(`
      CREATE TABLE IF NOT EXISTS profesores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cedula TEXT UNIQUE NOT NULL,
        nombres TEXT NOT NULL,
        apellidos TEXT NOT NULL,
        email TEXT,
        telefono TEXT,
        fecha_nacimiento DATE,
        especialidad TEXT,
        titulo_academico TEXT,
        universidad_titulo TEXT,
        año_graduacion INTEGER,
        experiencia_años INTEGER DEFAULT 0,
        estado TEXT DEFAULT 'Activo' CHECK (estado IN ('Activo', 'Inactivo', 'Jubilado')),
        fecha_ingreso DATE DEFAULT CURRENT_DATE,
        salario REAL,
        tipo_contrato TEXT DEFAULT 'Tiempo Completo',
        usuario_id INTEGER REFERENCES usuarios(id),
        foto_url TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Tabla de materias
    db!.exec(`
      CREATE TABLE IF NOT EXISTS materias (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        codigo TEXT UNIQUE NOT NULL,
        creditos INTEGER NOT NULL,
        horas_teoricas INTEGER DEFAULT 0,
        horas_practicas INTEGER DEFAULT 0,
        horas_laboratorio INTEGER DEFAULT 0,
        trayecto INTEGER NOT NULL,
        trimestre INTEGER NOT NULL,
        carrera_id INTEGER REFERENCES carreras(id),
        prerequisitos TEXT, -- JSON con IDs de materias
        descripcion TEXT,
        objetivos TEXT,
        contenido_programatico TEXT,
        bibliografia TEXT,
        estado TEXT DEFAULT 'Activa' CHECK (estado IN ('Activa', 'Inactiva')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Tabla de secciones
    db!.exec(`
      CREATE TABLE IF NOT EXISTS secciones (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        materia_id INTEGER REFERENCES materias(id),
        profesor_id INTEGER REFERENCES profesores(id),
        periodo_id INTEGER REFERENCES periodos_academicos(id),
        seccion TEXT NOT NULL,
        cupos_maximos INTEGER NOT NULL,
        cupos_ocupados INTEGER DEFAULT 0,
        aula TEXT,
        modalidad TEXT DEFAULT 'Presencial',
        estado TEXT DEFAULT 'Activa' CHECK (estado IN ('Activa', 'Cerrada', 'Cancelada')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(materia_id, periodo_id, seccion)
      )
    `)

    // Tabla de horarios
    db!.exec(`
      CREATE TABLE IF NOT EXISTS horarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        seccion_id INTEGER REFERENCES secciones(id),
        dia_semana INTEGER NOT NULL, -- 1=Lunes, 7=Domingo
        hora_inicio TIME NOT NULL,
        hora_fin TIME NOT NULL,
        aula TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Tabla de inscripciones
    db!.exec(`
      CREATE TABLE IF NOT EXISTS inscripciones (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        estudiante_id INTEGER REFERENCES estudiantes(id),
        seccion_id INTEGER REFERENCES secciones(id),
        periodo_id INTEGER REFERENCES periodos_academicos(id),
        tipo TEXT NOT NULL CHECK (tipo IN ('Pre-inscripcion', 'Inscripcion')),
        estado TEXT DEFAULT 'Activa' CHECK (estado IN ('Activa', 'Retirada', 'Completada')),
        fecha_inscripcion DATETIME DEFAULT CURRENT_TIMESTAMP,
        nota_final REAL,
        creditos_obtenidos INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(estudiante_id, seccion_id, periodo_id)
      )
    `)

    // Tabla de evaluaciones
    db!.exec(`
      CREATE TABLE IF NOT EXISTS evaluaciones (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        seccion_id INTEGER REFERENCES secciones(id),
        nombre TEXT NOT NULL,
        tipo TEXT NOT NULL,
        fecha_evaluacion DATE,
        ponderacion REAL NOT NULL,
        descripcion TEXT,
        estado TEXT DEFAULT 'Programada' CHECK (estado IN ('Programada', 'En Curso', 'Finalizada')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Tabla de calificaciones
    db!.exec(`
      CREATE TABLE IF NOT EXISTS calificaciones (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        evaluacion_id INTEGER REFERENCES evaluaciones(id),
        estudiante_id INTEGER REFERENCES estudiantes(id),
        nota REAL,
        observaciones TEXT,
        fecha_calificacion DATETIME DEFAULT CURRENT_TIMESTAMP,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(evaluacion_id, estudiante_id)
      )
    `)

    // Tabla de constancias
    db!.exec(`
      CREATE TABLE IF NOT EXISTS constancias (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        estudiante_id INTEGER REFERENCES estudiantes(id),
        tipo TEXT NOT NULL CHECK (tipo IN ('notas', 'estudios', 'preinscripcion', 'inscripcion', 'conducta')),
        codigo_verificacion TEXT UNIQUE NOT NULL,
        contenido TEXT,
        fecha_generacion DATETIME DEFAULT CURRENT_TIMESTAMP,
        valida_hasta DATE,
        descargada BOOLEAN DEFAULT FALSE,
        ip_generacion TEXT,
        usuario_generador INTEGER REFERENCES usuarios(id),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Tabla de aspirantes
    db!.exec(`
      CREATE TABLE IF NOT EXISTS aspirantes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cedula TEXT UNIQUE NOT NULL,
        nombres TEXT NOT NULL,
        apellidos TEXT NOT NULL,
        email TEXT,
        telefono TEXT,
        fecha_nacimiento DATE,
        lugar_nacimiento TEXT,
        nacionalidad TEXT DEFAULT 'Venezolana',
        estado_civil TEXT,
        sexo TEXT,
        direccion TEXT,
        carrera_id INTEGER REFERENCES carreras(id),
        modalidad_estudio TEXT,
        turno_preferido TEXT,
        nivel_educativo_anterior TEXT,
        institucion_procedencia TEXT,
        año_graduacion INTEGER,
        promedio_anterior REAL,
        trabaja BOOLEAN,
        ocupacion TEXT,
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

    // Tabla de logs del sistema
    db!.exec(`
      CREATE TABLE IF NOT EXISTS logs_sistema (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER REFERENCES usuarios(id),
        accion TEXT NOT NULL,
        tabla_afectada TEXT,
        registro_id INTEGER,
        datos_anteriores TEXT,
        datos_nuevos TEXT,
        ip_address TEXT,
        user_agent TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Crear índices para optimización
    createIndexes()

    // Insertar datos iniciales
    seedInitialData()

    console.log("✅ Base de datos SQLite inicializada para PRODUCCIÓN")
    return true
  } catch (error) {
    console.error("❌ Error inicializando base de datos:", error)
    return false
  }
}

function initializeTables() {
  if (!db) return

  // Tabla de usuarios
  db.exec(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      rol TEXT NOT NULL CHECK (rol IN ('admin', 'analista', 'profesor', 'estudiante')),
      nombre TEXT NOT NULL,
      email TEXT,
      activo INTEGER DEFAULT 1,
      fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Tabla de carreras
  db.exec(`
    CREATE TABLE IF NOT EXISTS carreras (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      codigo TEXT UNIQUE NOT NULL,
      nombre TEXT NOT NULL,
      descripcion TEXT,
      duracion_semestres INTEGER DEFAULT 8,
      activa INTEGER DEFAULT 1,
      fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Tabla de estudiantes
  db.exec(`
    CREATE TABLE IF NOT EXISTS estudiantes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cedula TEXT UNIQUE NOT NULL,
      nombre TEXT NOT NULL,
      apellido TEXT NOT NULL,
      email TEXT,
      telefono TEXT,
      direccion TEXT,
      fecha_nacimiento DATE,
      carrera_id INTEGER,
      semestre_actual INTEGER DEFAULT 1,
      estado TEXT DEFAULT 'activo' CHECK (estado IN ('activo', 'inactivo', 'graduado', 'retirado')),
      fecha_ingreso DATE DEFAULT CURRENT_DATE,
      FOREIGN KEY (carrera_id) REFERENCES carreras(id)
    )
  `)

  // Tabla de profesores
  db.exec(`
    CREATE TABLE IF NOT EXISTS profesores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cedula TEXT UNIQUE NOT NULL,
      nombre TEXT NOT NULL,
      apellido TEXT NOT NULL,
      email TEXT,
      telefono TEXT,
      especialidad TEXT,
      titulo TEXT,
      activo INTEGER DEFAULT 1,
      fecha_contratacion DATE DEFAULT CURRENT_DATE
    )
  `)

  // Tabla de materias
  db.exec(`
    CREATE TABLE IF NOT EXISTS materias (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      codigo TEXT UNIQUE NOT NULL,
      nombre TEXT NOT NULL,
      creditos INTEGER DEFAULT 3,
      semestre INTEGER,
      carrera_id INTEGER,
      descripcion TEXT,
      activa INTEGER DEFAULT 1,
      FOREIGN KEY (carrera_id) REFERENCES carreras(id)
    )
  `)

  // Tabla de secciones
  db.exec(`
    CREATE TABLE IF NOT EXISTS secciones (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      materia_id INTEGER NOT NULL,
      profesor_id INTEGER NOT NULL,
      codigo_seccion TEXT NOT NULL,
      periodo TEXT NOT NULL,
      horario TEXT,
      aula TEXT,
      cupos_max INTEGER DEFAULT 30,
      cupos_ocupados INTEGER DEFAULT 0,
      activa INTEGER DEFAULT 1,
      FOREIGN KEY (materia_id) REFERENCES materias(id),
      FOREIGN KEY (profesor_id) REFERENCES profesores(id)
    )
  `)

  // Tabla de inscripciones
  db.exec(`
    CREATE TABLE IF NOT EXISTS inscripciones (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      estudiante_id INTEGER NOT NULL,
      seccion_id INTEGER NOT NULL,
      periodo TEXT NOT NULL,
      fecha_inscripcion DATETIME DEFAULT CURRENT_TIMESTAMP,
      estado TEXT DEFAULT 'inscrito' CHECK (estado IN ('inscrito', 'retirado', 'aprobado', 'reprobado')),
      calificacion REAL,
      FOREIGN KEY (estudiante_id) REFERENCES estudiantes(id),
      FOREIGN KEY (seccion_id) REFERENCES secciones(id),
      UNIQUE(estudiante_id, seccion_id, periodo)
    )
  `)

  // Tabla de constancias
  db.exec(`
    CREATE TABLE IF NOT EXISTS constancias (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      estudiante_id INTEGER NOT NULL,
      tipo TEXT NOT NULL,
      codigo_verificacion TEXT UNIQUE NOT NULL,
      contenido TEXT NOT NULL,
      fecha_emision DATETIME DEFAULT CURRENT_TIMESTAMP,
      emitido_por TEXT,
      FOREIGN KEY (estudiante_id) REFERENCES estudiantes(id)
    )
  `)

  // Insertar datos iniciales
  insertInitialData()
}

function createIndexes() {
  const indexes = [
    "CREATE INDEX IF NOT EXISTS idx_estudiantes_cedula ON estudiantes(cedula)",
    "CREATE INDEX IF NOT EXISTS idx_estudiantes_carrera ON estudiantes(carrera_id)",
    "CREATE INDEX IF NOT EXISTS idx_estudiantes_estado ON estudiantes(estado)",
    "CREATE INDEX IF NOT EXISTS idx_profesores_cedula ON profesores(cedula)",
    "CREATE INDEX IF NOT EXISTS idx_materias_codigo ON materias(codigo)",
    "CREATE INDEX IF NOT EXISTS idx_materias_carrera ON materias(carrera_id)",
    "CREATE INDEX IF NOT EXISTS idx_inscripciones_estudiante ON inscripciones(estudiante_id)",
    "CREATE INDEX IF NOT EXISTS idx_inscripciones_seccion ON inscripciones(seccion_id)",
    "CREATE INDEX IF NOT EXISTS idx_calificaciones_estudiante ON calificaciones(estudiante_id)",
    "CREATE INDEX IF NOT EXISTS idx_usuarios_username ON usuarios(username)",
    "CREATE INDEX IF NOT EXISTS idx_logs_usuario ON logs_sistema(usuario_id)",
    "CREATE INDEX IF NOT EXISTS idx_logs_fecha ON logs_sistema(created_at)",
  ]

  indexes.forEach((indexSQL) => {
    try {
      db!.exec(indexSQL)
    } catch (error) {
      console.warn("Advertencia creando índice:", error)
    }
  })
}

function seedInitialData() {
  // Verificar si ya hay datos
  const configCount = db!.prepare("SELECT COUNT(*) as count FROM configuracion_sistema").get() as { count: number }
  if (configCount.count > 0) return

  // Configuración inicial
  db!
    .prepare(`
    INSERT INTO configuracion_sistema (id, nombre_universidad, version, modo, direccion, telefono, email) 
    VALUES (1, 'Universidad Móvil', '29.0.0', 'PRODUCCION', 'Av. Principal, Ciudad', '+58-212-1234567', 'info@universidad.edu.ve')
  `)
    .run()

  // Usuarios por defecto
  const usuarios = [
    { username: "admin", email: "admin@universidad.edu.ve", password_hash: "admin123_hash", rol: "gerencial" },
    { username: "analista", email: "analista@universidad.edu.ve", password_hash: "analista123_hash", rol: "analista" },
    { username: "profesor", email: "profesor@universidad.edu.ve", password_hash: "profesor123_hash", rol: "profesor" },
    {
      username: "estudiante",
      email: "estudiante@universidad.edu.ve",
      password_hash: "estudiante123_hash",
      rol: "estudiante",
    },
  ]

  const insertUser = db!.prepare(`
    INSERT INTO usuarios (username, email, password_hash, rol) 
    VALUES (?, ?, ?, ?)
  `)

  usuarios.forEach((user) => {
    insertUser.run(user.username, user.email, user.password_hash, user.rol)
  })

  // Carreras
  const carreras = [
    { nombre: "Ingeniería en Informática", codigo: "INF", duracion_trayectos: 4, modalidad: "Presencial" },
    { nombre: "Administración", codigo: "ADM", duracion_trayectos: 4, modalidad: "Presencial" },
    { nombre: "Contaduría Pública", codigo: "CON", duracion_trayectos: 4, modalidad: "Presencial" },
    { nombre: "Derecho", codigo: "DER", duracion_trayectos: 5, modalidad: "Presencial" },
    { nombre: "Medicina", codigo: "MED", duracion_trayectos: 6, modalidad: "Presencial" },
  ]

  const insertCarrera = db!.prepare(`
    INSERT INTO carreras (nombre, codigo, duracion_trayectos, modalidad) 
    VALUES (?, ?, ?, ?)
  `)

  carreras.forEach((carrera) => {
    insertCarrera.run(carrera.nombre, carrera.codigo, carrera.duracion_trayectos, carrera.modalidad)
  })

  // Período académico actual
  db!
    .prepare(`
    INSERT INTO periodos_academicos (nombre, codigo, fecha_inicio, fecha_fin, activo) 
    VALUES ('2024-2025', '2024-2025', '2024-09-01', '2025-07-31', 1)
  `)
    .run()

  console.log("✅ Datos iniciales insertados")
}

function insertInitialData() {
  if (!db) return

  // Insertar usuarios por defecto
  const insertUser = db.prepare(`
    INSERT OR IGNORE INTO usuarios (username, password, rol, nombre, email) 
    VALUES (?, ?, ?, ?, ?)
  `)

  insertUser.run("admin", "admin123", "admin", "Administrador", "admin@universidad.edu")
  insertUser.run("analista", "analista123", "analista", "Analista Académico", "analista@universidad.edu")
  insertUser.run("profesor", "profesor123", "profesor", "Profesor Demo", "profesor@universidad.edu")
  insertUser.run("estudiante", "estudiante123", "estudiante", "Estudiante Demo", "estudiante@universidad.edu")

  // Insertar carreras
  const insertCarrera = db.prepare(`
    INSERT OR IGNORE INTO carreras (codigo, nombre, descripcion, duracion_semestres) 
    VALUES (?, ?, ?, ?)
  `)

  insertCarrera.run("ING-SIS", "Ingeniería de Sistemas", "Carrera de Ingeniería en Sistemas de Información", 10)
  insertCarrera.run("ING-IND", "Ingeniería Industrial", "Carrera de Ingeniería Industrial", 10)
  insertCarrera.run("ADM-EMP", "Administración de Empresas", "Carrera de Administración de Empresas", 8)
  insertCarrera.run("CONT-PUB", "Contaduría Pública", "Carrera de Contaduría Pública", 8)

  // Insertar profesores
  const insertProfesor = db.prepare(`
    INSERT OR IGNORE INTO profesores (cedula, nombre, apellido, email, especialidad, titulo) 
    VALUES (?, ?, ?, ?, ?, ?)
  `)

  insertProfesor.run(
    "12345678",
    "Juan Carlos",
    "Pérez",
    "jperez@universidad.edu",
    "Programación",
    "Ingeniero de Sistemas",
  )
  insertProfesor.run(
    "87654321",
    "María Elena",
    "González",
    "mgonzalez@universidad.edu",
    "Matemáticas",
    "Licenciada en Matemáticas",
  )
  insertProfesor.run("11223344", "Roberto", "Martínez", "rmartinez@universidad.edu", "Administración", "MBA")

  // Insertar materias
  const insertMateria = db.prepare(`
    INSERT OR IGNORE INTO materias (codigo, nombre, creditos, semestre, carrera_id) 
    VALUES (?, ?, ?, ?, ?)
  `)

  insertMateria.run("MAT-101", "Matemáticas I", 4, 1, 1)
  insertMateria.run("PRG-101", "Programación I", 4, 1, 1)
  insertMateria.run("ING-101", "Inglés I", 2, 1, 1)
  insertMateria.run("FIS-101", "Física I", 4, 2, 1)
  insertMateria.run("PRG-201", "Programación II", 4, 2, 1)

  console.log("✅ Base de datos SQLite inicializada con datos de prueba")
}

// Funciones de exportación/importación
export class DatabaseManager {
  static exportDatabase(format: "sql" | "json" | "csv" = "sql") {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
    const filename = `universidad_export_${timestamp}`

    try {
      switch (format) {
        case "sql":
          return this.exportToSQL(filename)
        case "json":
          return this.exportToJSON(filename)
        case "csv":
          return this.exportToCSV(filename)
        default:
          throw new Error("Formato no soportado")
      }
    } catch (error) {
      console.error("Error exportando base de datos:", error)
      throw error
    }
  }

  private static exportToSQL(filename: string) {
    const exportPath = path.join(EXPORTS_DIR, `${filename}.sql`)
    const tables = this.getAllTables()

    let sqlContent = `-- Exportación completa de Universidad Móvil\n`
    sqlContent += `-- Fecha: ${new Date().toISOString()}\n`
    sqlContent += `-- Versión: 29.0.0\n\n`

    // Exportar estructura y datos de cada tabla
    tables.forEach((table) => {
      const schema = db!.prepare(`SELECT sql FROM sqlite_master WHERE type='table' AND name=?`).get(table.name)
      if (schema) {
        sqlContent += `-- Tabla: ${table.name}\n`
        sqlContent += `${schema.sql};\n\n`

        // Exportar datos
        const rows = db!.prepare(`SELECT * FROM ${table.name}`).all()
        if (rows.length > 0) {
          const columns = Object.keys(rows[0])
          sqlContent += `INSERT INTO ${table.name} (${columns.join(", ")}) VALUES\n`

          const values = rows.map((row) => {
            const vals = columns.map((col) => {
              const val = row[col]
              return val === null ? "NULL" : typeof val === "string" ? `'${val.replace(/'/g, "''")}'` : val
            })
            return `(${vals.join(", ")})`
          })

          sqlContent += values.join(",\n") + ";\n\n"
        }
      }
    })

    fs.writeFileSync(exportPath, sqlContent, "utf8")
    return exportPath
  }

  private static exportToJSON(filename: string) {
    const exportPath = path.join(EXPORTS_DIR, `${filename}.json`)
    const tables = this.getAllTables()
    const exportData: any = {
      metadata: {
        version: "29.0.0",
        exportDate: new Date().toISOString(),
        database: "Universidad Móvil",
      },
      data: {},
    }

    tables.forEach((table) => {
      const rows = db!.prepare(`SELECT * FROM ${table.name}`).all()
      exportData.data[table.name] = rows
    })

    fs.writeFileSync(exportPath, JSON.stringify(exportData, null, 2), "utf8")
    return exportPath
  }

  private static exportToCSV(filename: string) {
    const exportDir = path.join(EXPORTS_DIR, filename)
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir, { recursive: true })
    }

    const tables = this.getAllTables()
    const exportedFiles: string[] = []

    tables.forEach((table) => {
      const rows = db!.prepare(`SELECT * FROM ${table.name}`).all()
      if (rows.length > 0) {
        const csvPath = path.join(exportDir, `${table.name}.csv`)
        const columns = Object.keys(rows[0])

        let csvContent = columns.join(",") + "\n"
        rows.forEach((row) => {
          const values = columns.map((col) => {
            const val = row[col]
            return val === null ? "" : typeof val === "string" && val.includes(",") ? `"${val}"` : val
          })
          csvContent += values.join(",") + "\n"
        })

        fs.writeFileSync(csvPath, csvContent, "utf8")
        exportedFiles.push(csvPath)
      }
    })

    return exportedFiles
  }

  private static getAllTables() {
    return db!
      .prepare(`
      SELECT name FROM sqlite_master 
      WHERE type='table' AND name NOT LIKE 'sqlite_%' 
      ORDER BY name
    `)
      .all() as { name: string }[]
  }

  static importDatabase(filePath: string) {
    try {
      if (!fs.existsSync(filePath)) {
        throw new Error("Archivo no encontrado")
      }

      const ext = path.extname(filePath).toLowerCase()

      switch (ext) {
        case ".sql":
          return this.importFromSQL(filePath)
        case ".json":
          return this.importFromJSON(filePath)
        default:
          throw new Error("Formato de archivo no soportado")
      }
    } catch (error) {
      console.error("Error importando base de datos:", error)
      throw error
    }
  }

  private static importFromSQL(filePath: string) {
    const sqlContent = fs.readFileSync(filePath, "utf8")

    // Crear backup antes de importar
    this.createBackup()

    // Ejecutar SQL
    db!.exec(sqlContent)

    console.log("✅ Base de datos importada desde SQL")
    return true
  }

  private static importFromJSON(filePath: string) {
    const jsonContent = fs.readFileSync(filePath, "utf8")
    const importData = JSON.parse(jsonContent)

    // Crear backup antes de importar
    this.createBackup()

    // Limpiar tablas existentes
    const tables = this.getAllTables()
    tables.forEach((table) => {
      db!.prepare(`DELETE FROM ${table.name}`).run()
    })

    // Importar datos
    Object.keys(importData.data).forEach((tableName) => {
      const rows = importData.data[tableName]
      if (rows.length > 0) {
        const columns = Object.keys(rows[0])
        const placeholders = columns.map(() => "?").join(", ")
        const insertStmt = db!.prepare(`INSERT INTO ${tableName} (${columns.join(", ")}) VALUES (${placeholders})`)

        rows.forEach((row: any) => {
          const values = columns.map((col) => row[col])
          insertStmt.run(...values)
        })
      }
    })

    console.log("✅ Base de datos importada desde JSON")
    return true
  }

  static createBackup() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
    const backupPath = path.join(BACKUP_DIR, `backup_${timestamp}.db`)

    try {
      fs.copyFileSync(DB_PATH, backupPath)
      console.log(`✅ Backup creado: ${backupPath}`)
      return backupPath
    } catch (error) {
      console.error("❌ Error creando backup:", error)
      throw error
    }
  }

  static restoreBackup(backupPath: string) {
    try {
      if (!fs.existsSync(backupPath)) {
        throw new Error("Archivo de backup no encontrado")
      }

      db!.close()
      fs.copyFileSync(backupPath, DB_PATH)

      // Reinicializar conexión
      const newDb = new Database(DB_PATH)
      newDb.pragma("journal_mode = WAL")
      newDb.pragma("foreign_keys = ON")

      console.log(`✅ Backup restaurado: ${backupPath}`)
      return true
    } catch (error) {
      console.error("❌ Error restaurando backup:", error)
      throw error
    }
  }

  static getDatabaseInfo() {
    const tables = this.getAllTables()
    const info: any = {
      database: "Universidad Móvil",
      version: "29.0.0",
      tables: {},
      totalRecords: 0,
    }

    tables.forEach((table) => {
      const count = db!.prepare(`SELECT COUNT(*) as count FROM ${table.name}`).get() as { count: number }
      info.tables[table.name] = count.count
      info.totalRecords += count.count
    })

    return info
  }
}

export function backupDatabase(): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
  const backupPath = join(BACKUP_DIR, `backup-${timestamp}.db`)

  if (db) {
    db.backup(backupPath)
  }

  return backupPath
}

export function exportToSQL(): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
  const exportPath = join(EXPORT_DIR, `export-${timestamp}.sql`)

  // Implementar exportación SQL
  return exportPath
}

export function getDatabaseInfo() {
  if (!db) return null

  const tables = db
    .prepare(`
    SELECT name FROM sqlite_master 
    WHERE type='table' AND name NOT LIKE 'sqlite_%'
  `)
    .all()

  const info = {
    path: DB_PATH,
    size: 0,
    tables: tables.map((table: any) => {
      const count = db!.prepare(`SELECT COUNT(*) as count FROM ${table.name}`).get() as any
      return {
        name: table.name,
        records: count.count,
      }
    }),
  }

  return info
}

// Exportar instancia de base de datos
export default db

// Inicializar automáticamente
if (process.env.NODE_ENV !== "test") {
  getDatabase()
  // initializeDatabase()
}
