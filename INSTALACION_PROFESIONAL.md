# 🎓 Universidad Móvil - Instalación Profesional

## 🚀 Instalación Automática (Recomendada)

### Paso 1: Ejecutar Instalación Completa
\`\`\`cmd
scripts\complete-setup.bat
\`\`\`

Este script realizará automáticamente:
- ✅ Verificación de requisitos
- ✅ Limpieza de instalaciones anteriores  
- ✅ Instalación de dependencias
- ✅ Configuración de base de datos
- ✅ Configuración inicial de la universidad

## 🔧 Instalación Manual (Alternativa)

### Paso 1: Verificar Requisitos
\`\`\`cmd
node --version    # Debe ser >= 18.0.0
npm --version     # Debe estar disponible
\`\`\`

### Paso 2: Limpiar e Instalar
\`\`\`cmd
# Limpiar instalación anterior
rmdir /s /q node_modules
del package-lock.json

# Instalar dependencias
npm install --force --no-audit --no-fund
\`\`\`

### Paso 3: Configurar Sistema
\`\`\`cmd
# Verificar instalación
npm run health-check

# Inicializar base de datos
npm run init-production

# Configurar universidad
npm run setup-university
\`\`\`

### Paso 4: Iniciar Sistema
\`\`\`cmd
npm run dev
\`\`\`

## 🏭 Despliegue a Producción

### Para Servidor Local
\`\`\`cmd
# Preparar para producción
npm run production-build

# Iniciar en producción
npm start
\`\`\`

### Para Servidor Dedicado
\`\`\`cmd
# Ejecutar script de despliegue
scripts\production-deploy.bat
\`\`\`

## 🔍 Verificación y Mantenimiento

### Verificar Estado del Sistema
\`\`\`cmd
npm run health-check
\`\`\`

### Crear Respaldos
\`\`\`cmd
npm run backup-db
\`\`\`

### Resetear Sistema (si es necesario)
\`\`\`cmd
npm run reset-production
\`\`\`

## 📊 Información del Sistema

- **Puerto**: 3000 (configurable)
- **Base de datos**: SQLite local
- **Usuario inicial**: admin / admin123
- **Ubicación BD**: database/universidad.db
- **Respaldos**: database/backups/

## 🆘 Solución de Problemas

### Error: "next no se reconoce"
\`\`\`cmd
npm install --force
\`\`\`

### Error: Puerto ocupado
\`\`\`cmd
# Cambiar puerto
set PORT=8080
npm run dev
\`\`\`

### Base de datos corrupta
\`\`\`cmd
npm run reset-production
\`\`\`

## 📞 Soporte

Para soporte técnico, verificar:
1. Logs en carpeta `logs/`
2. Estado con `npm run health-check`
3. Respaldos en `database/backups/`
