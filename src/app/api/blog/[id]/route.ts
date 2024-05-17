import { verifyJWT } from "@/middleware/auth";
import { PostDto } from "@/providers/dto/PostDtop";
import { NextRequest, NextResponse } from "next/server";
import { updateBlog } from "../util";
export async function POST(req: NextRequest)
{
    const { pathname } = new URL(req.url);
    const idParam = pathname.split('/').pop()
    const currUser = verifyJWT(req);
    if (!currUser)
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    try{
        const post : PostDto = await req.json(); 
        const newPost = await updateBlog(post, currUser.userId, Number(idParam));
        return NextResponse.json(newPost, { status: 201 });
    } catch (err: any) {
        return NextResponse.json({ message: err }, { status: 405 });
    }
}