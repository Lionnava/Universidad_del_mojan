@echo off
echo ========================================
echo 🎓 UNIVERSIDAD MOVIL V27 - CONFIGURACION COMPLETA
echo ========================================
echo.

echo 📋 Verificando sistema V27...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js no está instalado
    echo 📥 Instala Node.js desde: https://nodejs.org/
    pause
    exit /b 1
) else (
    echo ✅ Node.js: 
    node --version
)

echo.
echo 🗄️ Inicializando base de datos V27 PRODUCCIÓN...
if exist scripts\init-production.js (
    node scripts\init-production.js
) else (
    echo ⚠️  Creando estructura básica...
    if not exist database mkdir database
    if not exist database\backups mkdir database\backups
    echo ✅ Directorios creados
)

echo.
echo 🏛️ Configurando universidad...
if exist scripts\setup-university.js (
    node scripts\setup-university.js
) else (
    echo ✅ Configuración manual disponible en la interfaz web
)

echo.
echo 🎉 ¡CONFIGURACIÓN V27 COMPLETADA!
echo ========================================
echo 📋 INFORMACIÓN V27:
echo ========================================
echo 🌐 URL: http://localhost:3000
echo 👤 Usuario: admin
echo 🔒 Contraseña: admin123
echo 📊 Versión: 27.0.0 PRODUCCIÓN
echo 🗄️ Base de datos: SQLite local
echo.
echo ⚠️  IMPORTANTE V27:
echo 1. Sistema en modo PRODUCCIÓN (sin datos demo)
echo 2. Cambia la contraseña inmediatamente
echo 3. Configura los datos de tu universidad
echo 4. Crea respaldos regulares
echo.
echo 🚀 Para iniciar: npm run dev
echo.
pause
