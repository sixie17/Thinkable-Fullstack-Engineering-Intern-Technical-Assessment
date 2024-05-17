import { verifyJWT } from '@/middleware/auth';
import { findBlog } from '@/utils/get-blog';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Handles GET requests to retrieve a single blog post by its ID.
 *
 * @param req - The incoming Next.js request object.
 * @param res - The Next.js response object.
 * @returns - A JSON response with the blog post data or an error message.
 *
 * @throws Will throw an error if the blog post is not found or an internal server error occurs.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Ensure the request method is GET
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Extract the ID from the request query
  const { id } = req.query;

  // Verify the JWT token
  const decoded = verifyJWT(req);
  if (!decoded) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Validate the ID parameter
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ message: 'Invalid Blog ID' });
  }

  try {
    // Find the blog post by ID
    const blog = await findBlog(Number(id));

    // Check if the blog post exists
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Return the blog post data
    return res.status(200).json(blog);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
