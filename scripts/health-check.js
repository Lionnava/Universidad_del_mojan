const fs = require("fs")
const path = require("path")
const Database = require("better-sqlite3")

console.log("🏥 Verificación de Salud del Sistema")
console.log("===================================")

let allGood = true

// Verificar Node.js
console.log(`✅ Node.js: ${process.version}`)

// Verificar estructura de archivos
const criticalFiles = [
  "package.json",
  "next.config.mjs",
  "tailwind.config.ts",
  "app/layout.tsx",
  "app/page.tsx",
  "lib/database.ts",
]

console.log("\n📁 Verificando archivos críticos:")
criticalFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`)
  } else {
    console.log(`❌ ${file} - FALTANTE`)
    allGood = false
  }
})

// Verificar dependencias
console.log("\n📦 Verificando dependencias críticas:")
const criticalDeps = ["next", "react", "better-sqlite3", "bcryptjs"]
criticalDeps.forEach((dep) => {
  if (fs.existsSync(`node_modules/${dep}`)) {
    console.log(`✅ ${dep}`)
  } else {
    console.log(`❌ ${dep} - NO INSTALADO`)
    allGood = false
  }
})

// Verificar base de datos
console.log("\n🗄️ Verificando base de datos:")
const dbPath = path.join(process.cwd(), "database", "universidad.db")
if (fs.existsSync(dbPath)) {
  try {
    const db = new Database(dbPath)
    const tables = ["usuarios", "estudiantes", "carreras", "aspirantes"]

    tables.forEach((table) => {
      try {
        const count = db.prepare(`SELECT COUNT(*) as count FROM ${table}`).get()
        console.log(`✅ Tabla ${table}: ${count.count} registros`)
      } catch (e) {
        console.log(`❌ Tabla ${table}: Error - ${e.message}`)
        allGood = false
      }
    })

    db.close()
  } catch (e) {
    console.log(`❌ Base de datos corrupta: ${e.message}`)
    allGood = false
  }
} else {
  console.log("⚠️  Base de datos no existe - ejecutar npm run init-production")
}

// Verificar puertos
console.log("\n🌐 Verificando conectividad:")
const net = require("net")
const server = net.createServer()

server.listen(3000, (err) => {
  if (err) {
    console.log("❌ Puerto 3000 ocupado")
    allGood = false
  } else {
    console.log("✅ Puerto 3000 disponible")
    server.close()
  }
})

// Resumen final
setTimeout(() => {
  console.log("\n" + "=".repeat(40))
  if (allGood) {
    console.log("🎉 SISTEMA EN PERFECTO ESTADO")
    console.log("✅ Listo para producción")
    console.log("\n📋 Para iniciar:")
    console.log("   npm run dev")
  } else {
    console.log("⚠️  SISTEMA REQUIERE ATENCION")
    console.log("🔧 Ejecutar: npm run complete-setup")
  }
  console.log("=".repeat(40))
}, 1000)
