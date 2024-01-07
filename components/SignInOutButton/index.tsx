"use client";

import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";

export function SignInOutButton({ ...props }) {
  const { data: session } = useSession();
  return (
    <Button
      variant="outline"
      onClick={session ? () => signOut() : () => signIn("google")}
      {...props}
    >
      {session ? "Sign out" : "Sign in"}
    </Button>
  );
}
