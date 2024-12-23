"use client";

import { loginWithFacebook } from "@/actions/user.actions";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { FaFacebook } from "react-icons/fa";

export default function FacebookLoginButton({
  label = "Sign in with Facebook",
}: {
  label?: string;
}) {
  const router = useRouter();

  const onClick = () => {
    loginWithFacebook();
  };

  return (
    <Button onClick={onClick} className="gap-2 w-full items-center">
      <FaFacebook className="w-4 h-4" />
      {label}
    </Button>
  );
}
