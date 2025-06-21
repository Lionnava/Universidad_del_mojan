@echo off
echo ========================================
echo    UNIVERSIDAD MOVIL V29 - INICIO RAPIDO
echo ========================================
echo.

echo Verificando instalación...
if not exist "node_modules" (
    echo ⚠️ Dependencias no instaladas. Ejecutando instalación...
    call install-v29.bat
    if errorlevel 1 (
        echo ❌ Error en instalación
        pause
        exit /b 1
    )
)

echo.
echo 🚀 Iniciando servidor de desarrollo...
echo.
echo 🌐 El sistema estará disponible en:
echo    http://localhost:3000
echo.
echo 🔑 Credenciales:
echo    admin / admin123
echo.
call npm run dev
