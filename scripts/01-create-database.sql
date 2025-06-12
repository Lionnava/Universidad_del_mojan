-- Crear base de datos del sistema universitario
-- Script de creación de tablas principales

-- Tabla de carreras
CREATE TABLE carreras (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    codigo VARCHAR(10) UNIQUE NOT NULL,
    duracion_trayectos INTEGER NOT NULL DEFAULT 4,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de períodos académicos
CREATE TABLE periodos_academicos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    activo BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de aspirantes
CREATE TABLE aspirantes (
    id SERIAL PRIMARY KEY,
    cedula VARCHAR(20) UNIQUE NOT NULL,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    telefono VARCHAR(20),
    fecha_nacimiento DATE,
    direccion TEXT,
    carrera_id INTEGER REFERENCES carreras(id),
    estado VARCHAR(20) DEFAULT 'Pendiente', -- Pendiente, Aprobado, Rechazado, En Revisión
    fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    documentos_completos BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de estudiantes
CREATE TABLE estudiantes (
    id SERIAL PRIMARY KEY,
    cedula VARCHAR(20) UNIQUE NOT NULL,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    telefono VARCHAR(20),
    fecha_nacimiento DATE,
    direccion TEXT,
    carrera_id INTEGER REFERENCES carreras(id),
    trayecto_actual INTEGER DEFAULT 1,
    trimestre_actual INTEGER DEFAULT 1,
    estado VARCHAR(20) DEFAULT 'Activo', -- Activo, Inactivo, Graduado, Retirado
    fecha_ingreso DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de profesores
CREATE TABLE profesores (
    id SERIAL PRIMARY KEY,
    cedula VARCHAR(20) UNIQUE NOT NULL,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    telefono VARCHAR(20),
    especialidad VARCHAR(100),
    titulo_academico VARCHAR(100),
    estado VARCHAR(20) DEFAULT 'Activo', -- Activo, Inactivo
    fecha_ingreso DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de materias
CREATE TABLE materias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    creditos INTEGER NOT NULL,
    horas_teoricas INTEGER DEFAULT 0,
    horas_practicas INTEGER DEFAULT 0,
    trayecto INTEGER NOT NULL,
    trimestre INTEGER NOT NULL,
    carrera_id INTEGER REFERENCES carreras(id),
    prerequisitos TEXT, -- JSON con IDs de materias prerequisito
    descripcion TEXT,
    estado VARCHAR(20) DEFAULT 'Activa', -- Activa, Inactiva
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de secciones
CREATE TABLE secciones (
    id SERIAL PRIMARY KEY,
    materia_id INTEGER REFERENCES materias(id),
    profesor_id INTEGER REFERENCES profesores(id),
    periodo_id INTEGER REFERENCES periodos_academicos(id),
    seccion VARCHAR(5) NOT NULL, -- A, B, C, etc.
    cupos_maximos INTEGER NOT NULL,
    cupos_ocupados INTEGER DEFAULT 0,
    aula VARCHAR(50),
    estado VARCHAR(20) DEFAULT 'Activa', -- Activa, Cerrada, Cancelada
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(materia_id, periodo_id, seccion)
);

-- Tabla de horarios
CREATE TABLE horarios (
    id SERIAL PRIMARY KEY,
    seccion_id INTEGER REFERENCES secciones(id),
    dia_semana INTEGER NOT NULL, -- 1=Lunes, 2=Martes, etc.
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de inscripciones
CREATE TABLE inscripciones (
    id SERIAL PRIMARY KEY,
    estudiante_id INTEGER REFERENCES estudiantes(id),
    seccion_id INTEGER REFERENCES secciones(id),
    periodo_id INTEGER REFERENCES periodos_academicos(id),
    tipo VARCHAR(20) NOT NULL, -- Pre-inscripcion, Inscripcion
    estado VARCHAR(20) DEFAULT 'Activa', -- Activa, Retirada, Completada
    fecha_inscripcion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(estudiante_id, seccion_id, periodo_id)
);

-- Tabla de evaluaciones
CREATE TABLE evaluaciones (
    id SERIAL PRIMARY KEY,
    seccion_id INTEGER REFERENCES secciones(id),
    nombre VARCHAR(100) NOT NULL,
    tipo VARCHAR(50) NOT NULL, -- Parcial, Final, Proyecto, Tarea, etc.
    fecha_evaluacion DATE,
    ponderacion DECIMAL(5,2) NOT NULL, -- Porcentaje de la nota final
    descripcion TEXT,
    estado VARCHAR(20) DEFAULT 'Programada', -- Programada, En Curso, Finalizada
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de calificaciones
CREATE TABLE calificaciones (
    id SERIAL PRIMARY KEY,
    evaluacion_id INTEGER REFERENCES evaluaciones(id),
    estudiante_id INTEGER REFERENCES estudiantes(id),
    nota DECIMAL(4,2), -- Nota sobre 20
    observaciones TEXT,
    fecha_calificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(evaluacion_id, estudiante_id)
);

-- Crear índices para mejorar rendimiento
CREATE INDEX idx_aspirantes_cedula ON aspirantes(cedula);
CREATE INDEX idx_estudiantes_cedula ON estudiantes(cedula);
CREATE INDEX idx_profesores_cedula ON profesores(cedula);
CREATE INDEX idx_materias_codigo ON materias(codigo);
CREATE INDEX idx_inscripciones_estudiante ON inscripciones(estudiante_id);
CREATE INDEX idx_inscripciones_seccion ON inscripciones(seccion_id);
CREATE INDEX idx_calificaciones_evaluacion ON calificaciones(evaluacion_id);
CREATE INDEX idx_calificaciones_estudiante ON calificaciones(estudiante_id);
