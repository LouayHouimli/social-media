"use client";

import { logout } from "@/actions/user.actions";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { useState } from "react";

export default function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [successLog, setSuccessLog] = useState(false);
  const router = useRouter();

  const onLogoutClick = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await logout();

      if (response.success) {
        setSuccessLog(true);
        router.replace("/signin");
        toast({
          title: "Success",
          description: response.message,
          variant: "default",
        });
      } else {
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Logout failed:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <Button onClick={onLogoutClick} disabled={isLoading || successLog}>
      {isLoading || successLog ? "Signing out..." : "Sign out"}
    </Button>
  );
}
