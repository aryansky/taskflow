import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getUserWorkspaceMemberships } from "@/lib/workspace/queries";
import CreateWorkspaceDialog from "./_components/CreateWorkspaceDialog";
import WorkspaceCard from "./_components/WorkspaceCard";
import MainContainer from "@/components/ui/layout/main-container";
import Link from "next/link";

export default async function AllWorkspaces() {
  const session = await auth();
  if (!session) redirect("/api/auth/signin");

  const memberships = await getUserWorkspaceMemberships(session.user.id);

  return (
    <MainContainer
      breadcrumbs={[{ title: "Workspaces", href: "/workspaces" }]}
      heading="All Workspaces"
      user={session.user}
      actions={<CreateWorkspaceDialog />}
    >
      <section className="flex flex-col my-6 max-w-xl">
        {memberships.map((w) => {
          return (
            <Link href={`/workspaces/${w.workspace.id}`} key={w.id}>
              <WorkspaceCard
                workspaceId={w.workspace.id}
                imageUrl={w.workspace.imageUrl}
                description={w.workspace.description}
                name={w.workspace.name}
              />
            </Link>
          );
        })}
      </section>
    </MainContainer>
  );
}
