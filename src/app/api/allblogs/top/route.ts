import { verifyJWT } from '@/middleware/auth'
import { NextRequest, NextResponse } from 'next/server'
import { findAllBlogs } from '../util';

/**
 * GET request handler for fetching the top 5 blogs sorted by likes.
 *
 * @param req - The Next.js request object.
 * @returns NextResponse with JSON payload containing the top 5 blogs.
 */

export async function GET(
    req: NextRequest,
  ) {
    if (!verifyJWT(req))
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    const allBlogs = await findAllBlogs();
    const topBlogs = allBlogs.sort((a, b) => b.likes - a.likes).slice(0, 5);
    return NextResponse.json(topBlogs);
  }