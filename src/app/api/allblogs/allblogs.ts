import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
 
type ResponseData = {
  message: string
}
 
// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseData>
// ) {
//   if (req.method === "GET")
//     return res.status(200).json({ message: 'Hello from Next.js!' })
// }

// export default function GET(
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseData>)
// {
//   return res.status(200).json({message: "hello"});
// }

export async function GET(
  req: NextApiRequest,
) {
  return NextResponse.json({ message: "world" })
}

export async function POST(req:NextApiRequest) {
  return NextResponse.json({message: "hello"})
  
}