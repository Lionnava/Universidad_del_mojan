-- =================================================================
-- VERSIÓN REFACTORIZADA DEL ESQUEMA DE BASE DE DATOS
-- Archivo: 01-create-database.sql
-- =================================================================

-- ========= TIPOS DE DATOS PERSONALIZADOS (ENUMs) =========
-- Garantizan la consistencia de los datos de estado en toda la aplicación.
CREATE TYPE public.rol_nombre AS ENUM ('admin', 'gerencial', 'analista', 'docente', 'estudiante');
CREATE TYPE public.aspirante_estado AS ENUM ('Pendiente', 'Aprobado', 'Rechazado', 'En Revisión');
CREATE TYPE public.estudiante_estado AS ENUM ('Activo', 'Inactivo', 'Graduado', 'Retirado');
CREATE TYPE public.profesor_estado AS ENUM ('Activo', 'Inactivo');
CREATE TYPE public.materia_estado AS ENUM ('Activa', 'Inactiva');
CREATE TYPE public.periodo_estado AS ENUM ('PROXIMAMENTE', 'PLANIFICACION', 'ABIERTO', 'CERRADO', 'FINALIZADO');
CREATE TYPE public.seccion_estado AS ENUM ('Activa', 'Cerrada', 'Cancelada');
CREATE TYPE public.inscripcion_estado AS ENUM ('INSCRITO', 'CURSANDO', 'RETIRADO', 'APROBADO', 'REPROBADO');
CREATE TYPE public.evaluacion_estado AS ENUM ('Programada', 'En Curso', 'Finalizada');


-- ========= TABLAS PRINCIPALES =========

-- Tabla de Roles (Mantenida por simplicidad, aunque Supabase también lo maneja)
CREATE TABLE IF NOT EXISTS public.roles (
    id SERIAL PRIMARY KEY,
    nombre public.rol_nombre NOT NULL UNIQUE
);

-- Tabla de Carreras
CREATE TABLE IF NOT EXISTS public.carreras (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    codigo VARCHAR(10) UNIQUE NOT NULL,
    duracion_trayectos INTEGER NOT NULL DEFAULT 4,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla de Períodos Académicos
CREATE TABLE IF NOT EXISTS public.periodos_academicos (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    estado public.periodo_estado NOT NULL DEFAULT 'PROXIMAMENTE',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla de Aspirantes (No requiere autenticación)
CREATE TABLE IF NOT EXISTS public.aspirantes (
    id SERIAL PRIMARY KEY,
    cedula VARCHAR(20) UNIQUE NOT NULL,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    telefono VARCHAR(20),
    carrera_id INTEGER NOT NULL REFERENCES public.carreras(id),
    estado public.aspirante_estado DEFAULT 'Pendiente',
    documentos_completos BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla de Profesores (Vinculada a auth.users)
CREATE TABLE IF NOT EXISTS public.profesores (
    id SERIAL PRIMARY KEY,
    usuario_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    cedula VARCHAR(20) UNIQUE NOT NULL,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    especialidad VARCHAR(100),
    estado public.profesor_estado DEFAULT 'Activo',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla de Estudiantes (Vinculada a auth.users)
CREATE TABLE IF NOT EXISTS public.estudiantes (
    id SERIAL PRIMARY KEY,
    usuario_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    cedula VARCHAR(20) UNIQUE NOT NULL,
    carrera_id INTEGER NOT NULL REFERENCES public.carreras(id),
    trayecto_actual INTEGER DEFAULT 1,
    trimestre_actual INTEGER DEFAULT 1,
    estado public.estudiante_estado DEFAULT 'Activo',
    fecha_ingreso DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla de Materias
CREATE TABLE IF NOT EXISTS public.materias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    creditos INTEGER NOT NULL,
    trayecto INTEGER NOT NULL,
    trimestre INTEGER NOT NULL,
    carrera_id INTEGER NOT NULL REFERENCES public.carreras(id),
    descripcion TEXT,
    estado public.materia_estado DEFAULT 'Activa',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla de Unión para Prerequisitos de Materias (Mejora #3)
CREATE TABLE IF NOT EXISTS public.materia_prerequisitos (
    materia_id INT NOT NULL REFERENCES public.materias(id) ON DELETE CASCADE,
    prerequisito_id INT NOT NULL REFERENCES public.materias(id) ON DELETE CASCADE,
    PRIMARY KEY (materia_id, prerequisito_id)
);

-- Tabla de Secciones
CREATE TABLE IF NOT EXISTS public.secciones (
    id SERIAL PRIMARY KEY,
    materia_id INTEGER NOT NULL REFERENCES public.materias(id),
    profesor_id INTEGER REFERENCES public.profesores(id) ON DELETE SET NULL,
    periodo_id INTEGER NOT NULL REFERENCES public.periodos_academicos(id) ON DELETE CASCADE,
    codigo_seccion VARCHAR(5) NOT NULL, -- A, B, C, etc.
    cupos INTEGER NOT NULL,
    aula VARCHAR(50),
    estado public.seccion_estado DEFAULT 'Activa',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(materia_id, periodo_id, codigo_seccion)
);

-- Tabla de Horarios (Tu diseño robusto, ¡mantenido!)
CREATE TABLE IF NOT EXISTS public.horarios (
    id SERIAL PRIMARY KEY,
    seccion_id INTEGER NOT NULL REFERENCES public.secciones(id) ON DELETE CASCADE,
    dia_semana INTEGER NOT NULL, -- 1=Lunes, 7=Domingo
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla de Inscripciones (Corregida y mejorada)
CREATE TABLE IF NOT EXISTS public.inscripciones (
    id SERIAL PRIMARY KEY,
    estudiante_id INTEGER NOT NULL REFERENCES public.estudiantes(id) ON DELETE CASCADE,
    seccion_id INTEGER NOT NULL REFERENCES public.secciones(id) ON DELETE CASCADE,
    estado public.inscripcion_estado DEFAULT 'INSCRITO',
    nota_definitiva DECIMAL(4,2),
    fecha_inscripcion TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(estudiante_id, seccion_id)
);

-- Tabla de Evaluaciones
CREATE TABLE IF NOT EXISTS public.evaluaciones (
    id SERIAL PRIMARY KEY,
    seccion_id INTEGER NOT NULL REFERENCES public.secciones(id) ON DELETE CASCADE,
    nombre VARCHAR(100) NOT NULL,
    fecha_evaluacion DATE,
    ponderacion DECIMAL(5,2) NOT NULL,
    estado public.evaluacion_estado DEFAULT 'Programada',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla de Calificaciones
CREATE TABLE IF NOT EXISTS public.calificaciones (
    id SERIAL PRIMARY KEY,
    evaluacion_id INTEGER NOT NULL REFERENCES public.evaluaciones(id) ON DELETE CASCADE,
    estudiante_id INTEGER NOT NULL REFERENCES public.estudiantes(id) ON DELETE CASCADE,
    nota DECIMAL(4,2),
    fecha_calificacion TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(evaluacion_id, estudiante_id)
);

-- ========= ÍNDICES PARA MEJORAR RENDIMIENTO =========
CREATE INDEX IF NOT EXISTS idx_aspirantes_cedula ON aspirantes(cedula);
CREATE INDEX IF NOT EXISTS idx_estudiantes_cedula ON estudiantes(cedula);
CREATE INDEX IF NOT EXISTS idx_profesores_cedula ON profesores(cedula);
CREATE INDEX IF NOT EXISTS idx_materias_codigo ON materias(codigo);
CREATE INDEX IF NOT EXISTS idx_inscripciones_estudiante ON inscripciones(estudiante_id);
CREATE INDEX IF NOT EXISTS idx_inscripciones_seccion ON inscripciones(seccion_id);
CREATE INDEX IF NOT EXISTS idx_calificaciones_evaluacion ON calificaciones(evaluacion_id);
CREATE INDEX IF NOT EXISTS idx_calificaciones_estudiante ON calificaciones(estudiante_id);
