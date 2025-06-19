@echo off
title Universidad Móvil - Inicio Rápido

echo ========================================
echo 🎓 UNIVERSIDAD MOVIL - INICIO RAPIDO
echo ========================================
echo.

echo 🔍 Verificando sistema...

REM Verificar Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js no instalado
    echo 📥 Ejecuta: scripts\complete-setup.bat
    pause
    exit /b 1
)

REM Verificar dependencias
if not exist node_modules (
    echo ❌ Dependencias no instaladas
    echo 📦 Ejecuta: scripts\complete-setup.bat
    pause
    exit /b 1
)

REM Verificar base de datos
if not exist database\universidad.db (
    echo ⚠️  Base de datos no encontrada
    echo 🗄️ Creando base de datos...
    if exist scripts\init-production.js (
        node scripts\init-production.js
    ) else (
        mkdir database 2>nul
        echo ✅ Carpeta database creada
    )
)

echo ✅ Sistema verificado

echo.
echo 🚀 Iniciando Universidad Móvil...
echo.
echo 📋 INFORMACION DE ACCESO:
echo ========================================
echo 🌐 URL: http://localhost:3000
echo 👤 Usuario: admin
echo 🔒 Contraseña: admin123
echo ========================================
echo.
echo ⚠️  IMPORTANTE:
echo - NO cierres esta ventana
echo - Abre tu navegador y ve a la URL mostrada
echo - Cambia la contraseña después del primer login
echo.
echo Presiona Ctrl+C para detener el sistema
echo.

npm run dev
