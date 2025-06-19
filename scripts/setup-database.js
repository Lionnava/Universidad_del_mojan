const Database = require("better-sqlite3")
const path = require("path")
const fs = require("fs")

console.log("🚀 Configurando base de datos local...")

// Crear directorio de base de datos
const dbDir = path.join(process.cwd(), "database")
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true })
  console.log("📁 Directorio de base de datos creado")
}

// Crear directorio de backups
const backupDir = path.join(dbDir, "backups")
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true })
  console.log("📁 Directorio de backups creado")
}

console.log("✅ Configuración completada")
console.log(`📍 Base de datos: ${path.join(dbDir, "universidad.db")}`)
console.log(`📍 Backups: ${backupDir}`)
