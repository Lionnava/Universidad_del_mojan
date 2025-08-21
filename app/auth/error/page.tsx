"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Activity, AlertCircle } from "lucide-react"

export default function AuthErrorPage() {
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const errorParam = urlParams.get("error")

    switch (errorParam) {
      case "Configuration":
        setError("Error de configuración del servidor")
        break
      case "AccessDenied":
        setError("Acceso denegado")
        break
      case "Verification":
        setError("Error de verificación")
        break
      default:
        setError("Error de autenticación")
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Activity className="mx-auto h-12 w-12 text-primary" />
          <h1 className="mt-4 text-3xl font-bold text-foreground">Sistema de Gestión Médica</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Error de Autenticación
            </CardTitle>
            <CardDescription>Ha ocurrido un problema durante el proceso de autenticación</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Button asChild className="w-full">
                <Link href="/auth/login">Volver al Login</Link>
              </Button>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/">Ir al Inicio</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
