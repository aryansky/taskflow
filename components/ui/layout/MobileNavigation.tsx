"use client";

import { Menu } from "lucide-react";
import { Button, buttonVariants } from "../button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navIcons } from "@/lib/navigation";

export type MobileNavItemType = {
  title: string;
  icon: keyof typeof navIcons;
  href: string;
};

export function MobileDockItem({
  icon,
  href,
  isActive,
}: MobileNavItemType & {
  isActive: boolean;
}) {
  const Icon = navIcons[icon];

  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({
          variant: isActive ? "secondary" : "ghost",
          size: "icon",
          className: "rounded-full",
        }),
      )}
      aria-current={isActive ? "page" : undefined}
    >
      <Icon />
    </Link>
  );
}

export function MobileMenuItem({
  icon,
  title,
  href,
  isActive,
  toggleMenu,
}: MobileNavItemType & {
  toggleMenu: () => void;
  isActive: boolean;
}) {
  const Icon = navIcons[icon];

  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({
          variant: isActive ? "secondary" : "ghost",
          size: "lg",
        }),
        "flex w-full rounded-lg items-center justify-start",
      )}
      onClick={toggleMenu}
      aria-current={isActive ? "page" : undefined}
    >
      <Icon />
      {title}
    </Link>
  );
}

export function MobileNavigation({
  mobileNavItems,
}: {
  mobileNavItems: MobileNavItemType[];
}) {
  const [isMobileMenuExpanded, setIsMobileMenuExpanded] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuExpanded((s) => !s);
  };
  const pathname = usePathname();

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={toggleMobileMenu}
        className={cn(
          "fixed opacity-0 bg-black transition-opacity duration-300",
          isMobileMenuExpanded ? "w-full h-screen opacity-60" : "w-0 h-0",
        )}
      />

      {/* Mobile Menu Opened */}
      <div className="fixed w-full z-50">
        <div
          className={cn(
            "fixed w-full bg-white dark:bg-neutral-900 rounded-t-4xl p-4 transition-all duration-300 ease-in-out h-[240]",
            isMobileMenuExpanded ? "bottom-0" : "-bottom-60",
          )}
        >
          <div className="w-full flex justify-center mb-2">
            <div className="w-[75] border-2 rounded-full" />
          </div>
          <div className="w-full h-full overflow-auto">
            {mobileNavItems.map((item) => {
              return (
                <MobileMenuItem
                  key={item.title}
                  {...item}
                  isActive={pathname === item.href}
                  toggleMenu={toggleMobileMenu}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Dock */}
      <div className="fixed rounded inset-x-0 bottom-0 z-40 flex items justify-center md:hidden">
        <div className="mb-4 rounded-full flex gap-1 bg-gray-100 dark:bg-neutral-900 p-2 px-4">
          {mobileNavItems.map((item) => {
            return (
              <MobileDockItem
                key={item.title}
                title={item.title}
                href={item.href}
                icon={item.icon}
                isActive={pathname === item.href}
              />
            );
          })}
          <Button
            aria-expanded={isMobileMenuExpanded}
            aria-label="Toggle navigation menu"
            onClick={toggleMobileMenu}
            variant={"ghost"}
            size={"icon"}
            className={"rounded-full hover:cursor-pointer"}
          >
            <Menu />
          </Button>
        </div>
      </div>
    </>
  );
}
