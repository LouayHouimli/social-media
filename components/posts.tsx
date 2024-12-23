import React from "react";
import { PostProps } from "@/types/postType";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { auth } from "@/auth";
import DeleteButton from "./delete-btn";
import { MdVerified } from "react-icons/md";
import { redirect } from "next/navigation";
import { FaHeart, FaRegComment, FaRegHeart, FaRetweet } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { AiOutlineRetweet } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { DialogDemo } from "./edit-dialog";

async function Posts({ posts }: { posts: PostProps[] }) {
  const session = await auth();
  if (!session) {
    redirect("/signin");
  }
  return (
    <div className="mt-[50px]">
      {posts.map((post) => (
        <Card key={post.id} className="w-[512px] p-4 m-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2 flex-row">
              <Avatar className="w-8 h-8 border border-primary rounded-full">
                <AvatarImage
                  src={
                    post.authorImage ||
                    "https://avatars.githubusercontent.com/u/424443?v=4"
                  }
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="font-bold">{post.authorName}</p>
              {post.authorAdmin && <MdVerified className="text-primary" />}
            </div>
            {session?.user.id === post.authorId && (
              <DialogDemo
                postId={post.id}
                title={post.title}
                content={post.content}
              />
            )}
          </div>
          <h3 className="italic">Title : {post.title}</h3>
          <p className="break-words">Content : {post.content}</p>

          <div className="flex my-2 px-2 flex-row items-center justify-between">
            <FaRegComment />
            <FaRegHeart />
            <AiOutlineRetweet className="w-5 h-5 " />
          </div>
        </Card>
      ))}
    </div>
  );
}

export default Posts;
