import { verifyJWT } from '@/middleware/auth'
import { NextRequest, NextResponse } from 'next/server'
import { findAllBlogs } from './util';

/**
 * GET request handler for fetching all blogs.
 *
 * @param req - The Next.js request object.
 * @returns A JSON response containing an array of sorted blogs.
 */
export async function GET(
  req: NextRequest,
) {
  if (!verifyJWT(req))
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  const allBlogs = await findAllBlogs();
  const sortedBlogs = allBlogs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return NextResponse.json(sortedBlogs);
}
