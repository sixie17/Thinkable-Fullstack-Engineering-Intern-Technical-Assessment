import prisma from '@/lib/prisma'

/**
 * Finds all blogs in the database.
 *
 * @returns {Promise<Post[]>} An array of all blogs in the database.
 */ 
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

/**
 * Finds a specific blog by its id in the database.
 *
 * @param {number} id - The unique identifier of the blog.
 * @returns {Promise<Post | null>} A promise that resolves to the blog object if found, or null if not found.
 */
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