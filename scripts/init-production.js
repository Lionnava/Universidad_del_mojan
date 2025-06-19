const Database = require("better-sqlite3")
const path = require("path")
const fs = require("fs")
const bcrypt = require("bcryptjs")

console.log("🏢 Inicializando base de datos para PRODUCCIÓN...")
console.log("⚠️  Esta versión NO incluye datos de demostración")

// Rutas
const dbDir = path.join(process.cwd(), "database")
const dbPath = path.join(dbDir, "universidad.db")
const backupDir = path.join(dbDir, "backups")

// Crear directorios si no existen
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true })
}

if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true })
}

// Crear base de datos
console.log("📊 Creando base de datos de producción...")
const db = new Database(dbPath)

// Configurar SQLite para producción
db.pragma("journal_mode = WAL")
db.pragma("foreign_keys = ON")
db.pragma("synchronous = FULL") // Más seguro para producción
db.pragma("cache_size = 2000000") // Más cache para producción

console.log("🔧 Creando estructura de tablas...")

try {
  // Crear todas las tablas (igual que antes)
  const createTablesTransaction = db.transaction(() => {
    // Tabla de configuración del sistema
    db.exec(`
      CREATE TABLE IF NOT EXISTS configuracion_sistema (
        id INTEGER PRIMARY KEY,
        nombre_universidad TEXT NOT NULL DEFAULT 'Mi Universidad',
        logo_url TEXT,
        direccion TEXT,
        telefono TEXT,
        email TEXT,
        version_sistema TEXT DEFAULT '1.0.0',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Tabla de carreras
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

    // Tabla de períodos académicos
    db.exec(`
      CREATE TABLE IF NOT EXISTS periodos_academicos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        fecha_inicio DATE NOT NULL,
        fecha_fin DATE NOT NULL,
        activo BOOLEAN DEFAULT FALSE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Tabla de usuarios
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

    // Tabla de aspirantes (completa)
    db.exec(`
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
        sexo TEXT CHECK (sexo IN ('masculino', 'femenino')),
        direccion TEXT,
        carrera_id INTEGER REFERENCES carreras(id),
        modalidad_estudio TEXT,
        turno_preferido TEXT,
        nivel_educativo_anterior TEXT,
        institucion_procedencia TEXT,
        año_graduacion INTEGER,
        promedio_anterior REAL,
        trabaja BOOLEAN DEFAULT FALSE,
        ocupacion TEXT,
        ingresos_familiares TEXT,
        personas_dependen INTEGER DEFAULT 0,
        tipo_vivienda TEXT,
        transporte TEXT,
        nombre_padre TEXT,
        cedula_padre TEXT,
        telefono_padre TEXT,
        ocupacion_padre TEXT,
        nombre_madre TEXT,
        cedula_madre TEXT,
        telefono_madre TEXT,
        ocupacion_madre TEXT,
        contacto_emergencia TEXT,
        telefono_emergencia TEXT,
        estado TEXT DEFAULT 'Pendiente' CHECK (estado IN ('Pendiente', 'Aprobado', 'Rechazado', 'En Revisión')),
        fecha_solicitud DATETIME DEFAULT CURRENT_TIMESTAMP,
        documentos_completos BOOLEAN DEFAULT FALSE,
        observaciones TEXT,
        usuario_revisor INTEGER REFERENCES usuarios(id),
        fecha_revision DATETIME,
        usuario_id INTEGER REFERENCES usuarios(id),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Tabla de estudiantes
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

    // Tabla de profesores
    db.exec(`
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
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Tabla de materias
    db.exec(`
      CREATE TABLE IF NOT EXISTS materias (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        codigo TEXT UNIQUE NOT NULL,
        creditos INTEGER NOT NULL,
        horas_teoricas INTEGER DEFAULT 0,
        horas_practicas INTEGER DEFAULT 0,
        trayecto INTEGER NOT NULL,
        trimestre INTEGER NOT NULL,
        carrera_id INTEGER REFERENCES carreras(id),
        prerequisitos TEXT,
        descripcion TEXT,
        estado TEXT DEFAULT 'Activa' CHECK (estado IN ('Activa', 'Inactiva')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Tabla de secciones
    db.exec(`
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
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(materia_id, periodo_id, seccion)
      )
    `)

    // Tabla de inscripciones
    db.exec(`
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
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(estudiante_id, seccion_id, periodo_id)
      )
    `)

    // Tabla de constancias
    db.exec(`
      CREATE TABLE IF NOT EXISTS constancias (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        estudiante_id INTEGER REFERENCES estudiantes(id),
        tipo TEXT NOT NULL CHECK (tipo IN ('notas', 'estudios', 'preinscripcion', 'inscripcion')),
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

    // Tabla de auditoría
    db.exec(`
      CREATE TABLE IF NOT EXISTS auditoria (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tabla TEXT NOT NULL,
        operacion TEXT NOT NULL CHECK (operacion IN ('INSERT', 'UPDATE', 'DELETE')),
        registro_id INTEGER NOT NULL,
        datos_anteriores TEXT,
        datos_nuevos TEXT,
        usuario_id INTEGER REFERENCES usuarios(id),
        fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
        ip_address TEXT
      )
    `)

    // Crear índices para mejor rendimiento
    db.exec(`
      CREATE INDEX IF NOT EXISTS idx_aspirantes_cedula ON aspirantes(cedula);
      CREATE INDEX IF NOT EXISTS idx_aspirantes_estado ON aspirantes(estado);
      CREATE INDEX IF NOT EXISTS idx_estudiantes_cedula ON estudiantes(cedula);
      CREATE INDEX IF NOT EXISTS idx_estudiantes_carrera ON estudiantes(carrera_id);
      CREATE INDEX IF NOT EXISTS idx_profesores_cedula ON profesores(cedula);
      CREATE INDEX IF NOT EXISTS idx_materias_codigo ON materias(codigo);
      CREATE INDEX IF NOT EXISTS idx_materias_carrera ON materias(carrera_id);
      CREATE INDEX IF NOT EXISTS idx_inscripciones_estudiante ON inscripciones(estudiante_id);
      CREATE INDEX IF NOT EXISTS idx_inscripciones_seccion ON inscripciones(seccion_id);
      CREATE INDEX IF NOT EXISTS idx_usuarios_username ON usuarios(username);
      CREATE INDEX IF NOT EXISTS idx_auditoria_tabla ON auditoria(tabla);
      CREATE INDEX IF NOT EXISTS idx_auditoria_fecha ON auditoria(fecha);
    `)

    console.log("✅ Estructura de tablas creada exitosamente")
  })

  createTablesTransaction()

  // Solo insertar configuración básica y usuario administrador
  console.log("👤 Creando usuario administrador inicial...")

  const productionTransaction = db.transaction(() => {
    // Configuración básica del sistema (SIN datos específicos)
    db.prepare(`
      INSERT OR IGNORE INTO configuracion_sistema (id, nombre_universidad) 
      VALUES (1, 'Mi Universidad')
    `).run()

    // Solo crear usuario administrador inicial
    const adminPassword = bcrypt.hashSync("admin123", 10)

    db.prepare(`
      INSERT OR IGNORE INTO usuarios (username, email, password_hash, rol) 
      VALUES ('admin', 'admin@miuniversidad.edu', ?, 'gerencial')
    `).run(adminPassword)

    console.log("✅ Usuario administrador creado")
  })

  productionTransaction()

  // Verificar la base de datos
  console.log("🔍 Verificando base de datos de producción...")

  const tablas = [
    "configuracion_sistema",
    "carreras",
    "periodos_academicos",
    "usuarios",
    "aspirantes",
    "estudiantes",
    "profesores",
    "materias",
    "secciones",
    "inscripciones",
    "constancias",
    "auditoria",
  ]

  console.log("📊 Tablas creadas:")
  tablas.forEach((tabla) => {
    const count = db.prepare(`SELECT COUNT(*) as count FROM ${tabla}`).get()
    console.log(`   ✅ ${tabla}: ${count.count} registros`)
  })

  db.close()

  console.log("")
  console.log("🎉 ¡Base de datos de PRODUCCIÓN lista!")
  console.log(`📍 Ubicación: ${dbPath}`)
  console.log("")
  console.log("🔑 Usuario administrador inicial:")
  console.log("   👤 Usuario: admin")
  console.log("   🔒 Contraseña: admin123")
  console.log("")
  console.log("⚠️  IMPORTANTE para PRODUCCIÓN:")
  console.log("   1. Cambia la contraseña del admin inmediatamente")
  console.log("   2. Configura la información de tu universidad")
  console.log("   3. Crea las carreras de tu institución")
  console.log("   4. Configura el período académico actual")
  console.log("")
  console.log("🚀 Ejecuta: npm run dev")
} catch (error) {
  console.error("❌ Error inicializando base de datos de producción:", error)
  process.exit(1)
}
