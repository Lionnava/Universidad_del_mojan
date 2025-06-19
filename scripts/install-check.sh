#!/bin/bash
# Script de verificación de instalación

echo "🔍 Verificando Instalación de Universidad Móvil"
echo "=============================================="

# Verificar Node.js
echo "📦 Verificando Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "✅ Node.js instalado: $NODE_VERSION"
    
    # Verificar versión mínima
    NODE_MAJOR=$(echo $NODE_VERSION | cut -d'.' -f1 | sed 's/v//')
    if [ "$NODE_MAJOR" -ge 18 ]; then
        echo "✅ Versión de Node.js es compatible"
    else
        echo "❌ Node.js debe ser versión 18 o superior"
        exit 1
    fi
else
    echo "❌ Node.js no está instalado"
    exit 1
fi

# Verificar npm
echo "📦 Verificando npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo "✅ npm instalado: $NPM_VERSION"
else
    echo "❌ npm no está instalado"
    exit 1
fi

# Verificar estructura de archivos
echo "📁 Verificando estructura de archivos..."
REQUIRED_FILES=("package.json" "next.config.mjs" "app" "components" "lib" "scripts")

for file in "${REQUIRED_FILES[@]}"; do
    if [ -e "$file" ]; then
        echo "✅ $file encontrado"
    else
        echo "❌ $file no encontrado"
        exit 1
    fi
done

# Verificar dependencias
echo "📦 Verificando dependencias..."
if [ -d "node_modules" ]; then
    echo "✅ node_modules existe"
    
    # Verificar dependencias críticas
    CRITICAL_DEPS=("better-sqlite3" "next" "react")
    for dep in "${CRITICAL_DEPS[@]}"; do
        if [ -d "node_modules/$dep" ]; then
            echo "✅ $dep instalado"
        else
            echo "❌ $dep no instalado"
            echo "🔧 Ejecuta: npm install"
            exit 1
        fi
    done
else
    echo "❌ node_modules no existe"
    echo "🔧 Ejecuta: npm install"
    exit 1
fi

# Verificar base de datos
echo "🗄️ Verificando base de datos..."
if [ -f "database/universidad.db" ]; then
    echo "✅ Base de datos existe"
    
    # Verificar integridad básica
    if command -v sqlite3 &> /dev/null; then
        TABLES=$(sqlite3 database/universidad.db ".tables" 2>/dev/null | wc -w)
        if [ "$TABLES" -gt 10 ]; then
            echo "✅ Base de datos parece estar correctamente inicializada ($TABLES tablas)"
        else
            echo "⚠️ Base de datos existe pero parece incompleta"
            echo "🔧 Considera ejecutar: npm run init-production"
        fi
    else
        echo "ℹ️ sqlite3 no disponible para verificar integridad"
    fi
else
    echo "⚠️ Base de datos no existe"
    echo "🔧 Ejecuta: npm run init-production"
fi

# Verificar puerto disponible
echo "🌐 Verificando puerto 3000..."
if command -v netstat &> /dev/null; then
    if netstat -tuln | grep -q ":3000 "; then
        echo "⚠️ Puerto 3000 está en uso"
        echo "🔧 Detén otros servicios o usa otro puerto: PORT=8080 npm run dev"
    else
        echo "✅ Puerto 3000 disponible"
    fi
elif command -v ss &> /dev/null; then
    if ss -tuln | grep -q ":3000 "; then
        echo "⚠️ Puerto 3000 está en uso"
        echo "🔧 Detén otros servicios o usa otro puerto: PORT=8080 npm run dev"
    else
        echo "✅ Puerto 3000 disponible"
    fi
else
    echo "ℹ️ No se puede verificar el puerto (netstat/ss no disponible)"
fi

# Verificar permisos
echo "🔐 Verificando permisos..."
if [ -w "." ]; then
    echo "✅ Permisos de escritura en directorio actual"
else
    echo "❌ Sin permisos de escritura en directorio actual"
    echo "🔧 Ejecuta: sudo chown -R $USER:$USER ."
fi

# Resumen
echo ""
echo "📊 Resumen de Verificación"
echo "========================="
echo "✅ Instalación parece estar correcta"
echo ""
echo "🚀 Próximos pasos:"
echo "1. Si la base de datos no existe: npm run init-production"
echo "2. Configurar universidad: npm run setup-university"
echo "3. Iniciar sistema: npm run dev"
echo ""
echo "📖 Para más ayuda, consulta: GUIA_INSTALACION_COMPLETA.md"
