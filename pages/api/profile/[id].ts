import { verifyJWT } from '@/middleware/auth';
import {findUser} from '@/utils/get-user';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * POST endpoint for creating a new blog post.
 *
 * @param req - The Next.js request object.
 * @returns A NextResponse object with the newly created blog post or an error response.
 * @throws An error if the request body is not a valid JSON object or if there's an issue with the new blog post creation.
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.body !== "GET") {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  const pathname =req.url ;
  if (!pathname)
    return res.status(400).json({ message: 'Invalid request' });
  const idParam = pathname.split('/').pop();

  // Verify JWT token
  if (!verifyJWT(req)) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    if (!idParam) {
      return res.status(405).json({ message: 'Bad request' });
    }

    const user = await findUser(idParam.toString());

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

