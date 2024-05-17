import { verifyJWT } from "@/middleware/auth";
import { PostDto } from "@/providers/dto/PostDtop";
import { NextRequest, NextResponse } from "next/server";
import { newBlog } from "./util";

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