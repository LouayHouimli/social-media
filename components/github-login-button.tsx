"use client";

import { loginWithGithub } from "@/actions/user.actions";
import { GithubIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { GrGithub } from "react-icons/gr";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function GithubLoginButton({
  label = "Sign in with Github",
  loadingLabel = "Signing in...",
}: {
  label?: string;
  loadingLabel?: string;
}) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleGithubLogin = async () => {
    setIsLoading(true);
    try {
      const res = await signIn("github", { redirectTo: "/" });
      if (res?.error) {
        toast({
          title: "Error",
          variant: "destructive",
          description: res?.error,
        });
      } else {
        setSuccess(true);
      }
    } catch (error: any) {
      console.error("error");
    }
    setIsLoading(false);
  };

  return (
    <Button onClick={handleGithubLogin} disabled={isLoading || success} className="gap-2 w-full items-center">
      <GrGithub className="w-4 h-4" />
      {label}
    </Button>
  );
}
