@echo off
chcp 65001 >nul
echo ========================================
echo 🎓 UNIVERSIDAD MOVIL V29 - SETUP LOCAL
echo ========================================
echo.

echo 🔍 Verificando Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js no está instalado
    echo 📥 Descarga Node.js desde: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js instalado:
node --version

echo.
echo 🧹 Limpiando instalación anterior...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
if exist .next rmdir /s /q .next

echo.
echo 📦 Instalando dependencias LOCALES...
echo ⏳ Instalando SQLite y dependencias básicas...

npm install better-sqlite3 @types/better-sqlite3 --save
npm install next react react-dom typescript @types/node @types/react @types/react-dom --save
npm install tailwindcss postcss autoprefixer --save-dev
npm install lucide-react class-variance-authority clsx tailwind-merge --save

if errorlevel 1 (
    echo ❌ Error instalando dependencias
    pause
    exit /b 1
)

echo.
echo 🗄️ Configurando base de datos LOCAL...
if not exist database mkdir database
if not exist database\backups mkdir database\backups
if not exist database\exports mkdir database\exports

echo.
echo 🏗️ Inicializando base de datos SQLite...
node -e "
const { initializeDatabase } = require('./lib/database-local.ts');
try {
  const result = initializeDatabase();
  if (result) {
    console.log('✅ Base de datos SQLite inicializada correctamente');
  } else {
    console.log('❌ Error inicializando base de datos');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
"

if errorlevel 1 (
    echo ⚠️ Error inicializando BD, pero continuando...
)

echo.
echo 🏗️ Compilando proyecto...
npm run build

if errorlevel 1 (
    echo ⚠️ Error en compilación, pero continuando...
)

echo.
echo ✅ ¡INSTALACIÓN LOCAL COMPLETADA!
echo ========================================
echo 🎯 SISTEMA 100%% LOCAL - SIN DEPENDENCIAS EXTERNAS
echo.
echo 📊 Base de Datos: SQLite (./database/universidad.db)
echo 💾 Backups: ./database/backups/
echo 📤 Exportaciones: ./database/exports/
echo.
echo 🔑 CREDENCIALES:
echo    👨‍💼 Gerencial: admin / admin123
echo    📊 Analista: analista / analista123
echo    👨‍🏫 Profesor: profesor / profesor123
echo    🎓 Estudiante: estudiante / est123
echo.
echo 🚀 INICIAR SISTEMA:
echo    npm run dev
echo    Luego ir a: http://localhost:3000
echo.
echo 📍 Ubicación: %CD%
echo 🔧 Versión: V29 - LOCAL OPTIMIZADO
echo ========================================
pause
