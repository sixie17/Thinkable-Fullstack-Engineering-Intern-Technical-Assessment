import prisma from '@/lib/prisma'

 
export async function findAllBlogs()
{
  const allBlogs = await prisma.post.findMany({
    select:{
      id: true,
      likes: true,
      title: true,
      category: true,
      createdAt: true,
      likers: {
        select: {
          id: true,
          username: true,
          avatar: true
        }
      },
      author: {
        select: {
          id: true,
          username: true,
          avatar: true
        },
      },
    }
  })
  //sort based on date
  return allBlogs
}

export async function findBlog(id: number)
{
  const blog = await prisma.post.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      likes: true,
      createdAt :true,
      title:true,
      content: true,
      likers: {
        select: {
          id: true,
          username: true,
          avatar: true
        }
      },
      author: {
          select : {
            id: true,
            username: true,
            avatar: true
          }
      }
    }
  });

  return blog;
}