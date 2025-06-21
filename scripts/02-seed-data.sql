-- =================================================================
-- VERSIÓN REFACTORIZADA DEL SCRIPT DE DATOS INICIALES
-- Archivo: 02-seed-data.sql
-- Compatible con el nuevo esquema de 01-create-database.sql
-- =================================================================

-- Usamos ON CONFLICT DO NOTHING para evitar errores si el script se corre múltiples veces.

-- Insertar roles
INSERT INTO public.roles (nombre) VALUES ('admin'), ('gerencial'), ('analista'), ('docente'), ('estudiante')
ON CONFLICT (nombre) DO NOTHING;

-- Insertar carreras
INSERT INTO public.carreras (nombre, codigo, duracion_trayectos) VALUES
('Ingeniería en Informática', 'INF', 4),
('Medicina', 'MED', 6),
('Derecho', 'DER', 4),
('Administración', 'ADM', 4),
('Enfermería', 'ENF', 3)
ON CONFLICT (codigo) DO NOTHING;

-- Insertar períodos académicos (ahora con ENUM y código)
INSERT INTO public.periodos_academicos (codigo, nombre, fecha_inicio, fecha_fin, estado) VALUES
('2024-T3', 'Trimestre III 2024', '2024-09-01', '2024-12-20', 'ABIERTO'),
('2025-T1', 'Trimestre I 2025', '2025-01-15', '2025-04-12', 'PROXIMAMENTE')
ON CONFLICT (codigo) DO NOTHING;

-- NOTA: La inserción de profesores y estudiantes ahora depende de que existan usuarios en `auth.users`.
-- Esto se debe hacer desde la aplicación o con un script de JS después de que los usuarios se registren.
-- Por ahora, dejaremos estas inserciones comentadas o las eliminamos para evitar errores.
-- Si tienes usuarios de prueba en Supabase, puedes descomentar y reemplazar los UUIDs.

/* -- Ejemplo de cómo insertar un profesor y un estudiante (necesitas los UUIDs de Supabase)
INSERT INTO public.profesores (usuario_id, cedula, nombres, apellidos, especialidad, estado) VALUES
('uuid-del-profesor-de-supabase', '12345678', 'Juan Carlos', 'García López', 'Matemáticas', 'Activo')
ON CONFLICT (cedula) DO NOTHING;

INSERT INTO public.estudiantes (usuario_id, cedula, carrera_id, trayecto_actual, trimestre_actual, estado) VALUES
('uuid-del-estudiante-de-supabase', '18123456', 1, 3, 2, 'Activo')
ON CONFLICT (cedula) DO NOTHING;
*/

-- Insertar materias para Ingeniería en Informática
INSERT INTO public.materias (nombre, codigo, creditos, trayecto, trimestre, carrera_id) VALUES
('Matemática I', 'MAT101', 4, 1, 1, 1),
('Programación I', 'INF101', 5, 1, 1, 1),
('Física I', 'FIS101', 4, 1, 2, 1),
('Programación II', 'INF102', 5, 1, 2, 1),
('Matemática II', 'MAT102', 4, 1, 2, 1),
('Base de Datos I', 'INF201', 4, 2, 1, 1),
('Algoritmos y Estructuras de Datos', 'INF202', 5, 2, 1, 1),
('Ingeniería de Software I', 'INF301', 4, 3, 1, 1)
ON CONFLICT (codigo) DO NOTHING;

-- Insertar prerequisitos (Mejora #3)
-- Programación II (ID 4) requiere Programación I (ID 2)
INSERT INTO public.materia_prerequisitos (materia_id, prerequisito_id) VALUES (4, 2)
ON CONFLICT DO NOTHING;
-- Matemática II (ID 5) requiere Matemática I (ID 1)
INSERT INTO public.materia_prerequisitos (materia_id, prerequisito_id) VALUES (5, 1)
ON CONFLICT DO NOTHING;


-- NO PODEMOS INSERTAR SECCIONES, INSCRIPCIONES, ETC. AÚN
-- Porque dependen de IDs de profesores y estudiantes que no hemos creado.
-- Lo haremos desde la aplicación.


-- Insertar aspirantes de ejemplo (esta tabla no depende de usuarios, está bien)
INSERT INTO public.aspirantes (cedula, nombres, apellidos, email, telefono, carrera_id, estado) VALUES
('20123456', 'María José', 'González Pérez', 'mgonzalez@email.com', '0412-1234567', 1, 'Pendiente'),
('20234567', 'Carlos Eduardo', 'Rodríguez Silva', 'crodriguez@email.com', '0414-2345678', 2, 'Aprobado'),
('20345678', 'Ana Lucía', 'Martínez López', 'amartinez@email.com', '0416-3456789', 3, 'En Revisión')
ON CONFLICT (cedula) DO NOTHING;
