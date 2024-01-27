"use client";

import { Brand } from "@/components/Brand";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { Loading } from "@/components/Loading";
import { MainNav, NavItemsProps } from "@/components/MainNav";
import { UserNav } from "@/components/examples/user-nav";
import { useUser } from "@/hooks/api/useUser";

import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { status } = useSession(); // TODO: change auth verification method to cookies
  useUser();

  useEffect(() => {
    if (status === "unauthenticated") {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      router.push("/");
    }
  }, [status, router, queryClient]);

  return (
    <div className={`flex flex-col max-h-screen h-full`}>
      <PrivateNav />
      <div className="relative flex-grow overflow-auto h-full">
        {status === "loading" ? <Loading /> : children}
      </div>
    </div>
  );
}

export const PrivateNav = () => {
  return (
    <div className="flex flex-row justify-between items-center border-b py-2 px-4 md:px-8">
      <Link href="/" className="flex-shrink-0">
        <Brand className="w-[120px]" />
      </Link>
      <MainNav navItems={navItems} />
      <div className="flex flex-row gap-2">
        <div className="hidden md:flex">
          <DarkModeToggle />
        </div>
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
