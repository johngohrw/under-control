"use client";

import { DarkModeToggle } from "@/components/DarkModeToggle";
import { MainNav, NavItemsProps } from "@/components/MainNav";
import { SignInOutButton } from "@/components/SignInOutButton";
import { ReactGenericHTMLElementProps } from "@/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function PrivateLayout({
  children,
}: ReactGenericHTMLElementProps) {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    router.push("/");
  }
  return (
    <div className={`flex flex-col max-h-screen`}>
      <div className="flex flex-row justify-between items-center border-b p-2">
        <MainNav navItems={navItems} />
        <div className="flex flex-row gap-2">
          <DarkModeToggle />
          <SignInOutButton />
        </div>
      </div>
      <main className="relative flex-grow overflow-auto">{children}</main>
    </div>
  );
}

const navItems: NavItemsProps = {
  home: {
    label: "Home",
    href: "/app",
    exactMatch: true,
  },
  expenses: {
    label: "Expenses",
    href: "/app/expenses",
    exactMatch: false,
  },
  insights: {
    label: "Insights",
    href: "/app/insights",
    exactMatch: false,
  },
};
