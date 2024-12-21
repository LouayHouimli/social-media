"use client";

import { loginWithGoogle } from "@/actions/user.actions";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { GrGoogle } from "react-icons/gr";

export default function DiscordLoginButton({
  label = "Sign in with Google",
}: {
  label?: string;
}) {
  const router = useRouter();

  const onClick = () => {
    loginWithGoogle();
  };

  return (
    <Button onClick={onClick} className="gap-2 w-full">
      <GrGoogle />
      {label}
    </Button>
  );
}
