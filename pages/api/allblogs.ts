import { verifyJWT } from '@/middleware/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { findAllBlogs } from '@/utils/get-blog'

/**
 * GET request handler for fetching all blogs.
 *
 * @param req - The Next.js request object.
 * @param res - The Next.js response object.
 * @returns A JSON response containing an array of sorted blogs.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Verify the JWT token
    const decoded = verifyJWT(req);
    if (!decoded) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Fetch all blogs
    const allBlogs = await findAllBlogs();

    // Sort blogs by creation date in descending order
    const sortedBlogs = allBlogs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Return sorted blogs
    return res.status(200).json(sortedBlogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
