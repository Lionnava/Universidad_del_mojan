# 🎓 Universidad Móvil - Guía Completa de Instalación y Producción

## 📋 Tabla de Contenidos
1. [Requisitos del Sistema](#requisitos-del-sistema)
2. [Instalación Paso a Paso](#instalación-paso-a-paso)
3. [Configuración Inicial](#configuración-inicial)
4. [Configuración de Producción](#configuración-de-producción)
5. [Configuración de Red](#configuración-de-red)
6. [Seguridad](#seguridad)
7. [Respaldos y Mantenimiento](#respaldos-y-mantenimiento)
8. [Solución de Problemas](#solución-de-problemas)
9. [Monitoreo y Logs](#monitoreo-y-logs)
10. [Actualizaciones](#actualizaciones)

---

## 🖥️ Requisitos del Sistema

### Requisitos Mínimos
- **Sistema Operativo**: Windows 10/11, macOS 10.15+, Ubuntu 18.04+, CentOS 7+
- **Node.js**: Versión 18.0 o superior
- **RAM**: 4GB mínimo
- **Disco Duro**: 5GB libres (2GB para sistema + 3GB para datos)
- **Procesador**: Dual Core 2.0GHz
- **Red**: Puerto 3000 disponible

### Requisitos Recomendados para Producción
- **Sistema Operativo**: Ubuntu 20.04+ LTS o Windows Server 2019+
- **Node.js**: Versión 20.0 LTS
- **RAM**: 8GB o más
- **Disco Duro**: 50GB+ (SSD recomendado)
- **Procesador**: Quad Core 2.5GHz+
- **Red**: Conexión estable, firewall configurado

### Verificar Requisitos

#### Windows:
\`\`\`cmd
# Verificar Node.js
node --version
npm --version

# Si no está instalado, descargar de: https://nodejs.org/
\`\`\`

#### Linux/macOS:
\`\`\`bash
# Verificar Node.js
node --version
npm --version

# Instalar Node.js en Ubuntu/Debian:
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar Node.js en CentOS/RHEL:
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs
\`\`\`

---

## 📦 Instalación Paso a Paso

### Paso 1: Obtener el Sistema

#### Opción A: Descargar ZIP
1. Descargar el archivo ZIP del sistema
2. Extraer en la ubicación deseada (ej: `C:\Universidad` o `/opt/universidad`)
3. Abrir terminal/consola en esa carpeta

#### Opción B: Clonar Repositorio
\`\`\`bash
git clone https://github.com/tu-usuario/universidad-movil.git
cd universidad-movil
\`\`\`

### Paso 2: Verificar Estructura de Archivos
Asegúrate de tener esta estructura:
\`\`\`
universidad-movil/
├── app/
├── components/
├── lib/
├── scripts/
├── package.json
├── next.config.mjs
├── tailwind.config.ts
└── README.md
\`\`\`

### Paso 3: Instalar Dependencias

#### Windows:
\`\`\`cmd
# Abrir PowerShell como Administrador
cd C:\ruta\a\universidad-movil

# Instalar dependencias
npm install

# Si hay errores con better-sqlite3:
npm install --build-from-source better-sqlite3
\`\`\`

#### Linux/macOS:
\`\`\`bash
cd /ruta/a/universidad-movil

# Instalar dependencias del sistema (Ubuntu/Debian)
sudo apt-get update
sudo apt-get install -y build-essential python3

# Instalar dependencias del proyecto
npm install

# Si hay errores de permisos:
sudo chown -R $USER:$USER node_modules/
\`\`\`

### Paso 4: Verificar Instalación
\`\`\`bash
# Verificar que las dependencias se instalaron correctamente
npm list --depth=0

# Deberías ver todas las dependencias listadas sin errores
\`\`\`

---

## ⚙️ Configuración Inicial

### Paso 1: Inicializar Base de Datos de Producción
\`\`\`bash
# Para producción (SIN datos de prueba)
npm run init-production

# Deberías ver:
# 🎉 ¡Base de datos de PRODUCCIÓN lista!
# 🔑 Usuario administrador inicial:
#    👤 Usuario: admin
#    🔒 Contraseña: admin123
\`\`\`

### Paso 2: Configurar tu Universidad
\`\`\`bash
npm run setup-university
\`\`\`

**Ejemplo de configuración:**
\`\`\`
🏛️  Configuración Inicial de la Universidad
==========================================
📝 Configuración de la Universidad:
Nombre de la Universidad: Universidad Tecnológica del Estado
Dirección: Av. Universidad, Sector Centro, Ciudad, Estado
Teléfono: +58-212-1234567
Email institucional: info@ute.edu.ve

📚 Configuración de Carreras:
¿Deseas agregar carreras ahora? (s/n): s

--- Nueva Carrera ---
Nombre de la carrera: Ingeniería en Informática
Código (ej: INF, MED, DER): INF
Duración en trayectos (ej: 4): 4
✅ Carrera "Ingeniería en Informática" agregada con ID: 1

¿Agregar otra carrera? (s/n): s

--- Nueva Carrera ---
Nombre de la carrera: Administración de Empresas
Código (ej: INF, MED, DER): ADM
Duración en trayectos (ej: 4): 4
✅ Carrera "Administración de Empresas" agregada con ID: 2

¿Agregar otra carrera? (s/n): n

📅 Configuración de Período Académico:
¿Deseas configurar el período académico actual? (s/n): s
Nombre del período (ej: 2024-2025): 2024-2025
Fecha de inicio (YYYY-MM-DD): 2024-09-01
Fecha de fin (YYYY-MM-DD): 2025-07-31
✅ Período académico "2024-2025" creado con ID: 1
\`\`\`

### Paso 3: Crear Usuarios Adicionales (Opcional)
\`\`\`bash
npm run create-admin

# Ejemplo:
# 👤 Creador de Usuario Administrador
# =====================================
# 📝 Ingresa los datos del nuevo administrador:
# Nombre de usuario: director
# Email: director@ute.edu.ve
# Contraseña: MiClaveSegura123!
# ✅ Usuario administrador creado exitosamente!
\`\`\`

### Paso 4: Verificar Configuración
\`\`\`bash
# Verificar que la base de datos está correcta
node scripts/check-database.js

# Deberías ver las tablas con datos:
# 📊 Estadísticas de la base de datos:
#    - Carreras: 2
#    - Usuarios: 2
#    - Períodos: 1
\`\`\`

---

## 🚀 Configuración de Producción

### Paso 1: Configurar Variables de Entorno (Opcional)
Crear archivo `.env.local` en la raíz del proyecto:
\`\`\`env
# Puerto del servidor (opcional, por defecto 3000)
PORT=8080

# Configuración de seguridad
NODE_ENV=production

# Configuración de logs
LOG_LEVEL=info
LOG_FILE=logs/universidad.log
\`\`\`

### Paso 2: Compilar para Producción
\`\`\`bash
# Compilar el proyecto
npm run build

# Deberías ver:
# ✓ Compiled successfully
# ✓ Collecting page data
# ✓ Finalizing page optimization
\`\`\`

### Paso 3: Probar en Modo Desarrollo
\`\`\`bash
# Iniciar en modo desarrollo para probar
npm run dev

# Deberías ver:
# ▲ Next.js 14.0.4
# - Local:        http://localhost:3000
# - Network:      http://192.168.1.100:3000
# ✓ Ready in 2.3s
\`\`\`

### Paso 4: Acceder y Verificar
1. Abrir navegador en `http://localhost:3000`
2. Iniciar sesión con `admin` / `admin123`
3. Verificar que todas las secciones funcionan:
   - Dashboard
   - Gestión de Estudiantes
   - Gestión de Aspirantes
   - Reportes
   - Configuración

### Paso 5: Cambiar Contraseña del Administrador
**⚠️ CRÍTICO: Hacer esto INMEDIATAMENTE**
1. Iniciar sesión como admin
2. Ir a "Configuración de Usuario" o "Mi Perfil"
3. Cambiar contraseña por una segura
4. Cerrar sesión y probar con la nueva contraseña

---

## 🌐 Configuración de Red

### Para Uso Local (Una sola computadora)
\`\`\`bash
# Iniciar normalmente
npm run dev
# Acceder en: http://localhost:3000
\`\`\`

### Para Red Local (Múltiples computadoras)

#### Paso 1: Configurar Firewall

**Windows:**
\`\`\`cmd
# Abrir PowerShell como Administrador
# Permitir puerto 3000
netsh advfirewall firewall add rule name="Universidad Movil" dir=in action=allow protocol=TCP localport=3000

# Verificar regla
netsh advfirewall firewall show rule name="Universidad Movil"
\`\`\`

**Linux (Ubuntu/Debian):**
\`\`\`bash
# Permitir puerto 3000
sudo ufw allow 3000/tcp

# Verificar estado
sudo ufw status
\`\`\`

**Linux (CentOS/RHEL):**
\`\`\`bash
# Permitir puerto 3000
sudo firewall-cmd --permanent --add-port=3000/tcp
sudo firewall-cmd --reload

# Verificar
sudo firewall-cmd --list-ports
\`\`\`

#### Paso 2: Obtener IP del Servidor
**Windows:**
\`\`\`cmd
ipconfig
# Buscar "Dirección IPv4": 192.168.1.100
\`\`\`

**Linux/macOS:**
\`\`\`bash
ip addr show
# o
ifconfig
# Buscar inet: 192.168.1.100
\`\`\`

#### Paso 3: Configurar Next.js para Red
Crear/editar `next.config.mjs`:
\`\`\`javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Permitir acceso desde cualquier IP
  experimental: {
    serverComponentsExternalPackages: ['better-sqlite3']
  }
}

export default nextConfig
\`\`\`

#### Paso 4: Iniciar Servidor
\`\`\`bash
# Para desarrollo con acceso de red
npm run dev -- -H 0.0.0.0

# Para producción
npm run build
npm start -- -H 0.0.0.0
\`\`\`

#### Paso 5: Acceder desde Otras Computadoras
- **URL**: `http://IP_DEL_SERVIDOR:3000`
- **Ejemplo**: `http://192.168.1.100:3000`

### Para Servidor Dedicado

#### Configurar como Servicio (Linux)
\`\`\`bash
# Crear archivo de servicio
sudo nano /etc/systemd/system/universidad.service
\`\`\`

Contenido del archivo:
\`\`\`ini
[Unit]
Description=Universidad Movil
After=network.target

[Service]
Type=simple
User=universidad
WorkingDirectory=/opt/universidad-movil
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=10
Environment=NODE_ENV=production
Environment=PORT=3000

[Install]
WantedBy=multi-user.target
\`\`\`

\`\`\`bash
# Habilitar y iniciar servicio
sudo systemctl daemon-reload
sudo systemctl enable universidad
sudo systemctl start universidad

# Verificar estado
sudo systemctl status universidad
\`\`\`

---

## 🔐 Seguridad

### Configuración Básica de Seguridad

#### 1. Cambiar Contraseñas por Defecto
- ✅ Cambiar contraseña del admin inmediatamente
- ✅ Usar contraseñas fuertes (mínimo 12 caracteres)
- ✅ Incluir mayúsculas, minúsculas, números y símbolos

#### 2. Configurar Firewall
\`\`\`bash
# Solo permitir puerto necesario
# Windows: Solo puerto 3000
# Linux: sudo ufw allow from 192.168.1.0/24 to any port 3000
\`\`\`

#### 3. Configurar HTTPS (Producción)
Para producción seria, usar un proxy reverso como Nginx:

\`\`\`nginx
# /etc/nginx/sites-available/universidad
server {
    listen 80;
    server_name tu-dominio.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name tu-dominio.com;
    
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
\`\`\`

#### 4. Configurar Respaldos Automáticos
\`\`\`bash
# Crear script de respaldo automático
nano backup-auto.sh
\`\`\`

\`\`\`bash
#!/bin/bash
# backup-auto.sh
cd /ruta/a/universidad-movil
npm run backup-db
echo "Backup completado: $(date)" >> logs/backup.log
\`\`\`

\`\`\`bash
# Hacer ejecutable
chmod +x backup-auto.sh

# Agregar a crontab para respaldo diario a las 2 AM
crontab -e
# Agregar línea:
0 2 * * * /ruta/a/universidad-movil/backup-auto.sh
\`\`\`

---

## 💾 Respaldos y Mantenimiento

### Respaldos Manuales
\`\`\`bash
# Crear respaldo inmediato
npm run backup-db

# El respaldo se guarda en: database/backups/
# Formato: universidad_backup_YYYY-MM-DD_HH-MM-SS.db
\`\`\`

### Restaurar Respaldo
\`\`\`bash
# Detener el sistema
# Ctrl+C si está corriendo

# Restaurar respaldo
cp database/backups/universidad_backup_2024-01-15_14-30-00.db database/universidad.db

# Reiniciar sistema
npm run dev
\`\`\`

### Mantenimiento de Base de Datos
\`\`\`bash
# Verificar integridad de la base de datos
node -e "
const Database = require('better-sqlite3');
const db = new Database('database/universidad.db');
console.log('Verificando integridad...');
const result = db.pragma('integrity_check');
console.log('Resultado:', result);
db.close();
"
\`\`\`

### Limpieza de Logs
\`\`\`bash
# Crear script de limpieza
nano cleanup-logs.sh
\`\`\`

\`\`\`bash
#!/bin/bash
# Eliminar logs más antiguos de 30 días
find logs/ -name "*.log" -mtime +30 -delete
echo "Logs limpiados: $(date)" >> logs/maintenance.log
\`\`\`

---

## 🔧 Solución de Problemas

### Error: "Cannot find module 'better-sqlite3'"
\`\`\`bash
# Solución 1: Reinstalar
npm uninstall better-sqlite3
npm install better-sqlite3

# Solución 2: Compilar desde fuente (Windows)
npm install --build-from-source better-sqlite3

# Solución 3: Instalar herramientas de compilación
# Windows: Instalar Visual Studio Build Tools
# Linux: sudo apt-get install build-essential python3
\`\`\`

### Error: "Port 3000 already in use"
\`\`\`bash
# Ver qué proceso usa el puerto
# Windows:
netstat -ano | findstr :3000

# Linux/macOS:
lsof -ti:3000

# Matar proceso
# Windows:
taskkill /PID <PID> /F

# Linux/macOS:
kill -9 <PID>

# O usar otro puerto
PORT=8080 npm run dev
\`\`\`

### Error: "Permission denied"
\`\`\`bash
# Linux/macOS: Dar permisos
sudo chown -R $USER:$USER .
chmod +x scripts/*.js

# Windows: Ejecutar como Administrador
\`\`\`

### Error: "Database is locked"
\`\`\`bash
# Verificar que no hay múltiples instancias corriendo
ps aux | grep node

# Reiniciar sistema
# Ctrl+C para detener
npm run dev
\`\`\`

### Error: "Cannot connect from other computers"
1. ✅ Verificar firewall configurado
2. ✅ Verificar IP correcta
3. ✅ Verificar que el servidor está corriendo con `-H 0.0.0.0`
4. ✅ Verificar que no hay proxy/VPN bloqueando

### Base de Datos Corrupta
\`\`\`bash
# Restaurar desde respaldo más reciente
cp database/backups/universidad_backup_FECHA.db database/universidad.db

# Si no hay respaldos, reinicializar
npm run reset-production
npm run setup-university
\`\`\`

---

## 📊 Monitoreo y Logs

### Configurar Logs
Crear directorio de logs:
\`\`\`bash
mkdir -p logs
\`\`\`

### Ver Logs en Tiempo Real
\`\`\`bash
# Linux/macOS
tail -f logs/universidad.log

# Windows
Get-Content logs/universidad.log -Wait
\`\`\`

### Monitoreo de Rendimiento
\`\`\`bash
# Verificar uso de recursos
# Linux:
htop
# o
ps aux | grep node

# Windows:
# Usar Task Manager o:
wmic process where name="node.exe" get ProcessId,PageFileUsage,WorkingSetSize
\`\`\`

### Estadísticas de la Base de Datos
\`\`\`bash
node -e "
const Database = require('better-sqlite3');
const db = new Database('database/universidad.db');

console.log('📊 Estadísticas de la Base de Datos:');
console.log('====================================');

const tables = ['usuarios', 'estudiantes', 'aspirantes', 'profesores', 'carreras', 'materias', 'inscripciones'];

tables.forEach(table => {
  try {
    const count = db.prepare(\`SELECT COUNT(*) as count FROM \${table}\`).get();
    console.log(\`\${table.padEnd(15)}: \${count.count}\`);
  } catch (e) {
    console.log(\`\${table.padEnd(15)}: Error\`);
  }
});

db.close();
"
\`\`\`

---

## 🔄 Actualizaciones

### Preparar para Actualización
\`\`\`bash
# 1. Crear respaldo completo
npm run backup-db

# 2. Documentar configuración actual
node scripts/check-database.js > config-actual.txt

# 3. Detener sistema
# Ctrl+C
\`\`\`

### Aplicar Actualización
\`\`\`bash
# 1. Descargar nueva versión
# Reemplazar archivos (excepto database/ y .env.local)

# 2. Actualizar dependencias
npm install

# 3. Ejecutar migraciones (si las hay)
# npm run migrate

# 4. Probar en desarrollo
npm run dev

# 5. Si todo funciona, compilar para producción
npm run build
npm start
\`\`\`

### Rollback (Volver Atrás)
\`\`\`bash
# 1. Detener sistema
# Ctrl+C

# 2. Restaurar versión anterior
# Reemplazar archivos con versión anterior

# 3. Restaurar base de datos si es necesario
cp database/backups/universidad_backup_ANTES_ACTUALIZACION.db database/universidad.db

# 4. Reinstalar dependencias de versión anterior
npm install

# 5. Iniciar
npm run dev
\`\`\`

---

## ✅ Lista de Verificación Final

### Antes de Poner en Producción
- [ ] ✅ Node.js 18+ instalado
- [ ] ✅ Dependencias instaladas sin errores
- [ ] ✅ Base de datos inicializada (`npm run init-production`)
- [ ] ✅ Universidad configurada (`npm run setup-university`)
- [ ] ✅ Contraseña del admin cambiada
- [ ] ✅ Sistema funciona en desarrollo (`npm run dev`)
- [ ] ✅ Sistema compilado para producción (`npm run build`)
- [ ] ✅ Firewall configurado (si es para red)
- [ ] ✅ Respaldo inicial creado
- [ ] ✅ Usuarios adicionales creados
- [ ] ✅ Todas las secciones probadas

### Después de Poner en Producción
- [ ] ✅ Sistema accesible desde todas las computadoras necesarias
- [ ] ✅ Respaldos automáticos configurados
- [ ] ✅ Monitoreo configurado
- [ ] ✅ Personal capacitado en el uso
- [ ] ✅ Documentación entregada
- [ ] ✅ Plan de mantenimiento establecido

---

## 📞 Soporte y Contacto

### Información del Sistema
- **Nombre**: Universidad Móvil
- **Versión**: 1.0.0
- **Base de Datos**: SQLite local
- **Framework**: Next.js 14

### Archivos Importantes
- **Base de datos**: `database/universidad.db`
- **Respaldos**: `database/backups/`
- **Configuración**: `.env.local` (opcional)
- **Logs**: `logs/` (se crea automáticamente)

### Comandos Útiles de Referencia
\`\`\`bash
# Desarrollo
npm run dev                 # Iniciar en modo desarrollo
npm run build              # Compilar para producción
npm start                  # Iniciar en modo producción

# Base de datos
npm run init-production    # Crear BD de producción
npm run setup-university   # Configurar universidad
npm run create-admin       # Crear usuario admin
npm run backup-db          # Crear respaldo
npm run reset-production   # Resetear BD

# Mantenimiento
node scripts/check-database.js  # Verificar BD
\`\`\`

---

## 🎉 ¡Felicitaciones!

Si has seguido esta guía completamente, ahora tienes:

✅ **Sistema universitario completamente funcional**  
✅ **Base de datos configurada para tu institución**  
✅ **Acceso seguro y controlado**  
✅ **Respaldos automáticos**  
✅ **Sistema listo para cientos de usuarios**  
✅ **Independencia total - sin costos recurrentes**  

**¡Tu Universidad Móvil está lista para transformar la gestión académica!** 🎓

---

*Última actualización: Enero 2025*  
*Versión de la guía: 1.0*
