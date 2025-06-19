@echo off
echo ========================================
echo 🚀 INSTALACION COMPLETA V26
echo ========================================
echo.

echo ⚠️  IMPORTANTE: Estas usando Node.js v22.16.0
echo 📋 Se recomienda Node.js v18 o v20 para mejor compatibilidad
echo.

echo 🧹 Limpiando instalación anterior...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
if exist pnpm-lock.yaml del pnpm-lock.yaml
if exist .next rmdir /s /q .next

echo.
echo 📦 Instalando todas las dependencias V26...
echo ⏳ Esto puede tomar varios minutos...

npm install --legacy-peer-deps --no-audit --no-fund

if errorlevel 1 (
    echo ❌ Error con npm install
    echo 🔧 Intentando instalación manual...
    
    echo Instalando dependencias principales...
    npm install next@14.0.4 react@18.2.0 react-dom@18.2.0 --legacy-peer-deps
    npm install better-sqlite3@9.1.1 --legacy-peer-deps
    npm install bcryptjs@2.4.3 --legacy-peer-deps
    npm install jspdf@2.5.1 html2canvas@1.4.1 --legacy-peer-deps
    npm install lucide-react@0.294.0 --legacy-peer-deps
    
    echo Instalando componentes UI...
    npm install @radix-ui/react-dialog@1.0.5 --legacy-peer-deps
    npm install @radix-ui/react-select@2.0.0 --legacy-peer-deps
    npm install @radix-ui/react-tabs@1.0.4 --legacy-peer-deps
    npm install @radix-ui/react-checkbox@1.0.4 --legacy-peer-deps
    npm install @radix-ui/react-label@2.0.2 --legacy-peer-deps
    npm install @radix-ui/react-progress@1.0.3 --legacy-peer-deps
    npm install @radix-ui/react-slot@1.0.2 --legacy-peer-deps
    
    echo Instalando utilidades...
    npm install class-variance-authority@0.7.0 --legacy-peer-deps
    npm install clsx@2.0.0 tailwind-merge@2.1.0 --legacy-peer-deps
    npm install tailwindcss-animate@1.0.7 --legacy-peer-deps
    
    echo Instalando dependencias de desarrollo...
    npm install -D typescript@5.2.2 --legacy-peer-deps
    npm install -D @types/node@20.8.0 --legacy-peer-deps
    npm install -D @types/react@18.2.0 --legacy-peer-deps
    npm install -D @types/react-dom@18.2.0 --legacy-peer-deps
    npm install -D @types/better-sqlite3@7.6.5 --legacy-peer-deps
    npm install -D @types/bcryptjs@2.4.4 --legacy-peer-deps
    npm install -D autoprefixer@10.4.16 --legacy-peer-deps
    npm install -D postcss@8.4.31 --legacy-peer-deps
    npm install -D tailwindcss@3.3.5 --legacy-peer-deps
    npm install -D eslint@8.51.0 --legacy-peer-deps
    npm install -D eslint-config-next@14.0.4 --legacy-peer-deps
)

echo.
echo 🔍 Verificando instalación...
npm run check-install

echo.
echo 🗄️ Inicializando base de datos de producción...
npm run init-production

echo.
echo 🏛️ Configurando universidad...
npm run setup-university

echo.
echo 🎉 ¡INSTALACION V26 COMPLETADA!
echo ========================================
echo 🚀 Para iniciar: npm run dev
echo 🌐 URL: http://localhost:3000
echo 👤 Usuario: admin
echo 🔒 Contraseña: admin123
echo ========================================
echo.
echo 📋 Scripts disponibles:
echo   npm run dev              - Iniciar desarrollo
echo   npm run check-install    - Verificar instalación
echo   npm run health-check     - Estado del sistema
echo   npm run backup-db        - Respaldar base de datos
echo ========================================
pause
