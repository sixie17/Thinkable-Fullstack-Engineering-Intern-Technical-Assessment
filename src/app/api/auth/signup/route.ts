
import { SignupDTO } from "@/providers/dto/SignupDTO";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as argon from 'argon2';
import jwt, { Secret } from 'jsonwebtoken';


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const JWT_SECRET = process.env.JWT_SECRET || "";

/**
 * Registers a new user in the system.
 *
 * @param form - The user registration data.
 * @returns A response containing the newly created user's information and a JWT token.
 */
async function register(form: SignupDTO)
{
    if (JWT_SECRET.length == 0)
        return NextResponse.json({ message: "JWT_SECRET env variable not set" }, { status: 500 });
    let email = await prisma.user.findUnique({
        where: {email: form.email}
    })
    if (email)
        return NextResponse.json({ message: "email already exists" }, { status: 403 });
    if (form.password.length < 8)
        return NextResponse.json({ message: "Password must be at least 8 characters" }, { status: 400 });
    if (form.avatar > 4 || form.avatar < 0)
        return NextResponse.json({ message: "avatar must be between 0 and 4" }, { status: 400 });
    let hash = await argon.hash(form.password) //hash passwords
    let user = await prisma.user.create({
        data: {
            username: form.userName,
            email: form.email,
            password: hash,
            avatar: form.avatar,
            bio: form.bio
        },
    });
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    const response =  NextResponse.json({
        username: user.username,
        email: user.email,
        avatar: user.avatar,
    }, { status: 200 });

    response.cookies.set('token', token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
    });
    return response;
}

export async function POST(req: NextRequest) {
    try
    {
        const form: SignupDTO = await req.json();
        if (!form.userName || !form.password || !form.email) {
            return NextResponse.json({ message: "Invalid request" }, { status: 400 });
        }
    
        if (!emailRegex.test(form.email)) { // validate email
            return NextResponse.json({ message: "Invalid email format" }, { status: 400 });
        }
        
        try {
            let user = await register(form);
            return user;
        } catch (err) {
            return NextResponse.json({ message: "DB Error" }, { status: 500 });
        }
    } catch (err)
    {
        return NextResponse.json({ message: "Invalid request" }, { status: 405 });
    }
    
}