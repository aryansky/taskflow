"use client";

import Link from "next/link";
import { Button } from "./button";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function NavLinks() {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/workspaces", label: "Workspaces" },
  ];

  return (
    <div>
      {links.map((link) => {
        const isActive =
          pathname === link.href || pathname.startsWith(`${link.href}/`);
        return (
          <Link key={link.href} href={link.href}>
            <Button
              className={clsx(
                isActive && "underline underline-offset-4 font-semibold",
              )}
              variant="link"
            >
              {link.label}
            </Button>
          </Link>
        );
      })}
    </div>
  );
}
