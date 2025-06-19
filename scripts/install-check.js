const fs = require("fs")
const path = require("path")

console.log("🔍 Verificando instalación del sistema...")
console.log("==========================================")

// Verificar Node.js
console.log(`✅ Node.js: ${process.version}`)

// Verificar estructura de directorios
const requiredDirs = ["app", "components", "lib", "scripts"]
const missingDirs = []

requiredDirs.forEach((dir) => {
  if (fs.existsSync(dir)) {
    console.log(`✅ Directorio ${dir}: Existe`)
  } else {
    console.log(`❌ Directorio ${dir}: No encontrado`)
    missingDirs.push(dir)
  }
})

// Verificar archivos críticos
const requiredFiles = ["package.json", "next.config.mjs", "tailwind.config.ts", "app/layout.tsx", "app/page.tsx"]

const missingFiles = []

requiredFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    console.log(`✅ Archivo ${file}: Existe`)
  } else {
    console.log(`❌ Archivo ${file}: No encontrado`)
    missingFiles.push(file)
  }
})

// Verificar node_modules
if (fs.existsSync("node_modules")) {
  console.log("✅ node_modules: Instalado")

  // Verificar dependencias críticas
  const criticalDeps = ["next", "react", "better-sqlite3", "bcryptjs"]

  criticalDeps.forEach((dep) => {
    if (fs.existsSync(`node_modules/${dep}`)) {
      console.log(`✅ ${dep}: Instalado`)
    } else {
      console.log(`❌ ${dep}: No encontrado`)
    }
  })
} else {
  console.log("❌ node_modules: No encontrado")
}

// Verificar directorio de base de datos
if (!fs.existsSync("database")) {
  console.log("📁 Creando directorio database...")
  fs.mkdirSync("database", { recursive: true })
  console.log("✅ Directorio database creado")
}

if (!fs.existsSync("database/backups")) {
  console.log("📁 Creando directorio database/backups...")
  fs.mkdirSync("database/backups", { recursive: true })
  console.log("✅ Directorio backups creado")
}

console.log("\n🎯 Resumen de la instalación:")
console.log("============================")

if (missingDirs.length === 0 && missingFiles.length === 0) {
  console.log("🎉 ¡Instalación COMPLETA y CORRECTA!")
  console.log("\n📋 Próximos pasos:")
  console.log("1. npm run init-production    # Crear base de datos")
  console.log("2. npm run setup-university   # Configurar universidad")
  console.log("3. npm run dev                # Iniciar sistema")
} else {
  console.log("⚠️  Instalación INCOMPLETA")
  if (missingDirs.length > 0) {
    console.log(`❌ Directorios faltantes: ${missingDirs.join(", ")}`)
  }
  if (missingFiles.length > 0) {
    console.log(`❌ Archivos faltantes: ${missingFiles.join(", ")}`)
  }
}

console.log("\n📍 Ubicación del proyecto:")
console.log(`   ${process.cwd()}`)
