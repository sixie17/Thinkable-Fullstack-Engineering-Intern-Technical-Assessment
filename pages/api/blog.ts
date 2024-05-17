import { verifyJWT } from "@/middleware/auth";
import { PostDto } from "@/providers/dto/PostDtop";
import { NextApiRequest, NextApiResponse } from "next";
import { newBlog } from "@/utils/post-blog";

/**
 * POST endpoint for creating a new blog post.
 *
 * @param req - The Next.js request object.
 * @param res - The Next.js response object.
 * @returns A NextResponse object with the newly created blog post or an error response.
 * @throws An error if the request body is not a valid JSON object or if there's an issue with the new blog post creation.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const currUser = verifyJWT(req);
  if (!currUser) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  try {
    const post = await req.body;
    const newPost = await newBlog(post, currUser?.userId);
    return res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating new blog post:', error);
    return res.status(405).json({ message: 'Bad Request' });
  }
}
