import prisma from '@/utils/connect';
import { NextResponse } from 'next/server';
import { getAuthSession } from '../auth/[...nextauth]/route';

// get all posts on a specific page
export const GET = async (req) => {
  try {
    const POST_PER_PAGE = 2;

    const { searchParams } = new URL(req.url);
    const page = searchParams.get('page');
    const category = searchParams.get('category');

    const posts = await prisma.post.findMany({
      take: POST_PER_PAGE,
      skip: POST_PER_PAGE * (page - 1),
      where: {
        ...(category && { catSlug: category }),
      },
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

//create a new post
export const POST = async (req) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: 'Unauthenticated!' }, { status: 400 })
    );
  }

  try {
    const body = await req.json();
    const post = await prisma.posts.create({
      data: { ...body, userEmail: session.user.email },
    });

    return new NextResponse(JSON.stringify(post, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: 'Something went wrong!' }, { status: 500 })
    );
  }
};
