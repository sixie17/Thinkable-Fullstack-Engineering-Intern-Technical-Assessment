import prisma from "@/lib/prisma";
import { PostDto } from "@/providers/dto/PostDtop";
import { findBlog } from "../allblogs/util";

export async function newBlog(blog : PostDto, senderId : string)
{
    if (blog.content.length < 10)
        throw new Error("Blog Content Too Short");
    if (blog.title.length < 10)
        throw new Error("Blog Title Too Short");
    if (blog.category.length < 1)
        throw new Error("Blog Category Too Short");

    const newBlog = await prisma.post.create({
        data: {
            title: blog.title,
            content: blog.content,
            category: blog.category,
            author: {
                connect: {
                    id: senderId
                }
            },
            likes: 0
        }
    });
    return newBlog;
}

export async function updateBlog(blog : PostDto, senderId : string, blogId: number)
{
    if (blog.content.length < 10)
        throw new Error("Blog Content Too Short");
    if (blog.title.length < 10)
        throw new Error("Blog Title Too Short");
    if (blog.category.length < 1)
        throw new Error("Blog Category Too Short");
    const currBlog = await findBlog(blogId);
    if (!currBlog)
        throw new Error("Blog Not Found");
    if (currBlog.author.id != senderId)
        throw new Error("Unauthorized");
    const newBlog = await prisma.post.update({
        where: {
            id: blogId,
        },
        data: {
            title: blog.title,
            content: blog.content,
            category: blog.category
        }
    })
    return newBlog;
}

export async function deleteBlog(blogId: number, senderId: string)
{
    const currBlog = await findBlog(blogId);
    if (!currBlog)
        throw new Error("Blog Not Found");
    if (currBlog.author.id != senderId)
        throw new Error("Unauthorized");
    await prisma.post.delete({
        where: {
            id: blogId
        }
    })
}