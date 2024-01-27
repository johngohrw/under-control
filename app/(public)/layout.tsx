"use client";

import { Brand } from "@/components/Brand";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { Loading } from "@/components/Loading";
import { SignInOutButton } from "@/components/SignInOutButton";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/app");
    }
  }, [status, router]);

  return (
    <div className={`flex flex-col max-h-screen h-full`}>
      <div className="flex flex-row justify-between items-center border-b py-2 px-4 md:px-8">
        <Link href="/" className="flex-shrink-0">
          <Brand className="w-[120px]" />
        </Link>
        <div className="flex flex-row gap-2">
          <DarkModeToggle />
          <SignInOutButton />
        </div>
      </div>
      <main
        className="relative flex-grow overflow-auto h-full"
        id="public-layout-content-container"
      >
        {status !== "unauthenticated" ? <Loading /> : children}
      </main>
    </div>
  );
}
