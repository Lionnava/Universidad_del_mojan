const fs = require("fs")
const path = require("path")

const dbPath = path.join(process.cwd(), "database", "universidad.db")
const backupDir = path.join(process.cwd(), "database", "backups")
const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
const backupPath = path.join(backupDir, `backup-${timestamp}.db`)

try {
  if (!fs.existsSync(dbPath)) {
    console.log("❌ No se encontró la base de datos")
    process.exit(1)
  }

  fs.copyFileSync(dbPath, backupPath)
  console.log(`✅ Backup creado exitosamente: ${backupPath}`)
} catch (error) {
  console.error("❌ Error creando backup:", error)
  process.exit(1)
}
