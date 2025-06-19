@echo off
echo 🚀 Inicio Rápido - Universidad Móvil
echo ====================================
echo.

echo 📋 Verificando instalación...
call npm run check-install
echo.

echo 🗄️ Inicializando base de datos de producción...
call npm run init-production
echo.

echo 🏛️ Configurando universidad...
call npm run setup-university
echo.

echo 🎉 ¡Sistema listo!
echo.
echo 📋 Para iniciar el sistema:
echo    npm run dev
echo.
echo 🌐 Luego abrir: http://localhost:3000
echo 🔑 Usuario: admin / Contraseña: admin123
echo.
pause
