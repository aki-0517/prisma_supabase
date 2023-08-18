import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });

  return NextResponse.json(post);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const { title, content } = await request.json();

  const post = await prisma.post.update({
    where: {
      id,
    },
    data: {
      title,
      content,
    },
  });

  return NextResponse.json(post);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  const post = await prisma.post.delete({
    where: {
      id,
    },
  });

  return NextResponse.json(post);
}