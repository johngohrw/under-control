"use client";

import { Brand } from "@/components/Brand";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { SignInOutButton } from "@/components/SignInOutButton";
import { ReactGenericHTMLElementProps } from "@/types";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PublicLayout({
  children,
}: ReactGenericHTMLElementProps) {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/app");
  }

  return (
    <div className={`flex flex-col max-h-screen`}>
      <div className="flex flex-row justify-between items-center border-b p-2">
        <Link href="/" className="flex-shrink-0">
          <Brand className="w-[120px]" />
        </Link>
        <div className="flex flex-row gap-2">
          <DarkModeToggle />
          <SignInOutButton />
        </div>
      </div>
      <main className="relative flex-grow overflow-auto">{children}</main>
    </div>
  );
}
