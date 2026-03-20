import { prisma } from "@/app/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const transactions = await prisma.transaction.findMany()
  return NextResponse.json(transactions)
}

export async function POST(request: Request) {
  const body = await request.json()
  
  const transaction = await prisma.transaction.create({
    data: {
      name: body.name,
      amount: body.amount,
      type: body.type,
      userId: body.userId,
    }
  })
  
  return NextResponse.json(transaction, { status: 201 })
}