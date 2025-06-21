import Database from "better-sqlite3"
import path from "path"
import fs from "fs"

// Configuración SQLite optimizada para LOCAL
const DB_DIR = path.join(process.cwd(), "database")
const DB_PATH = path.join(DB_DIR, "universidad.db")
const BACKUP_DIR = path.join(DB_DIR, "backups")
const EXPORTS_DIR = path
  .join(DB_DIR, "exports")

  [
    // Crear directorios necesarios
    (DB_DIR, BACKUP_DIR, EXPORTS_DIR)
  ].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
  })

// Conexión SQLite única y optimizada
let db: Database.Database | null = null

export function getDatabase() {
  if (!db) {
    db = new Database(DB_PATH)

    // Configuración ÓPTIMA para LOCAL
    db.pragma("journal_mode = WAL")
    db.pragma("synchronous = NORMAL")
    db.pragma("cache_size = 1000000")
    db.pragma("foreign_keys = ON")
    db.pragma("temp_store = memory")

    console.log("✅ SQLite conectado:", DB_PATH)
  }
  return db
}

// Inicializar base de datos COMPLETA
export function initializeDatabase() {
  console.log("🚀 Inicializando Universidad Móvil - SQLite LOCAL")

  const database = getDatabase()

  try {
    // Crear todas las tablas en una transacción
    const transaction = database.transaction(() => {
      // 1. Configuración del sistema
      database.exec(`
        CREATE TABLE IF NOT EXISTS configuracion_sistema (
          id INTEGER PRIMARY KEY,
          nombre_universidad TEXT DEFAULT 'Universidad Móvil',
          version TEXT DEFAULT '29.0.0',
          modo TEXT DEFAULT 'LOCAL',
          direccion TEXT,
          telefono TEXT,
          email TEXT,
          logo_url TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `)

      // 2. Usuarios del sistema
      database.exec(`
        CREATE TABLE IF NOT EXISTS usuarios (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          rol TEXT NOT NULL CHECK (rol IN ('gerencial', 'analista', 'profesor', 'estudiante')),
          nombre_completo TEXT NOT NULL,
          email TEXT,
          activo BOOLEAN DEFAULT TRUE,
          ultimo_acceso DATETIME,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `)

      // 3. Carreras
      database.exec(`
        CREATE TABLE IF NOT EXISTS carreras (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          codigo TEXT UNIQUE NOT NULL,
          nombre TEXT NOT NULL,
          duracion_trayectos INTEGER DEFAULT 4,
          modalidad TEXT DEFAULT 'Presencial',
          activa BOOLEAN DEFAULT TRUE,
          descripcion TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `)

      // 4. Períodos académicos
      database.exec(`
        CREATE TABLE IF NOT EXISTS periodos_academicos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          codigo TEXT UNIQUE NOT NULL,
          fecha_inicio DATE NOT NULL,
          fecha_fin DATE NOT NULL,
          activo BOOLEAN DEFAULT FALSE,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `)

      // 5. Estudiantes
      database.exec(`
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
          estado TEXT DEFAULT 'Activo' CHECK (estado IN ('Activo', 'Inactivo', 'Graduado', 'Retirado')),
          fecha_ingreso DATE DEFAULT CURRENT_DATE,
          promedio_general REAL DEFAULT 0.0,
          creditos_aprobados INTEGER DEFAULT 0,
          usuario_id INTEGER REFERENCES usuarios(id),
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `)

      // 6. Profesores
      database.exec(`
        CREATE TABLE IF NOT EXISTS profesores (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          cedula TEXT UNIQUE NOT NULL,
          nombres TEXT NOT NULL,
          apellidos TEXT NOT NULL,
          email TEXT,
          telefono TEXT,
          especialidad TEXT,
          titulo_academico TEXT,
          estado TEXT DEFAULT 'Activo' CHECK (estado IN ('Activo', 'Inactivo')),
          fecha_ingreso DATE DEFAULT CURRENT_DATE,
          usuario_id INTEGER REFERENCES usuarios(id),
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `)

      // 7. Materias
      database.exec(`
        CREATE TABLE IF NOT EXISTS materias (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          codigo TEXT UNIQUE NOT NULL,
          nombre TEXT NOT NULL,
          creditos INTEGER NOT NULL,
          horas_teoricas INTEGER DEFAULT 0,
          horas_practicas INTEGER DEFAULT 0,
          trayecto INTEGER NOT NULL,
          trimestre INTEGER NOT NULL,
          carrera_id INTEGER REFERENCES carreras(id),
          prerequisitos TEXT,
          descripcion TEXT,
          estado TEXT DEFAULT 'Activa' CHECK (estado IN ('Activa', 'Inactiva')),
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `)

      // 8. Secciones
      database.exec(`
        CREATE TABLE IF NOT EXISTS secciones (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          materia_id INTEGER REFERENCES materias(id),
          profesor_id INTEGER REFERENCES profesores(id),
          periodo_id INTEGER REFERENCES periodos_academicos(id),
          seccion TEXT NOT NULL,
          cupos_maximos INTEGER NOT NULL,
          cupos_ocupados INTEGER DEFAULT 0,
          aula TEXT,
          horario TEXT,
          estado TEXT DEFAULT 'Activa' CHECK (estado IN ('Activa', 'Cerrada', 'Cancelada')),
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(materia_id, periodo_id, seccion)
        )
      `)

      // 9. Inscripciones
      database.exec(`
        CREATE TABLE IF NOT EXISTS inscripciones (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          estudiante_id INTEGER REFERENCES estudiantes(id),
          seccion_id INTEGER REFERENCES secciones(id),
          periodo_id INTEGER REFERENCES periodos_academicos(id),
          tipo TEXT NOT NULL CHECK (tipo IN ('Pre-inscripcion', 'Inscripcion')),
          estado TEXT DEFAULT 'Activa' CHECK (estado IN ('Activa', 'Retirada', 'Completada')),
          fecha_inscripcion DATETIME DEFAULT CURRENT_TIMESTAMP,
          nota_final REAL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(estudiante_id, seccion_id, periodo_id)
        )
      `)

      // 10. Aspirantes
      database.exec(`
        CREATE TABLE IF NOT EXISTS aspirantes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          cedula TEXT UNIQUE NOT NULL,
          nombres TEXT NOT NULL,
          apellidos TEXT NOT NULL,
          email TEXT,
          telefono TEXT,
          fecha_nacimiento DATE,
          carrera_id INTEGER REFERENCES carreras(id),
          estado TEXT DEFAULT 'Pendiente' CHECK (estado IN ('Pendiente', 'Aprobado', 'Rechazado')),
          fecha_solicitud DATETIME DEFAULT CURRENT_TIMESTAMP,
          observaciones TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `)

      // 11. Constancias
      database.exec(`
        CREATE TABLE IF NOT EXISTS constancias (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          estudiante_id INTEGER REFERENCES estudiantes(id),
          tipo TEXT NOT NULL CHECK (tipo IN ('notas', 'estudios', 'inscripcion')),
          codigo_verificacion TEXT UNIQUE NOT NULL,
          contenido TEXT,
          fecha_generacion DATETIME DEFAULT CURRENT_TIMESTAMP,
          valida_hasta DATE,
          descargada BOOLEAN DEFAULT FALSE,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `)

      // 12. Logs del sistema
      database.exec(`
        CREATE TABLE IF NOT EXISTS logs_sistema (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          usuario_id INTEGER REFERENCES usuarios(id),
          accion TEXT NOT NULL,
          tabla_afectada TEXT,
          detalles TEXT,
          ip_address TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `)

      console.log("✅ Tablas creadas exitosamente")
    })

    transaction()

    // Crear índices para optimización
    createIndexes(database)

    // Insertar datos iniciales
    seedInitialData(database)

    console.log("🎉 Base de datos SQLite inicializada completamente")
    return true
  } catch (error) {
    console.error("❌ Error inicializando base de datos:", error)
    return false
  }
}

function createIndexes(database: Database.Database) {
  const indexes = [
    "CREATE INDEX IF NOT EXISTS idx_estudiantes_cedula ON estudiantes(cedula)",
    "CREATE INDEX IF NOT EXISTS idx_estudiantes_carrera ON estudiantes(carrera_id)",
    "CREATE INDEX IF NOT EXISTS idx_profesores_cedula ON profesores(cedula)",
    "CREATE INDEX IF NOT EXISTS idx_materias_codigo ON materias(codigo)",
    "CREATE INDEX IF NOT EXISTS idx_inscripciones_estudiante ON inscripciones(estudiante_id)",
    "CREATE INDEX IF NOT EXISTS idx_usuarios_username ON usuarios(username)",
    "CREATE INDEX IF NOT EXISTS idx_logs_fecha ON logs_sistema(created_at)",
  ]

  indexes.forEach((indexSQL) => {
    try {
      database.exec(indexSQL)
    } catch (error) {
      console.warn("Advertencia creando índice:", error)
    }
  })

  console.log("✅ Índices creados para optimización")
}

function seedInitialData(database: Database.Database) {
  // Verificar si ya hay datos
  const configCount = database.prepare("SELECT COUNT(*) as count FROM configuracion_sistema").get() as { count: number }
  if (configCount.count > 0) {
    console.log("ℹ️ Datos ya existen, omitiendo inserción inicial")
    return
  }

  console.log("📝 Insertando datos iniciales...")

  const transaction = database.transaction(() => {
    // 1. Configuración del sistema
    database
      .prepare(`
      INSERT INTO configuracion_sistema (id, nombre_universidad, version, modo, direccion, telefono, email) 
      VALUES (1, 'Universidad Móvil', '29.0.0', 'LOCAL', 'Av. Principal, Ciudad Universitaria', '+58-212-1234567', 'info@universidadmovil.edu.ve')
    `)
      .run()

    // 2. Usuarios del sistema
    const usuarios = [
      {
        username: "admin",
        password_hash: "admin123",
        rol: "gerencial",
        nombre_completo: "Administrador del Sistema",
        email: "admin@universidad.edu.ve",
      },
      {
        username: "analista",
        password_hash: "analista123",
        rol: "analista",
        nombre_completo: "Analista Académico",
        email: "analista@universidad.edu.ve",
      },
      {
        username: "profesor",
        password_hash: "profesor123",
        rol: "profesor",
        nombre_completo: "Prof. Juan García",
        email: "jgarcia@universidad.edu.ve",
      },
      {
        username: "estudiante",
        password_hash: "est123",
        rol: "estudiante",
        nombre_completo: "María González",
        email: "mgonzalez@universidad.edu.ve",
      },
    ]

    const insertUser = database.prepare(`
      INSERT INTO usuarios (username, password_hash, rol, nombre_completo, email) 
      VALUES (?, ?, ?, ?, ?)
    `)

    usuarios.forEach((user) => {
      insertUser.run(user.username, user.password_hash, user.rol, user.nombre_completo, user.email)
    })

    // 3. Carreras
    const carreras = [
      { codigo: "INF", nombre: "Ingeniería en Informática", duracion_trayectos: 4, modalidad: "Presencial" },
      { codigo: "MED", nombre: "Medicina", duracion_trayectos: 6, modalidad: "Presencial" },
      { codigo: "DER", nombre: "Derecho", duracion_trayectos: 5, modalidad: "Presencial" },
      { codigo: "ADM", nombre: "Administración", duracion_trayectos: 4, modalidad: "Presencial" },
      { codigo: "ENF", nombre: "Enfermería", duracion_trayectos: 3, modalidad: "Presencial" },
    ]

    const insertCarrera = database.prepare(`
      INSERT INTO carreras (codigo, nombre, duracion_trayectos, modalidad) 
      VALUES (?, ?, ?, ?)
    `)

    carreras.forEach((carrera) => {
      insertCarrera.run(carrera.codigo, carrera.nombre, carrera.duracion_trayectos, carrera.modalidad)
    })

    // 4. Período académico
    database
      .prepare(`
      INSERT INTO periodos_academicos (nombre, codigo, fecha_inicio, fecha_fin, activo) 
      VALUES ('2024-2025', '2024-2025', '2024-09-01', '2025-07-31', 1)
    `)
      .run()

    // 5. Profesores
    const profesores = [
      {
        cedula: "12345678",
        nombres: "Juan Carlos",
        apellidos: "García López",
        email: "jgarcia@universidad.edu.ve",
        especialidad: "Programación",
        titulo_academico: "Ingeniero en Sistemas",
        usuario_id: 3,
      },
      {
        cedula: "23456789",
        nombres: "María Elena",
        apellidos: "Martínez Silva",
        email: "mmartinez@universidad.edu.ve",
        especialidad: "Matemáticas",
        titulo_academico: "Licenciada en Matemáticas",
        usuario_id: null,
      },
      {
        cedula: "34567890",
        nombres: "Pedro Antonio",
        apellidos: "López Rodríguez",
        email: "plopez@universidad.edu.ve",
        especialidad: "Administración",
        titulo_academico: "MBA",
        usuario_id: null,
      },
    ]

    const insertProfesor = database.prepare(`
      INSERT INTO profesores (cedula, nombres, apellidos, email, especialidad, titulo_academico, usuario_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `)

    profesores.forEach((profesor) => {
      insertProfesor.run(
        profesor.cedula,
        profesor.nombres,
        profesor.apellidos,
        profesor.email,
        profesor.especialidad,
        profesor.titulo_academico,
        profesor.usuario_id,
      )
    })

    // 6. Materias
    const materias = [
      {
        codigo: "MAT101",
        nombre: "Matemática I",
        creditos: 4,
        horas_teoricas: 3,
        horas_practicas: 2,
        trayecto: 1,
        trimestre: 1,
        carrera_id: 1,
      },
      {
        codigo: "INF101",
        nombre: "Programación I",
        creditos: 5,
        horas_teoricas: 3,
        horas_practicas: 4,
        trayecto: 1,
        trimestre: 1,
        carrera_id: 1,
      },
      {
        codigo: "FIS101",
        nombre: "Física I",
        creditos: 4,
        horas_teoricas: 3,
        horas_practicas: 2,
        trayecto: 1,
        trimestre: 2,
        carrera_id: 1,
      },
      {
        codigo: "INF201",
        nombre: "Base de Datos I",
        creditos: 4,
        horas_teoricas: 2,
        horas_practicas: 4,
        trayecto: 2,
        trimestre: 1,
        carrera_id: 1,
      },
      {
        codigo: "INF301",
        nombre: "Ingeniería de Software",
        creditos: 4,
        horas_teoricas: 3,
        horas_practicas: 2,
        trayecto: 3,
        trimestre: 1,
        carrera_id: 1,
      },
    ]

    const insertMateria = database.prepare(`
      INSERT INTO materias (codigo, nombre, creditos, horas_teoricas, horas_practicas, trayecto, trimestre, carrera_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `)

    materias.forEach((materia) => {
      insertMateria.run(
        materia.codigo,
        materia.nombre,
        materia.creditos,
        materia.horas_teoricas,
        materia.horas_practicas,
        materia.trayecto,
        materia.trimestre,
        materia.carrera_id,
      )
    })

    // 7. Estudiantes
    const estudiantes = [
      {
        cedula: "20123456",
        nombres: "María José",
        apellidos: "González Pérez",
        email: "mgonzalez@email.com",
        telefono: "0412-1234567",
        carrera_id: 1,
        trayecto_actual: 2,
        trimestre_actual: 1,
        usuario_id: 4,
      },
      {
        cedula: "18123456",
        nombres: "Pedro José",
        apellidos: "Sánchez García",
        email: "psanchez@email.com",
        telefono: "0412-1111111",
        carrera_id: 1,
        trayecto_actual: 3,
        trimestre_actual: 2,
        usuario_id: null,
      },
      {
        cedula: "19234567",
        nombres: "Ana Lucía",
        apellidos: "Morales Torres",
        email: "amorales@email.com",
        telefono: "0414-2222222",
        carrera_id: 2,
        trayecto_actual: 1,
        trimestre_actual: 1,
        usuario_id: null,
      },
    ]

    const insertEstudiante = database.prepare(`
      INSERT INTO estudiantes (cedula, nombres, apellidos, email, telefono, carrera_id, trayecto_actual, trimestre_actual, usuario_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)

    estudiantes.forEach((estudiante) => {
      insertEstudiante.run(
        estudiante.cedula,
        estudiante.nombres,
        estudiante.apellidos,
        estudiante.email,
        estudiante.telefono,
        estudiante.carrera_id,
        estudiante.trayecto_actual,
        estudiante.trimestre_actual,
        estudiante.usuario_id,
      )
    })

    // 8. Aspirantes
    const aspirantes = [
      {
        cedula: "21123456",
        nombres: "Carlos Eduardo",
        apellidos: "Rodríguez Silva",
        email: "crodriguez@email.com",
        telefono: "0414-3333333",
        carrera_id: 1,
        estado: "Pendiente",
      },
      {
        cedula: "21234567",
        nombres: "Laura Patricia",
        apellidos: "Díaz Morales",
        email: "ldiaz@email.com",
        telefono: "0416-4444444",
        carrera_id: 2,
        estado: "En Revisión",
      },
      {
        cedula: "21345678",
        nombres: "Roberto Carlos",
        apellidos: "Vásquez Ruiz",
        email: "rvasquez@email.com",
        telefono: "0424-5555555",
        carrera_id: 3,
        estado: "Aprobado",
      },
    ]

    const insertAspirante = database.prepare(`
      INSERT INTO aspirantes (cedula, nombres, apellidos, email, telefono, carrera_id, estado) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `)

    aspirantes.forEach((aspirante) => {
      insertAspirante.run(
        aspirante.cedula,
        aspirante.nombres,
        aspirante.apellidos,
        aspirante.email,
        aspirante.telefono,
        aspirante.carrera_id,
        aspirante.estado,
      )
    })

    console.log("✅ Datos iniciales insertados exitosamente")
  })

  transaction()
}

// Servicios de base de datos
export const DatabaseService = {
  // Usuarios
  async authenticateUser(username: string, password: string) {
    const db = getDatabase()
    const user = db
      .prepare(`
      SELECT * FROM usuarios 
      WHERE username = ? AND password_hash = ? AND activo = 1
    `)
      .get(username, password) as any

    if (user) {
      // Actualizar último acceso
      db.prepare(`
        UPDATE usuarios 
        SET ultimo_acceso = CURRENT_TIMESTAMP 
        WHERE id = ?
      `).run(user.id)
    }

    return user
  },

  // Estudiantes
  async getAllStudents() {
    const db = getDatabase()
    return db
      .prepare(`
      SELECT e.*, c.nombre as carrera_nombre, c.codigo as carrera_codigo
      FROM estudiantes e
      LEFT JOIN carreras c ON e.carrera_id = c.id
      ORDER BY e.nombres, e.apellidos
    `)
      .all()
  },

  async getStudentByCedula(cedula: string) {
    const db = getDatabase()
    return db
      .prepare(`
      SELECT e.*, c.nombre as carrera_nombre, c.codigo as carrera_codigo
      FROM estudiantes e
      LEFT JOIN carreras c ON e.carrera_id = c.id
      WHERE e.cedula = ?
    `)
      .get(cedula)
  },

  // Profesores
  async getAllProfessors() {
    const db = getDatabase()
    return db
      .prepare(`
      SELECT * FROM profesores 
      ORDER BY nombres, apellidos
    `)
      .all()
  },

  // Carreras
  async getAllCareers() {
    const db = getDatabase()
    return db
      .prepare(`
      SELECT * FROM carreras 
      WHERE activa = 1 
      ORDER BY nombre
    `)
      .all()
  },

  // Materias
  async getAllSubjects() {
    const db = getDatabase()
    return db
      .prepare(`
      SELECT m.*, c.nombre as carrera_nombre
      FROM materias m
      LEFT JOIN carreras c ON m.carrera_id = c.id
      WHERE m.estado = 'Activa'
      ORDER BY m.trayecto, m.trimestre, m.nombre
    `)
      .all()
  },

  // Aspirantes
  async getAllAspirants() {
    const db = getDatabase()
    return db
      .prepare(`
      SELECT a.*, c.nombre as carrera_nombre
      FROM aspirantes a
      LEFT JOIN carreras c ON a.carrera_id = c.id
      ORDER BY a.fecha_solicitud DESC
    `)
      .all()
  },

  async createAspirant(data: any) {
    const db = getDatabase()
    return db
      .prepare(`
      INSERT INTO aspirantes (cedula, nombres, apellidos, email, telefono, carrera_id, observaciones)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `)
      .run(data.cedula, data.nombres, data.apellidos, data.email, data.telefono, data.carrera_id, data.observaciones)
  },

  // Constancias
  async createConstancia(estudianteId: number, tipo: string) {
    const db = getDatabase()
    const codigo = `UNI-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`

    return db
      .prepare(`
      INSERT INTO constancias (estudiante_id, tipo, codigo_verificacion, valida_hasta)
      VALUES (?, ?, ?, DATE('now', '+30 days'))
    `)
      .run(estudianteId, tipo, codigo)
  },

  // Estadísticas
  async getSystemStats() {
    const db = getDatabase()

    const estudiantes = db.prepare("SELECT COUNT(*) as count FROM estudiantes").get() as { count: number }
    const profesores = db.prepare("SELECT COUNT(*) as count FROM profesores").get() as { count: number }
    const materias = db.prepare("SELECT COUNT(*) as count FROM materias").get() as { count: number }
    const aspirantes = db.prepare("SELECT COUNT(*) as count FROM aspirantes").get() as { count: number }

    return {
      estudiantes: estudiantes.count,
      profesores: profesores.count,
      materias: materias.count,
      aspirantes: aspirantes.count,
    }
  },

  // Backup
  async createBackup() {
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
  },
}

// Exportar la instancia de base de datos
export { getDatabase as default }
