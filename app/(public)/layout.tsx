"use client";

import { LayoutProps } from "@/.next/types/app/layout";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { SignInOutButton } from "@/components/SignInOutButton";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function PublicLayout({ children }: LayoutProps) {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/app");
  }

  return (
    <>
      <div className={`flex flex-col`}>
        <div className="flex flex-row justify-between items-center border-b p-2">
          <div>UC</div>
          <div className="flex flex-row gap-2">
            <DarkModeToggle />
            <SignInOutButton />
          </div>
        </div>
        <div className="flex flex-row"></div>
        <div>{children}</div>
      </div>
      <style jsx global>
        {``}
      </style>
    </>
  );
}
