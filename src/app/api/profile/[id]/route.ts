import { verifyJWT } from '@/middleware/auth';
import { NextRequest, NextResponse } from 'next/server';
import {findUser} from '../util';

/**
 * POST endpoint for creating a new blog post.
 *
 * @param req - The Next.js request object.
 * @returns A NextResponse object with the newly created blog post or an error response.
 * @throws An error if the request body is not a valid JSON object or if there's an issue with the new blog post creation.
 */

export async function GET(req: NextRequest) {
  
    const { pathname } = new URL(req.url);
    const idParam = pathname.split('/').pop();
  
    if (!verifyJWT(req)) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
  
    try {
      if (!idParam)
        return NextResponse.json({ message: 'Bad request' }, { status: 405 });

      const user = await findUser(idParam.toString());
  
      if (!user) {
        return NextResponse.json({ message: 'user not found' }, { status: 404 });
      }
  
      return NextResponse.json(user, { status: 200 });
    } catch (err) {
      console.error(err);
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
  }
