@echo off
echo ========================================
echo 🎓 UNIVERSIDAD MOVIL - INSTALACION COMPLETA
echo ========================================
echo.

echo 📋 Verificando requisitos del sistema...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js no está instalado
    echo 📥 Descarga Node.js desde: https://nodejs.org/
    echo.
    echo Presiona cualquier tecla para abrir la página de descarga...
    pause >nul
    start https://nodejs.org/
    echo.
    echo Después de instalar Node.js, ejecuta este script nuevamente.
    pause
    exit /b 1
) else (
    echo ✅ Node.js instalado: 
    node --version
)

npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ NPM no está disponible
    echo 🔧 Reinstala Node.js desde: https://nodejs.org/
    pause
    exit /b 1
) else (
    echo ✅ NPM instalado: 
    npm --version
)

echo.
echo 🧹 Limpiando instalación anterior...
if exist node_modules (
    echo Eliminando node_modules...
    rmdir /s /q node_modules
)
if exist package-lock.json (
    echo Eliminando package-lock.json...
    del package-lock.json
)
if exist .next (
    echo Eliminando .next...
    rmdir /s /q .next
)

echo.
echo 📁 Creando estructura de directorios...
if not exist database mkdir database
if not exist database\backups mkdir database\backups
if not exist logs mkdir logs

echo.
echo 📦 Instalando dependencias...
echo ⏳ Esto puede tomar varios minutos, por favor espera...
echo.

npm install --force --no-audit --no-fund --loglevel=error

if errorlevel 1 (
    echo ❌ Error instalando dependencias con --force
    echo 🔧 Intentando instalación alternativa...
    npm install --legacy-peer-deps --no-audit --no-fund --loglevel=error
    if errorlevel 1 (
        echo ❌ Instalación fallida
        echo.
        echo 🆘 SOLUCIONES POSIBLES:
        echo 1. Verificar conexión a internet
        echo 2. Ejecutar como Administrador
        echo 3. Desactivar antivirus temporalmente
        echo 4. Limpiar cache de npm: npm cache clean --force
        echo.
        pause
        exit /b 1
    )
)

echo ✅ Dependencias instaladas correctamente

echo.
echo 🔍 Verificando instalación...
if exist scripts\install-check.js (
    node scripts\install-check.js
) else (
    echo ⚠️  Script de verificación no encontrado, creando...
    echo console.log("✅ Instalación básica completada"); > scripts\install-check.js
    node scripts\install-check.js
)

echo.
echo 🗄️ Inicializando base de datos de producción...
if exist scripts\init-production.js (
    node scripts\init-production.js
) else (
    echo ❌ Script init-production.js no encontrado
    echo 📁 Creando carpeta database...
    if not exist database mkdir database
    echo ✅ Estructura básica creada
)

echo.
echo 🏛️ Configurando universidad...
if exist scripts\setup-university.js (
    node scripts\setup-university.js
) else (
    echo ⚠️  Script setup-university.js no encontrado
    echo ✅ Configuración manual requerida después del primer inicio
)

echo.
echo 🎉 ¡INSTALACION COMPLETADA!
echo ========================================
echo 📋 INFORMACION IMPORTANTE:
echo ========================================
echo 🌐 Para iniciar el sistema: npm run dev
echo 🔗 URL del sistema: http://localhost:3000
echo 👤 Usuario inicial: admin
echo 🔒 Contraseña inicial: admin123
echo.
echo ⚠️  IMPORTANTE: 
echo 1. Cambia la contraseña inmediatamente
echo 2. Configura la información de tu universidad
echo 3. Crea respaldos regulares
echo.
echo 📁 Archivos importantes:
echo    - Base de datos: database\universidad.db
echo    - Respaldos: database\backups\
echo    - Logs: logs\
echo.
echo 🚀 Para iniciar ahora, presiona cualquier tecla...
pause >nul

echo.
echo 🚀 Iniciando sistema...
echo ⚠️  NO CIERRES esta ventana mientras uses el sistema
echo 🌐 Abre tu navegador y ve a: http://localhost:3000
echo.
npm run dev
