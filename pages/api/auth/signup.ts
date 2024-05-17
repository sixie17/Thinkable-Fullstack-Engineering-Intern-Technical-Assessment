
import { SignupDTO } from "@/providers/dto/SignupDTO";
import prisma from "@/lib/prisma";
import * as argon from 'argon2';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from "next";


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const JWT_SECRET = process.env.JWT_SECRET || "";

/**
 * Registers a new user in the system.
 *
 * @param form - The user registration data.
 * @returns A response containing the newly created user's information and a JWT token.
 */

async function register(form: SignupDTO) {
  let emailExists = await prisma.user.findUnique({
    where: { email: form.email }
  });

  if (emailExists) {
    throw 2;
  }

  if (form.password.length < 8) {
    throw 1;
  }

  if (form.avatar < 0 || form.avatar > 4)
    throw 3;

  if (form.userName.length < 3)
    throw 4;

  if (form.bio.length < 10)
    throw 5;


  let hash = await argon.hash(form.password); // Hash passwords

  let user = await prisma.user.create({
    data: {
      username: form.userName,
      email: form.email,
      password: hash,
      avatar: form.avatar,
      bio: form.bio,
    },
  });

  return user;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  
    try {
      const form: SignupDTO = JSON.parse(req.body);
  
      if (!form.userName || !form.password || !form.email) {
        return res.status(400).json({ message: 'Invalid request' });
      }
  
      if (!emailRegex.test(form.email)) { // Validate email format
        return res.status(400).json({ message: 'Invalid email format' });
      }
  
      try {
        const user = await register(form);
  
        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
  
        // Set the token in cookies
        res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}`);
  
        return res.status(200).json({
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          bio: user.bio,
        });
      } catch (err) {
        if (err === 1)
            return res.status(400).json({ message: 'Password must be at least 8 characters' });
        else if (err === 2)
            return res.status(400).json({ message: 'Email already exists' });
        else if (err === 3)
            return res.status(400).json({ message: 'Invalid avatar' });
        else if (err === 4)
            return res.status(400).json({ message: 'Username must be at least 3 characters' });
        else if (err === 5)
            return res.status(400).json({ message: 'Bio must be at least 10 characters' });
        return res.status(500).json({ message: 'DB Error' });
      }
    } catch (err) {
      return res.status(400).json({ message: 'Invalid request' });
    }
  }