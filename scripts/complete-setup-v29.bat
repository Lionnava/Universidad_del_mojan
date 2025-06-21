@echo off
chcp 65001 >nul
echo ========================================
echo 🎓 UNIVERSIDAD MOVIL V29 - INSTALACION COMPLETA
echo ========================================
echo.

echo 🔍 Verificando requisitos del sistema...
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
echo 📦 Instalando dependencias V29...
echo ⏳ Esto puede tomar varios minutos...
npm install --legacy-peer-deps --no-audit --no-fund

if errorlevel 1 (
    echo.
    echo ⚠️ Error en instalación normal, intentando con --force...
    npm install --force --no-audit --no-fund
)

echo.
echo 🗄️ Configurando base de datos de producción...
if not exist database mkdir database
if not exist database\backups mkdir database\backups

echo.
echo 🏗️ Inicializando base de datos...
npm run init-production

if errorlevel 1 (
    echo ⚠️ Error inicializando BD, continuando...
)

echo.
echo 🏛️ Configurando universidad...
npm run setup-university

if errorlevel 1 (
    echo ⚠️ Error configurando universidad, continuando...
)

echo.
echo ✅ ¡INSTALACIÓN V29 COMPLETADA!
echo ========================================
echo 🎯 PRÓXIMOS PASOS:
echo    1. npm run dev          # Iniciar sistema
echo    2. Ir a: http://localhost:3000
echo    3. Usuario: admin / Contraseña: admin123
echo.
echo 📍 Ubicación: %CD%
echo 🔧 Versión: V29 - Modo PRODUCCIÓN
echo ========================================
pause
