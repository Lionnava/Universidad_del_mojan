@echo off
echo ========================================
echo 🚀 DESPLIEGUE A PRODUCCION
echo ========================================
echo.

echo 🔍 Verificando sistema antes del despliegue...
node scripts\health-check.js

echo.
echo 💾 Creando respaldo de seguridad...
node scripts\backup-database.js

echo.
echo 🏗️ Compilando para producción...
npm run build

if errorlevel 1 (
    echo ❌ Error en la compilación
    pause
    exit /b 1
)

echo.
echo 🧪 Probando compilación...
timeout /t 3 /nobreak >nul
npm start &
timeout /t 10 /nobreak >nul
taskkill /f /im node.exe >nul 2>&1

echo.
echo ✅ Sistema listo para producción
echo.
echo 📋 INSTRUCCIONES DE DESPLIEGUE:
echo ========================================
echo 1. Copiar toda la carpeta a servidor de producción
echo 2. En el servidor ejecutar: npm install --production
echo 3. Configurar como servicio del sistema
echo 4. Iniciar con: npm start
echo.
echo 🌐 El sistema estará disponible en:
echo    http://IP_SERVIDOR:3000
echo.
pause
