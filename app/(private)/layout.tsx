"use client";

import { LayoutProps } from "@/.next/types/app/layout";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { MainNav, NavItemsProps } from "@/components/MainNav";
import { SignInOutButton } from "@/components/SignInOutButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function PrivateLayout({ children }: LayoutProps) {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    router.push("/");
  }
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between border-b p-2">
        <MainNav navItems={navItems} />
        <div className="flex flex-row gap-2">
          <DarkModeToggle />
          <SignInOutButton />
        </div>
      </div>
      <div>{children}</div>
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
