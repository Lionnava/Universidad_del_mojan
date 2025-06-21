import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/database-local"

export async function GET() {
  try {
    const db = getDatabase()

    // Obtener configuración actual
    const config = db
      .prepare(`
      SELECT * FROM configuracion_sistema WHERE id = 1
    `)
      .get()

    // Obtener configuración de módulos (desde tabla separada si existe)
    const modulosConfig =
      db
        .prepare(`
      SELECT * FROM configuracion_modulos WHERE id = 1
    `)
        .get() || {}

    return NextResponse.json({
      success: true,
      data: {
        ...config,
        modulos: modulosConfig,
      },
    })
  } catch (error) {
    console.error("Error obteniendo configuración:", error)
    return NextResponse.json({ error: "Error obteniendo configuración" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const config = await request.json()
    const db = getDatabase()

    // Actualizar configuración principal
    const updateConfig = db.prepare(`
      UPDATE configuracion_sistema SET
        nombre_universidad = ?,
        siglas = ?,
        lema = ?,
        direccion = ?,
        telefono = ?,
        email = ?,
        website = ?,
        logo_url = ?,
        favicon_url = ?,
        color_primario = ?,
        color_secundario = ?,
        color_acento = ?,
        fuente_principal = ?,
        calificacion_maxima = ?,
        calificacion_aprobatoria = ?,
        sistema_creditos = ?,
        periodos_academicos = ?,
        sesion_timeout = ?,
        intentos_login_max = ?,
        backup_automatico = ?,
        logs_detallados = ?,
        bienvenida_titulo = ?,
        bienvenida_descripcion = ?,
        footer_texto = ?,
        mensaje_mantenimiento = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = 1
    `)

    updateConfig.run(
      config.nombre_universidad,
      config.siglas,
      config.lema,
      config.direccion,
      config.telefono,
      config.email,
      config.website,
      config.logo_url,
      config.favicon_url,
      config.color_primario,
      config.color_secundario,
      config.color_acento,
      config.fuente_principal,
      config.calificacion_maxima,
      config.calificacion_aprobatoria,
      config.sistema_creditos ? 1 : 0,
      config.periodos_academicos ? 1 : 0,
      config.sesion_timeout,
      config.intentos_login_max,
      config.backup_automatico ? 1 : 0,
      config.logs_detallados ? 1 : 0,
      config.textos.bienvenida_titulo,
      config.textos.bienvenida_descripcion,
      config.textos.footer_texto,
      config.textos.mensaje_mantenimiento,
    )

    // Crear/actualizar tabla de configuración de módulos
    db.exec(`
      CREATE TABLE IF NOT EXISTS configuracion_modulos (
        id INTEGER PRIMARY KEY,
        estudiantes BOOLEAN DEFAULT 1,
        profesores BOOLEAN DEFAULT 1,
        academico BOOLEAN DEFAULT 1,
        evaluaciones BOOLEAN DEFAULT 1,
        reportes BOOLEAN DEFAULT 1,
        constancias BOOLEAN DEFAULT 1,
        aspirantes BOOLEAN DEFAULT 1,
        horarios BOOLEAN DEFAULT 1,
        acceso_publico_constancias BOOLEAN DEFAULT 1,
        acceso_publico_informacion BOOLEAN DEFAULT 1,
        acceso_publico_notas BOOLEAN DEFAULT 1,
        acceso_publico_registro BOOLEAN DEFAULT 1,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Insertar o actualizar configuración de módulos
    const upsertModulos = db.prepare(`
      INSERT OR REPLACE INTO configuracion_modulos (
        id, estudiantes, profesores, academico, evaluaciones, reportes, 
        constancias, aspirantes, horarios, acceso_publico_constancias,
        acceso_publico_informacion, acceso_publico_notas, acceso_publico_registro,
        updated_at
      ) VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `)

    upsertModulos.run(
      config.modulos_activos.estudiantes ? 1 : 0,
      config.modulos_activos.profesores ? 1 : 0,
      config.modulos_activos.academico ? 1 : 0,
      config.modulos_activos.evaluaciones ? 1 : 0,
      config.modulos_activos.reportes ? 1 : 0,
      config.modulos_activos.constancias ? 1 : 0,
      config.modulos_activos.aspirantes ? 1 : 0,
      config.modulos_activos.horarios ? 1 : 0,
      config.acceso_publico.constancias ? 1 : 0,
      config.acceso_publico.informacion_academica ? 1 : 0,
      config.acceso_publico.consulta_notas ? 1 : 0,
      config.acceso_publico.registro_aspirantes ? 1 : 0,
    )

    // Log de la acción
    db.prepare(`
      INSERT INTO logs_sistema (usuario_id, accion, tabla_afectada, detalles, created_at)
      VALUES (1, 'CONFIGURACION_ACTUALIZADA', 'configuracion_sistema', ?, CURRENT_TIMESTAMP)
    `).run(JSON.stringify({ modulos_actualizados: Object.keys(config.modulos_activos) }))

    return NextResponse.json({
      success: true,
      message: "Configuración actualizada exitosamente",
    })
  } catch (error) {
    console.error("Error guardando configuración:", error)
    return NextResponse.json({ error: "Error guardando configuración" }, { status: 500 })
  }
}
