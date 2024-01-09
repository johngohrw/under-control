"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";

export function SignInOutButton({ label = "", ...props }) {
  const { data: session, status } = useSession();

  const labelMap: { [key in typeof status]: string } = {
    loading: "loading",
    authenticated: "Sign out",
    unauthenticated: "Sign in",
  };

  return (
    <Button
      disabled={status === "loading"}
      onClick={session ? () => signOut() : () => signIn()}
      variant="outline"
      {...props}
    >
      {labelMap[status]}
    </Button>
  );
}
