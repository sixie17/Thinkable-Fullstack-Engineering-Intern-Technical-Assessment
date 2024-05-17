import { verifyJWT } from '@/middleware/auth'
import { NextRequest, NextResponse } from 'next/server'
import { findAllBlogs } from './util';

export async function GET(
  req: NextRequest,
) {
  if (!verifyJWT(req))
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  const allBlogs = await findAllBlogs();
  const sortedBlogs = allBlogs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return NextResponse.json(sortedBlogs);
}
