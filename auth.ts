import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "./app/lib/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("credentials:", credentials)

        if (!credentials?.email || !credentials?.password) {
          console.log("missing credentials")
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        })

        console.log("user found:", user)

        if (!user) return null

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        console.log("isValid:", isValid)

        if (!isValid) return null

        return { id: user.id, email: user.email, name: user.name }
      }
    })
  ],
  session: { strategy: "jwt" },
  callbacks: {
    jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string
      return session
    }
  },
  pages: {
    signIn: "/login"
  }
})