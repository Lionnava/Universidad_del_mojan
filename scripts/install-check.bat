@echo off
REM Script de verificación de instalación para Windows

echo 🔍 Verificando Instalación de Universidad Móvil
echo ==============================================

REM Verificar Node.js
echo 📦 Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
    echo ✅ Node.js instalado: %NODE_VERSION%
) else (
    echo ❌ Node.js no está instalado
    echo 🔧 Descarga desde: https://nodejs.org/
    pause
    exit /b 1
)

REM Verificar npm
echo 📦 Verificando npm...
npm --version >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
    echo ✅ npm instalado: %NPM_VERSION%
) else (
    echo ❌ npm no está instalado
    pause
    exit /b 1
)

REM Verificar archivos requeridos
echo 📁 Verificando estructura de archivos...
if exist "package.json" (
    echo ✅ package.json encontrado
) else (
    echo ❌ package.json no encontrado
    pause
    exit /b 1
)

if exist "next.config.mjs" (
    echo ✅ next.config.mjs encontrado
) else (
    echo ❌ next.config.mjs no encontrado
    pause
    exit /b 1
)

if exist "app" (
    echo ✅ directorio app encontrado
) else (
    echo ❌ directorio app no encontrado
    pause
    exit /b 1
)

REM Verificar node_modules
echo 📦 Verificando dependencias...
if exist "node_modules" (
    echo ✅ node_modules existe
    
    if exist "node_modules\better-sqlite3" (
        echo ✅ better-sqlite3 instalado
    ) else (
        echo ❌ better-sqlite3 no instalado
        echo 🔧 Ejecuta: npm install
        pause
        exit /b 1
    )
    
    if exist "node_modules\next" (
        echo ✅ next instalado
    ) else (
        echo ❌ next no instalado
        echo 🔧 Ejecuta: npm install
        pause
        exit /b 1
    )
) else (
    echo ❌ node_modules no existe
    echo 🔧 Ejecuta: npm install
    pause
    exit /b 1
)

REM Verificar base de datos
echo 🗄️ Verificando base de datos...
if exist "database\universidad.db" (
    echo ✅ Base de datos existe
) else (
    echo ⚠️ Base de datos no existe
    echo 🔧 Ejecuta: npm run init-production
)

REM Verificar puerto
echo 🌐 Verificando puerto 3000...
netstat -an | find ":3000" >nul 2>&1
if %errorlevel% equ 0 (
    echo ⚠️ Puerto 3000 está en uso
    echo 🔧 Detén otros servicios o usa: set PORT=8080 ^& npm run dev
) else (
    echo ✅ Puerto 3000 disponible
)

echo.
echo 📊 Resumen de Verificación
echo =========================
echo ✅ Instalación parece estar correcta
echo.
echo 🚀 Próximos pasos:
echo 1. Si la base de datos no existe: npm run init-production
echo 2. Configurar universidad: npm run setup-university
echo 3. Iniciar sistema: npm run dev
echo.
echo 📖 Para más ayuda, consulta: GUIA_INSTALACION_COMPLETA.md
echo.
pause
