"use client";

import { DarkModeToggle } from "@/components/DarkModeToggle";
import { Loading } from "@/components/Loading";
import { MainNav, NavItemsProps } from "@/components/MainNav";
import { SignInOutButton } from "@/components/SignInOutButton";
import { UserNav } from "@/components/examples/user-nav";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.replace("/");
    }
  }, [session, router]);

  return (
    <div className={`flex flex-col max-h-screen h-full`}>
      <PrivateNav />
      <div className="relative flex-grow overflow-auto h-full">
        {status !== "authenticated" ? <Loading /> : children}
      </div>
    </div>
  );
}

export const PrivateNav = () => {
  return (
    <div className="flex flex-row justify-between items-center border-b py-2 px-4 md:px-8">
      <MainNav navItems={navItems} />
      <div className="flex flex-row gap-2">
        <DarkModeToggle />
        <SignInOutButton />
        <div className="flex items-center">
          <UserNav />
        </div>
      </div>
    </div>
  );
};

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
  data: {
    label: "Data",
    href: "/app/data",
    exactMatch: false,
  },
};
