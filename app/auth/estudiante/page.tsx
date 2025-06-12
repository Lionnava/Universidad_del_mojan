"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Users, Lock, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function EstudianteLogin() {
  const [credentials, setCredentials] = useState({
    cedula: "",
    password: "",
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica de autenticación
    console.log("Login estudiante:", credentials)
    // Redirigir al dashboard del estudiante
    window.location.href = "/estudiante/dashboard"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
          <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
            <Users className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Acceso Estudiantes</h1>
          <p className="text-slate-600">Ingresa con tu cédula y contraseña</p>
        </div>

        <Card className="border-2 border-blue-200">
          <CardHeader>
            <CardTitle>Iniciar Sesión</CardTitle>
            <CardDescription>Accede a tu información académica personal</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cedula">Cédula de Identidad</Label>
                <Input
                  id="cedula"
                  type="text"
                  placeholder="Ej: 12345678"
                  value={credentials.cedula}
                  onChange={(e) => setCredentials({ ...credentials, cedula: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Tu contraseña"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full" size="lg">
                <Lock className="h-4 w-4 mr-2" />
                Ingresar
              </Button>
            </form>
            <div className="mt-4 text-center">
              <Link href="/auth/recuperar-password" className="text-sm text-blue-600 hover:text-blue-800">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-slate-800 mb-2">Como estudiante podrás:</h3>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Ver tus notas y calificaciones</li>
              <li>• Descargar constancias de estudios</li>
              <li>• Consultar tu horario de clases</li>
              <li>• Actualizar información personal</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
