const Database = require("better-sqlite3")
const path = require("path")
const fs = require("fs")

console.log("🚀 Inicializando base de datos completa...")

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
console.log("📊 Creando base de datos...")
const db = new Database(dbPath)

// Configurar SQLite
db.pragma("journal_mode = WAL")
db.pragma("foreign_keys = ON")
db.pragma("synchronous = NORMAL")

console.log("🔧 Creando tablas...")

try {
  // Crear todas las tablas en una transacción
  const createTablesTransaction = db.transaction(() => {
    // Tabla de configuración del sistema
    db.exec(`
      CREATE TABLE IF NOT EXISTS configuracion_sistema (
        id INTEGER PRIMARY KEY,
        nombre_universidad TEXT NOT NULL DEFAULT 'Universidad Móvil',
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

    // Tabla de aspirantes
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

    console.log("✅ Tablas creadas exitosamente")

    // Crear índices
    console.log("🔍 Creando índices...")
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

    console.log("✅ Índices creados exitosamente")
  })

  createTablesTransaction()

  // Insertar datos iniciales
  console.log("📝 Insertando datos iniciales...")

  const seedTransaction = db.transaction(() => {
    // Configuración inicial del sistema
    db.prepare(`
      INSERT OR IGNORE INTO configuracion_sistema (id, nombre_universidad, direccion, telefono, email) 
      VALUES (1, 'Universidad Móvil', 'Av. Principal, Ciudad', '+58-212-1234567', 'info@universidadmovil.edu')
    `).run()

    // Insertar carreras
    const insertCarrera = db.prepare(`
      INSERT OR IGNORE INTO carreras (nombre, codigo, duracion_trayectos) 
      VALUES (?, ?, ?)
    `)

    const carreras = [
      ["Ingeniería en Informática", "INF", 4],
      ["Medicina", "MED", 6],
      ["Derecho", "DER", 4],
      ["Administración", "ADM", 4],
      ["Enfermería", "ENF", 3],
      ["Contaduría Pública", "CON", 4],
      ["Psicología", "PSI", 5],
    ]

    carreras.forEach((carrera) => {
      try {
        insertCarrera.run(...carrera)
      } catch (e) {
        // Ignorar duplicados
      }
    })

    // Insertar período académico
    db.prepare(`
      INSERT OR IGNORE INTO periodos_academicos (nombre, fecha_inicio, fecha_fin, activo) 
      VALUES ('2024-2025', '2024-09-01', '2025-07-31', 1)
    `).run()

    // Insertar usuarios por defecto (contraseña: demo123)
    const insertUsuario = db.prepare(`
      INSERT OR IGNORE INTO usuarios (username, email, password_hash, rol) 
      VALUES (?, ?, ?, ?)
    `)

    const usuarios = [
      ["admin", "admin@universidad.edu", "$2b$10$K8gF7Z9X1Y2W3V4U5T6S7eR8Q9P0O1N2M3L4K5J6I7H8G9F0E1D2C3", "gerencial"],
      [
        "analista1",
        "analista@universidad.edu",
        "$2b$10$K8gF7Z9X1Y2W3V4U5T6S7eR8Q9P0O1N2M3L4K5J6I7H8G9F0E1D2C3",
        "analista",
      ],
      [
        "prof_garcia",
        "garcia@universidad.edu",
        "$2b$10$K8gF7Z9X1Y2W3V4U5T6S7eR8Q9P0O1N2M3L4K5J6I7H8G9F0E1D2C3",
        "profesor",
      ],
      [
        "est_20123456",
        "estudiante@universidad.edu",
        "$2b$10$K8gF7Z9X1Y2W3V4U5T6S7eR8Q9P0O1N2M3L4K5J6I7H8G9F0E1D2C3",
        "estudiante",
      ],
    ]

    usuarios.forEach((usuario) => {
      try {
        insertUsuario.run(...usuario)
      } catch (e) {
        // Ignorar duplicados
      }
    })

    // Insertar profesores
    const insertProfesor = db.prepare(`
      INSERT OR IGNORE INTO profesores (cedula, nombres, apellidos, email, especialidad, titulo_academico, usuario_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `)

    const profesores = [
      ["12345678", "Juan Carlos", "García López", "jgarcia@universidad.edu", "Matemáticas", "Doctor en Matemáticas", 3],
      [
        "23456789",
        "María Elena",
        "Martínez Silva",
        "mmartinez@universidad.edu",
        "Programación",
        "Ingeniera en Sistemas",
        null,
      ],
      ["34567890", "Pedro Antonio", "López Rodríguez", "plopez@universidad.edu", "Física", "Doctor en Física", null],
      [
        "45678901",
        "Ana Isabel",
        "Fernández Castro",
        "afernandez@universidad.edu",
        "Derecho",
        "Doctora en Derecho",
        null,
      ],
      ["56789012", "Carlos Miguel", "Herrera Díaz", "cherrera@universidad.edu", "Administración", "MBA", null],
    ]

    profesores.forEach((profesor) => {
      try {
        insertProfesor.run(...profesor)
      } catch (e) {
        // Ignorar duplicados
      }
    })

    // Insertar materias de Ingeniería en Informática
    const insertMateria = db.prepare(`
      INSERT OR IGNORE INTO materias (nombre, codigo, creditos, horas_teoricas, horas_practicas, trayecto, trimestre, carrera_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `)

    const materiasInformatica = [
      ["Matemática I", "MAT101", 4, 3, 2, 1, 1, 1],
      ["Programación I", "INF101", 5, 3, 4, 1, 1, 1],
      ["Introducción a la Ingeniería", "ING101", 3, 2, 2, 1, 1, 1],
      ["Física I", "FIS101", 4, 3, 2, 1, 2, 1],
      ["Programación II", "INF102", 5, 3, 4, 1, 2, 1],
      ["Matemática II", "MAT102", 4, 3, 2, 1, 2, 1],
      ["Base de Datos I", "INF201", 4, 2, 4, 2, 1, 1],
      ["Algoritmos y Estructuras de Datos", "INF202", 5, 3, 4, 2, 1, 1],
      ["Ingeniería de Software I", "INF301", 4, 3, 2, 3, 1, 1],
      ["Redes de Computadoras", "INF302", 4, 2, 4, 3, 1, 1],
    ]

    materiasInformatica.forEach((materia) => {
      try {
        insertMateria.run(...materia)
      } catch (e) {
        // Ignorar duplicados
      }
    })

    // Insertar secciones
    const insertSeccion = db.prepare(`
      INSERT OR IGNORE INTO secciones (materia_id, profesor_id, periodo_id, seccion, cupos_maximos, aula, horario) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `)

    const secciones = [
      [1, 1, 1, "A", 30, "Aula 101", "Lun-Mie-Vie 8:00-10:00"],
      [1, 1, 1, "B", 30, "Aula 102", "Mar-Jue 14:00-17:00"],
      [2, 2, 1, "A", 25, "Lab 201", "Lun-Mie 10:00-12:00"],
      [3, 1, 1, "A", 35, "Aula 103", "Mar-Jue 8:00-10:00"],
      [7, 2, 1, "A", 20, "Lab 204", "Vie 8:00-12:00"],
    ]

    secciones.forEach((seccion) => {
      try {
        insertSeccion.run(...seccion)
      } catch (e) {
        // Ignorar duplicados
      }
    })

    // Insertar estudiantes de ejemplo
    const insertEstudiante = db.prepare(`
      INSERT OR IGNORE INTO estudiantes (cedula, nombres, apellidos, email, telefono, carrera_id, trayecto_actual, trimestre_actual, usuario_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)

    const estudiantes = [
      ["20123456", "María José", "González Pérez", "mgonzalez@email.com", "0412-1234567", 1, 2, 1, 4],
      ["18123456", "Pedro José", "Sánchez García", "psanchez@email.com", "0412-1111111", 1, 3, 2, null],
      ["19234567", "Miguel Ángel", "Morales Sánchez", "mmorales@email.com", "0412-5555555", 1, 1, 1, null],
      ["20345678", "Carmen Elena", "Rodríguez Torres", "crodriguez@email.com", "0414-2222222", 2, 1, 1, null],
      ["21456789", "José Antonio", "Martínez López", "jmartinez@email.com", "0416-3333333", 3, 2, 1, null],
    ]

    estudiantes.forEach((estudiante) => {
      try {
        insertEstudiante.run(...estudiante)
      } catch (e) {
        // Ignorar duplicados
      }
    })

    // Insertar aspirantes de ejemplo
    const insertAspirante = db.prepare(`
      INSERT OR IGNORE INTO aspirantes (cedula, nombres, apellidos, email, telefono, carrera_id, estado, sexo, nacionalidad) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)

    const aspirantes = [
      [
        "21123456",
        "Carlos Eduardo",
        "Rodríguez Silva",
        "crodriguez@email.com",
        "0414-2345678",
        2,
        "Pendiente",
        "masculino",
        "Venezolana",
      ],
      [
        "21234567",
        "Ana Lucía",
        "Martínez López",
        "amartinez@email.com",
        "0416-3456789",
        3,
        "En Revisión",
        "femenino",
        "Venezolana",
      ],
      [
        "21345678",
        "José Miguel",
        "Hernández Torres",
        "jhernandez@email.com",
        "0424-4567890",
        1,
        "Aprobado",
        "masculino",
        "Venezolana",
      ],
      [
        "22123456",
        "Laura Patricia",
        "Díaz Morales",
        "ldiaz@email.com",
        "0412-5678901",
        4,
        "Pendiente",
        "femenino",
        "Venezolana",
      ],
      [
        "22234567",
        "Roberto Carlos",
        "Vásquez Ruiz",
        "rvasquez@email.com",
        "0414-6789012",
        5,
        "En Revisión",
        "masculino",
        "Venezolana",
      ],
    ]

    aspirantes.forEach((aspirante) => {
      try {
        insertAspirante.run(...aspirante)
      } catch (e) {
        // Ignorar duplicados
      }
    })

    console.log("✅ Datos iniciales insertados exitosamente")
  })

  seedTransaction()

  // Verificar la base de datos
  console.log("🔍 Verificando base de datos...")

  const carrerasCount = db.prepare("SELECT COUNT(*) as count FROM carreras").get()
  const usuariosCount = db.prepare("SELECT COUNT(*) as count FROM usuarios").get()
  const estudiantesCount = db.prepare("SELECT COUNT(*) as count FROM estudiantes").get()
  const aspirantesCount = db.prepare("SELECT COUNT(*) as count FROM aspirantes").get()
  const profesoresCount = db.prepare("SELECT COUNT(*) as count FROM profesores").get()

  console.log("📊 Estadísticas de la base de datos:")
  console.log(`   - Carreras: ${carrerasCount.count}`)
  console.log(`   - Usuarios: ${usuariosCount.count}`)
  console.log(`   - Estudiantes: ${estudiantesCount.count}`)
  console.log(`   - Aspirantes: ${aspirantesCount.count}`)
  console.log(`   - Profesores: ${profesoresCount.count}`)

  db.close()

  console.log("✅ Base de datos inicializada completamente")
  console.log(`📍 Ubicación: ${dbPath}`)
  console.log("🔑 Usuarios por defecto:")
  console.log("   - admin / demo123 (Gerencial)")
  console.log("   - analista1 / demo123 (Analista)")
  console.log("   - prof_garcia / demo123 (Profesor)")
  console.log("   - est_20123456 / demo123 (Estudiante)")
  console.log("")
  console.log("🚀 Ahora puedes ejecutar: npm run dev")
} catch (error) {
  console.error("❌ Error inicializando base de datos:", error)
  process.exit(1)
}
