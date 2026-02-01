import { auth } from "@/lib/auth";
import NavLinks from "./nav-links";
import LoginButton from "./login-button";
import { ThemeToggle } from "./theme-toggle";
import { ClipboardCheck } from "lucide-react";
import { ProfileDropdown } from "./profile-dropdown";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="p-2 border-b dark:border-neutral-700 flex justify-between items-center">
      <div className="mx-4 flex gap-2 items-center">
        <ClipboardCheck />
        <h2 className="text-center text-xl font-extrabold tracking-tight ">
          TaskFlow
        </h2>
      </div>
      <NavLinks />
      <div className="flex items-center gap-2">
        <ThemeToggle />
        {session ? <ProfileDropdown /> : <LoginButton />}
      </div>
    </nav>
  );
}
