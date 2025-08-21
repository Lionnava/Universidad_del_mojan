import { type NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  // For now, allow all requests - in production you'd check authentication
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
