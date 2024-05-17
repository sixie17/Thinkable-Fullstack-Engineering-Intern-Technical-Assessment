import { verifyJWT } from '@/middleware/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { findAllBlogs } from '@/utils/get-blog';

/**
 * GET request handler for fetching the top 5 blogs sorted by likes.
 *
 * @param req - The Next.js request object.
 * @param res - The Next.js response object.
 * @returns NextResponse with JSON payload containing the top 5 blogs.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  if (!verifyJWT(req)) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Fetch all blogs
    const allBlogs = await findAllBlogs();

    // Sort blogs by likes in descending order and get the top 5
    const topBlogs = allBlogs.sort((a, b) => b.likes - a.likes).slice(0, 5);

    // Return the top 5 blogs
    return res.status(200).json(topBlogs);
  } catch (error) {
    console.error('Error fetching top blogs:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
