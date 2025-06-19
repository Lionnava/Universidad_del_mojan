const Database = require("better-sqlite3")
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

async function setupUniversity() {
  console.log("🏛️  Configuración Inicial de la Universidad")
  console.log("==========================================")

  try {
    const dbPath = path.join(process.cwd(), "database", "universidad.db")

    if (!fs.existsSync(dbPath)) {
      console.log("❌ Base de datos no encontrada.")
      console.log("🔧 Ejecuta primero: npm run init-production")
      rl.close()
      return
    }

    const db = new Database(dbPath)

    console.log("📝 Configuración de la Universidad:")
    const nombreUniversidad = await askQuestion("Nombre de la Universidad: ")
    const direccion = await askQuestion("Dirección: ")
    const telefono = await askQuestion("Teléfono: ")
    const email = await askQuestion("Email institucional: ")

    // Actualizar configuración
    const updateConfig = db.prepare(`
      UPDATE configuracion_sistema 
      SET nombre_universidad = ?, direccion = ?, telefono = ?, email = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = 1
    `)

    updateConfig.run(nombreUniversidad, direccion, telefono, email)

    console.log("")
    console.log("📚 Configuración de Carreras:")
    console.log("¿Deseas agregar carreras ahora? (s/n): ")
    const agregarCarreras = await askQuestion("")

    if (agregarCarreras.toLowerCase() === "s") {
      const insertCarrera = db.prepare(`
        INSERT INTO carreras (nombre, codigo, duracion_trayectos) 
        VALUES (?, ?, ?)
      `)

      let continuar = true
      while (continuar) {
        console.log("\n--- Nueva Carrera ---")
        const nombreCarrera = await askQuestion("Nombre de la carrera: ")
        const codigoCarrera = await askQuestion("Código (ej: INF, MED, DER): ")
        const duracion = await askQuestion("Duración en trayectos (ej: 4): ")

        try {
          const result = insertCarrera.run(nombreCarrera, codigoCarrera.toUpperCase(), Number.parseInt(duracion))
          console.log(`✅ Carrera "${nombreCarrera}" agregada con ID: ${result.lastInsertRowid}`)
        } catch (error) {
          console.log(`❌ Error agregando carrera: ${error.message}`)
        }

        const seguir = await askQuestion("¿Agregar otra carrera? (s/n): ")
        continuar = seguir.toLowerCase() === "s"
      }
    }

    console.log("")
    console.log("📅 Configuración de Período Académico:")
    const agregarPeriodo = await askQuestion("¿Deseas configurar el período académico actual? (s/n): ")

    if (agregarPeriodo.toLowerCase() === "s") {
      const nombrePeriodo = await askQuestion("Nombre del período (ej: 2024-2025): ")
      const fechaInicio = await askQuestion("Fecha de inicio (YYYY-MM-DD): ")
      const fechaFin = await askQuestion("Fecha de fin (YYYY-MM-DD): ")

      const insertPeriodo = db.prepare(`
        INSERT INTO periodos_academicos (nombre, fecha_inicio, fecha_fin, activo) 
        VALUES (?, ?, ?, 1)
      `)

      try {
        const result = insertPeriodo.run(nombrePeriodo, fechaInicio, fechaFin)
        console.log(`✅ Período académico "${nombrePeriodo}" creado con ID: ${result.lastInsertRowid}`)
      } catch (error) {
        console.log(`❌ Error creando período: ${error.message}`)
      }
    }

    // Mostrar resumen
    console.log("")
    console.log("📊 Resumen de la configuración:")
    console.log("===============================")

    const config = db.prepare("SELECT * FROM configuracion_sistema WHERE id = 1").get()
    console.log(`🏛️  Universidad: ${config.nombre_universidad}`)
    console.log(`📍 Dirección: ${config.direccion || "No configurada"}`)
    console.log(`📞 Teléfono: ${config.telefono || "No configurado"}`)
    console.log(`📧 Email: ${config.email || "No configurado"}`)

    const carreras = db.prepare("SELECT COUNT(*) as count FROM carreras").get()
    console.log(`📚 Carreras: ${carreras.count}`)

    const periodos = db.prepare("SELECT COUNT(*) as count FROM periodos_academicos").get()
    console.log(`📅 Períodos: ${periodos.count}`)

    const usuarios = db.prepare("SELECT COUNT(*) as count FROM usuarios").get()
    console.log(`👥 Usuarios: ${usuarios.count}`)

    db.close()
    rl.close()

    console.log("")
    console.log("🎉 ¡Configuración completada!")
    console.log("🚀 Ya puedes ejecutar: npm run dev")
  } catch (error) {
    console.error("❌ Error en la configuración:", error.message)
    rl.close()
  }
}

setupUniversity()
