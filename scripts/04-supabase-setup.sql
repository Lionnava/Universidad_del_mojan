-- Script para configurar Supabase con el sistema universitario
-- Ejecutar después de crear el proyecto en Supabase

-- Habilitar Row Level Security (RLS) en todas las tablas
ALTER TABLE carreras ENABLE ROW LEVEL SECURITY;
ALTER TABLE periodos_academicos ENABLE ROW LEVEL SECURITY;
ALTER TABLE aspirantes ENABLE ROW LEVEL SECURITY;
ALTER TABLE estudiantes ENABLE ROW LEVEL SECURITY;
ALTER TABLE profesores ENABLE ROW LEVEL SECURITY;
ALTER TABLE materias ENABLE ROW LEVEL SECURITY;
ALTER TABLE secciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE horarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE inscripciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluaciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE calificaciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE constancias ENABLE ROW LEVEL SECURITY;
ALTER TABLE auditoria ENABLE ROW LEVEL SECURITY;
ALTER TABLE configuracion_sistema ENABLE ROW LEVEL SECURITY;
ALTER TABLE notificaciones ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad para usuarios
CREATE POLICY "Los usuarios pueden ver su propia información" ON usuarios
    FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Solo administradores pueden crear usuarios" ON usuarios
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM usuarios 
            WHERE id::text = auth.uid()::text 
            AND rol IN ('gerencial', 'analista')
        )
    );

-- Políticas para estudiantes
CREATE POLICY "Los estudiantes pueden ver su propia información" ON estudiantes
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM usuarios 
            WHERE id = estudiantes.usuario_id 
            AND id::text = auth.uid()::text
        )
        OR
        EXISTS (
            SELECT 1 FROM usuarios 
            WHERE id::text = auth.uid()::text 
            AND rol IN ('gerencial', 'analista', 'profesor')
        )
    );

CREATE POLICY "Solo administradores pueden modificar estudiantes" ON estudiantes
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM usuarios 
            WHERE id::text = auth.uid()::text 
            AND rol IN ('gerencial', 'analista')
        )
    );

-- Políticas para profesores
CREATE POLICY "Los profesores pueden ver su propia información" ON profesores
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM usuarios 
            WHERE id = profesores.usuario_id 
            AND id::text = auth.uid()::text
        )
        OR
        EXISTS (
            SELECT 1 FROM usuarios 
            WHERE id::text = auth.uid()::text 
            AND rol IN ('gerencial', 'analista')
        )
    );

-- Políticas para constancias
CREATE POLICY "Los estudiantes pueden ver sus propias constancias" ON constancias
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM estudiantes e
            JOIN usuarios u ON e.usuario_id = u.id
            WHERE e.id = constancias.estudiante_id 
            AND u.id::text = auth.uid()::text
        )
        OR
        EXISTS (
            SELECT 1 FROM usuarios 
            WHERE id::text = auth.uid()::text 
            AND rol IN ('gerencial', 'analista')
        )
    );

-- Políticas para calificaciones
CREATE POLICY "Los estudiantes pueden ver sus propias calificaciones" ON calificaciones
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM estudiantes e
            JOIN usuarios u ON e.usuario_id = u.id
            WHERE e.id = calificaciones.estudiante_id 
            AND u.id::text = auth.uid()::text
        )
        OR
        EXISTS (
            SELECT 1 FROM usuarios 
            WHERE id::text = auth.uid()::text 
            AND rol IN ('gerencial', 'analista', 'profesor')
        )
    );

-- Función para obtener el rol del usuario actual
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS TEXT AS $$
BEGIN
    RETURN (
        SELECT rol FROM usuarios 
        WHERE id::text = auth.uid()::text
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para verificar si el usuario es administrador
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (
        SELECT rol IN ('gerencial', 'analista') FROM usuarios 
        WHERE id::text = auth.uid()::text
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para obtener estadísticas generales
CREATE OR REPLACE FUNCTION get_general_stats()
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'estudiantes_activos', (SELECT COUNT(*) FROM estudiantes WHERE estado = 'Activo'),
        'aspirantes_pendientes', (SELECT COUNT(*) FROM aspirantes WHERE estado = 'Pendiente'),
        'profesores_activos', (SELECT COUNT(*) FROM profesores WHERE estado = 'Activo'),
        'materias_activas', (SELECT COUNT(*) FROM materias WHERE estado = 'Activa'),
        'evaluaciones_pendientes', (
            SELECT COUNT(*) FROM evaluaciones e
            JOIN secciones s ON e.seccion_id = s.id
            WHERE e.estado = 'Programada'
        ),
        'constancias_generadas_hoy', (
            SELECT COUNT(*) FROM constancias 
            WHERE DATE(created_at) = CURRENT_DATE
        )
    ) INTO result;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para obtener estadísticas por carrera
CREATE OR REPLACE FUNCTION get_stats_by_carrera()
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_agg(
        json_build_object(
            'carrera', c.nombre,
            'codigo', c.codigo,
            'estudiantes_activos', (
                SELECT COUNT(*) FROM estudiantes e 
                WHERE e.carrera_id = c.id AND e.estado = 'Activo'
            ),
            'materias', (
                SELECT COUNT(*) FROM materias m 
                WHERE m.carrera_id = c.id AND m.estado = 'Activa'
            )
        )
    ) INTO result
    FROM carreras c;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Insertar configuraciones iniciales específicas para Supabase
INSERT INTO configuracion_sistema (clave, valor, descripcion, categoria) VALUES
('supabase_url', '', 'URL del proyecto Supabase', 'integracion'),
('supabase_anon_key', '', 'Clave anónima de Supabase', 'integracion'),
('email_notifications', 'true', 'Habilitar notificaciones por email', 'notificaciones'),
('backup_frequency', 'daily', 'Frecuencia de respaldos automáticos', 'sistema'),
('session_timeout', '3600', 'Tiempo de expiración de sesión en segundos', 'seguridad')
ON CONFLICT (clave) DO NOTHING;

-- Crear vista para dashboard de estudiantes
CREATE OR REPLACE VIEW vista_estudiante_dashboard AS
SELECT 
    e.id,
    e.cedula,
    e.nombres,
    e.apellidos,
    e.email,
    e.trayecto_actual,
    e.trimestre_actual,
    c.nombre as carrera,
    c.codigo as codigo_carrera,
    (
        SELECT AVG(cal.nota) 
        FROM calificaciones cal
        JOIN evaluaciones ev ON cal.evaluacion_id = ev.id
        JOIN secciones s ON ev.seccion_id = s.id
        JOIN inscripciones i ON s.id = i.seccion_id
        WHERE i.estudiante_id = e.id
    ) as promedio_general,
    (
        SELECT COUNT(*)
        FROM inscripciones i
        WHERE i.estudiante_id = e.id AND i.estado = 'Activa'
    ) as materias_actuales
FROM estudiantes e
JOIN carreras c ON e.carrera_id = c.id
WHERE e.estado = 'Activo';

-- Crear vista para dashboard de profesores
CREATE OR REPLACE VIEW vista_profesor_dashboard AS
SELECT 
    p.id,
    p.cedula,
    p.nombres,
    p.apellidos,
    p.email,
    p.especialidad,
    p.titulo_academico,
    (
        SELECT COUNT(DISTINCT s.id)
        FROM secciones s
        WHERE s.profesor_id = p.id AND s.estado = 'Activa'
    ) as materias_asignadas,
    (
        SELECT COUNT(*)
        FROM secciones s
        JOIN inscripciones i ON s.id = i.seccion_id
        WHERE s.profesor_id = p.id AND s.estado = 'Activa' AND i.estado = 'Activa'
    ) as total_estudiantes,
    (
        SELECT COUNT(*)
        FROM evaluaciones ev
        JOIN secciones s ON ev.seccion_id = s.id
        WHERE s.profesor_id = p.id AND ev.estado = 'Programada'
    ) as evaluaciones_pendientes
FROM profesores p
WHERE p.estado = 'Activo';

-- Trigger para actualizar timestamp en tablas
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger a todas las tablas que tienen updated_at
CREATE TRIGGER update_estudiantes_updated_at BEFORE UPDATE ON estudiantes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profesores_updated_at BEFORE UPDATE ON profesores
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_materias_updated_at BEFORE UPDATE ON materias
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_usuarios_updated_at BEFORE UPDATE ON usuarios
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
