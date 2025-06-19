const Database = require("better-sqlite3")
const path = require("path")
const fs = require("fs")

const dbPath = path.join(process.cwd(), "database", "universidad.db")

console.log("🔍 Verificando estado de la base de datos...")
console.log(`📍 Ruta: ${dbPath}`)

if (!fs.existsSync(dbPath)) {
  console.log("❌ La base de datos no existe")
  console.log("💡 Ejecuta: npm run init-db")
  process.exit(1)
}

try {
  const db = new Database(dbPath, { readonly: true })

  // Verificar tablas
  const tables = db
    .prepare(`
    SELECT name FROM sqlite_master 
    WHERE type='table' AND name NOT LIKE 'sqlite_%'
    ORDER BY name
  `)
    .all()

  console.log("✅ Base de datos encontrada")
  console.log(`📊 Tablas encontradas (${tables.length}):`)

  tables.forEach((table) => {
    const count = db.prepare(`SELECT COUNT(*) as count FROM ${table.name}`).get()
    console.log(`   - ${table.name}: ${count.count} registros`)
  })

  // Verificar usuarios
  console.log("\n👥 Usuarios disponibles:")
  const usuarios = db.prepare("SELECT username, rol FROM usuarios ORDER BY rol, username").all()
  usuarios.forEach((user) => {
    console.log(`   - ${user.username} (${user.rol})`)
  })

  db.close()
  console.log("\n🚀 Sistema listo para usar!")
} catch (error) {
  console.error("❌ Error verificando base de datos:", error)
  process.exit(1)
}
