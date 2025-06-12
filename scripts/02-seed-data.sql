-- Insertar datos de ejemplo para el sistema universitario

-- Insertar carreras
INSERT INTO carreras (nombre, codigo, duracion_trayectos) VALUES
('Ingeniería en Informática', 'INF', 4),
('Medicina', 'MED', 6),
('Derecho', 'DER', 4),
('Administración', 'ADM', 4),
('Enfermería', 'ENF', 3);

-- Insertar período académico actual
INSERT INTO periodos_academicos (nombre, fecha_inicio, fecha_fin, activo) VALUES
('2024-2025', '2024-09-01', '2025-07-31', TRUE);

-- Insertar profesores
INSERT INTO profesores (cedula, nombres, apellidos, email, especialidad, titulo_academico) VALUES
('12345678', 'Juan Carlos', 'García López', 'jgarcia@universidad.edu', 'Matemáticas', 'Doctor en Matemáticas'),
('23456789', 'María Elena', 'Martínez Silva', 'mmartinez@universidad.edu', 'Programación', 'Ingeniera en Sistemas'),
('34567890', 'Pedro Antonio', 'López Rodríguez', 'plopez@universidad.edu', 'Física', 'Doctor en Física'),
('45678901', 'Ana Sofía', 'Hernández Díaz', 'ahernandez@universidad.edu', 'Química', 'Doctora en Química'),
('56789012', 'Carlos Miguel', 'Sánchez Torres', 'csanchez@universidad.edu', 'Derecho Civil', 'Abogado Especialista');

-- Insertar materias para Ingeniería en Informática
INSERT INTO materias (nombre, codigo, creditos, horas_teoricas, horas_practicas, trayecto, trimestre, carrera_id) VALUES
('Matemática I', 'MAT101', 4, 3, 2, 1, 1, 1),
('Programación I', 'INF101', 5, 3, 4, 1, 1, 1),
('Física I', 'FIS101', 4, 3, 2, 1, 2, 1),
('Programación II', 'INF102', 5, 3, 4, 1, 2, 1),
('Matemática II', 'MAT102', 4, 3, 2, 1, 2, 1),
('Base de Datos I', 'INF201', 4, 2, 4, 2, 1, 1),
('Algoritmos y Estructuras de Datos', 'INF202', 5, 3, 4, 2, 1, 1),
('Ingeniería de Software I', 'INF301', 4, 3, 2, 3, 1, 1);

-- Insertar secciones para el período actual
INSERT INTO secciones (materia_id, profesor_id, periodo_id, seccion, cupos_maximos, aula) VALUES
(1, 1, 1, 'A', 30, 'Aula 101'), -- Matemática I - Sección A
(1, 1, 1, 'B', 30, 'Aula 102'), -- Matemática I - Sección B
(2, 2, 1, 'A', 25, 'Lab 201'),  -- Programación I - Sección A
(2, 2, 1, 'B', 25, 'Lab 202'),  -- Programación I - Sección B
(3, 3, 1, 'A', 35, 'Aula 103'), -- Física I - Sección A
(4, 2, 1, 'A', 25, 'Lab 203'),  -- Programación II - Sección A
(5, 1, 1, 'A', 30, 'Aula 104'), -- Matemática II - Sección A
(6, 2, 1, 'A', 20, 'Lab 204'),  -- Base de Datos I - Sección A
(7, 2, 1, 'A', 25, 'Lab 205'),  -- Algoritmos y Estructuras - Sección A
(8, 2, 1, 'A', 30, 'Aula 105'); -- Ingeniería de Software I - Sección A

-- Insertar horarios para las secciones
INSERT INTO horarios (seccion_id, dia_semana, hora_inicio, hora_fin) VALUES
-- Matemática I - Sección A (Lunes, Miércoles, Viernes)
(1, 1, '08:00', '10:00'), -- Lunes
(1, 3, '08:00', '10:00'), -- Miércoles
(1, 5, '08:00', '10:00'), -- Viernes
-- Programación I - Sección A (Martes, Jueves)
(3, 2, '10:00', '12:00'), -- Martes
(3, 4, '10:00', '12:00'), -- Jueves
-- Física I - Sección A (Lunes, Miércoles)
(5, 1, '14:00', '16:00'), -- Lunes
(5, 3, '14:00', '16:00'); -- Miércoles

-- Insertar aspirantes de ejemplo
INSERT INTO aspirantes (cedula, nombres, apellidos, email, telefono, carrera_id, estado) VALUES
('20123456', 'María José', 'González Pérez', 'mgonzalez@email.com', '0412-1234567', 1, 'Pendiente'),
('20234567', 'Carlos Eduardo', 'Rodríguez Silva', 'crodriguez@email.com', '0414-2345678', 2, 'Aprobado'),
('20345678', 'Ana Lucía', 'Martínez López', 'amartinez@email.com', '0416-3456789', 3, 'En Revisión'),
('20456789', 'José Miguel', 'Hernández Torres', 'jhernandez@email.com', '0424-4567890', 1, 'Aprobado'),
('20567890', 'Laura Patricia', 'Díaz Morales', 'ldiaz@email.com', '0412-5678901', 4, 'Pendiente');

-- Insertar estudiantes activos
INSERT INTO estudiantes (cedula, nombres, apellidos, email, telefono, carrera_id, trayecto_actual, trimestre_actual) VALUES
('18123456', 'Pedro José', 'Sánchez García', 'psanchez@email.com', '0412-1111111', 1, 3, 2),
('18234567', 'Laura María', 'Díaz Rodríguez', 'ldiaz2@email.com', '0414-2222222', 2, 2, 1),
('18345678', 'José Antonio', 'López Martínez', 'jlopez@email.com', '0416-3333333', 3, 1, 3),
('19123456', 'Carmen Elena', 'Torres Hernández', 'ctorres@email.com', '0424-4444444', 1, 2, 2),
('19234567', 'Miguel Ángel', 'Morales Sánchez', 'mmorales@email.com', '0412-5555555', 1, 1, 1);

-- Insertar inscripciones para estudiantes
INSERT INTO inscripciones (estudiante_id, seccion_id, periodo_id, tipo) VALUES
(5, 1, 1, 'Inscripcion'), -- Miguel en Matemática I
(5, 3, 1, 'Inscripcion'), -- Miguel en Programación I
(4, 6, 1, 'Inscripcion'), -- Carmen en Base de Datos I
(4, 7, 1, 'Inscripcion'), -- Carmen en Algoritmos
(1, 8, 1, 'Inscripcion'); -- Pedro en Ingeniería de Software I

-- Actualizar cupos ocupados en secciones
UPDATE secciones SET cupos_ocupados = 1 WHERE id IN (1, 3, 6, 7, 8);

-- Insertar evaluaciones
INSERT INTO evaluaciones (seccion_id, nombre, tipo, fecha_evaluacion, ponderacion) VALUES
(1, 'Primer Parcial', 'Parcial', '2024-10-15', 25.00),
(1, 'Segundo Parcial', 'Parcial', '2024-11-15', 25.00),
(1, 'Proyecto Final', 'Proyecto', '2024-12-10', 30.00),
(1, 'Examen Final', 'Final', '2024-12-20', 20.00),
(3, 'Primer Parcial', 'Parcial', '2024-10-20', 20.00),
(3, 'Proyecto 1', 'Proyecto', '2024-11-10', 25.00),
(3, 'Proyecto 2', 'Proyecto', '2024-12-05', 25.00),
(3, 'Examen Final', 'Final', '2024-12-18', 30.00);

-- Insertar algunas calificaciones de ejemplo
INSERT INTO calificaciones (evaluacion_id, estudiante_id, nota) VALUES
(1, 5, 18.00), -- Miguel - Primer Parcial Matemática I
(5, 5, 17.50), -- Miguel - Primer Parcial Programación I
(2, 4, 16.00), -- Carmen - evaluación en Base de Datos
(3, 1, 19.00); -- Pedro - evaluación en Ingeniería de Software
