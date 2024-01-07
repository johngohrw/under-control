"use client";

import { cn } from "@/lib/utils";
import { ReactGenericHTMLElementProps } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavItemsProps = {
  [key: string]: {
    label: string;
    href: string;
    exactMatch: boolean;
  };
};

export function MainNav({
  navItems,
  className,
  ...props
}: { navItems: NavItemsProps } & ReactGenericHTMLElementProps) {
  const pathname = usePathname();
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {Object.entries(navItems).map(([key, item]) => {
        const isCurrentRoute = item.exactMatch
          ? pathname === item.href
          : pathname.startsWith(item.href);

        return (
          <Link
            href={item.href}
            key={key}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary text-muted-foreground",
              isCurrentRoute && "text-inherit"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
