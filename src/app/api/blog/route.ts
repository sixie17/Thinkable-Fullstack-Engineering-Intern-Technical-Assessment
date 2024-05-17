import { verifyJWT } from "@/middleware/auth";
import { PostDto } from "@/providers/dto/PostDtop";
import { NextRequest, NextResponse } from "next/server";
import { newBlog } from "./util";

/**
 * POST endpoint for creating a new blog post.
 *
 * @param req - The Next.js request object.
 * @returns A NextResponse object with the newly created blog post or an error response.
 * @throws An error if the request body is not a valid JSON object or if there's an issue with the new blog post creation.
 */
export async function POST(req: NextRequest)
{
    const currUser = verifyJWT(req);
    if (!currUser)
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    try{
        const post : PostDto = await req.json(); 
        const newPost = await newBlog(post, currUser.userId);
        return NextResponse.json(newPost, { status: 201 });
    } catch (err) {
        return NextResponse.json({ message: 'Bad Request' }, { status: 405 });
    }
}