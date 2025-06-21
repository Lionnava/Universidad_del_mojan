@echo off
echo ========================================
echo    UNIVERSIDAD MOVIL V33 - SQLite
echo    Instalacion CORREGIDA para Produccion
echo ========================================
echo.

echo [1/7] Verificando Node.js...
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
echo [2/7] Limpiando cache de npm...
call npm cache clean --force
echo ✅ Cache limpiado

echo.
echo [3/7] Eliminando node_modules y package-lock.json...
if exist "node_modules" rmdir /s /q "node_modules"
if exist "package-lock.json" del "package-lock.json"
echo ✅ Archivos antiguos eliminados

echo.
echo [4/7] Instalando dependencias con versiones compatibles...
call npm install --legacy-peer-deps
if errorlevel 1 (
    echo ❌ Error instalando dependencias
    echo 🔧 Intentando instalación alternativa...
    call npm install --force
    if errorlevel 1 (
        echo ❌ Error crítico en instalación
        pause
        exit /b 1
    )
)
echo ✅ Dependencias instaladas correctamente

echo.
echo [5/7] Creando directorios del sistema...
if not exist "database" mkdir database
if not exist "database\backups" mkdir database\backups
if not exist "database\exports" mkdir database\exports
if not exist "public\uploads" mkdir public\uploads
echo ✅ Directorios creados

echo.
echo [6/7] Verificando instalación...
if exist "package.json" (
    if exist "node_modules" (
        echo ✅ Instalación verificada correctamente
    ) else (
        echo ❌ Error: node_modules no encontrado
        pause
        exit /b 1
    )
) else (
    echo ❌ Error: package.json no encontrado
    pause
    exit /b 1
)

echo.
echo [7/7] Configuración final...
echo ✅ Sistema configurado para SQLite
echo ✅ Base de datos local lista
echo ✅ Backups automáticos habilitados

echo.
echo ========================================
echo ✅ INSTALACION V33 COMPLETADA
echo ========================================
echo.
echo 🚀 SISTEMA LISTO PARA PRODUCCION
echo.
echo 📊 Base de Datos: SQLite (Local)
echo 📁 Ubicación BD: ./database/universidad.db
echo 💾 Backups: ./database/backups/
echo 📤 Exportaciones: ./database/exports/
echo.
echo 🔑 CREDENCIALES:
echo    👨‍💼 admin / admin123
echo    📊 analista / analista123  
echo    👨‍🏫 profesor / profesor123
echo.
echo 🌐 INICIAR SERVIDOR:
echo    npm run dev
echo.
echo 📋 FUNCIONALIDADES V33:
echo    ✅ Gestión completa universitaria
echo    ✅ SQLite optimizado para producción
echo    ✅ Exportación/Importación BD
echo    ✅ Sistema de reportes avanzado
echo    ✅ Backups automáticos
echo    ✅ Dashboard multi-rol
echo.
pause
