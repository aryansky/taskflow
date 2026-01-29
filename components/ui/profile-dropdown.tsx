import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/lib/auth";
import { BadgeCheckIcon, UserRound } from "lucide-react";
import Link from "next/link";
import { LogoutMenuItem } from "./logout-menu-item";

export async function ProfileDropdown() {
  const session = await auth();
  console.log("From profile dropdown: ", session?.user);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar>
            <AvatarImage src={session!.user.imageUrl} alt="shadcn" />
            <AvatarFallback>
              <UserRound />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          {session!.user.name && (
            <DropdownMenuLabel>{session!.user.name}</DropdownMenuLabel>
          )}
          <DropdownMenuItem asChild>
            <Link href={"/profile"}>
              <BadgeCheckIcon />
              Account
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <LogoutMenuItem />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
