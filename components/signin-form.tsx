"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";

import { login } from "@/actions/user.actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoginSchema } from "@/schemas/login-schema";
import { useRouter } from "next/navigation";
import DiscordLoginButton from "./discord-login-button";
import FacebookLoginButton from "./facebook-login-button";
import GithubLoginButton from "./github-login-button";
import PasskeyLoginButton from "./passkey-login-button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { toast } from "./ui/use-toast";
import { useState } from "react";
export default function SignIn() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof LoginSchema>) {
    setIsLoading(true);
    const res = await login(data);

    if (res.success) {
      setSuccess(true);
      toast({
        description: res.message,
        variant: "default",
      });
      router.push("/");
    } else {
      toast({
        description: res.message,
        variant: "destructive",
      });
    }
    setIsLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <GithubLoginButton />
          <FacebookLoginButton />
          <DiscordLoginButton />
          <PasskeyLoginButton />
        </div>
        <div className="flex gap-2 items-center justify-center my-2">
          <div className="w-full h-[0.5px] bg-primary " />
          <span className="text-sm text-gray-500">OR</span>
          <div className="w-full h-[0.5px] bg-primary " />
        </div>
        <p className="text-sm text-center text-gray-500 my-2">
          Sign in with your email and password
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Button
                type="button"
                onClick={() => {
                  router.push("/signup");
                }}
                className="underline text-gray-500 px-0"
                variant={"link"}
              >
                Don{"'"}t have an account? Sign up
              </Button>
            </div>
            <Button disabled={isLoading || success} type="submit">
              {isLoading || success ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
