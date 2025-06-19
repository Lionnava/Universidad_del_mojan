# 🏛️ Guía de Configuración para Producción

## 📋 Pasos para Configurar tu Universidad

### 1. ✅ Base de Datos Creada
Ya tienes la base de datos de producción lista con:
- ✅ Estructura completa de tablas
- ✅ Usuario admin inicial (`admin` / `admin123`)
- ✅ Sin datos de demostración

### 2. 🏛️ Configurar tu Universidad
\`\`\`bash
npm run setup-university
\`\`\`
Este script te permitirá:
- Configurar nombre, dirección, teléfono y email de tu universidad
- Agregar las carreras que ofrece tu institución
- Configurar el período académico actual

### 3. 👥 Crear Usuarios Adicionales
\`\`\`bash
npm run create-admin
\`\`\`
Para crear más usuarios administradores.

### 4. 🚀 Ejecutar el Sistema
\`\`\`bash
npm run dev
\`\`\`

## 🔐 Seguridad Inicial

### ⚠️ CAMBIAR CONTRASEÑA DEL ADMIN
1. Inicia sesión con `admin` / `admin123`
2. Ve a configuración de usuario
3. Cambia la contraseña inmediatamente

## 📚 Configuración Recomendada

### Carreras Típicas en Venezuela:
- Ingeniería en Informática (INF)
- Medicina (MED)
- Derecho (DER)
- Administración (ADM)
- Contaduría Pública (CON)
- Enfermería (ENF)
- Psicología (PSI)
- Educación (EDU)

### Períodos Académicos:
- Formato: YYYY-YYYY (ej: 2024-2025)
- Fechas típicas: Septiembre a Julio

## 🔄 Flujo de Trabajo

1. **Configurar Universidad** → `npm run setup-university`
2. **Crear Administradores** → `npm run create-admin`
3. **Iniciar Sistema** → `npm run dev`
4. **Cambiar contraseña admin**
5. **Crear profesores y analistas**
6. **Configurar materias por carrera**
7. **¡Listo para recibir aspirantes!**

## 💾 Respaldos

\`\`\`bash
npm run backup-db  # Crear respaldo
\`\`\`

## 🆘 Soporte

Si necesitas resetear todo:
\`\`\`bash
npm run reset-production  # Borra y recrea la BD
