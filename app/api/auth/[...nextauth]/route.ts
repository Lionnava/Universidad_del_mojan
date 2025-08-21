import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"

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
    {
      id: "credentials",
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = testUsers.find((u) => u.email === credentials.email && u.password === credentials.password)

        if (user) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          }
        }

        return null
      },
    },
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-key",
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
