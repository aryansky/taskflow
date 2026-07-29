import MainContainer from "@/components/ui/layout/main-container";
import { auth } from "@/lib/auth";
import { UserRound } from "lucide-react";
import Image from "next/image";

export default async function Profile() {
  const session = await auth();
  const user = session!.user;

  return (
    <MainContainer
      breadcrumbs={[{ title: "Profile", href: "/profile" }]}
      user={session!.user}
    >
      <article className="prose dark:prose-invert mx-auto h-full p-8">
        <div className="flex flex-col items-center">
          <h1>Profile</h1>
          {user.imageUrl ? (
            <Image
              className="rounded-full"
              src={user.imageUrl}
              alt="User profile picture"
              width={200}
              height={200}
              priority
            />
          ) : (
            <div className="flex h-48 w-48 items-center justify-center rounded-full bg-muted">
              <UserRound className="h-24 w-24 text-muted-foreground" />
            </div>
          )}

          <h2 className="mb-0">{user.name}</h2>
          <h3>{user.email}</h3>
        </div>
      </article>
    </MainContainer>
  );
}
