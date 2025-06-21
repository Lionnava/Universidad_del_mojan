# 🎓 Universidad Móvil V29 - Sistema de Gestión Integral

## 🚀 Versión 29.0.0 - Modo Producción

Sistema completo de gestión universitaria desarrollado para uso local con base de datos SQLite.

### ✅ Características V29

- **🏭 Modo Producción** - Sin datos demo, listo para uso real
- **🗄️ Base de datos local** - SQLite sin dependencias externas
- **👥 Gestión completa** - Estudiantes, profesores, materias
- **📊 Reportes avanzados** - Múltiples formatos (PDF, CSV, JSON)
- **🔒 Autenticación** - Sistema de usuarios y roles
- **📋 Constancias** - Generación automática de documentos
- **⚡ Alto rendimiento** - Optimizado para instituciones

### 🛠️ Instalación Rápida

\`\`\`bash
# 1. Ejecutar instalación automática
scripts\complete-setup-v29.bat

# 2. Iniciar sistema
npm run dev

# 3. Acceder al sistema
# URL: http://localhost:3000
# Usuario: admin
# Contraseña: admin123
\`\`\`

### 📋 Requisitos del Sistema

- **Node.js**: 18.x - 20.x (recomendado 20.x)
- **RAM**: Mínimo 4GB, recomendado 8GB
- **Disco**: 2GB libres
- **SO**: Windows 10/11, Linux, macOS

### 🎯 Módulos Incluidos

1. **Gestión de Estudiantes** - Registro, inscripciones, seguimiento
2. **Gestión Académica** - Materias, horarios, planificación
3. **Sistema de Evaluaciones** - Calificaciones, consolidados
4. **Gestión de Profesores** - Asignaciones, horarios
5. **Reportes y Estadísticas** - Análisis completo
6. **Constancias Digitales** - Generación automática

### 🔧 Comandos Disponibles

\`\`\`bash
npm run dev              # Iniciar en desarrollo
npm run build            # Compilar para producción
npm run start            # Iniciar en producción
npm run init-production  # Inicializar BD limpia
npm run setup-university # Configurar universidad
npm run backup-db        # Crear respaldo
npm run health-check     # Verificar sistema
\`\`\`

### 📁 Estructura del Proyecto

\`\`\`
universidad-v29/
├── app/                 # Páginas y rutas de Next.js
├── components/          # Componentes reutilizables
├── lib/                 # Utilidades y base de datos
├── scripts/             # Scripts de configuración
├── database/            # Base de datos SQLite
└── public/              # Archivos estáticos
\`\`\`

### 🔒 Seguridad

- Contraseñas encriptadas con bcrypt
- Validación de entrada en todas las rutas
- Sesiones seguras
- Auditoría de cambios

### 📞 Soporte

Para soporte técnico o consultas:
- Revisar logs en `database/logs/`
- Ejecutar `npm run health-check`
- Consultar documentación en `/docs/`

---

**Universidad Móvil V29** - Sistema de gestión universitaria completo y autónomo.
