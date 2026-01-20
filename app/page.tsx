import LoginButton from "@/components/ui/login-button";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Internal Tasks App</h1>
      <p className="mt-2 text-gray-500">Sign in to get started.</p>
      <div className="m-2">
        <LoginButton />
      </div>
    </div>
  );
}
