import { verifyJWT } from "@/middleware/auth";
import { NextRequest, NextResponse } from "next/server";
import { deleteBlog } from "../../util";
export async function POST(req: NextRequest)
{
    const { pathname } = new URL(req.url);
    const idParam = pathname.split('/').pop()
    const currUser = verifyJWT(req);
    if (!currUser)
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    try{ 
        await deleteBlog(Number(idParam), currUser.userId);
        return NextResponse.json( { status: 201 });
    } catch (err: any) {
        return NextResponse.json({ message: err }, { status: 405 });
    }
}