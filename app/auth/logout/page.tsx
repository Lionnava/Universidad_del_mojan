"use client"

import { useEffect } from "react"
import { signOut } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Stethoscope } from 'lucide-react'

export default function LogoutPage() {
  useEffect(() => {
    const performLogout = async () => {
      await signOut({
        callbackUrl: "/auth/login",
        redirect: true,
      })
    }

    performLogout()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="p-3 bg-blue-600 rounded-full">
              <Stethoscope className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Sistema Médico</h2>
          <p className="mt-2 text-sm text-gray-600">Cerrando sesión</p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Cerrando Sesión</CardTitle>
            <CardDescription className="text-center">
              Por favor espera mientras cerramos tu sesión de forma segura
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-sm text-gray-600">Redirigiendo...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
