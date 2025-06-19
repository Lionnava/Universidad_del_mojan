import { sql } from "@vercel/postgres"

// Tipos de datos
export interface Carrera {
  id: number
  nombre: string
  codigo: string
  duracion_trayectos: number
  created_at: string
  updated_at: string
}

export interface Usuario {
  id: number
  username: string
  email: string
  password_hash: string
  rol: "estudiante" | "profesor" | "analista" | "gerencial"
  activo: boolean
  ultimo_acceso?: string
  created_at: string
  updated_at: string
}

export interface Aspirante {
  id: number
  cedula: string
  nombres: string
  apellidos: string
  email?: string
  telefono?: string
  fecha_nacimiento?: string
  lugar_nacimiento?: string
  nacionalidad?: string
  estado_civil?: string
  sexo?: string
  direccion?: string
  carrera_id?: number
  modalidad_estudio?: string
  turno_preferido?: string
  nivel_educativo_anterior?: string
  institucion_procedencia?: string
  año_graduacion?: number
  promedio_anterior?: number
  trabaja?: boolean
  ocupacion?: string
  ingresos_familiares?: string
  personas_dependen?: number
  tipo_vivienda?: string
  transporte?: string
  nombre_padre?: string
  cedula_padre?: string
  telefono_padre?: string
  ocupacion_padre?: string
  nombre_madre?: string
  cedula_madre?: string
  telefono_madre?: string
  ocupacion_madre?: string
  contacto_emergencia?: string
  telefono_emergencia?: string
  estado: "Pendiente" | "Aprobado" | "Rechazado" | "En Revisión"
  fecha_solicitud: string
  documentos_completos: boolean
  usuario_id?: number
  created_at: string
  updated_at: string
}

export interface Estudiante {
  id: number
  cedula: string
  nombres: string
  apellidos: string
  email?: string
  telefono?: string
  fecha_nacimiento?: string
  direccion?: string
  carrera_id?: number
  trayecto_actual: number
  trimestre_actual: number
  estado: "Activo" | "Inactivo" | "Graduado" | "Retirado" | "Pre-inscrito"
  fecha_ingreso: string
  usuario_id?: number
  created_at: string
  updated_at: string
}

export interface Profesor {
  id: number
  cedula: string
  nombres: string
  apellidos: string
  email?: string
  telefono?: string
  especialidad?: string
  titulo_academico?: string
  estado: "Activo" | "Inactivo"
  fecha_ingreso: string
  usuario_id?: number
  created_at: string
  updated_at: string
}

export interface Materia {
  id: number
  nombre: string
  codigo: string
  creditos: number
  horas_teoricas: number
  horas_practicas: number
  trayecto: number
  trimestre: number
  carrera_id?: number
  prerequisitos?: string
  descripcion?: string
  estado: "Activa" | "Inactiva"
  created_at: string
  updated_at: string
}

export interface Constancia {
  id: number
  estudiante_id: number
  tipo: "notas" | "estudios" | "preinscripcion" | "inscripcion"
  codigo_verificacion: string
  contenido?: string
  fecha_generacion: string
  valida_hasta?: string
  descargada: boolean
  ip_generacion?: string
  created_at: string
}

// Inicializar la base de datos
export async function initializeDatabase() {
  try {
    // Crear tablas si no existen
    await createTables()
    await seedInitialData()
    console.log("Base de datos inicializada correctamente")
  } catch (error) {
    console.error("Error inicializando base de datos:", error)
  }
}

async function createTables() {
  // Tabla de carreras
  await sql`
    CREATE TABLE IF NOT EXISTS carreras (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(255) NOT NULL,
      codigo VARCHAR(10) UNIQUE NOT NULL,
      duracion_trayectos INTEGER NOT NULL DEFAULT 4,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `

  // Tabla de períodos académicos
  await sql`
    CREATE TABLE IF NOT EXISTS periodos_academicos (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(255) NOT NULL,
      fecha_inicio DATE NOT NULL,
      fecha_fin DATE NOT NULL,
      activo BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `

  // Tabla de usuarios
  await sql`
    CREATE TABLE IF NOT EXISTS usuarios (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      rol VARCHAR(20) NOT NULL CHECK (rol IN ('estudiante', 'profesor', 'analista', 'gerencial')),
      activo BOOLEAN DEFAULT TRUE,
      ultimo_acceso TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `

  // Tabla de aspirantes
  await sql`
    CREATE TABLE IF NOT EXISTS aspirantes (
      id SERIAL PRIMARY KEY,
      cedula VARCHAR(20) UNIQUE NOT NULL,
      nombres VARCHAR(255) NOT NULL,
      apellidos VARCHAR(255) NOT NULL,
      email VARCHAR(255),
      telefono VARCHAR(20),
      fecha_nacimiento DATE,
      lugar_nacimiento VARCHAR(255),
      nacionalidad VARCHAR(100),
      estado_civil VARCHAR(50),
      sexo VARCHAR(20),
      direccion TEXT,
      carrera_id INTEGER REFERENCES carreras(id),
      modalidad_estudio VARCHAR(100),
      turno_preferido VARCHAR(50),
      nivel_educativo_anterior VARCHAR(255),
      institucion_procedencia VARCHAR(255),
      año_graduacion INTEGER,
      promedio_anterior DECIMAL(4,2),
      trabaja BOOLEAN,
      ocupacion VARCHAR(255),
      ingresos_familiares VARCHAR(100),
      personas_dependen INTEGER,
      tipo_vivienda VARCHAR(100),
      transporte VARCHAR(100),
      nombre_padre VARCHAR(255),
      cedula_padre VARCHAR(20),
      telefono_padre VARCHAR(20),
      ocupacion_padre VARCHAR(255),
      nombre_madre VARCHAR(255),
      cedula_madre VARCHAR(20),
      telefono_madre VARCHAR(20),
      ocupacion_madre VARCHAR(255),
      contacto_emergencia VARCHAR(255),
      telefono_emergencia VARCHAR(20),
      estado VARCHAR(20) DEFAULT 'Pendiente' CHECK (estado IN ('Pendiente', 'Aprobado', 'Rechazado', 'En Revisión')),
      fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      documentos_completos BOOLEAN DEFAULT FALSE,
      usuario_id INTEGER REFERENCES usuarios(id),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `

  // Tabla de estudiantes
  await sql`
    CREATE TABLE IF NOT EXISTS estudiantes (
      id SERIAL PRIMARY KEY,
      cedula VARCHAR(20) UNIQUE NOT NULL,
      nombres VARCHAR(255) NOT NULL,
      apellidos VARCHAR(255) NOT NULL,
      email VARCHAR(255),
      telefono VARCHAR(20),
      fecha_nacimiento DATE,
      direccion TEXT,
      carrera_id INTEGER REFERENCES carreras(id),
      trayecto_actual INTEGER DEFAULT 1,
      trimestre_actual INTEGER DEFAULT 1,
      estado VARCHAR(20) DEFAULT 'Activo' CHECK (estado IN ('Activo', 'Inactivo', 'Graduado', 'Retirado', 'Pre-inscrito')),
      fecha_ingreso DATE DEFAULT CURRENT_DATE,
      usuario_id INTEGER REFERENCES usuarios(id),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `

  // Tabla de profesores
  await sql`
    CREATE TABLE IF NOT EXISTS profesores (
      id SERIAL PRIMARY KEY,
      cedula VARCHAR(20) UNIQUE NOT NULL,
      nombres VARCHAR(255) NOT NULL,
      apellidos VARCHAR(255) NOT NULL,
      email VARCHAR(255),
      telefono VARCHAR(20),
      especialidad VARCHAR(255),
      titulo_academico VARCHAR(255),
      estado VARCHAR(20) DEFAULT 'Activo' CHECK (estado IN ('Activo', 'Inactivo')),
      fecha_ingreso DATE DEFAULT CURRENT_DATE,
      usuario_id INTEGER REFERENCES usuarios(id),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `

  // Tabla de materias
  await sql`
    CREATE TABLE IF NOT EXISTS materias (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(255) NOT NULL,
      codigo VARCHAR(20) UNIQUE NOT NULL,
      creditos INTEGER NOT NULL,
      horas_teoricas INTEGER DEFAULT 0,
      horas_practicas INTEGER DEFAULT 0,
      trayecto INTEGER NOT NULL,
      trimestre INTEGER NOT NULL,
      carrera_id INTEGER REFERENCES carreras(id),
      prerequisitos TEXT,
      descripcion TEXT,
      estado VARCHAR(20) DEFAULT 'Activa' CHECK (estado IN ('Activa', 'Inactiva')),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `

  // Tabla de secciones
  await sql`
    CREATE TABLE IF NOT EXISTS secciones (
      id SERIAL PRIMARY KEY,
      materia_id INTEGER REFERENCES materias(id),
      profesor_id INTEGER REFERENCES profesores(id),
      periodo_id INTEGER REFERENCES periodos_academicos(id),
      seccion VARCHAR(10) NOT NULL,
      cupos_maximos INTEGER NOT NULL,
      cupos_ocupados INTEGER DEFAULT 0,
      aula VARCHAR(50),
      estado VARCHAR(20) DEFAULT 'Activa' CHECK (estado IN ('Activa', 'Cerrada', 'Cancelada')),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(materia_id, periodo_id, seccion)
    )
  `

  // Tabla de inscripciones
  await sql`
    CREATE TABLE IF NOT EXISTS inscripciones (
      id SERIAL PRIMARY KEY,
      estudiante_id INTEGER REFERENCES estudiantes(id),
      seccion_id INTEGER REFERENCES secciones(id),
      periodo_id INTEGER REFERENCES periodos_academicos(id),
      tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('Pre-inscripcion', 'Inscripcion')),
      estado VARCHAR(20) DEFAULT 'Activa' CHECK (estado IN ('Activa', 'Retirada', 'Completada')),
      fecha_inscripcion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(estudiante_id, seccion_id, periodo_id)
    )
  `

  // Tabla de constancias
  await sql`
    CREATE TABLE IF NOT EXISTS constancias (
      id SERIAL PRIMARY KEY,
      estudiante_id INTEGER REFERENCES estudiantes(id),
      tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('notas', 'estudios', 'preinscripcion', 'inscripcion')),
      codigo_verificacion VARCHAR(50) UNIQUE NOT NULL,
      contenido TEXT,
      fecha_generacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      valida_hasta DATE,
      descargada BOOLEAN DEFAULT FALSE,
      ip_generacion VARCHAR(45),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `

  // Crear índices
  await sql`CREATE INDEX IF NOT EXISTS idx_aspirantes_cedula ON aspirantes(cedula)`
  await sql`CREATE INDEX IF NOT EXISTS idx_estudiantes_cedula ON estudiantes(cedula)`
  await sql`CREATE INDEX IF NOT EXISTS idx_profesores_cedula ON profesores(cedula)`
  await sql`CREATE INDEX IF NOT EXISTS idx_materias_codigo ON materias(codigo)`
  await sql`CREATE INDEX IF NOT EXISTS idx_inscripciones_estudiante ON inscripciones(estudiante_id)`
  await sql`CREATE INDEX IF NOT EXISTS idx_usuarios_username ON usuarios(username)`
}

async function seedInitialData() {
  // Verificar si ya hay datos
  const { rows: carrerasCount } = await sql`SELECT COUNT(*) as count FROM carreras`
  if (carrerasCount[0].count > 0) return

  // Insertar carreras
  await sql`
    INSERT INTO carreras (nombre, codigo, duracion_trayectos) VALUES
    ('Ingeniería en Informática', 'INF', 4),
    ('Medicina', 'MED', 6),
    ('Derecho', 'DER', 4),
    ('Administración', 'ADM', 4),
    ('Enfermería', 'ENF', 3)
  `

  // Insertar período académico
  await sql`
    INSERT INTO periodos_academicos (nombre, fecha_inicio, fecha_fin, activo) 
    VALUES ('2024-2025', '2024-09-01', '2025-07-31', true)
  `

  // Insertar usuarios por defecto
  await sql`
    INSERT INTO usuarios (username, email, password_hash, rol) VALUES
    ('admin', 'admin@universidad.edu', 'demo_hash', 'gerencial'),
    ('analista1', 'analista@universidad.edu', 'demo_hash', 'analista'),
    ('prof_garcia', 'garcia@universidad.edu', 'demo_hash', 'profesor'),
    ('est_20123456', 'estudiante@universidad.edu', 'demo_hash', 'estudiante')
  `

  // Insertar profesores
  await sql`
    INSERT INTO profesores (cedula, nombres, apellidos, email, especialidad, titulo_academico, usuario_id) VALUES
    ('12345678', 'Juan Carlos', 'García López', 'jgarcia@universidad.edu', 'Matemáticas', 'Doctor en Matemáticas', 3),
    ('23456789', 'María Elena', 'Martínez Silva', 'mmartinez@universidad.edu', 'Programación', 'Ingeniera en Sistemas', NULL),
    ('34567890', 'Pedro Antonio', 'López Rodríguez', 'plopez@universidad.edu', 'Física', 'Doctor en Física', NULL)
  `

  // Insertar materias
  await sql`
    INSERT INTO materias (nombre, codigo, creditos, horas_teoricas, horas_practicas, trayecto, trimestre, carrera_id) VALUES
    ('Matemática I', 'MAT101', 4, 3, 2, 1, 1, 1),
    ('Programación I', 'INF101', 5, 3, 4, 1, 1, 1),
    ('Física I', 'FIS101', 4, 3, 2, 1, 2, 1),
    ('Programación II', 'INF102', 5, 3, 4, 1, 2, 1),
    ('Matemática II', 'MAT102', 4, 3, 2, 1, 2, 1),
    ('Base de Datos I', 'INF201', 4, 2, 4, 2, 1, 1),
    ('Algoritmos y Estructuras de Datos', 'INF202', 5, 3, 4, 2, 1, 1),
    ('Ingeniería de Software I', 'INF301', 4, 3, 2, 3, 1, 1)
  `

  // Insertar secciones
  await sql`
    INSERT INTO secciones (materia_id, profesor_id, periodo_id, seccion, cupos_maximos, aula) VALUES
    (1, 1, 1, 'A', 30, 'Aula 101'),
    (1, 1, 1, 'B', 30, 'Aula 102'),
    (2, 1, 1, 'A', 25, 'Lab 201'),
    (3, 3, 1, 'A', 35, 'Aula 103'),
    (6, 1, 1, 'A', 20, 'Lab 204')
  `

  // Insertar estudiantes de ejemplo
  await sql`
    INSERT INTO estudiantes (cedula, nombres, apellidos, email, telefono, carrera_id, trayecto_actual, trimestre_actual, usuario_id) VALUES
    ('20123456', 'María José', 'González Pérez', 'mgonzalez@email.com', '0412-1234567', 1, 2, 1, 4),
    ('18123456', 'Pedro José', 'Sánchez García', 'psanchez@email.com', '0412-1111111', 1, 3, 2, NULL),
    ('19234567', 'Miguel Ángel', 'Morales Sánchez', 'mmorales@email.com', '0412-5555555', 1, 1, 1, NULL)
  `

  // Insertar aspirantes de ejemplo
  await sql`
    INSERT INTO aspirantes (cedula, nombres, apellidos, email, telefono, carrera_id, estado, sexo, nacionalidad) VALUES
    ('21123456', 'Carlos Eduardo', 'Rodríguez Silva', 'crodriguez@email.com', '0414-2345678', 2, 'Pendiente', 'masculino', 'venezolana'),
    ('21234567', 'Ana Lucía', 'Martínez López', 'amartinez@email.com', '0416-3456789', 3, 'En Revisión', 'femenino', 'venezolana'),
    ('21345678', 'José Miguel', 'Hernández Torres', 'jhernandez@email.com', '0424-4567890', 1, 'Aprobado', 'masculino', 'venezolana')
  `
}

// Funciones para Carreras
export const carrerasService = {
  async getAll() {
    const { rows } = await sql`SELECT * FROM carreras ORDER BY nombre`
    return rows
  },

  async getById(id: number) {
    const { rows } = await sql`SELECT * FROM carreras WHERE id = ${id}`
    return rows[0]
  },

  async create(carrera: { nombre: string; codigo: string; duracion_trayectos: number }) {
    const { rows } = await sql`
      INSERT INTO carreras (nombre, codigo, duracion_trayectos) 
      VALUES (${carrera.nombre}, ${carrera.codigo}, ${carrera.duracion_trayectos})
      RETURNING *
    `
    return rows[0]
  },

  async update(id: number, updates: Partial<{ nombre: string; codigo: string; duracion_trayectos: number }>) {
    const { rows } = await sql`
      UPDATE carreras 
      SET nombre = COALESCE(${updates.nombre}, nombre), 
          codigo = COALESCE(${updates.codigo}, codigo), 
          duracion_trayectos = COALESCE(${updates.duracion_trayectos}, duracion_trayectos),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `
    return rows[0]
  },
}

// Funciones para Usuarios
export const usuariosService = {
  async authenticate(username: string, password: string) {
    const { rows } = await sql`
      SELECT * FROM usuarios 
      WHERE username = ${username} AND activo = true
    `

    const user = rows[0]
    if (user) {
      // Actualizar último acceso
      await sql`
        UPDATE usuarios 
        SET ultimo_acceso = CURRENT_TIMESTAMP 
        WHERE id = ${user.id}
      `
    }

    return user
  },

  async getAll() {
    const { rows } = await sql`SELECT * FROM usuarios ORDER BY created_at DESC`
    return rows
  },

  async getById(id: number) {
    const { rows } = await sql`SELECT * FROM usuarios WHERE id = ${id}`
    return rows[0]
  },

  async create(usuario: { username: string; email: string; password_hash: string; rol: string }) {
    const { rows } = await sql`
      INSERT INTO usuarios (username, email, password_hash, rol) 
      VALUES (${usuario.username}, ${usuario.email}, ${usuario.password_hash}, ${usuario.rol})
      RETURNING *
    `
    return rows[0]
  },

  async update(id: number, updates: any) {
    const { rows } = await sql`
      UPDATE usuarios 
      SET username = COALESCE(${updates.username}, username),
          email = COALESCE(${updates.email}, email),
          rol = COALESCE(${updates.rol}, rol),
          activo = COALESCE(${updates.activo}, activo),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `
    return rows[0]
  },
}

// Funciones para Aspirantes
export const aspirantesService = {
  async getAll() {
    const { rows } = await sql`
      SELECT a.*, c.nombre as carrera_nombre, c.codigo as carrera_codigo
      FROM aspirantes a
      LEFT JOIN carreras c ON a.carrera_id = c.id
      ORDER BY a.created_at DESC
    `
    return rows
  },

  async getById(id: number) {
    const { rows } = await sql`
      SELECT a.*, c.nombre as carrera_nombre, c.codigo as carrera_codigo
      FROM aspirantes a
      LEFT JOIN carreras c ON a.carrera_id = c.id
      WHERE a.id = ${id}
    `
    return rows[0]
  },

  async getByCedula(cedula: string) {
    const { rows } = await sql`
      SELECT a.*, c.nombre as carrera_nombre, c.codigo as carrera_codigo
      FROM aspirantes a
      LEFT JOIN carreras c ON a.carrera_id = c.id
      WHERE a.cedula = ${cedula}
    `
    return rows[0]
  },

  async create(aspirante: any) {
    const { rows } = await sql`
      INSERT INTO aspirantes (
        cedula, nombres, apellidos, email, telefono, fecha_nacimiento,
        lugar_nacimiento, nacionalidad, estado_civil, sexo, direccion,
        carrera_id, modalidad_estudio, turno_preferido, nivel_educativo_anterior,
        institucion_procedencia, año_graduacion, promedio_anterior,
        trabaja, ocupacion, ingresos_familiares, personas_dependen,
        tipo_vivienda, transporte, nombre_padre, cedula_padre,
        telefono_padre, ocupacion_padre, nombre_madre, cedula_madre,
        telefono_madre, ocupacion_madre, contacto_emergencia, telefono_emergencia
      ) VALUES (
        ${aspirante.cedula}, ${aspirante.nombres}, ${aspirante.apellidos}, 
        ${aspirante.email}, ${aspirante.telefono}, ${aspirante.fecha_nacimiento},
        ${aspirante.lugar_nacimiento}, ${aspirante.nacionalidad}, ${aspirante.estado_civil}, 
        ${aspirante.sexo}, ${aspirante.direccion}, ${aspirante.carrera_id}, 
        ${aspirante.modalidad_estudio}, ${aspirante.turno_preferido}, 
        ${aspirante.nivel_educativo_anterior}, ${aspirante.institucion_procedencia}, 
        ${aspirante.año_graduacion}, ${aspirante.promedio_anterior}, ${aspirante.trabaja}, 
        ${aspirante.ocupacion}, ${aspirante.ingresos_familiares}, ${aspirante.personas_dependen},
        ${aspirante.tipo_vivienda}, ${aspirante.transporte}, ${aspirante.nombre_padre}, 
        ${aspirante.cedula_padre}, ${aspirante.telefono_padre}, ${aspirante.ocupacion_padre},
        ${aspirante.nombre_madre}, ${aspirante.cedula_madre}, ${aspirante.telefono_madre}, 
        ${aspirante.ocupacion_madre}, ${aspirante.contacto_emergencia}, ${aspirante.telefono_emergencia}
      )
      RETURNING *
    `
    return rows[0]
  },

  async update(id: number, updates: any) {
    const { rows } = await sql`
      UPDATE aspirantes 
      SET estado = COALESCE(${updates.estado}, estado),
          documentos_completos = COALESCE(${updates.documentos_completos}, documentos_completos),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `
    return rows[0]
  },

  async aprobarAspirante(id: number) {
    const aspirante = await this.getById(id)
    if (!aspirante) throw new Error("Aspirante no encontrado")

    // Crear usuario para el estudiante
    const usuario = await usuariosService.create({
      username: `est_${aspirante.cedula}`,
      email: aspirante.email,
      password_hash: "demo_hash",
      rol: "estudiante",
    })

    // Crear registro de estudiante
    const estudiante = await estudiantesService.create({
      cedula: aspirante.cedula,
      nombres: aspirante.nombres,
      apellidos: aspirante.apellidos,
      email: aspirante.email,
      telefono: aspirante.telefono,
      fecha_nacimiento: aspirante.fecha_nacimiento,
      direccion: aspirante.direccion,
      carrera_id: aspirante.carrera_id,
      trayecto_actual: 1,
      trimestre_actual: 1,
      estado: "Pre-inscrito",
      usuario_id: usuario.id,
    })

    // Actualizar estado del aspirante
    await this.update(id, { estado: "Aprobado" })

    return { estudiante, usuario }
  },

  async getEstadisticas() {
    const { rows: porEstado } = await sql`
      SELECT estado, COUNT(*) as cantidad
      FROM aspirantes 
      GROUP BY estado
    `

    const { rows: porCarrera } = await sql`
      SELECT c.nombre as carrera, COUNT(a.id) as cantidad
      FROM aspirantes a
      LEFT JOIN carreras c ON a.carrera_id = c.id
      GROUP BY c.nombre
    `

    return { porEstado, porCarrera }
  },
}

// Funciones para Estudiantes
export const estudiantesService = {
  async getAll() {
    const { rows } = await sql`
      SELECT e.*, c.nombre as carrera_nombre, c.codigo as carrera_codigo,
             u.username, u.email as user_email
      FROM estudiantes e
      LEFT JOIN carreras c ON e.carrera_id = c.id
      LEFT JOIN usuarios u ON e.usuario_id = u.id
      ORDER BY e.created_at DESC
    `
    return rows
  },

  async getById(id: number) {
    const { rows } = await sql`
      SELECT e.*, c.nombre as carrera_nombre, c.codigo as carrera_codigo,
             u.username, u.email as user_email
      FROM estudiantes e
      LEFT JOIN carreras c ON e.carrera_id = c.id
      LEFT JOIN usuarios u ON e.usuario_id = u.id
      WHERE e.id = ${id}
    `
    return rows[0]
  },

  async getByCedula(cedula: string) {
    const { rows } = await sql`
      SELECT e.*, c.nombre as carrera_nombre, c.codigo as carrera_codigo,
             u.username, u.email as user_email
      FROM estudiantes e
      LEFT JOIN carreras c ON e.carrera_id = c.id
      LEFT JOIN usuarios u ON e.usuario_id = u.id
      WHERE e.cedula = ${cedula}
    `
    return rows[0]
  },

  async create(estudiante: any) {
    const { rows } = await sql`
      INSERT INTO estudiantes (
        cedula, nombres, apellidos, email, telefono, fecha_nacimiento,
        direccion, carrera_id, trayecto_actual, trimestre_actual,
        estado, usuario_id
      ) VALUES (
        ${estudiante.cedula}, ${estudiante.nombres}, ${estudiante.apellidos}, 
        ${estudiante.email}, ${estudiante.telefono}, ${estudiante.fecha_nacimiento},
        ${estudiante.direccion}, ${estudiante.carrera_id}, ${estudiante.trayecto_actual}, 
        ${estudiante.trimestre_actual}, ${estudiante.estado}, ${estudiante.usuario_id}
      )
      RETURNING *
    `
    return rows[0]
  },

  async update(id: number, updates: any) {
    const { rows } = await sql`
      UPDATE estudiantes 
      SET nombres = COALESCE(${updates.nombres}, nombres),
          apellidos = COALESCE(${updates.apellidos}, apellidos),
          email = COALESCE(${updates.email}, email),
          telefono = COALESCE(${updates.telefono}, telefono),
          direccion = COALESCE(${updates.direccion}, direccion),
          trayecto_actual = COALESCE(${updates.trayecto_actual}, trayecto_actual),
          trimestre_actual = COALESCE(${updates.trimestre_actual}, trimestre_actual),
          estado = COALESCE(${updates.estado}, estado),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `
    return rows[0]
  },

  async getEstadisticas() {
    const { rows: porCarrera } = await sql`
      SELECT c.nombre as carrera, COUNT(e.id) as cantidad
      FROM estudiantes e
      LEFT JOIN carreras c ON e.carrera_id = c.id
      WHERE e.estado = 'Activo'
      GROUP BY c.nombre
    `

    const { rows: porTrayecto } = await sql`
      SELECT trayecto_actual, COUNT(*) as cantidad
      FROM estudiantes 
      WHERE estado = 'Activo'
      GROUP BY trayecto_actual
    `

    const { rows: porEstado } = await sql`
      SELECT estado, COUNT(*) as cantidad
      FROM estudiantes 
      GROUP BY estado
    `

    return { porCarrera, porTrayecto, porEstado }
  },
}

// Funciones para Profesores
export const profesoresService = {
  async getAll() {
    const { rows } = await sql`
      SELECT p.*, u.username, u.email as user_email
      FROM profesores p
      LEFT JOIN usuarios u ON p.usuario_id = u.id
      ORDER BY p.created_at DESC
    `
    return rows
  },

  async getById(id: number) {
    const { rows } = await sql`
      SELECT p.*, u.username, u.email as user_email
      FROM profesores p
      LEFT JOIN usuarios u ON p.usuario_id = u.id
      WHERE p.id = ${id}
    `
    return rows[0]
  },

  async create(profesor: any) {
    const { rows } = await sql`
      INSERT INTO profesores (
        cedula, nombres, apellidos, email, telefono,
        especialidad, titulo_academico, usuario_id
      ) VALUES (
        ${profesor.cedula}, ${profesor.nombres}, ${profesor.apellidos}, 
        ${profesor.email}, ${profesor.telefono}, ${profesor.especialidad}, 
        ${profesor.titulo_academico}, ${profesor.usuario_id}
      )
      RETURNING *
    `
    return rows[0]
  },

  async update(id: number, updates: any) {
    const { rows } = await sql`
      UPDATE profesores 
      SET nombres = COALESCE(${updates.nombres}, nombres),
          apellidos = COALESCE(${updates.apellidos}, apellidos),
          email = COALESCE(${updates.email}, email),
          telefono = COALESCE(${updates.telefono}, telefono),
          especialidad = COALESCE(${updates.especialidad}, especialidad),
          titulo_academico = COALESCE(${updates.titulo_academico}, titulo_academico),
          estado = COALESCE(${updates.estado}, estado),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `
    return rows[0]
  },
}

// Funciones para Materias
export const materiasService = {
  async getAll() {
    const { rows } = await sql`
      SELECT m.*, c.nombre as carrera_nombre, c.codigo as carrera_codigo
      FROM materias m
      LEFT JOIN carreras c ON m.carrera_id = c.id
      ORDER BY m.trayecto, m.trimestre
    `
    return rows
  },

  async getByCarrera(carreraId: number) {
    const { rows } = await sql`
      SELECT m.*, c.nombre as carrera_nombre, c.codigo as carrera_codigo
      FROM materias m
      LEFT JOIN carreras c ON m.carrera_id = c.id
      WHERE m.carrera_id = ${carreraId}
      ORDER BY m.trayecto, m.trimestre
    `
    return rows
  },

  async create(materia: any) {
    const { rows } = await sql`
      INSERT INTO materias (
        nombre, codigo, creditos, horas_teoricas, horas_practicas,
        trayecto, trimestre, carrera_id, prerequisitos, descripcion
      ) VALUES (
        ${materia.nombre}, ${materia.codigo}, ${materia.creditos}, 
        ${materia.horas_teoricas}, ${materia.horas_practicas}, ${materia.trayecto}, 
        ${materia.trimestre}, ${materia.carrera_id}, ${materia.prerequisitos}, 
        ${materia.descripcion}
      )
      RETURNING *
    `
    return rows[0]
  },

  async getById(id: number) {
    const { rows } = await sql`
      SELECT m.*, c.nombre as carrera_nombre, c.codigo as carrera_codigo
      FROM materias m
      LEFT JOIN carreras c ON m.carrera_id = c.id
      WHERE m.id = ${id}
    `
    return rows[0]
  },
}

// Funciones para Inscripciones
export const inscripcionesService = {
  async getAll() {
    const { rows } = await sql`
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
    `
    return rows
  },

  async getByEstudiante(estudianteId: number) {
    const { rows } = await sql`
      SELECT i.*, 
             m.nombre as materia_nombre,
             m.codigo as materia_codigo,
             s.seccion,
             p.nombre as periodo_nombre
      FROM inscripciones i
      JOIN secciones s ON i.seccion_id = s.id
      JOIN materias m ON s.materia_id = m.id
      JOIN periodos_academicos p ON i.periodo_id = p.id
      WHERE i.estudiante_id = ${estudianteId}
      ORDER BY i.created_at DESC
    `
    return rows
  },

  async create(inscripcion: any) {
    const { rows } = await sql`
      INSERT INTO inscripciones (estudiante_id, seccion_id, periodo_id, tipo)
      VALUES (${inscripcion.estudiante_id}, ${inscripcion.seccion_id}, ${inscripcion.periodo_id}, ${inscripcion.tipo})
      RETURNING *
    `

    // Actualizar cupos ocupados
    await sql`
      UPDATE secciones 
      SET cupos_ocupados = cupos_ocupados + 1 
      WHERE id = ${inscripcion.seccion_id}
    `

    return rows[0]
  },

  async getById(id: number) {
    const { rows } = await sql`
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
      WHERE i.id = ${id}
    `
    return rows[0]
  },

  async getEstadisticas() {
    const { rows: porTipo } = await sql`
      SELECT tipo, COUNT(*) as cantidad
      FROM inscripciones
      GROUP BY tipo
    `

    const { rows: porPeriodo } = await sql`
      SELECT p.nombre as periodo, COUNT(i.id) as cantidad
      FROM inscripciones i
      JOIN periodos_academicos p ON i.periodo_id = p.id
      GROUP BY p.nombre
    `

    return { porTipo, porPeriodo }
  },
}

// Funciones para Constancias
export const constanciasService = {
  async create(constancia: any) {
    const codigoVerificacion = `UNI-2024-${Math.random().toString(36).substr(2, 6).toUpperCase()}`

    const { rows } = await sql`
      INSERT INTO constancias (
        estudiante_id, tipo, codigo_verificacion, contenido,
        valida_hasta, ip_generacion
      ) VALUES (
        ${constancia.estudiante_id}, ${constancia.tipo}, ${codigoVerificacion}, 
        ${constancia.contenido}, ${constancia.valida_hasta}, ${constancia.ip_generacion}
      )
      RETURNING *
    `
    return rows[0]
  },

  async getById(id: number) {
    const { rows } = await sql`
      SELECT c.*, 
             e.nombres || ' ' || e.apellidos as estudiante_nombre,
             e.cedula as estudiante_cedula
      FROM constancias c
      JOIN estudiantes e ON c.estudiante_id = e.id
      WHERE c.id = ${id}
    `
    return rows[0]
  },

  async getByEstudiante(estudianteId: number) {
    const { rows } = await sql`
      SELECT * FROM constancias 
      WHERE estudiante_id = ${estudianteId}
      ORDER BY created_at DESC
    `
    return rows
  },

  async markAsDownloaded(id: number) {
    const { rows } = await sql`
      UPDATE constancias 
      SET descargada = true 
      WHERE id = ${id}
      RETURNING *
    `
    return rows[0]
  },
}

// Funciones para Reportes
export const reportesService = {
  async getEstudiantesGeneral() {
    const { rows } = await sql`
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
    `
    return rows
  },

  async getEstudiantesPorCarrera() {
    const { rows } = await sql`
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
    `
    return rows
  },

  async getAspirantesGeneral() {
    const { rows } = await sql`
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
    `
    return rows
  },

  async getInscripcionesReporte() {
    const { rows } = await sql`
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
    `
    return rows
  },

  async getProfesoresReporte() {
    const { rows } = await sql`
      SELECT 
        p.cedula,
        p.nombres || ' ' || p.apellidos as nombre_completo,
        p.especialidad,
        p.titulo_academico,
        p.estado,
        COUNT(s.id) as materias_asignadas
      FROM profesores p
      LEFT JOIN secciones s ON p.id = s.profesor_id AND s.estado = 'Activa'
      GROUP BY p.id, p.cedula, p.nombres, p.apellidos, p.especialidad, p.titulo_academico, p.estado
      ORDER BY p.nombres, p.apellidos
    `
    return rows
  },
}

// Funciones para Estadísticas
export const estadisticasService = {
  async getResumenGeneral() {
    const { rows: estudiantes } = await sql`SELECT COUNT(*) as count FROM estudiantes`
    const { rows: profesores } = await sql`SELECT COUNT(*) as count FROM profesores`
    const { rows: materias } = await sql`SELECT COUNT(*) as count FROM materias`
    const { rows: aspirantes } = await sql`SELECT COUNT(*) as count FROM aspirantes`

    return {
      estudiantes: estudiantes[0].count,
      profesores: profesores[0].count,
      materias: materias[0].count,
      aspirantes: aspirantes[0].count,
    }
  },

  async getEstudiantesPorCarrera() {
    const { rows } = await sql`
      SELECT c.nombre, COUNT(e.id) as cantidad
      FROM carreras c
      LEFT JOIN estudiantes e ON c.id = e.carrera_id
      GROUP BY c.nombre
    `

    const result: { [key: string]: number } = {}
    rows.forEach((row: any) => {
      result[row.nombre] = Number.parseInt(row.cantidad)
    })

    return result
  },

  async getEstudiantesPorTrayecto() {
    const { rows } = await sql`
      SELECT trayecto_actual, COUNT(*) as cantidad
      FROM estudiantes 
      GROUP BY trayecto_actual
    `

    const result: { [key: string]: number } = {}
    rows.forEach((row: any) => {
      result[`Trayecto ${row.trayecto_actual}`] = Number.parseInt(row.cantidad)
    })

    return result
  },
}
