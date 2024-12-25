"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { deletePost } from "@/actions/post.actions";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
function DeleteButton({ postId }: { postId: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [successD, setSuccessD] = useState(false);

  const handlePostDelete = async (postId: string) => {
    setIsDeleting(true);
    const res = await deletePost(postId);
    if (res?.success) {
      toast({
        title: "Success",
        description: res.message,
      });
      setSuccessD(true);
    } else {
      toast({
        title: "Failure",
        description: res?.message,
      });
    }
    setIsDeleting(false);
  };

  return (
    <Button
      disabled={isDeleting || successD}
      onClick={() => {
        handlePostDelete(postId);
      }}
      variant={"destructive"}
      className="w-8 h-6"
    >
      {isDeleting || successD ? "Deleting..." : "Delete"}
    </Button>
  );
}

export default DeleteButton;
