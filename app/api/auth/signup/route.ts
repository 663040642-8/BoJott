import { prisma } from "@/app/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
    try {
        const { name, email, password } = await request.json()
        const hashPassword = bcrypt.hashSync(password, 10)
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashPassword
            }
        })
        return Response.json({ message: "success", data: newUser })
    } catch (error) {
        console.error(error)
        return Response.json({ error }, { status: 500 })
    }
}