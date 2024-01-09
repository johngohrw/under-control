"use client";

import { Brand } from "@/components/Brand";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { Loading } from "@/components/Loading";
import { SignInOutButton } from "@/components/SignInOutButton";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (session) {
    router.replace("/app");
  }

  return (
    <div className={`flex flex-col max-h-screen h-full`}>
      <div className="flex flex-row justify-between items-center border-b p-2">
        <Link href="/" className="flex-shrink-0">
          <Brand className="w-[120px]" />
        </Link>
        <div className="flex flex-row gap-2">
          <DarkModeToggle />
          <SignInOutButton />
        </div>
      </div>
      <main className="relative flex-grow overflow-auto h-full">
        {status !== "unauthenticated" ? <Loading /> : children}
      </main>
    </div>
  );
}
