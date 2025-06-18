import Database from "better-sqlite3"
import path from "path"

// Crear la base de datos SQLite
const dbPath = path.join(process.cwd(), "data", "universidad.db")
const db = new Database(dbPath)

// Habilitar claves foráneas
db.pragma("foreign_keys = ON")

// Inicializar la base de datos
export function initializeDatabase() {
  // Crear directorio de datos si no existe
  const fs = require("fs")
  const dataDir = path.join(process.cwd(), "data")
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }

  // Crear tablas
  createTables()
  seedInitialData()
}

function createTables() {
  // Tabla de carreras
  db.exec(`
    CREATE TABLE IF NOT EXISTS carreras (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      codigo TEXT UNIQUE NOT NULL,
      duracion_trayectos INTEGER NOT NULL DEFAULT 4,
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
      nacionalidad TEXT,
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
      ingresos_familiares TEXT,
      personas_dependen INTEGER,
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
      estado TEXT DEFAULT 'Activa' CHECK (estado IN ('Activa', 'Cerrada', 'Cancelada')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(materia_id, periodo_id, seccion)
    )
  `)

  // Tabla de horarios
  db.exec(`
    CREATE TABLE IF NOT EXISTS horarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      seccion_id INTEGER REFERENCES secciones(id),
      dia_semana INTEGER NOT NULL,
      hora_inicio TIME NOT NULL,
      hora_fin TIME NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
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
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(estudiante_id, seccion_id, periodo_id)
    )
  `)

  // Tabla de evaluaciones
  db.exec(`
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
  db.exec(`
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

  // Crear índices
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_aspirantes_cedula ON aspirantes(cedula);
    CREATE INDEX IF NOT EXISTS idx_estudiantes_cedula ON estudiantes(cedula);
    CREATE INDEX IF NOT EXISTS idx_profesores_cedula ON profesores(cedula);
    CREATE INDEX IF NOT EXISTS idx_materias_codigo ON materias(codigo);
    CREATE INDEX IF NOT EXISTS idx_inscripciones_estudiante ON inscripciones(estudiante_id);
    CREATE INDEX IF NOT EXISTS idx_inscripciones_seccion ON inscripciones(seccion_id);
    CREATE INDEX IF NOT EXISTS idx_calificaciones_evaluacion ON calificaciones(evaluacion_id);
    CREATE INDEX IF NOT EXISTS idx_calificaciones_estudiante ON calificaciones(estudiante_id);
    CREATE INDEX IF NOT EXISTS idx_usuarios_username ON usuarios(username);
    CREATE INDEX IF NOT EXISTS idx_auditoria_tabla ON auditoria(tabla);
    CREATE INDEX IF NOT EXISTS idx_auditoria_fecha ON auditoria(fecha);
  `)
}

function seedInitialData() {
  // Verificar si ya hay datos
  const carrerasCount = db.prepare("SELECT COUNT(*) as count FROM carreras").get() as { count: number }
  if (carrerasCount.count > 0) return

  // Insertar carreras
  const insertCarrera = db.prepare(`
    INSERT INTO carreras (nombre, codigo, duracion_trayectos) 
    VALUES (?, ?, ?)
  `)

  const carreras = [
    ["Ingeniería en Informática", "INF", 4],
    ["Medicina", "MED", 6],
    ["Derecho", "DER", 4],
    ["Administración", "ADM", 4],
    ["Enfermería", "ENF", 3],
  ]

  carreras.forEach((carrera) => insertCarrera.run(...carrera))

  // Insertar período académico
  db.prepare(`
    INSERT INTO periodos_academicos (nombre, fecha_inicio, fecha_fin, activo) 
    VALUES ('2024-2025', '2024-09-01', '2025-07-31', 1)
  `).run()

  // Insertar usuarios por defecto
  const insertUsuario = db.prepare(`
    INSERT INTO usuarios (username, email, password_hash, rol) 
    VALUES (?, ?, ?, ?)
  `)

  const usuarios = [
    ["admin", "admin@universidad.edu", "demo_hash", "gerencial"],
    ["analista1", "analista@universidad.edu", "demo_hash", "analista"],
    ["prof_garcia", "garcia@universidad.edu", "demo_hash", "profesor"],
    ["est_20123456", "estudiante@universidad.edu", "demo_hash", "estudiante"],
  ]

  usuarios.forEach((usuario) => insertUsuario.run(...usuario))

  // Insertar profesores
  const insertProfesor = db.prepare(`
    INSERT INTO profesores (cedula, nombres, apellidos, email, especialidad, titulo_academico, usuario_id) 
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
  ]

  profesores.forEach((profesor) => insertProfesor.run(...profesor))

  // Insertar materias
  const insertMateria = db.prepare(`
    INSERT INTO materias (nombre, codigo, creditos, horas_teoricas, horas_practicas, trayecto, trimestre, carrera_id) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `)

  const materias = [
    ["Matemática I", "MAT101", 4, 3, 2, 1, 1, 1],
    ["Programación I", "INF101", 5, 3, 4, 1, 1, 1],
    ["Física I", "FIS101", 4, 3, 2, 1, 2, 1],
    ["Programación II", "INF102", 5, 3, 4, 1, 2, 1],
    ["Matemática II", "MAT102", 4, 3, 2, 1, 2, 1],
    ["Base de Datos I", "INF201", 4, 2, 4, 2, 1, 1],
    ["Algoritmos y Estructuras de Datos", "INF202", 5, 3, 4, 2, 1, 1],
    ["Ingeniería de Software I", "INF301", 4, 3, 2, 3, 1, 1],
  ]

  materias.forEach((materia) => insertMateria.run(...materia))

  // Insertar secciones
  const insertSeccion = db.prepare(`
    INSERT INTO secciones (materia_id, profesor_id, periodo_id, seccion, cupos_maximos, aula) 
    VALUES (?, ?, ?, ?, ?, ?)
  `)

  const secciones = [
    [1, 1, 1, "A", 30, "Aula 101"],
    [1, 1, 1, "B", 30, "Aula 102"],
    [2, 1, 1, "A", 25, "Lab 201"],
    [3, 3, 1, "A", 35, "Aula 103"],
    [6, 1, 1, "A", 20, "Lab 204"],
  ]

  secciones.forEach((seccion) => insertSeccion.run(...seccion))

  // Insertar estudiantes de ejemplo
  const insertEstudiante = db.prepare(`
    INSERT INTO estudiantes (cedula, nombres, apellidos, email, telefono, carrera_id, trayecto_actual, trimestre_actual, usuario_id) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  const estudiantes = [
    ["20123456", "María José", "González Pérez", "mgonzalez@email.com", "0412-1234567", 1, 2, 1, 4],
    ["18123456", "Pedro José", "Sánchez García", "psanchez@email.com", "0412-1111111", 1, 3, 2, null],
    ["19234567", "Miguel Ángel", "Morales Sánchez", "mmorales@email.com", "0412-5555555", 1, 1, 1, null],
  ]

  estudiantes.forEach((estudiante) => insertEstudiante.run(...estudiante))

  // Insertar aspirantes de ejemplo
  const insertAspirante = db.prepare(`
    INSERT INTO aspirantes (cedula, nombres, apellidos, email, telefono, carrera_id, estado, sexo, nacionalidad) 
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
      "venezolana",
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
      "venezolana",
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
      "venezolana",
    ],
  ]

  aspirantes.forEach((aspirante) => insertAspirante.run(...aspirante))
}

// Datos de demostración
const DEMO_DATA = {
  estudiantes: [
    {
      id: 1,
      cedula: "20123456",
      nombres: "María José",
      apellidos: "González Pérez",
      email: "mgonzalez@email.com",
      telefono: "0412-1234567",
      carrera_id: 1,
      trayecto_actual: 2,
      trimestre_actual: 1,
      estado: "Activo",
      fecha_ingreso: "2023-09-01",
      created_at: "2023-09-01T00:00:00Z",
      updated_at: "2023-09-01T00:00:00Z",
      carrera: { nombre: "Ingeniería en Informática", codigo: "INF" },
    },
    {
      id: 2,
      cedula: "20234567",
      nombres: "Carlos Eduardo",
      apellidos: "Rodríguez Silva",
      email: "crodriguez@email.com",
      telefono: "0414-2345678",
      carrera_id: 2,
      trayecto_actual: 1,
      trimestre_actual: 2,
      estado: "Activo",
      fecha_ingreso: "2024-01-15",
      created_at: "2024-01-15T00:00:00Z",
      updated_at: "2024-01-15T00:00:00Z",
      carrera: { nombre: "Medicina", codigo: "MED" },
    },
  ],
  profesores: [
    {
      id: 1,
      cedula: "12345678",
      nombres: "Dr. Juan Carlos",
      apellidos: "García López",
      email: "jgarcia@universidad.edu",
      telefono: "0412-1111111",
      especialidad: "Matemáticas",
      titulo_academico: "Doctor en Matemáticas",
      estado: "Activo",
      fecha_ingreso: "2020-01-01",
      created_at: "2020-01-01T00:00:00Z",
      updated_at: "2020-01-01T00:00:00Z",
    },
  ],
  carreras: [
    {
      id: 1,
      nombre: "Ingeniería en Informática",
      codigo: "INF",
      duracion_trayectos: 4,
      created_at: "2020-01-01T00:00:00Z",
      updated_at: "2020-01-01T00:00:00Z",
    },
    {
      id: 2,
      nombre: "Medicina",
      codigo: "MED",
      duracion_trayectos: 6,
      created_at: "2020-01-01T00:00:00Z",
      updated_at: "2020-01-01T00:00:00Z",
    },
    {
      id: 3,
      nombre: "Derecho",
      codigo: "DER",
      duracion_trayectos: 4,
      created_at: "2020-01-01T00:00:00Z",
      updated_at: "2020-01-01T00:00:00Z",
    },
    {
      id: 4,
      nombre: "Administración",
      codigo: "ADM",
      duracion_trayectos: 4,
      created_at: "2020-01-01T00:00:00Z",
      updated_at: "2020-01-01T00:00:00Z",
    },
  ],
  usuarios: [
    {
      id: 1,
      username: "admin",
      email: "admin@universidad.edu",
      password_hash: "demo_hash",
      rol: "gerencial" as const,
      activo: true,
      created_at: "2020-01-01T00:00:00Z",
      updated_at: "2020-01-01T00:00:00Z",
    },
    {
      id: 2,
      username: "est_20123456",
      email: "mgonzalez@email.com",
      password_hash: "demo_hash",
      rol: "estudiante" as const,
      activo: true,
      created_at: "2023-09-01T00:00:00Z",
      updated_at: "2023-09-01T00:00:00Z",
    },
  ],
}

// Funciones para Carreras
export const carrerasService = {
  getAll() {
    return db.prepare("SELECT * FROM carreras ORDER BY nombre").all()
  },

  getById(id: number) {
    return db.prepare("SELECT * FROM carreras WHERE id = ?").get(id)
  },

  create(carrera: { nombre: string; codigo: string; duracion_trayectos: number }) {
    const stmt = db.prepare(`
      INSERT INTO carreras (nombre, codigo, duracion_trayectos) 
      VALUES (?, ?, ?)
    `)
    const result = stmt.run(carrera.nombre, carrera.codigo, carrera.duracion_trayectos)
    return this.getById(result.lastInsertRowid as number)
  },

  update(id: number, updates: Partial<{ nombre: string; codigo: string; duracion_trayectos: number }>) {
    const stmt = db.prepare(`
      UPDATE carreras 
      SET nombre = COALESCE(?, nombre), 
          codigo = COALESCE(?, codigo), 
          duracion_trayectos = COALESCE(?, duracion_trayectos),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `)
    stmt.run(updates.nombre, updates.codigo, updates.duracion_trayectos, id)
    return this.getById(id)
  },
}

// Funciones para Usuarios
export const usuariosService = {
  authenticate(username: string, password: string) {
    // En producción, aquí verificarías el hash de la contraseña
    const user = db
      .prepare(`
      SELECT * FROM usuarios 
      WHERE username = ? AND activo = 1
    `)
      .get(username)

    if (user) {
      // Actualizar último acceso
      db.prepare(`
        UPDATE usuarios 
        SET ultimo_acceso = CURRENT_TIMESTAMP 
        WHERE id = ?
      `).run((user as any).id)
    }

    return user
  },

  getAll() {
    return db.prepare("SELECT * FROM usuarios ORDER BY created_at DESC").all()
  },

  getById(id: number) {
    return db.prepare("SELECT * FROM usuarios WHERE id = ?").get(id)
  },

  create(usuario: { username: string; email: string; password_hash: string; rol: string }) {
    const stmt = db.prepare(`
      INSERT INTO usuarios (username, email, password_hash, rol) 
      VALUES (?, ?, ?, ?)
    `)
    const result = stmt.run(usuario.username, usuario.email, usuario.password_hash, usuario.rol)
    return this.getById(result.lastInsertRowid as number)
  },

  update(id: number, updates: any) {
    const stmt = db.prepare(`
      UPDATE usuarios 
      SET username = COALESCE(?, username),
          email = COALESCE(?, email),
          rol = COALESCE(?, rol),
          activo = COALESCE(?, activo),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `)
    stmt.run(updates.username, updates.email, updates.rol, updates.activo, id)
    return this.getById(id)
  },
}

// Funciones para Aspirantes
export const aspirantesService = {
  getAll() {
    return db
      .prepare(`
      SELECT a.*, c.nombre as carrera_nombre, c.codigo as carrera_codigo
      FROM aspirantes a
      LEFT JOIN carreras c ON a.carrera_id = c.id
      ORDER BY a.created_at DESC
    `)
      .all()
  },

  getById(id: number) {
    return db
      .prepare(`
      SELECT a.*, c.nombre as carrera_nombre, c.codigo as carrera_codigo
      FROM aspirantes a
      LEFT JOIN carreras c ON a.carrera_id = c.id
      WHERE a.id = ?
    `)
      .get(id)
  },

  getByCedula(cedula: string) {
    return db
      .prepare(`
      SELECT a.*, c.nombre as carrera_nombre, c.codigo as carrera_codigo
      FROM aspirantes a
      LEFT JOIN carreras c ON a.carrera_id = c.id
      WHERE a.cedula = ?
    `)
      .get(cedula)
  },

  create(aspirante: any) {
    const stmt = db.prepare(`
      INSERT INTO aspirantes (
        cedula, nombres, apellidos, email, telefono, fecha_nacimiento,
        lugar_nacimiento, nacionalidad, estado_civil, sexo, direccion,
        carrera_id, modalidad_estudio, turno_preferido, nivel_educativo_anterior,
        institucion_procedencia, año_graduacion, promedio_anterior,
        trabaja, ocupacion, ingresos_familiares, personas_dependen,
        tipo_vivienda, transporte, nombre_padre, cedula_padre,
        telefono_padre, ocupacion_padre, nombre_madre, cedula_madre,
        telefono_madre, ocupacion_madre, contacto_emergencia, telefono_emergencia
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)

    const result = stmt.run(
      aspirante.cedula,
      aspirante.nombres,
      aspirante.apellidos,
      aspirante.email,
      aspirante.telefono,
      aspirante.fecha_nacimiento,
      aspirante.lugar_nacimiento,
      aspirante.nacionalidad,
      aspirante.estado_civil,
      aspirante.sexo,
      aspirante.direccion,
      aspirante.carrera_id,
      aspirante.modalidad_estudio,
      aspirante.turno_preferido,
      aspirante.nivel_educativo_anterior,
      aspirante.institucion_procedencia,
      aspirante.año_graduacion,
      aspirante.promedio_anterior,
      aspirante.trabaja,
      aspirante.ocupacion,
      aspirante.ingresos_familiares,
      aspirante.personas_dependen,
      aspirante.tipo_vivienda,
      aspirante.transporte,
      aspirante.nombre_padre,
      aspirante.cedula_padre,
      aspirante.telefono_padre,
      aspirante.ocupacion_padre,
      aspirante.nombre_madre,
      aspirante.cedula_madre,
      aspirante.telefono_madre,
      aspirante.ocupacion_madre,
      aspirante.contacto_emergencia,
      aspirante.telefono_emergencia,
    )

    return this.getById(result.lastInsertRowid as number)
  },

  update(id: number, updates: any) {
    const stmt = db.prepare(`
      UPDATE aspirantes 
      SET estado = COALESCE(?, estado),
          documentos_completos = COALESCE(?, documentos_completos),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `)
    stmt.run(updates.estado, updates.documentos_completos, id)
    return this.getById(id)
  },

  aprobarAspirante(id: number) {
    const aspirante = this.getById(id)
    if (!aspirante) throw new Error("Aspirante no encontrado")

    // Crear usuario para el estudiante
    const usuario = usuariosService.create({
      username: `est_${(aspirante as any).cedula}`,
      email: (aspirante as any).email,
      password_hash: "demo_hash",
      rol: "estudiante",
    })

    // Crear registro de estudiante
    const estudiante = estudiantesService.create({
      cedula: (aspirante as any).cedula,
      nombres: (aspirante as any).nombres,
      apellidos: (aspirante as any).apellidos,
      email: (aspirante as any).email,
      telefono: (aspirante as any).telefono,
      fecha_nacimiento: (aspirante as any).fecha_nacimiento,
      direccion: (aspirante as any).direccion,
      carrera_id: (aspirante as any).carrera_id,
      trayecto_actual: 1,
      trimestre_actual: 1,
      estado: "Pre-inscrito",
      usuario_id: (usuario as any).id,
    })

    // Actualizar estado del aspirante
    this.update(id, { estado: "Aprobado" })

    return { estudiante, usuario }
  },

  getEstadisticas() {
    const stats = db
      .prepare(`
      SELECT 
        estado,
        COUNT(*) as cantidad
      FROM aspirantes 
      GROUP BY estado
    `)
      .all()

    const porCarrera = db
      .prepare(`
      SELECT 
        c.nombre as carrera,
        COUNT(a.id) as cantidad
      FROM aspirantes a
      LEFT JOIN carreras c ON a.carrera_id = c.id
      GROUP BY c.nombre
    `)
      .all()

    return { porEstado: stats, porCarrera }
  },
}

// Funciones para Estudiantes
export const estudiantesService = {
  getAll() {
    return db
      .prepare(`
      SELECT e.*, c.nombre as carrera_nombre, c.codigo as carrera_codigo,
             u.username, u.email as user_email
      FROM estudiantes e
      LEFT JOIN carreras c ON e.carrera_id = c.id
      LEFT JOIN usuarios u ON e.usuario_id = u.id
      ORDER BY e.created_at DESC
    `)
      .all()
  },

  getById(id: number) {
    return db
      .prepare(`
      SELECT e.*, c.nombre as carrera_nombre, c.codigo as carrera_codigo,
             u.username, u.email as user_email
      FROM estudiantes e
      LEFT JOIN carreras c ON e.carrera_id = c.id
      LEFT JOIN usuarios u ON e.usuario_id = u.id
      WHERE e.id = ?
    `)
      .get(id)
  },

  getByCedula(cedula: string) {
    return db
      .prepare(`
      SELECT e.*, c.nombre as carrera_nombre, c.codigo as carrera_codigo,
             u.username, u.email as user_email
      FROM estudiantes e
      LEFT JOIN carreras c ON e.carrera_id = c.id
      LEFT JOIN usuarios u ON e.usuario_id = u.id
      WHERE e.cedula = ?
    `)
      .get(cedula)
  },

  create(estudiante: any) {
    const stmt = db.prepare(`
      INSERT INTO estudiantes (
        cedula, nombres, apellidos, email, telefono, fecha_nacimiento,
        direccion, carrera_id, trayecto_actual, trimestre_actual,
        estado, usuario_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)

    const result = stmt.run(
      estudiante.cedula,
      estudiante.nombres,
      estudiante.apellidos,
      estudiante.email,
      estudiante.telefono,
      estudiante.fecha_nacimiento,
      estudiante.direccion,
      estudiante.carrera_id,
      estudiante.trayecto_actual,
      estudiante.trimestre_actual,
      estudiante.estado,
      estudiante.usuario_id,
    )

    return this.getById(result.lastInsertRowid as number)
  },

  update(id: number, updates: any) {
    const stmt = db.prepare(`
      UPDATE estudiantes 
      SET nombres = COALESCE(?, nombres),
          apellidos = COALESCE(?, apellidos),
          email = COALESCE(?, email),
          telefono = COALESCE(?, telefono),
          direccion = COALESCE(?, direccion),
          trayecto_actual = COALESCE(?, trayecto_actual),
          trimestre_actual = COALESCE(?, trimestre_actual),
          estado = COALESCE(?, estado),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `)
    stmt.run(
      updates.nombres,
      updates.apellidos,
      updates.email,
      updates.telefono,
      updates.direccion,
      updates.trayecto_actual,
      updates.trimestre_actual,
      updates.estado,
      id,
    )
    return this.getById(id)
  },

  getEstadisticas() {
    const porCarrera = db
      .prepare(`
      SELECT 
        c.nombre as carrera,
        COUNT(e.id) as cantidad
      FROM estudiantes e
      LEFT JOIN carreras c ON e.carrera_id = c.id
      WHERE e.estado = 'Activo'
      GROUP BY c.nombre
    `)
      .all()

    const porTrayecto = db
      .prepare(`
      SELECT 
        trayecto_actual,
        COUNT(*) as cantidad
      FROM estudiantes 
      WHERE estado = 'Activo'
      GROUP BY trayecto_actual
    `)
      .all()

    const porEstado = db
      .prepare(`
      SELECT 
        estado,
        COUNT(*) as cantidad
      FROM estudiantes 
      GROUP BY estado
    `)
      .all()

    return { porCarrera, porTrayecto, porEstado }
  },
}

// Funciones para Profesores
export const profesoresService = {
  getAll() {
    return db
      .prepare(`
      SELECT p.*, u.username, u.email as user_email
      FROM profesores p
      LEFT JOIN usuarios u ON p.usuario_id = u.id
      ORDER BY p.created_at DESC
    `)
      .all()
  },

  getById(id: number) {
    return db
      .prepare(`
      SELECT p.*, u.username, u.email as user_email
      FROM profesores p
      LEFT JOIN usuarios u ON p.usuario_id = u.id
      WHERE p.id = ?
    `)
      .get(id)
  },

  create(profesor: any) {
    const stmt = db.prepare(`
      INSERT INTO profesores (
        cedula, nombres, apellidos, email, telefono,
        especialidad, titulo_academico, usuario_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `)

    const result = stmt.run(
      profesor.cedula,
      profesor.nombres,
      profesor.apellidos,
      profesor.email,
      profesor.telefono,
      profesor.especialidad,
      profesor.titulo_academico,
      profesor.usuario_id,
    )

    return this.getById(result.lastInsertRowid as number)
  },

  update(id: number, updates: any) {
    const stmt = db.prepare(`
      UPDATE profesores 
      SET nombres = COALESCE(?, nombres),
          apellidos = COALESCE(?, apellidos),
          email = COALESCE(?, email),
          telefono = COALESCE(?, telefono),
          especialidad = COALESCE(?, especialidad),
          titulo_academico = COALESCE(?, titulo_academico),
          estado = COALESCE(?, estado),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `)
    stmt.run(
      updates.nombres,
      updates.apellidos,
      updates.email,
      updates.telefono,
      updates.especialidad,
      updates.titulo_academico,
      updates.estado,
      id,
    )
    return this.getById(id)
  },
}

// Funciones para Materias
export const materiasService = {
  getAll() {
    return db
      .prepare(`
      SELECT m.*, c.nombre as carrera_nombre, c.codigo as carrera_codigo
      FROM materias m
      LEFT JOIN carreras c ON m.carrera_id = c.id
      ORDER BY m.trayecto, m.trimestre
    `)
      .all()
  },

  getByCarrera(carreraId: number) {
    return db
      .prepare(`
      SELECT m.*, c.nombre as carrera_nombre, c.codigo as carrera_codigo
      FROM materias m
      LEFT JOIN carreras c ON m.carrera_id = c.id
      WHERE m.carrera_id = ?
      ORDER BY m.trayecto, m.trimestre
    `)
      .all(carreraId)
  },

  create(materia: any) {
    const stmt = db.prepare(`
      INSERT INTO materias (
        nombre, codigo, creditos, horas_teoricas, horas_practicas,
        trayecto, trimestre, carrera_id, prerequisitos, descripcion
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)

    const result = stmt.run(
      materia.nombre,
      materia.codigo,
      materia.creditos,
      materia.horas_teoricas,
      materia.horas_practicas,
      materia.trayecto,
      materia.trimestre,
      materia.carrera_id,
      materia.prerequisitos,
      materia.descripcion,
    )

    return this.getById(result.lastInsertRowid as number)
  },

  getById(id: number) {
    return db
      .prepare(`
      SELECT m.*, c.nombre as carrera_nombre, c.codigo as carrera_codigo
      FROM materias m
      LEFT JOIN carreras c ON m.carrera_id = c.id
      WHERE m.id = ?
    `)
      .get(id)
  },
}

// Funciones para Inscripciones
export const inscripcionesService = {
  getAll() {
    return db
      .prepare(`
      SELECT i.*, 
             e.nombres || ' ' || e.apellidos as estudiante_nombre,
             e.cedula as estudiante_cedula,
             m.nombre as materia_nombre,
             m.codigo as materia_codigo,
             s.seccion,
             p.nombre as periodo_nombre
      FROM inscripciones i
      JOIN estudiantes e ON i.estudiante_id = e.id
      JOIN secciones s ON i.seccion_id = s.id
      JOIN materias m ON s.materia_id = m.id
      JOIN periodos_academicos p ON i.periodo_id = p.id
      ORDER BY i.created_at DESC
    `)
      .all()
  },

  getByEstudiante(estudianteId: number) {
    return db
      .prepare(`
      SELECT i.*, 
             m.nombre as materia_nombre,
             m.codigo as materia_codigo,
             s.seccion,
             p.nombre as periodo_nombre
      FROM inscripciones i
      JOIN secciones s ON i.seccion_id = s.id
      JOIN materias m ON s.materia_id = m.id
      JOIN periodos_academicos p ON i.periodo_id = p.id
      WHERE i.estudiante_id = ?
      ORDER BY i.created_at DESC
    `)
      .all(estudianteId)
  },

  create(inscripcion: any) {
    const stmt = db.prepare(`
      INSERT INTO inscripciones (estudiante_id, seccion_id, periodo_id, tipo)
      VALUES (?, ?, ?, ?)
    `)

    const result = stmt.run(inscripcion.estudiante_id, inscripcion.seccion_id, inscripcion.periodo_id, inscripcion.tipo)

    // Actualizar cupos ocupados
    db.prepare(`
      UPDATE secciones 
      SET cupos_ocupados = cupos_ocupados + 1 
      WHERE id = ?
    `).run(inscripcion.seccion_id)

    return this.getById(result.lastInsertRowid as number)
  },

  getById(id: number) {
    return db
      .prepare(`
      SELECT i.*, 
             e.nombres || ' ' || e.apellidos as estudiante_nombre,
             e.cedula as estudiante_cedula,
             m.nombre as materia_nombre,
             m.codigo as materia_codigo,
             s.seccion,
             p.nombre as periodo_nombre
      FROM inscripciones i
      JOIN estudiantes e ON i.estudiante_id = e.id
      JOIN secciones s ON i.seccion_id = s.id
      JOIN materias m ON s.materia_id = m.id
      JOIN periodos_academicos p ON i.periodo_id = p.id
      WHERE i.id = ?
    `)
      .get(id)
  },

  getEstadisticas() {
    const porTipo = db
      .prepare(`
      SELECT tipo, COUNT(*) as cantidad
      FROM inscripciones
      GROUP BY tipo
    `)
      .all()

    const porPeriodo = db
      .prepare(`
      SELECT p.nombre as periodo, COUNT(i.id) as cantidad
      FROM inscripciones i
      JOIN periodos_academicos p ON i.periodo_id = p.id
      GROUP BY p.nombre
    `)
      .all()

    return { porTipo, porPeriodo }
  },
}

// Funciones para Secciones
export const seccionesService = {
  getAll() {
    return db
      .prepare(`
      SELECT s.*, 
             m.nombre as materia_nombre,
             m.codigo as materia_codigo,
             p.nombres || ' ' || p.apellidos as profesor_nombre,
             pe.nombre as periodo_nombre
      FROM secciones s
      JOIN materias m ON s.materia_id = m.id
      LEFT JOIN profesores p ON s.profesor_id = p.id
      JOIN periodos_academicos pe ON s.periodo_id = pe.id
      ORDER BY m.nombre, s.seccion
    `)
      .all()
  },

  getByPeriodo(periodoId: number) {
    return db
      .prepare(`
      SELECT s.*, 
             m.nombre as materia_nombre,
             m.codigo as materia_codigo,
             p.nombres || ' ' || p.apellidos as profesor_nombre
      FROM secciones s
      JOIN materias m ON s.materia_id = m.id
      LEFT JOIN profesores p ON s.profesor_id = p.id
      WHERE s.periodo_id = ?
      ORDER BY m.nombre, s.seccion
    `)
      .all(periodoId)
  },

  create(seccion: any) {
    const stmt = db.prepare(`
      INSERT INTO secciones (
        materia_id, profesor_id, periodo_id, seccion,
        cupos_maximos, aula
      ) VALUES (?, ?, ?, ?, ?, ?)
    `)

    const result = stmt.run(
      seccion.materia_id,
      seccion.profesor_id,
      seccion.periodo_id,
      seccion.seccion,
      seccion.cupos_maximos,
      seccion.aula,
    )

    return this.getById(result.lastInsertRowid as number)
  },

  getById(id: number) {
    return db
      .prepare(`
      SELECT s.*, 
             m.nombre as materia_nombre,
             m.codigo as materia_codigo,
             p.nombres || ' ' || p.apellidos as profesor_nombre,
             pe.nombre as periodo_nombre
      FROM secciones s
      JOIN materias m ON s.materia_id = m.id
      LEFT JOIN profesores p ON s.profesor_id = p.id
      JOIN periodos_academicos pe ON s.periodo_id = pe.id
      WHERE s.id = ?
    `)
      .get(id)
  },
}

// Funciones para Constancias
export const constanciasService = {
  create(constancia: any) {
    const codigoVerificacion = `UNI-2024-${Math.random().toString(36).substr(2, 6).toUpperCase()}`

    const stmt = db.prepare(`
      INSERT INTO constancias (
        estudiante_id, tipo, codigo_verificacion, contenido,
        valida_hasta, ip_generacion
      ) VALUES (?, ?, ?, ?, ?, ?)
    `)

    const result = stmt.run(
      constancia.estudiante_id,
      constancia.tipo,
      codigoVerificacion,
      constancia.contenido,
      constancia.valida_hasta,
      constancia.ip_generacion,
    )

    return this.getById(result.lastInsertRowid as number)
  },

  getById(id: number) {
    return db
      .prepare(`
      SELECT c.*, 
             e.nombres || ' ' || e.apellidos as estudiante_nombre,
             e.cedula as estudiante_cedula
      FROM constancias c
      JOIN estudiantes e ON c.estudiante_id = e.id
      WHERE c.id = ?
    `)
      .get(id)
  },

  getByEstudiante(estudianteId: number) {
    return db
      .prepare(`
      SELECT * FROM constancias 
      WHERE estudiante_id = ?
      ORDER BY created_at DESC
    `)
      .all(estudianteId)
  },

  markAsDownloaded(id: number) {
    db.prepare(`
      UPDATE constancias 
      SET descargada = 1 
      WHERE id = ?
    `).run(id)
    return this.getById(id)
  },
}

// Funciones para Reportes
export const reportesService = {
  getEstudiantesGeneral() {
    return db
      .prepare(`
      SELECT 
        e.cedula,
        e.nombres || ' ' || e.apellidos as nombre_completo,
        c.nombre as carrera,
        e.trayecto_actual,
        e.trimestre_actual,
        e.estado,
        e.fecha_ingreso
      FROM estudiantes e
      LEFT JOIN carreras c ON e.carrera_id = c.id
      ORDER BY e.nombres, e.apellidos
    `)
      .all()
  },

  getEstudiantesPorCarrera() {
    return db
      .prepare(`
      SELECT 
        c.nombre as carrera,
        c.codigo,
        COUNT(e.id) as total_estudiantes,
        COUNT(CASE WHEN e.estado = 'Activo' THEN 1 END) as activos,
        COUNT(CASE WHEN e.estado = 'Pre-inscrito' THEN 1 END) as pre_inscritos
      FROM carreras c
      LEFT JOIN estudiantes e ON c.id = e.carrera_id
      GROUP BY c.id, c.nombre, c.codigo
      ORDER BY c.nombre
    `)
      .all()
  },

  getAspirantesGeneral() {
    return db
      .prepare(`
      SELECT 
        a.cedula,
        a.nombres || ' ' || a.apellidos as nombre_completo,
        c.nombre as carrera_deseada,
        a.estado,
        a.fecha_solicitud,
        a.documentos_completos
      FROM aspirantes a
      LEFT JOIN carreras c ON a.carrera_id = c.id
      ORDER BY a.fecha_solicitud DESC
    `)
      .all()
  },

  getInscripcionesReporte() {
    return db
      .prepare(`
      SELECT 
        e.cedula,
        e.nombres || ' ' || e.apellidos as estudiante,
        m.nombre as materia,
        m.codigo,
        s.seccion,
        i.tipo,
        i.estado,
        i.fecha_inscripcion
      FROM inscripciones i
      JOIN estudiantes e ON i.estudiante_id = e.id
      JOIN secciones s ON i.seccion_id = s.id
      JOIN materias m ON s.materia_id = m.id
      ORDER BY i.fecha_inscripcion DESC
    `)
      .all()
  },

  getHorariosReporte() {
    return db
      .prepare(`
      SELECT 
        m.nombre as materia,
        m.codigo,
        s.seccion,
        s.aula,
        p.nombres || ' ' || p.apellidos as profesor,
        h.dia_semana,
        h.hora_inicio,
        h.hora_fin,
        s.cupos_maximos,
        s.cupos_ocupados
      FROM secciones s
      JOIN materias m ON s.materia_id = m.id
      LEFT JOIN profesores p ON s.profesor_id = p.id
      LEFT JOIN horarios h ON s.id = h.seccion_id
      WHERE s.estado = 'Activa'
      ORDER BY m.nombre, s.seccion, h.dia_semana, h.hora_inicio
    `)
      .all()
  },

  getProfesoresReporte() {
    return db
      .prepare(`
      SELECT 
        p.cedula,
        p.nombres || ' ' || p.apellidos as nombre_completo,
        p.especialidad,
        p.titulo_academico,
        p.estado,
        COUNT(s.id) as materias_asignadas
      FROM profesores p
      LEFT JOIN secciones s ON p.id = s.profesor_id AND s.estado = 'Activa'
      GROUP BY p.id
      ORDER BY p.nombres, p.apellidos
    `)
      .all()
  },
}

// Funciones para Auditoría
export const auditoriaService = {
  registrar(
    tabla: string,
    operacion: string,
    registroId: number,
    datosAnteriores: any,
    datosNuevos: any,
    usuarioId?: number,
  ) {
    const stmt = db.prepare(`
      INSERT INTO auditoria (tabla, operacion, registro_id, datos_anteriores, datos_nuevos, usuario_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `)

    stmt.run(
      tabla,
      operacion,
      registroId,
      datosAnteriores ? JSON.stringify(datosAnteriores) : null,
      datosNuevos ? JSON.stringify(datosNuevos) : null,
      usuarioId,
    )
  },

  getHistorial(tabla?: string, limit = 100) {
    let query = `
      SELECT a.*, u.username
      FROM auditoria a
      LEFT JOIN usuarios u ON a.usuario_id = u.id
    `

    if (tabla) {
      query += ` WHERE a.tabla = '${tabla}'`
    }

    query += ` ORDER BY a.fecha DESC LIMIT ${limit}`

    return db.prepare(query).all()
  },
}

// Inicializar la base de datos al importar el módulo
initializeDatabase()

export default db
