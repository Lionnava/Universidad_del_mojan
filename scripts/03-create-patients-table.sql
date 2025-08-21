-- Create patients table for medical management system
CREATE TABLE IF NOT EXISTS pacientes (
    id SERIAL PRIMARY KEY,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    tipo_documento VARCHAR(20) NOT NULL DEFAULT 'dni',
    numero_documento VARCHAR(50) NOT NULL UNIQUE,
    fecha_nacimiento DATE NOT NULL,
    genero VARCHAR(10) NOT NULL,
    tipo_sangre VARCHAR(5),
    estatura INTEGER, -- in cm
    peso DECIMAL(5,2), -- in kg
    alergias TEXT,
    antecedentes_medicos TEXT,
    medicamentos_actuales TEXT,
    telefono VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    direccion TEXT NOT NULL,
    ciudad VARCHAR(50) NOT NULL,
    contacto_emergencia VARCHAR(100),
    telefono_emergencia VARCHAR(20),
    relacion_emergencia VARCHAR(50),
    estado VARCHAR(20) DEFAULT 'Activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster searches
CREATE INDEX IF NOT EXISTS idx_pacientes_documento ON pacientes(numero_documento);
CREATE INDEX IF NOT EXISTS idx_pacientes_nombres ON pacientes(nombres, apellidos);
CREATE INDEX IF NOT EXISTS idx_pacientes_estado ON pacientes(estado);

-- Insert sample patients
INSERT INTO pacientes (
    nombres, apellidos, tipo_documento, numero_documento, fecha_nacimiento, genero,
    tipo_sangre, estatura, peso, alergias, antecedentes_medicos, medicamentos_actuales,
    telefono, email, direccion, ciudad, contacto_emergencia, telefono_emergencia, relacion_emergencia
) VALUES 
(
    'María', 'González', 'dni', '87654321', '1980-07-22', 'female',
    'A+', 165, 68.5, 'Penicilina, Aspirina', 'Hipertensión diagnosticada en 2018', 'Losartán 50mg diario',
    '+58 412-555-6789', 'maria.gonzalez@example.com', 'Calle Principal #456', 'Caracas',
    'Juan González', '+58 414-555-7890', 'Esposo'
),
(
    'Juan', 'Pérez', 'dni', '12345678', '1992-03-15', 'male',
    'O+', 175, 80.0, 'Ninguna conocida', 'Ninguno relevante', 'Ninguno',
    '+58 424-555-1234', 'juan.perez@example.com', 'Avenida Libertador #789', 'Caracas',
    'Ana Pérez', '+58 416-555-2345', 'Madre'
),
(
    'Ana', 'Rodríguez', 'dni', '98765432', '1995-11-08', 'female',
    'B+', 160, 55.0, 'Mariscos', 'Asma desde la infancia', 'Salbutamol inhalador',
    '+58 414-555-9876', 'ana.rodriguez@example.com', 'Calle Bolívar #123', 'Valencia',
    'Carlos Rodríguez', '+58 412-555-8765', 'Padre'
),
(
    'Carlos', 'Martínez', 'dni', '56789012', '1968-09-30', 'male',
    'AB+', 170, 75.5, 'Polen', 'Diabetes tipo 2, Colesterol alto', 'Metformina 850mg, Atorvastatina 20mg',
    '+58 426-555-5678', 'carlos.martinez@example.com', 'Urbanización El Rosal #45', 'Maracay',
    'Elena Martínez', '+58 414-555-6789', 'Esposa'
),
(
    'Sofía', 'López', 'dni', '34567890', '2005-12-12', 'female',
    'O-', 155, 50.0, 'Ninguna conocida', 'Ninguno', 'Ninguno',
    '+58 412-555-3456', 'sofia.lopez@example.com', 'Calle Miranda #678', 'Barquisimeto',
    'Carmen López', '+58 424-555-4567', 'Madre'
);
