import { verifyJWT } from '@/middleware/auth';
import { NextRequest, NextResponse } from 'next/server';
import { findBlog } from '../util'

export async function GET(req: NextRequest) {
  
  const { pathname } = new URL(req.url);
    const idParam = pathname.split('/').pop();

  if (!verifyJWT(req)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const blog = await findBlog(Number(idParam));

    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}