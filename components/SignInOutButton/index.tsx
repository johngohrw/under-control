"use client";

import { useSignIn } from "@/hooks/useSignIn";
import { Button } from "../ui/button";

export function SignInOutButton({ ...props }) {
  const { label, onClick, status } = useSignIn();
  return (
    <Button
      disabled={status === "loading"}
      onClick={onClick}
      variant="outline"
      {...props}
    >
      {label}
    </Button>
  );
}
