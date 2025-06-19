# 🎓 UNIVERSIDAD MÓVIL - GUÍA DE IMPLEMENTACIÓN COMPLETA Y DETALLADA

## 📋 TABLA DE CONTENIDOS
1. [Requisitos del Sistema](#requisitos)
2. [Preparación del Entorno](#preparacion)
3. [Descarga e Instalación](#descarga)
4. [Configuración Paso a Paso](#configuracion)
5. [Verificación y Pruebas](#verificacion)
6. [Puesta en Producción](#produccion)
7. [Mantenimiento y Respaldos](#mantenimiento)
8. [Solución de Problemas](#problemas)
9. [Configuración de Red](#red)
10. [Seguridad](#seguridad)

---

## 🖥️ REQUISITOS DEL SISTEMA {#requisitos}

### Requisitos Mínimos
- **Sistema Operativo**: Windows 10/11, Linux Ubuntu 18+, macOS 10.15+
- **RAM**: 4 GB mínimo (8 GB recomendado)
- **Espacio en Disco**: 2 GB libres
- **Procesador**: Intel i3 o equivalente
- **Red**: Conexión a internet para instalación inicial

### Requisitos de Software
- **Node.js**: Versión 18.0.0 o superior
- **NPM**: Versión 8.0.0 o superior
- **Editor de Texto**: Notepad++, VS Code, o similar (opcional)

---

## 🛠️ PREPARACIÓN DEL ENTORNO {#preparacion}

### PASO 1: Verificar si Node.js está instalado

#### En Windows:
1. Presiona `Windows + R`
2. Escribe `cmd` y presiona Enter
3. En la ventana negra que aparece, escribe:
   \`\`\`cmd
   node --version
   \`\`\`
4. Si aparece algo como `v18.17.0` o superior, Node.js está instalado
5. Si aparece "no se reconoce como comando", necesitas instalarlo

#### En Linux/macOS:
1. Abre Terminal
2. Escribe:
   \`\`\`bash
   node --version
   \`\`\`

### PASO 2: Instalar Node.js (si no está instalado)

#### Opción A: Descarga Oficial (Recomendada)
1. Ve a: https://nodejs.org/
2. Descarga la versión **LTS** (Long Term Support)
3. Ejecuta el instalador descargado
4. Sigue el asistente de instalación (acepta todas las opciones por defecto)
5. Reinicia tu computadora
6. Verifica la instalación repitiendo el PASO 1

#### Opción B: Para Windows con Chocolatey
\`\`\`cmd
choco install nodejs
\`\`\`

#### Opción C: Para Linux Ubuntu/Debian
\`\`\`bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
\`\`\`

### PASO 3: Verificar NPM
\`\`\`cmd
npm --version
\`\`\`
Debe mostrar una versión como `9.8.1` o superior.

---

## 📥 DESCARGA E INSTALACIÓN {#descarga}

### PASO 1: Obtener los Archivos del Sistema

#### Opción A: Descarga desde v0 (Recomendada)
1. En v0, haz clic en el botón **"Download Code"** (esquina superior derecha)
2. Se descargará un archivo ZIP
3. Guarda el archivo en una ubicación fácil de recordar (ej: `C:\Descargas\`)

#### Opción B: Si tienes el código en GitHub
\`\`\`cmd
git clone [URL_DEL_REPOSITORIO]
\`\`\`

### PASO 2: Extraer y Ubicar los Archivos

#### En Windows:
1. Ve a la carpeta donde descargaste el ZIP
2. Haz clic derecho en el archivo ZIP
3. Selecciona "Extraer todo..."
4. Elige una ubicación SIN ESPACIOS en el nombre, por ejemplo:
   - ✅ `C:\universidad-movil\`
   - ✅ `C:\proyectos\universidad\`
   - ❌ `C:\Mis Documentos\Universidad Móvil\` (tiene espacios)
5. Extrae los archivos

#### En Linux/macOS:
\`\`\`bash
unzip universidad-movil.zip -d /home/usuario/universidad-movil/
\`\`\`

### PASO 3: Navegar a la Carpeta del Proyecto

#### En Windows:
1. Abre el Explorador de Archivos
2. Navega a donde extrajiste los archivos
3. Deberías ver archivos como: `package.json`, carpetas `app/`, `scripts/`, etc.
4. En la barra de direcciones, copia la ruta completa (ej: `C:\universidad-movil\`)

#### Abrir CMD en la Carpeta Correcta:
**Método 1 (Recomendado):**
1. En el Explorador de Archivos, dentro de la carpeta del proyecto
2. Haz clic en la barra de direcciones (donde dice la ruta)
3. Escribe `cmd` y presiona Enter
4. Se abrirá CMD directamente en esa carpeta

**Método 2:**
1. Presiona `Windows + R`
2. Escribe `cmd` y presiona Enter
3. Navega usando `cd`:
   \`\`\`cmd
   cd C:\universidad-movil
   \`\`\`

**Método 3:**
1. Shift + Clic derecho en la carpeta
2. Selecciona "Abrir ventana de PowerShell aquí" o "Abrir símbolo del sistema aquí"

---

## ⚙️ CONFIGURACIÓN PASO A PASO {#configuracion}

### PASO 1: Verificar que estás en la carpeta correcta

En CMD, escribe:
\`\`\`cmd
dir
\`\`\`

Deberías ver archivos como:
- `package.json`
- Carpeta `app`
- Carpeta `scripts`
- Carpeta `components`

Si NO ves estos archivos, navega a la carpeta correcta usando `cd`.

### PASO 2: Reemplazar package.json

1. Abre el archivo `package.json` con Notepad o cualquier editor de texto
2. **BORRA TODO** el contenido actual
3. **COPIA Y PEGA** exactamente este contenido:

\`\`\`json
{
  "name": "universidad-movil",
  "version": "1.0.0",
  "private": true,
  "description": "Sistema de gestión universitaria completo y profesional",
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
    "complete-setup": "scripts\\complete-setup.bat",
    "production-build": "npm run build && npm run backup-db",
    "health-check": "node scripts/health-check.js",
    "reset-db": "del /f database\\universidad.db 2>nul & npm run init-production",
    "reset-production": "del /f database\\universidad.db 2>nul & npm run init-production"
  },
  "dependencies": {
    "next": "14.0.4",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "better-sqlite3": "9.2.2",
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
    "typescript": "5.3.0",
    "@types/node": "20.10.0",
    "@types/react": "18.2.0",
    "@types/react-dom": "18.2.0",
    "@types/better-sqlite3": "7.6.8",
    "@types/bcryptjs": "2.4.6",
    "autoprefixer": "10.4.16",
    "postcss": "8.4.32",
    "tailwindcss": "3.3.6",
    "eslint": "8.55.0",
    "eslint-config-next": "14.0.4"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=8.0.0"
  }
}
\`\`\`

4. **GUARDA** el archivo (Ctrl + S)

### PASO 3: Limpiar instalaciones anteriores (si existen)

En CMD, ejecuta estos comandos UNO POR UNO:

\`\`\`cmd
rmdir /s /q node_modules
\`\`\`
(Si aparece "El sistema no puede encontrar...", está bien, continúa)

\`\`\`cmd
del package-lock.json
\`\`\`
(Si aparece "No se pudo encontrar...", está bien, continúa)

\`\`\`cmd
rmdir /s /q .next
\`\`\`
(Si aparece error, está bien, continúa)

### PASO 4: Instalar Dependencias

**IMPORTANTE**: Este paso puede tomar 5-15 minutos dependiendo de tu conexión a internet.

Ejecuta este comando:
\`\`\`cmd
npm install --force --no-audit --no-fund
\`\`\`

**¿Qué esperar?**
- Verás muchas líneas de texto desplazándose
- Pueden aparecer algunas advertencias (warnings) - esto es normal
- Al final debe decir algo como "added XXX packages in XXs"

**Si aparecen errores**, prueba este comando alternativo:
\`\`\`cmd
npm install --legacy-peer-deps --no-audit --no-fund
\`\`\`

### PASO 5: Verificar Instalación

\`\`\`cmd
npm run check-install
\`\`\`

Si este comando no funciona, crea el archivo manualmente:

1. Ve a la carpeta `scripts`
2. Crea un archivo llamado `install-check.js`
3. Pega este contenido:

\`\`\`javascript
console.log("🔍 Verificando instalación...");
console.log("✅ Node.js:", process.version);
console.log("✅ Plataforma:", process.platform);

const fs = require("fs");
const path = require("path");

// Verificar archivos críticos
const files = ["package.json", "app/layout.tsx", "app/page.tsx"];
files.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - FALTANTE`);
  }
});

// Verificar dependencias
const deps = ["next", "react", "better-sqlite3"];
deps.forEach(dep => {
  if (fs.existsSync(`node_modules/${dep}`)) {
    console.log(`✅ ${dep} instalado`);
  } else {
    console.log(`❌ ${dep} - NO INSTALADO`);
  }
});

console.log("🎉 Verificación completada");
\`\`\`

### PASO 6: Inicializar Base de Datos

\`\`\`cmd
npm run init-production
\`\`\`

**¿Qué esperar?**
- Se creará una carpeta `database`
- Se creará el archivo `universidad.db`
- Aparecerán mensajes de confirmación
- Se creará un usuario admin inicial

### PASO 7: Configurar Universidad

\`\`\`cmd
npm run setup-university
\`\`\`

Este comando te pedirá información como:
- Nombre de la universidad
- Dirección
- Teléfono
- Email
- Etc.

**Puedes usar datos de prueba inicialmente y cambiarlos después.**

---

## ✅ VERIFICACIÓN Y PRUEBAS {#verificacion}

### PASO 1: Verificar Estado del Sistema

\`\`\`cmd
npm run health-check
\`\`\`

Si este comando no existe, créalo siguiendo las instrucciones del paso anterior.

### PASO 2: Iniciar el Sistema

\`\`\`cmd
npm run dev
\`\`\`

**¿Qué esperar?**
- Aparecerá texto como "ready - started server on 0.0.0.0:3000"
- NO cierres esta ventana de CMD
- El sistema estará ejecutándose

### PASO 3: Acceder al Sistema

1. Abre tu navegador web (Chrome, Firefox, Edge, etc.)
2. Ve a: `http://localhost:3000`
3. Deberías ver la página de inicio del sistema

### PASO 4: Iniciar Sesión

- **Usuario**: `admin`
- **Contraseña**: `admin123`

### PASO 5: Cambiar Contraseña (IMPORTANTE)

1. Una vez dentro del sistema
2. Ve a Configuración o Perfil
3. Cambia la contraseña inmediatamente

---

## 🚀 PUESTA EN PRODUCCIÓN {#produccion}

### Para Uso en Una Sola Computadora

El sistema ya está listo. Solo necesitas:

1. **Iniciar el sistema**:
   \`\`\`cmd
   npm run dev
   \`\`\`

2. **Acceder**: `http://localhost:3000`

### Para Uso en Múltiples Computadoras (Red Local)

#### PASO 1: Obtener IP de la Computadora Servidor

En CMD:
\`\`\`cmd
ipconfig
\`\`\`

Busca la línea que dice "Dirección IPv4" (algo como `192.168.1.100`)

#### PASO 2: Configurar Firewall

**Windows:**
1. Ve a Panel de Control > Sistema y Seguridad > Firewall de Windows
2. Clic en "Configuración avanzada"
3. Clic en "Reglas de entrada" > "Nueva regla"
4. Selecciona "Puerto" > Siguiente
5. Selecciona "TCP" y escribe "3000" > Siguiente
6. Selecciona "Permitir la conexión" > Siguiente
7. Marca todas las opciones > Siguiente
8. Nombre: "Universidad Móvil" > Finalizar

#### PASO 3: Iniciar en Modo Red

\`\`\`cmd
npm run dev -- -H 0.0.0.0
\`\`\`

#### PASO 4: Acceder desde Otras Computadoras

En otras computadoras de la red:
- Ve a: `http://IP_DEL_SERVIDOR:3000`
- Ejemplo: `http://192.168.1.100:3000`

### Para Servidor Dedicado

#### PASO 1: Compilar para Producción

\`\`\`cmd
npm run build
\`\`\`

#### PASO 2: Iniciar en Modo Producción

\`\`\`cmd
npm start
\`\`\`

---

## 🔧 MANTENIMIENTO Y RESPALDOS {#mantenimiento}

### Crear Respaldos

#### Respaldo Manual:
\`\`\`cmd
npm run backup-db
\`\`\`

#### Respaldo Automático (Windows):
Crea un archivo `backup-automatico.bat`:

\`\`\`cmd
@echo off
cd C:\ruta\a\tu\proyecto
npm run backup-db
\`\`\`

Programa este archivo en el Programador de Tareas de Windows.

### Actualizar el Sistema

1. **Crear respaldo**:
   \`\`\`cmd
   npm run backup-db
   \`\`\`

2. **Descargar nueva versión**

3. **Reemplazar archivos** (excepto `database/` y configuraciones)

4. **Reinstalar dependencias**:
   \`\`\`cmd
   npm install --force
   \`\`\`

### Monitoreo

#### Ver Logs:
\`\`\`cmd
npm run dev
\`\`\`
Los logs aparecerán en la consola.

#### Verificar Estado:
\`\`\`cmd
npm run health-check
\`\`\`

---

## 🆘 SOLUCIÓN DE PROBLEMAS {#problemas}

### Error: "node no se reconoce"
**Solución**: Reinstalar Node.js desde https://nodejs.org/

### Error: "npm no se reconoce"
**Solución**: Reinstalar Node.js (NPM viene incluido)

### Error: "next no se reconoce"
**Solución**:
\`\`\`cmd
npm install --force
\`\`\`

### Error: Puerto 3000 ocupado
**Solución**:
\`\`\`cmd
netstat -ano | findstr :3000
taskkill /PID [NUMERO_PID] /F
\`\`\`

O usar otro puerto:
\`\`\`cmd
set PORT=8080
npm run dev
\`\`\`

### Error: Base de datos corrupta
**Solución**:
\`\`\`cmd
npm run reset-production
\`\`\`

### Error: Permisos insuficientes
**Solución**: Ejecutar CMD como Administrador

### Error: Firewall bloquea conexiones
**Solución**: Configurar firewall según la sección de Producción

### Sistema muy lento
**Posibles causas**:
- Poca RAM (cerrar otros programas)
- Disco lleno (liberar espacio)
- Antivirus interfiriendo (agregar excepción)

---

## 🌐 CONFIGURACIÓN DE RED {#red}

### Red Local Simple (2-10 computadoras)

1. **Servidor**: Una computadora ejecuta el sistema
2. **Clientes**: Otras computadoras acceden vía navegador
3. **Configuración**: Seguir pasos de "Uso en Múltiples Computadoras"

### Red Empresarial (10+ computadoras)

#### Opción 1: Servidor Dedicado
- Instalar en servidor Windows/Linux
- Configurar como servicio del sistema
- Usar proxy reverso (nginx/Apache) opcional

#### Opción 2: Contenedor Docker
\`\`\`dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install --production
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

### Acceso Remoto (Internet)

⚠️ **ADVERTENCIA**: Requiere conocimientos avanzados de seguridad

1. **Router**: Configurar port forwarding (puerto 3000)
2. **Firewall**: Configurar reglas apropiadas
3. **HTTPS**: Implementar certificados SSL
4. **Seguridad**: Cambiar contraseñas, configurar VPN

---

## 🔒 SEGURIDAD {#seguridad}

### Configuración Básica

1. **Cambiar contraseñas por defecto**
2. **Crear usuarios con roles específicos**
3. **Configurar respaldos regulares**
4. **Mantener sistema actualizado**

### Para Producción

1. **Firewall**: Solo permitir puertos necesarios
2. **Antivirus**: Excluir carpeta del proyecto
3. **Usuarios**: Principio de menor privilegio
4. **Logs**: Monitorear accesos sospechosos

### Para Red Local

1. **WiFi**: WPA3 o WPA2 fuerte
2. **Segmentación**: VLAN separada opcional
3. **Acceso físico**: Proteger servidor
4. **Respaldos**: Múltiples ubicaciones

---

## 📞 SOPORTE Y CONTACTO

### Autodiagnóstico

1. **Verificar estado**: `npm run health-check`
2. **Ver logs**: Revisar consola de CMD
3. **Probar conexión**: `http://localhost:3000`
4. **Verificar archivos**: Carpeta `database/` debe existir

### Información para Soporte

Si necesitas ayuda, proporciona:
- Versión de Node.js: `node --version`
- Sistema operativo
- Mensaje de error completo
- Pasos que llevaron al error
- Captura de pantalla

---

## 📋 LISTA DE VERIFICACIÓN FINAL

### Instalación Completada ✅

- [ ] Node.js instalado (v18+)
- [ ] Archivos del proyecto extraídos
- [ ] package.json actualizado
- [ ] Dependencias instaladas (`npm install`)
- [ ] Base de datos inicializada
- [ ] Universidad configurada
- [ ] Sistema iniciado (`npm run dev`)
- [ ] Acceso web funcionando (`http://localhost:3000`)
- [ ] Login exitoso (admin/admin123)
- [ ] Contraseña cambiada

### Para Producción ✅

- [ ] Respaldo inicial creado
- [ ] Firewall configurado (si aplica)
- [ ] Red configurada (si aplica)
- [ ] Usuarios adicionales creados
- [ ] Datos reales ingresados
- [ ] Pruebas de funcionalidad completadas
- [ ] Plan de respaldos establecido
- [ ] Documentación entregada a usuarios

---

**🎉 ¡FELICITACIONES! Tu sistema Universidad Móvil está listo para usar.**

Para cualquier duda, revisa esta guía paso a paso o ejecuta `npm run health-check` para verificar el estado del sistema.
