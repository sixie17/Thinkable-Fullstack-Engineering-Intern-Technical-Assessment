import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as argon from 'argon2';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '';

/**
 * POST endpoint for user login.
 *
 * @param req - The Next.js request object.
 * @returns A JSON response containing the user's username, email, and avatar, along with a JWT token in a cookie.
 * @throws BadRequestError if the request is invalid.
 * @throws UnauthorizedError if the email or password is invalid.
 */
export async function POST(req: NextRequest) {
    if (JWT_SECRET.length == 0)
        return NextResponse.json({ message: "JWT_SECRET env variable not set" }, { status: 500 });
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
        }
        const user = await prisma.user.findUnique({
            where: { email: email },
        });

        if (!user) {
            return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
        }
        const isPasswordValid = await argon.verify(user.password, password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    
        const response = NextResponse.json({
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

    } catch (err) {
        return NextResponse.json({ message: "Bad Request" }, { status: 405 });
    }
}