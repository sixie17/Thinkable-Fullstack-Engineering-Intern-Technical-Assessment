import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import * as argon from 'argon2';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '';

/**
 * POST endpoint for user login.
 *
 * @param req - The Next.js request object.
 * @param res - The Next.js response object.
 * @returns A JSON response containing the user's username, email, and avatar, along with a JWT token in a cookie.
 * @throws BadRequestError if the request is invalid.
 * @throws UnauthorizedError if the email or password is invalid.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    if (JWT_SECRET.length === 0) {
        return res.status(500).json({ message: "JWT_SECRET env variable not set" });
    }

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await prisma.user.findUnique({
            where: { email: email },
        });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await argon.verify(user.password, password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

        res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Max-Age=${60 * 60 * 24 * 7}; Path=/`);

        return res.status(200).json({
            username: user.username,
            email: user.email,
            avatar: user.avatar,
        });

    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: "Bad Request" });
    }
}