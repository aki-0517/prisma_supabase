import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const games = await prisma.game.findMany();
  return NextResponse.json(games);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { comment, madeAt, players } = body

    const response = await prisma.game.create({
      data: {
        comment,
        madeAt,
        players
      }
    })
    return NextResponse.json(response)

  } catch (error) {
    console.log(error)
    return new NextResponse('Error', { status: 500 })
  }
}