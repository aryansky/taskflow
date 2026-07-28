"use client";

import { ArrowLeft, PackageCheck } from "lucide-react";
import { Button, buttonVariants } from "../button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { NavUser } from "../nav-user";
import { navIcons } from "@/lib/navigation";

export type SidebarItemType = {
  icon: keyof typeof navIcons;
  title: string;
  href: string;
  isActive?: boolean;
};

export function SidebarItem({ icon, title, href, isActive }: SidebarItemType) {
  const Icon = navIcons[icon];
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({
          variant: isActive ? "secondary" : "ghost",
          size: "lg",
        }),
        "w-full rounded-lg text-md flex justify-center lg:justify-start mb-1",
      )}
    >
      {Icon ? <Icon /> : <p className="inline lg:hidden">{title[0]}</p>}
      <p className="hidden lg:inline">{title}</p>
    </Link>
  );
}

export function Sidebar({
  user,
  sidebarItems,
  backPath,
}: {
  user: {
    name: string;
    email: string;
    imageUrl: string;
  };
  sidebarItems: SidebarItemType[];
  backPath?: string;
}) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "bg-white dark:bg-[#0d0c10] h-screen flex-col hidden md:flex w-[75] lg:w-[250]",
      )}
    >
      <header className="flex justify-start items-center gap-4 p-4">
        {backPath ? (
          <div className="w-full h-full flex justify-center lg:justify-start lg:px-2 items-center">
            <Button variant="secondary" asChild>
              <Link href={backPath} className="">
                <ArrowLeft /> <p className="hidden lg:inline">Back</p>
              </Link>
            </Button>
          </div>
        ) : (
          <div className="w-full flex justify-center lg:justify-start items-center gap-1 px-2">
            <PackageCheck size={28} />
            <h1 className="font-bold text-2xl hidden lg:inline">TaskFlow</h1>
          </div>
        )}
      </header>
      <div className="w-full px-4 py-2">
        {sidebarItems.map((item) => {
          return (
            <SidebarItem
              icon={item.icon}
              key={item.title}
              title={item.title}
              href={item.href}
              isActive={item.href === pathname}
            />
          );
        })}
      </div>
      <footer className="mt-auto flex justify-between items-center">
        <NavUser user={user} />
      </footer>
    </aside>
  );
}
