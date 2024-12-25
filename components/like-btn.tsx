"use client";
import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { likePost } from "@/actions/post.actions";
import { toast } from "./ui/use-toast";
function LikeBtn({ postId }: { postId: string }) {
  const handleLike = async (postId: string) => {
    const res = await likePost(postId);
    if (res?.success) {
      toast({
        title: res.message,
        variant: "default",
      });
    }
  };
  return <FaRegHeart onClick={() => handleLike(postId)} />;
}

export default LikeBtn;
