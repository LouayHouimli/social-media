"use server";
import z from "zod";
import { PostSchema } from "@/schemas/post-schema";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { eq, ne, gt, gte, desc } from "drizzle-orm";

import { postTable, usersTable } from "@/lib/schema";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { PostProps } from "@/types/postType";
export const createPost = async (data: z.infer<typeof PostSchema>) => {
  const session = await auth();
  const title = data.title;
  const content = data.content;
  try {
    const res = await db.insert(postTable).values({
      title: title,
      content: content,
      author: session?.user.id!,
    });
    if (res) {
      revalidatePath("/");
      return {
        success: true,
        message: "Post created successfully",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
export const getPosts = async (): Promise<PostProps[]> => {
  const posts = await db
    .select({
      id: postTable.id,
      title: postTable.title,
      content: postTable.content,
      createdAt: postTable.createdAt,
      updatedAt: postTable.updatedAt,
      authorId: postTable.author,
      authorAdmin: usersTable.isAdmin,
      authorName: usersTable.name,
      authorImage: usersTable.image,
    })
    .from(postTable)
    .innerJoin(usersTable, eq(usersTable.id, postTable.author))
    .orderBy(desc(postTable.createdAt));

  return posts;
};
export const deletePost = async (postId: string) => {
  try {
    const res = await db.delete(postTable).where(eq(postTable.id, postId));
    if (res) {
      revalidatePath("/");
      return {
        success: true,
        message: "Post deleted successfully",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error,
    };
  }
};
export const updatePost = async (
  data: z.infer<typeof PostSchema>,
  postId: string
) => {
  const session = await auth();
  const title = data.title;
  const content = data.content;

  try {
    const res = await db
      .update(postTable)
      .set({
        title: title,
        content: content,
      })
      .where(eq(postTable.id, postId));

    if (res) {
      revalidatePath("/");

      return {
        success: true,
        message: "Post updated successfully",
      };
    } else {
      throw new Error("No rows updated. Post not found.");
    }
  } catch (error: any) {
    console.error("Error updating post:", error);
    return {
      success: false,
      message: error.message || "An unknown error occurred",
    };
  }
};
