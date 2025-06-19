# 🏠 Instalación Local - Universidad Móvil

## Requisitos del Sistema

### Mínimos:
- **Node.js**: 18.0 o superior
- **RAM**: 4GB mínimo
- **Disco**: 2GB libres
- **SO**: Windows 10/11, macOS 10.15+, Ubuntu 18.04+

### Recomendados:
- **Node.js**: 20.0 o superior
- **RAM**: 8GB o más
- **Disco**: 10GB libres (para datos y backups)
- **SO**: Versiones más recientes

## 📦 Instalación Paso a Paso

### 1. Descargar el Sistema
\`\`\`bash
# Opción A: Clonar repositorio
git clone https://github.com/tu-usuario/universidad-movil.git
cd universidad-movil

# Opción B: Descargar ZIP y extraer
# Luego navegar a la carpeta extraída
\`\`\`

### 2. Instalar Dependencias
\`\`\`bash
# Instalar todas las dependencias
npm install

# O usar yarn si lo prefieres
yarn install
\`\`\`

### 3. Configurar Base de Datos
\`\`\`bash
# Configurar directorios y base de datos
npm run setup-db

# Esto creará:
# - /database/universidad.db (base de datos principal)
# - /database/backups/ (carpeta de respaldos)
\`\`\`

### 4. Iniciar el Sistema
\`\`\`bash
# Modo desarrollo (recomendado para pruebas)
npm run dev

# Modo producción
npm run build
npm start
\`\`\`

### 5. Acceder al Sistema
- **URL**: http://localhost:3000
- **Usuario**: admin
- **Contraseña**: demo

## 🔧 Configuración Inicial

### Usuarios por Defecto:
| Usuario | Contraseña | Rol |
|---------|------------|-----|
| admin | demo | Gerencial |
| analista1 | demo | Analista |
| prof_garcia | demo | Profesor |
| est_20123456 | demo | Estudiante |

### Cambiar Contraseñas:
1. Ingresar como admin
2. Ir a "Gestión de Usuarios"
3. Cambiar contraseñas por seguridad

## 💾 Gestión de Backups

### Crear Backup Manual:
\`\`\`bash
npm run backup-db
\`\`\`

### Restaurar Backup:
\`\`\`bash
npm run restore-db ruta/al/backup.db
\`\`\`

### Backups Automáticos:
El sistema crea backups automáticos:
- Diariamente a las 2:00 AM
- Antes de actualizaciones importantes
- Ubicación: `/database/backups/`

## 🌐 Instalación en Red Local

### Para Servidor Local:
\`\`\`bash
# 1. Instalar en servidor
npm install
npm run setup-db
npm run build

# 2. Configurar puerto (opcional)
# Crear archivo .env.local:
PORT=8080

# 3. Iniciar en modo producción
npm start
\`\`\`

### Acceso desde Otras Computadoras:
1. **Obtener IP del servidor**: `ipconfig` (Windows) o `ifconfig` (Linux/Mac)
2. **Configurar firewall**: Permitir puerto 3000 (o el configurado)
3. **Acceder desde clientes**: http://IP_SERVIDOR:3000

Ejemplo: http://192.168.1.100:3000

## 🔒 Seguridad

### Configuraciones Recomendadas:
1. **Cambiar contraseñas por defecto**
2. **Configurar firewall** para limitar acceso
3. **Backups regulares** en ubicación segura
4. **Actualizaciones periódicas** del sistema

### Archivos Importantes:
- `/database/universidad.db` - Base de datos principal
- `/database/backups/` - Respaldos
- `.env.local` - Configuración local (crear si es necesario)

## 🚨 Solución de Problemas

### Error: "Cannot find module 'better-sqlite3'"
\`\`\`bash
npm install better-sqlite3
# Si persiste en Windows:
npm install --build-from-source better-sqlite3
\`\`\`

### Error: "Permission denied"
\`\`\`bash
# Linux/Mac - Dar permisos:
chmod +x scripts/*.js
sudo chown -R $USER:$USER database/
\`\`\`

### Puerto en Uso:
\`\`\`bash
# Cambiar puerto en .env.local:
PORT=8080

# O matar proceso:
# Windows: netstat -ano | findstr :3000
# Linux/Mac: lsof -ti:3000 | xargs kill
\`\`\`

## 📊 Monitoreo del Sistema

### Logs del Sistema:
- Ubicación: `/logs/` (se crea automáticamente)
- Rotación: Diaria
- Retención: 30 días

### Estadísticas de Uso:
- Dashboard administrativo
- Reportes de actividad
- Métricas de rendimiento

## 🔄 Actualizaciones

### Actualizar Sistema:
\`\`\`bash
# 1. Crear backup
npm run backup-db

# 2. Descargar nueva versión
git pull origin main
# O descargar nuevo ZIP

# 3. Actualizar dependencias
npm install

# 4. Reiniciar sistema
npm run build
npm start
\`\`\`

## 📞 Soporte

### Información del Sistema:
- **Versión**: 1.0.0
- **Base de datos**: SQLite local
- **Dependencias**: Ver package.json

### Contacto:
- **Email**: soporte@universidadmovil.edu
- **Documentación**: /docs/
- **Issues**: GitHub Issues (si aplica)

---

## ✅ Lista de Verificación Post-Instalación

- [ ] Sistema inicia correctamente
- [ ] Base de datos creada en `/database/`
- [ ] Login con usuario admin funciona
- [ ] Backup manual funciona
- [ ] Acceso desde red local (si aplica)
- [ ] Contraseñas cambiadas
- [ ] Firewall configurado
