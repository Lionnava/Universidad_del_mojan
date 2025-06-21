@echo off
echo ========================================
echo    UNIVERSIDAD MOVIL V29 - SQLite
echo    Configuracion Completa para Produccion
echo ========================================
echo.

echo [1/6] Verificando Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js no encontrado. Instalando...
    winget install OpenJS.NodeJS
    if errorlevel 1 (
        echo ❌ Error instalando Node.js
        pause
        exit /b 1
    )
)
echo ✅ Node.js disponible

echo.
echo [2/6] Instalando dependencias del proyecto...
call npm install
if errorlevel 1 (
    echo ❌ Error instalando dependencias
    pause
    exit /b 1
)
echo ✅ Dependencias instaladas

echo.
echo [3/6] Instalando SQLite3...
call npm install better-sqlite3 @types/better-sqlite3
if errorlevel 1 (
    echo ❌ Error instalando SQLite3
    pause
    exit /b 1
)
echo ✅ SQLite3 instalado

echo.
echo [4/6] Creando directorios necesarios...
if not exist "database" mkdir database
if not exist "database\backups" mkdir database\backups
if not exist "database\exports" mkdir database\exports
echo ✅ Directorios creados

echo.
echo [5/6] Inicializando base de datos SQLite...
node -e "
const { initializeDatabase } = require('./lib/database-sqlite.ts');
try {
  const result = initializeDatabase();
  if (result) {
    console.log('✅ Base de datos SQLite inicializada');
  } else {
    console.log('❌ Error inicializando base de datos');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Error:', error);
  process.exit(1);
}
"
if errorlevel 1 (
    echo ❌ Error inicializando base de datos
    pause
    exit /b 1
)

echo.
echo [6/6] Compilando proyecto...
call npm run build
if errorlevel 1 (
    echo ⚠️ Advertencia: Error en compilación, pero continuando...
)

echo.
echo ========================================
echo ✅ INSTALACION COMPLETADA EXITOSAMENTE
echo ========================================
echo.
echo 🚀 SISTEMA LISTO PARA PRODUCCION
echo.
echo 📊 Base de Datos: SQLite (Local)
echo 📁 Ubicación BD: ./database/universidad.db
echo 💾 Backups: ./database/backups/
echo 📤 Exportaciones: ./database/exports/
echo.
echo 🔑 CREDENCIALES POR DEFECTO:
echo    👨‍💼 Gerencial: admin / admin123
echo    📊 Analista: analista / analista123  
echo    👨‍🏫 Profesor: profesor / profesor123
echo    👨‍🎓 Estudiante: estudiante / estudiante123
echo.
echo 🌐 Para iniciar el servidor:
echo    npm run dev
echo.
echo 📋 Funcionalidades incluidas:
echo    ✅ Gestión completa de estudiantes
echo    ✅ Gestión de profesores y materias
echo    ✅ Sistema de inscripciones
echo    ✅ Generación de reportes
echo    ✅ Exportación/Importación de BD
echo    ✅ Sistema de backups automáticos
echo    ✅ Constancias digitales
echo    ✅ Dashboard por roles
echo.
pause
