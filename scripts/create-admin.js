const Database = require("better-sqlite3")
const bcrypt = require("bcryptjs")
const path = require("path")
const readline = require("readline")
const fs = require("fs")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer)
    })
  })
}

async function createAdmin() {
  console.log("👤 Creador de Usuario Administrador")
  console.log("=====================================")

  try {
    const dbDir = path.join(process.cwd(), "database")
    const dbPath = path.join(dbDir, "universidad.db")

    // Verificar que existe la base de datos
    if (!fs.existsSync(dbPath)) {
      console.log("❌ Base de datos no encontrada.")
      console.log("🔧 Ejecuta primero: npm run init-production")
      rl.close()
      return
    }

    const db = new Database(dbPath)

    console.log("📝 Ingresa los datos del nuevo administrador:")
    const username = await askQuestion("Nombre de usuario: ")
    const email = await askQuestion("Email: ")
    const password = await askQuestion("Contraseña: ")

    // Verificar si el usuario ya existe
    const existingUser = db.prepare("SELECT id FROM usuarios WHERE username = ? OR email = ?").get(username, email)

    if (existingUser) {
      console.log("❌ Ya existe un usuario con ese nombre o email")
      db.close()
      rl.close()
      return
    }

    // Hashear contraseña
    const passwordHash = bcrypt.hashSync(password, 10)

    // Insertar usuario
    const insertUser = db.prepare(`
      INSERT INTO usuarios (username, email, password_hash, rol) 
      VALUES (?, ?, ?, 'gerencial')
    `)

    const result = insertUser.run(username, email, passwordHash)

    console.log("")
    console.log("✅ Usuario administrador creado exitosamente!")
    console.log(`👤 Usuario: ${username}`)
    console.log(`📧 Email: ${email}`)
    console.log(`🔑 Rol: Gerencial`)
    console.log(`🆔 ID: ${result.lastInsertRowid}`)

    db.close()
    rl.close()
  } catch (error) {
    console.error("❌ Error creando administrador:", error.message)
    rl.close()
  }
}

createAdmin()
