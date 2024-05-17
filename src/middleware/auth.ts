import { NextResponse, NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '';

export function verifyJWT(req: NextRequest) {
    if (JWT_SECRET.length == 0)
        return null;
    const token = req.cookies.get('token');

    if (!token) {
        return null;
    }

    try {
        const decoded = jwt.verify(token.value, JWT_SECRET);
        return decoded;
    } catch (err) {
        console.error('JWT verification failed:', err);
        return null;
    }
}