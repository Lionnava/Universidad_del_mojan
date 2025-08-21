import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const testUsers = [
  {
    id: "1",
    email: "admin@example.com",
    password: "admin123",
    name: "Administrador",
    role: "admin",
  },
  {
    id: "2",
    email: "doctor@example.com",
    password: "doctor123",
    name: "Dr. García",
    role: "doctor",
  },
  {
    id: "3",
    email: "nurse@example.com",
    password: "nurse123",
    name: "Enfermera López",
    role: "nurse",
  },
]

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log("[v0] NextAuth authorize called")

          if (!credentials?.email || !credentials?.password) {
            console.log("[v0] Missing email or password")
            return null
          }

          const user = testUsers.find((u) => u.email === credentials.email && u.password === credentials.password)

          if (user) {
            console.log("[v0] User found and authenticated:", user.email)
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
            }
          }

          console.log("[v0] Authentication failed for:", credentials.email)
          return null
        } catch (error) {
          console.error("[v0] Error in authorize:", error)
          return null
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      try {
        if (user) {
          token.role = user.role
        }
        return token
      } catch (error) {
        console.error("[v0] Error in jwt callback:", error)
        return token
      }
    },
    async session({ session, token }) {
      try {
        if (session.user && token.sub) {
          session.user.id = token.sub
          session.user.role = token.role as string
        }
        return session
      } catch (error) {
        console.error("[v0] Error in session callback:", error)
        return session
      }
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

async function handleAuth(req: Request) {
  try {
    const handler = NextAuth(authOptions)
    return await handler(req)
  } catch (error) {
    console.error("[v0] NextAuth handler error:", error)
    return new Response(JSON.stringify({ error: "Authentication service error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

export { handleAuth as GET, handleAuth as POST }
