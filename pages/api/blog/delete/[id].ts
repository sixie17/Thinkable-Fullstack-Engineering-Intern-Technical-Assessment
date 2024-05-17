import { verifyJWT } from "@/middleware/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { deleteBlog } from "@/utils/post-blog";

/**
 * Deletes a blog post by its id.
 *
 * @param {NextApiRequest} req - The Next.js API request object.
 * @param {NextApiResponse} res - The Next.js API response object.
 * @returns {Promise<void>} - A promise that resolves to void.
 * @throws {Error} - If an error occurs during the deletion process.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    if (req.method !== "POST") {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const url = req.url || req.headers.referer;
    if (!url) {
        return res.status(400).json({ message: 'URL not found' });
    }
    const idParam = url.split('/').pop();
    const currUser = verifyJWT(req);
    if (!currUser) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try { 
        await deleteBlog(Number(idParam), currUser.userId);
        return res.status(201).json({ message: 'Blog deleted successfully' });
    } catch (err: any) {
        return res.status(405).json({ message: err.message || 'Error deleting blog' });
    }
}
