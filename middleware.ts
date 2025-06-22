// Archivo: middleware.ts

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Función de ayuda para crear un cliente de Supabase en el middleware
const createClient = (request: NextRequest) => {
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  return { supabase, response }
}

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request)

  const { data: { session } } = await supabase.auth.getSession()
  const user = session?.user
  
  // Asumimos que el rol está en user_metadata. Si no existe, lo tratamos como sin rol.
  const userRole = user?.user_metadata?.rol_nombre || null
  
  const { pathname } = request.nextUrl

  // Rutas públicas que no requieren autenticación
  const publicRoutes = ['/', '/auth/estudiante', '/publico']

  // Si la ruta es pública, no hacemos nada más
  if (publicRoutes.some(route => pathname.startsWith(route)) && pathname !== '/') {
    return response
  }

  // Si el usuario NO está autenticado
  if (!user) {
    // Y está intentando acceder a cualquier ruta que no sea la página de inicio o las de login,
    // lo mandamos a la página de inicio.
    if (pathname !== '/') {
        return NextResponse.redirect(new URL('/', request.url))
    }
    return response
  }

  // Si el usuario SÍ está autenticado y trata de ir a una página de login,
  // lo redirigimos a su dashboard correspondiente.
  if (pathname.startsWith('/auth')) {
    const redirectTo = userRole === 'admin' ? '/admin/dashboard' : userRole === 'estudiante' ? '/estudiante/dashboard' : '/'
    return NextResponse.redirect(new URL(redirectTo, request.url))
  }

  // Lógica de protección por roles
  if (pathname.startsWith('/admin') && userRole !== 'admin') {
    return NextResponse.redirect(new URL('/acceso-denegado', request.url))
  }
  if (pathname.startsWith('/estudiante') && userRole !== 'estudiante') {
    return NextResponse.redirect(new URL('/acceso-denegado', request.url))
  }
  if (pathname.startsWith('/profesor') && userRole !== 'docente') { // Nota: rol es 'docente'
    return NextResponse.redirect(new URL('/acceso-denegado', request.url))
  }
  
  // Si pasa todas las validaciones, se refresca la sesión y se le permite continuar
  await supabase.auth.getSession()
  return response
}

// Configuración del Middleware
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
