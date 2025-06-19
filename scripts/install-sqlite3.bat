@echo off
echo ========================================
echo 🗄️ INSTALACION DE BETTER-SQLITE3
echo ========================================
echo.

echo 📋 Verificando herramientas de compilación...

echo Verificando Visual Studio Build Tools...
where cl >nul 2>&1
if errorlevel 1 (
    echo ❌ Visual Studio Build Tools no encontrado
    echo.
    echo 📥 OPCIONES DE INSTALACION:
    echo.
    echo OPCION 1 - Visual Studio Build Tools (Recomendado):
    echo 1. Ve a: https://visualstudio.microsoft.com/visual-cpp-build-tools/
    echo 2. Descarga "Build Tools for Visual Studio"
    echo 3. Instala con "C++ build tools"
    echo.
    echo OPCION 2 - Visual Studio Community:
    echo 1. Ve a: https://visualstudio.microsoft.com/vs/community/
    echo 2. Instala con "Desktop development with C++"
    echo.
    echo OPCION 3 - Instalación automática:
    echo npm install -g windows-build-tools
    echo.
    echo ¿Deseas abrir la página de descarga? (s/n)
    set /p choice=
    if /i "%choice%"=="s" (
        start https://visualstudio.microsoft.com/visual-cpp-build-tools/
    )
    echo.
    echo Después de instalar las herramientas, ejecuta este script nuevamente.
    pause
    exit /b 1
) else (
    echo ✅ Visual Studio Build Tools encontrado
)

echo.
echo 🔧 Instalando better-sqlite3...
npm uninstall better-sqlite3
npm install better-sqlite3@9.1.1 --build-from-source

if errorlevel 1 (
    echo ❌ Error instalando better-sqlite3
    echo.
    echo 🔧 SOLUCIONES ALTERNATIVAS:
    echo.
    echo 1. Instalar herramientas de compilación:
    echo    npm install -g windows-build-tools
    echo.
    echo 2. Usar versión precompilada:
    echo    npm install better-sqlite3@8.7.0
    echo.
    echo 3. Instalar Python 3.x:
    echo    https://www.python.org/downloads/
    echo.
    pause
    exit /b 1
) else (
    echo ✅ better-sqlite3 instalado correctamente
)

echo.
echo 🎉 ¡INSTALACION DE SQLITE3 COMPLETADA!
pause
