import jwt from 'jsonwebtoken';
import { NextApiRequest } from 'next';

const JWT_SECRET = process.env.JWT_SECRET || '';

export function verifyJWT(req: NextApiRequest) {
    if (JWT_SECRET.length === 0) {
        console.error('JWT_SECRET env variable is not set');
        return null;
    }

    const token = req.cookies?.token; // Adjusted to access the token directly

    if (!token) {
        return null;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET); // Directly pass the token
        return decoded;
    } catch (err) {
        console.error('JWT verification failed:', err);
        return null;
    }
}
