"use client";

import { signOut } from "next-auth/react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";

export function LogoutMenuItem() {
  return (
    <DropdownMenuItem onSelect={() => signOut()} className="cursor-pointer">
      <LogOutIcon />
      <span>Sign out</span>
    </DropdownMenuItem>
  );
}
