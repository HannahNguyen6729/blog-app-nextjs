import prisma from '@/utils/connect';
import { NextResponse } from 'next/server';

export const GET = async (req) => {
  try {
    const POST_PER_PAGE = 2;

    const { searchParams } = new URL(req.url);
    const page = searchParams.get('page');

    const posts = await prisma.post.findMany({
      take: POST_PER_PAGE,
      skip: POST_PER_PAGE * (page - 1),
    });

    const count = await prisma.post.count();

    return NextResponse.json({
      status: 200,
      posts,
      count,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
};
