import { verifyJWT } from '@/middleware/auth';
import { NextRequest, NextResponse } from 'next/server';
import {findUser} from '../util';

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
