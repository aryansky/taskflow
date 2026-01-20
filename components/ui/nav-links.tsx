"use client";

import Link from "next/link";
import { Button } from "./button";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function NavLinks({ isAdmin }: { isAdmin: boolean }) {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/tasks", label: "Tasks" },
  ];

  const adminLinks = [{ href: "/admin/new-task", label: "Create Task" }];

  const allLinks = isAdmin ? [...links, ...adminLinks] : links;

  return (
    <div>
      {allLinks.map((link) => {
        const isActive =
          pathname === link.href || pathname.startsWith(`${link.href}/`);
        return (
          <Link key={link.href} href={link.href}>
            <Button
              className={clsx(
                isActive && "underline underline-offset-4 font-semibold"
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
