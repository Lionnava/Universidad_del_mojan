-- Mejoras adicionales a la base de datos del sistema universitario
-- Script para agregar tablas de autenticación y constancias

-- Tabla de usuarios del sistema (para autenticación)
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    rol VARCHAR(20) NOT NULL, -- estudiante, profesor, analista, gerencial
    activo BOOLEAN DEFAULT TRUE,
    ultimo_acceso TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Relacionar usuarios con estudiantes, profesores, etc.
ALTER TABLE estudiantes ADD COLUMN usuario_id INTEGER REFERENCES usuarios(id);
ALTER TABLE profesores ADD COLUMN usuario_id INTEGER REFERENCES usuarios(id);

-- Tabla para registro de constancias generadas
CREATE TABLE constancias (
    id SERIAL PRIMARY KEY,
    estudiante_id INTEGER REFERENCES estudiantes(id),
    tipo VARCHAR(50) NOT NULL, -- notas, estudios, preinscripcion, inscripcion
    codigo_verificacion VARCHAR(100) UNIQUE NOT NULL,
    contenido TEXT,
    fecha_generacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valida_hasta DATE,
    descargada BOOLEAN DEFAULT FALSE,
    ip_generacion INET,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para auditoría del sistema
CREATE TABLE auditoria (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id),
    accion VARCHAR(100) NOT NULL,
    tabla_afectada VARCHAR(50),
    registro_id INTEGER,
    datos_anteriores JSONB,
    datos_nuevos JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para configuración del sistema
CREATE TABLE configuracion_sistema (
    id SERIAL PRIMARY KEY,
    clave VARCHAR(100) UNIQUE NOT NULL,
    valor TEXT,
    descripcion TEXT,
    tipo VARCHAR(20) DEFAULT 'string', -- string, number, boolean, json
    categoria VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para notificaciones del sistema
CREATE TABLE notificaciones (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id),
    titulo VARCHAR(200) NOT NULL,
    mensaje TEXT NOT NULL,
    tipo VARCHAR(20) DEFAULT 'info', -- info, warning, error, success
    leida BOOLEAN DEFAULT FALSE,
    fecha_leida TIMESTAMP,
    url_accion VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar configuraciones básicas del sistema
INSERT INTO configuracion_sistema (clave, valor, descripcion, categoria) VALUES
('universidad_nombre', 'Universidad Móvil', 'Nombre oficial de la institución', 'general'),
('periodo_actual', '2024-2025', 'Período académico actual', 'academico'),
('trimestres_por_año', '3', 'Número de trimestres por año académico', 'academico'),
('nota_minima_aprobacion', '10', 'Nota mínima para aprobar una materia', 'evaluacion'),
('nota_maxima', '20', 'Nota máxima del sistema', 'evaluacion'),
('dias_validez_constancia', '90', 'Días de validez de las constancias', 'constancias');

-- Insertar usuarios de ejemplo
INSERT INTO usuarios (username, email, password_hash, rol) VALUES
('admin', 'admin@universidad.edu', '$2b$10$example_hash', 'gerencial'),
('analista1', 'analista@universidad.edu', '$2b$10$example_hash', 'analista'),
('prof_garcia', 'jgarcia@universidad.edu', '$2b$10$example_hash', 'profesor'),
('est_20123456', 'mgonzalez@email.com', '$2b$10$example_hash', 'estudiante');

-- Actualizar relaciones usuario-estudiante y usuario-profesor
UPDATE estudiantes SET usuario_id = 4 WHERE cedula = '20123456';
UPDATE profesores SET usuario_id = 3 WHERE cedula = '12345678';

-- Crear índices adicionales para rendimiento
CREATE INDEX idx_usuarios_username ON usuarios(username);
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_usuarios_rol ON usuarios(rol);
CREATE INDEX idx_constancias_estudiante ON constancias(estudiante_id);
CREATE INDEX idx_constancias_codigo ON constancias(codigo_verificacion);
CREATE INDEX idx_auditoria_usuario ON auditoria(usuario_id);
CREATE INDEX idx_auditoria_fecha ON auditoria(created_at);
CREATE INDEX idx_notificaciones_usuario ON notificaciones(usuario_id);
CREATE INDEX idx_notificaciones_leida ON notificaciones(leida);

-- Función para generar código de verificación único
CREATE OR REPLACE FUNCTION generar_codigo_verificacion()
RETURNS VARCHAR(100) AS $$
DECLARE
    codigo VARCHAR(100);
BEGIN
    codigo := 'UNI-' || TO_CHAR(NOW(), 'YYYY') || '-' || 
              LPAD(FLOOR(RANDOM() * 999999)::TEXT, 6, '0') || '-' ||
              UPPER(SUBSTRING(MD5(RANDOM()::TEXT), 1, 4));
    RETURN codigo;
END;
$$ LANGUAGE plpgsql;

-- Trigger para generar código automáticamente en constancias
CREATE OR REPLACE FUNCTION trigger_generar_codigo_constancia()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.codigo_verificacion IS NULL OR NEW.codigo_verificacion = '' THEN
        NEW.codigo_verificacion := generar_codigo_verificacion();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_constancias_codigo
    BEFORE INSERT ON constancias
    FOR EACH ROW
    EXECUTE FUNCTION trigger_generar_codigo_constancia();

-- Función para auditoría automática
CREATE OR REPLACE FUNCTION trigger_auditoria()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO auditoria (usuario_id, accion, tabla_afectada, registro_id, datos_nuevos)
        VALUES (COALESCE(CURRENT_SETTING('app.current_user_id', TRUE)::INTEGER, 1), 
                'INSERT', TG_TABLE_NAME, NEW.id, row_to_json(NEW));
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO auditoria (usuario_id, accion, tabla_afectada, registro_id, datos_anteriores, datos_nuevos)
        VALUES (COALESCE(CURRENT_SETTING('app.current_user_id', TRUE)::INTEGER, 1), 
                'UPDATE', TG_TABLE_NAME, NEW.id, row_to_json(OLD), row_to_json(NEW));
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO auditoria (usuario_id, accion, tabla_afectada, registro_id, datos_anteriores)
        VALUES (COALESCE(CURRENT_SETTING('app.current_user_id', TRUE)::INTEGER, 1), 
                'DELETE', TG_TABLE_NAME, OLD.id, row_to_json(OLD));
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Aplicar triggers de auditoría a tablas principales
CREATE TRIGGER trigger_auditoria_estudiantes
    AFTER INSERT OR UPDATE OR DELETE ON estudiantes
    FOR EACH ROW EXECUTE FUNCTION trigger_auditoria();

CREATE TRIGGER trigger_auditoria_profesores
    AFTER INSERT OR UPDATE OR DELETE ON profesores
    FOR EACH ROW EXECUTE FUNCTION trigger_auditoria();

CREATE TRIGGER trigger_auditoria_inscripciones
    AFTER INSERT OR UPDATE OR DELETE ON inscripciones
    FOR EACH ROW EXECUTE FUNCTION trigger_auditoria();

CREATE TRIGGER trigger_auditoria_calificaciones
    AFTER INSERT OR UPDATE OR DELETE ON calificaciones
    FOR EACH ROW EXECUTE FUNCTION trigger_auditoria();
