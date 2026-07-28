"use client";

import { BadgeCheck, ChevronsUpDown, LogOut, UserRound } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "./button";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    imageUrl: string;
  };
}) {
  return (
    <div className="w-full h-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="w-full flex p-2 justify-center items-center">
            <Button
              className="rounded-full h-12 w-12 lg:rounded-lg lg:w-full lg:h-[50] hover:-translate-y-1 lg:hover:translate-y-0"
              variant={"ghost"}
            >
              <Avatar className="h-8 w-8 rounded-full">
                <AvatarImage src={user.imageUrl} alt={user.name} />
                <AvatarFallback className="rounded-lg border">
                  <UserRound />
                </AvatarFallback>
              </Avatar>
              <div className="hidden lg:grid flex-1 text-left text-sm leading-tight ">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="hidden lg:inline ml-auto size-4" />
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
          side={"right"}
          align="end"
          sideOffset={4}
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.imageUrl} alt={user.name} />
                <AvatarFallback className="rounded-lg">
                  <UserRound />
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href={"/profile"}>
                <BadgeCheck />
                Account
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={"/api/auth/signout"}>
              <LogOut />
              Log out
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
