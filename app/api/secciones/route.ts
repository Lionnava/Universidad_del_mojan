import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function GET() {
  try {
    const { rows } = await sql`
      SELECT s.*, 
             m.nombre as materia_nombre,
             m.codigo as materia_codigo,
             p.nombres || ' ' || p.apellidos as profesor_nombre,
             pe.nombre as periodo_nombre
      FROM secciones s
      JOIN materias m ON s.materia_id = m.id
      LEFT JOIN profesores p ON s.profesor_id = p.id
      JOIN periodos_academicos pe ON s.periodo_id = pe.id
      ORDER BY m.nombre, s.seccion
    `
    return NextResponse.json(rows)
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener secciones" }, { status: 500 })
  }
}
