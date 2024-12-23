"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PostSchema } from "@/schemas/post-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createPost } from "@/actions/post.actions";
import { Toast } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

function CreatePost() {
  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  async function onSubmit(data: z.infer<typeof PostSchema>) {
    const res = await createPost(data);
    if (res?.success) {
      toast({
        title: "Success",
        variant: "default",
        description: res.message,
      });
      redirect("/");
    } else {
      toast({
        title: "Failure",
        variant: "destructive",
        description: res?.message,
      });
    }
  }
  return (
    <Card className="w-1/2 mt-[50px]">
      <CardHeader>
        <CardTitle className="text-xl">Create Post</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 items-center justify-center "></div>
        <p className="text-sm text-center text-gray-500 my-2">
          Give us a unique title and make us surprised !!
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Post Title..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Post Content..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-center gap-y-2">
              <Button type="submit">Create Post</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default CreatePost;
