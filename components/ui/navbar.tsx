import { auth } from "@/lib/auth";
import LogoutButton from "./logout-button";
import NavLinks from "./nav-links";
import LoginButton from "./login-button";
import { ThemeToggle } from "./theme-toggle";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="p-2 border flex justify-between items-center">
      <div>
        <h2 className="text-center text-xl font-extrabold tracking-tight ">
          TaskFlow
        </h2>
      </div>
      <NavLinks isAdmin={session?.user.role === "ADMIN"} />
      <div className="flex items-center gap-2">
        <ThemeToggle />
        {session ? <LogoutButton /> : <LoginButton />}
      </div>
    </nav>
  );
}
