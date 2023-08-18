import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const posts = await prisma.post.findMany();
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  const { title, content } = await request.json();

  const post = await prisma.post.create({
    data: {
      title,
      content,
    },
  });

  return NextResponse.json(post);
}