import prisma from '@/lib/prisma'

export async function findUser(uid: string)
{
    const user = await prisma.user.findUnique({
        where: {
            id : uid
        },
        select: {
            id: true,
            username: true,
            bio: true,
            avatar: true,
            posts: {
                select: {
                    id : true,
                    likes: true,
                    category: true,
                    title: true,
                    content: true,
                    createdAt: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            },
        }
    })
    return user;
}