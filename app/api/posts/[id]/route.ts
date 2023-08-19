import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  const game = await prisma.game.findUnique({
    where: {
      id,
    },
  });

  return NextResponse.json(game);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const { comment, players } = await request.json();

  const post = await prisma.game.update({
    where: {
      id,
    },
    data: {
      comment,
      players,
    },
  });

  return NextResponse.json(post);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  const game = await prisma.game.delete({
    where: {
      id,
    },
  });

  return NextResponse.json(game);
}