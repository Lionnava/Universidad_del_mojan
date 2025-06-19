# 🎓 UNIVERSIDAD MÓVIL V23 - GUÍA DE INSTALACIÓN COMPLETA Y ACTUALIZADA

## 🚨 IMPORTANTE - VERSIÓN 23 PRODUCCIÓN
Esta guía está actualizada para la **Versión 23** y configurada para **PRODUCCIÓN REAL**, no modo demo.

## 📋 TABLA DE CONTENIDOS
1. [Requisitos del Sistema](#requisitos)
2. [Preparación del Entorno](#preparacion)
3. [Descarga e Instalación](#descarga)
4. [Configuración Paso a Paso](#configuracion)
5. [Solución de Problemas Comunes](#problemas-comunes)
6. [Configuración de Producción](#produccion)
7. [Verificación Final](#verificacion)
8. [Mantenimiento](#mantenimiento)

---

## 🖥️ REQUISITOS DEL SISTEMA {#requisitos}

### Requisitos Mínimos ACTUALIZADOS
- **Sistema Operativo**: Windows 10/11 (Build 19041+), Linux Ubuntu 20+, macOS 11+
- **RAM**: 8 GB mínimo (16 GB recomendado para producción)
- **Espacio en Disco**: 5 GB libres
- **Procesador**: Intel i5 o AMD Ryzen 5 (o equivalente)
- **Red**: Conexión estable a internet para instalación

### Requisitos de Software CRÍTICOS
- **Node.js**: Versión 18.0.0 a 20.x (NO usar v21+ o v22+)
- **NPM**: Versión 8.0.0 o superior
- **Visual Studio Build Tools** (Windows) - OBLIGATORIO para better-sqlite3

---

## 🛠️ PREPARACIÓN DEL ENTORNO {#preparacion}

### PASO 1: Verificar Node.js (CRÍTICO)

⚠️ **ADVERTENCIA**: Node.js v22+ causa problemas. Usar v18-v20 únicamente.

#### Verificar versión actual:
\`\`\`cmd
node --version
\`\`\`

#### Si tienes v22 o superior, DEBES downgrade:
1. Desinstala Node.js desde Panel de Control
2. Descarga Node.js v20.10.0 LTS desde: https://nodejs.org/
3. Instala la versión LTS
4. Reinicia tu computadora
5. Verifica: `node --version` debe mostrar v20.x.x

### PASO 2: Instalar Visual Studio Build Tools (Windows)

**OBLIGATORIO para better-sqlite3:**

#### Opción A: Instalación Automática
\`\`\`cmd
npm install -g windows-build-tools
\`\`\`

#### Opción B: Instalación Manual
1. Ve a: https://visualstudio.microsoft.com/visual-cpp-build-tools/
2. Descarga "Build Tools for Visual Studio 2022"
3. Ejecuta el instalador
4. Selecciona "C++ build tools"
5. Instala y reinicia

### PASO 3: Verificar Herramientas
\`\`\`cmd
npm config get msvs_version
\`\`\`
Debe mostrar una versión de Visual Studio.

---

## 📥 DESCARGA E INSTALACIÓN {#descarga}

### PASO 1: Obtener Archivos V23

1. Descarga el sistema desde v0 (botón "Download Code")
2. Extrae en una ruta SIN ESPACIOS:
   - ✅ `C:\universidad-movil-v23\`
   - ✅ `C:\proyectos\universidad\`
   - ❌ `C:\Mis Documentos\Universidad Móvil\`

### PASO 2: Verificar Estructura de Archivos

Tu carpeta debe contener:
\`\`\`
universidad-movil-v23/
├── app/
├── components/
├── scripts/
├── lib/
├── package.json
├── GUIA_INSTALACION_ACTUALIZADA_V23.md
└── otros archivos...
\`\`\`

---

## ⚙️ CONFIGURACIÓN PASO A PASO {#configuracion}

### PASO 1: Abrir CMD en la Carpeta Correcta

**Método Recomendado:**
1. Abre la carpeta del proyecto en Explorador de Archivos
2. Haz clic en la barra de direcciones
3. Escribe `cmd` y presiona Enter

### PASO 2: Verificar Ubicación
\`\`\`cmd
dir
\`\`\`
Debes ver `package.json` y las carpetas del proyecto.

### PASO 3: Reemplazar package.json

⚠️ **CRÍTICO**: El package.json debe tener versiones compatibles.

1. Abre `package.json` con Notepad
2. **BORRA TODO** el contenido
3. **PEGA** exactamente este contenido:

\`\`\`json
{
  "name": "universidad-movil",
  "version": "23.0.0",
  "private": true,
  "description": "Sistema de gestión universitaria V23 - PRODUCCIÓN",
  "author": "Universidad Móvil Team",
  "license": "MIT",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "setup-db": "node scripts/setup-database.js",
    "init-db": "node scripts/init-database.js",
    "init-production": "node scripts/init-production.js",
    "setup-university": "node scripts/setup-university.js",
    "create-admin": "node scripts/create-admin.js",
    "backup-db": "node scripts/backup-database.js",
    "check-install": "node scripts/install-check.js",
    "fix-installation": "scripts\\fix-installation.bat",
    "production-build": "npm run build && npm run backup-db",
    "health-check": "node scripts/health-check.js",
    "reset-production": "del /f database\\universidad.db 2>nul & npm run init-production"
  },
  "dependencies": {
    "next": "14.0.4",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "better-sqlite3": "9.1.1",
    "bcryptjs": "2.4.3",
    "jspdf": "2.5.1",
    "html2canvas": "1.4.1",
    "lucide-react": "0.294.0",
    "@radix-ui/react-dialog": "1.0.5",
    "@radix-ui/react-select": "2.0.0",
    "@radix-ui/react-tabs": "1.0.4",
    "@radix-ui/react-checkbox": "1.0.4",
    "@radix-ui/react-label": "2.0.2",
    "@radix-ui/react-progress": "1.0.3",
    "@radix-ui/react-slot": "1.0.2",
    "class-variance-authority": "0.7.0",
    "clsx": "2.0.0",
    "tailwind-merge": "2.1.0",
    "tailwindcss-animate": "1.0.7"
  },
  "devDependencies": {
    "typescript": "5.2.2",
    "@types/node": "20.8.0",
    "@types/react": "18.2.0",
    "@types/react-dom": "18.2.0",
    "@types/better-sqlite3": "7.6.5",
    "@types/bcryptjs": "2.4.4",
    "autoprefixer": "10.4.16",
    "postcss": "8.4.31",
    "tailwindcss": "3.3.5",
    "eslint": "8.51.0",
    "eslint-config-next": "14.0.4"
  },
  "engines": {
    "node": ">=18.0.0 <21.0.0",
    "npm": ">=8.0.0"
  }
}
\`\`\`

4. **GUARDA** el archivo (Ctrl + S)

### PASO 4: Instalación con Reparación Automática

\`\`\`cmd
scripts\fix-installation.bat
\`\`\`

**¿Qué hace este script?**
- Limpia instalaciones anteriores
- Instala dependencias con versiones compatibles
- Maneja errores de better-sqlite3 automáticamente
- Configura la base de datos de producción
- Verifica que todo funcione

### PASO 5: Si el Script Automático Falla

**Instalación Manual:**
\`\`\`cmd
# Limpiar
rmdir /s /q node_modules
del package-lock.json
del pnpm-lock.yaml

# Instalar dependencias críticas una por una
npm install next@14.0.4 --legacy-peer-deps
npm install react@18.2.0 react-dom@18.2.0 --legacy-peer-deps
npm install better-sqlite3@9.1.1 --legacy-peer-deps
npm install bcryptjs@2.4.3 --legacy-peer-deps

# Instalar el resto
npm install --legacy-peer-deps --no-audit --no-fund
\`\`\`

---

## 🆘 SOLUCIÓN DE PROBLEMAS COMUNES {#problemas-comunes}

### Error: "TypeScript 5.3.0 no encontrado"
**Solución**: Usar TypeScript 5.2.2 (ya corregido en el nuevo package.json)

### Error: "better-sqlite3 no se puede compilar"
**Solución**:
\`\`\`cmd
# Instalar herramientas de compilación
npm install -g windows-build-tools

# Reinstalar better-sqlite3
npm uninstall better-sqlite3
npm install better-sqlite3@9.1.1 --build-from-source
\`\`\`

### Error: "Node.js v22 incompatible"
**Solución**: Downgrade a Node.js v20 LTS (ver Preparación del Entorno)

### Error: "Cannot find module"
**Solución**:
\`\`\`cmd
npm run fix-installation
\`\`\`

### Error: "Puerto 3000 ocupado"
**Solución**:
\`\`\`cmd
netstat -ano | findstr :3000
taskkill /PID [NUMERO] /F
\`\`\`

---

## 🚀 CONFIGURACIÓN DE PRODUCCIÓN {#produccion}

### PASO 1: Verificar Instalación
\`\`\`cmd
npm run check-install
\`\`\`

### PASO 2: Inicializar Base de Datos de PRODUCCIÓN
\`\`\`cmd
npm run init-production
\`\`\`

**¡IMPORTANTE!** Esto crea una base de datos LIMPIA sin datos demo.

### PASO 3: Configurar Tu Universidad
\`\`\`cmd
npm run setup-university
\`\`\`

Ingresa los datos REALES de tu institución:
- Nombre oficial de la universidad
- Dirección real
- Teléfonos de contacto
- Email institucional
- Etc.

### PASO 4: Crear Usuarios Administrativos
\`\`\`cmd
npm run create-admin
\`\`\`

Crea usuarios adicionales con datos reales.

### PASO 5: Compilar para Producción
\`\`\`cmd
npm run build
\`\`\`

### PASO 6: Iniciar en Modo Producción
\`\`\`cmd
npm start
\`\`\`

---

## ✅ VERIFICACIÓN FINAL {#verificacion}

### Lista de Verificación V23:

- [ ] Node.js v18-v20 instalado (NO v22+)
- [ ] Visual Studio Build Tools instalado
- [ ] package.json V23 actualizado
- [ ] Dependencias instaladas sin errores
- [ ] Base de datos de producción creada
- [ ] Universidad configurada con datos reales
- [ ] Usuario admin creado y contraseña cambiada
- [ ] Sistema compilado para producción
- [ ] Acceso web funcionando: `http://localhost:3000`
- [ ] Login exitoso con credenciales reales
- [ ] Respaldo inicial creado

### Pruebas Funcionales:

1. **Registro de Aspirantes**: Crear un aspirante de prueba
2. **Aprobación**: Convertir aspirante a estudiante
3. **Inscripciones**: Crear una inscripción
4. **Reportes**: Generar un reporte en PDF
5. **Constancias**: Generar una constancia
6. **Usuarios**: Crear un usuario profesor/analista

---

## 🔧 MANTENIMIENTO {#mantenimiento}

### Respaldos Automáticos
\`\`\`cmd
# Crear respaldo manual
npm run backup-db

# Programar respaldos automáticos (Windows)
schtasks /create /tn "Backup Universidad" /tr "C:\ruta\scripts\backup-database.js" /sc daily /st 02:00
\`\`\`

### Monitoreo del Sistema
\`\`\`cmd
# Verificar estado
npm run health-check

# Ver logs en tiempo real
npm run dev
\`\`\`

### Actualizaciones
1. Crear respaldo completo
2. Descargar nueva versión
3. Reemplazar archivos (excepto `database/`)
4. Ejecutar `npm run fix-installation`
5. Verificar funcionamiento

---

## 📞 SOPORTE V23

### Información del Sistema
- **Versión**: 23.0.0 PRODUCCIÓN
- **Base de Datos**: SQLite local
- **Modo**: Producción (sin datos demo)
- **Compatibilidad**: Node.js 18-20

### Para Soporte Técnico
Proporciona:
- Versión del sistema: V23
- Node.js version: `node --version`
- Sistema operativo
- Mensaje de error completo
- Pasos que causaron el error

---

## 🎉 ¡INSTALACIÓN V23 COMPLETADA!

Tu sistema Universidad Móvil V23 está listo para producción con:

- ✅ **Base de datos limpia** (sin datos demo)
- ✅ **Configuración de producción**
- ✅ **Versiones compatibles** de todas las dependencias
- ✅ **Herramientas de reparación** automática
- ✅ **Documentación actualizada**

**🚀 Para iniciar: `npm start`**
**🌐 Acceso: `http://localhost:3000`**

---

*Guía actualizada para Universidad Móvil V23 - Modo Producción*
*Fecha: Junio 2025*
