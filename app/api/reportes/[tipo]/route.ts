import { type NextRequest, NextResponse } from "next/server"
import { reportesService } from "@/lib/database"

export async function GET(request: NextRequest, { params }: { params: { tipo: string } }) {
  try {
    const { searchParams } = new URL(request.url)
    const formato = searchParams.get("formato") || "json"
    const tipo = params.tipo

    let data: any

    switch (tipo) {
      case "estudiantes-general":
        data = reportesService.getEstudiantesGeneral()
        break
      case "estudiantes-carrera":
        data = reportesService.getEstudiantesPorCarrera()
        break
      case "aspirantes":
        data = reportesService.getAspirantesGeneral()
        break
      case "inscripciones":
        data = reportesService.getInscripcionesReporte()
        break
      case "horarios":
        data = reportesService.getHorariosReporte()
        break
      case "profesores":
        data = reportesService.getProfesoresReporte()
        break
      default:
        return NextResponse.json({ error: "Tipo de reporte no válido" }, { status: 400 })
    }

    if (formato === "json") {
      return NextResponse.json(data)
    } else if (formato === "csv") {
      const csv = convertToCSV(data)
      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="${tipo}.csv"`,
        },
      })
    } else if (formato === "pdf") {
      const pdf = await generatePDF(data, tipo)
      return new NextResponse(pdf, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${tipo}.pdf"`,
        },
      })
    }

    return NextResponse.json({ error: "Formato no soportado" }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: "Error al generar reporte" }, { status: 500 })
  }
}

function convertToCSV(data: any[]): string {
  if (!data.length) return ""

  const headers = Object.keys(data[0])
  const csvContent = [
    headers.join(","),
    ...data.map((row) =>
      headers
        .map((header) => {
          const value = row[header]
          return typeof value === "string" && value.includes(",") ? `"${value}"` : value
        })
        .join(","),
    ),
  ].join("\n")

  return csvContent
}

async function generatePDF(data: any[], tipo: string): Promise<Buffer> {
  // Aquí implementarías la generación de PDF
  // Por ahora retornamos un PDF simple
  const content = `
    UNIVERSIDAD MÓVIL
    REPORTE: ${tipo.toUpperCase()}
    
    Fecha: ${new Date().toLocaleDateString()}
    
    Datos:
    ${JSON.stringify(data, null, 2)}
  `

  return Buffer.from(content, "utf-8")
}
