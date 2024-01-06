"use client";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export function SignInOutButton({
  className,
  ...props
}: {
  className?: string;
}) {
  const { data: session } = useSession();
  return (
    <>
      <div>
        {session ? <>signed in as {session?.user?.name}</> : "unauthenticated"}
      </div>
      <button
        className={className}
        onClick={session ? () => signOut() : () => signIn()}
        {...props}
      >
        {session ? "sign out" : "sign in"}
      </button>
    </>
  );
}
