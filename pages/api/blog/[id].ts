import { verifyJWT } from "@/middleware/auth";
import { PostDto } from "@/providers/dto/PostDtop";
import { NextApiRequest, NextApiResponse } from "next";
import { updateBlog } from "@/utils/post-blog";

/**
 * POST request handler for updating a blog post.
 *
 * @param req - The Next.js request object.
 * @param res - The Next.js response object.
 * @returns A NextResponse object with the updated blog post or an error message.
 * @throws An error if the request fails.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  
  const { pathname } = req.query;
  if (!pathname) {
    return res.status(400).json({ message: 'Invalid request' });
  }
  const idParam = (pathname as string).split('/').pop();
  const currUser = verifyJWT(req);
  
  if (!currUser) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  try {
    const post: PostDto = req.body as PostDto; 
    const newPost = await updateBlog(post, currUser.userId, Number(idParam));
    return res.status(200).json(newPost);
  } catch (error) {
    console.error('Error updating blog post:', error);
    return res.status(400).json({ message:'Bad Request' });
  }
}

