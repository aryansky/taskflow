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

  const createdWorkspaces = memberships.filter((membership) => {
    return membership.role === "OWNER";
  });

  const joinedWorkspaces = memberships.filter((membership) => {
    return membership.role !== "OWNER";
  });

  return (
    <MainContainer
      breadcrumbs={[{ title: "Workspaces", href: "/workspaces" }]}
      heading="All Workspaces"
      user={session.user}
      actions={<CreateWorkspaceDialog />}
    >
      <section className="flex flex-col my-6 mx-auto lg:max-w-[95%]">
        <h2 className="text-xl tracking-tight font-semibold text-wrap mt-2">
          Your Workspaces
        </h2>
        {createdWorkspaces.map((w) => {
          return (
            <Link
              className="my-1"
              href={`/workspaces/${w.workspace.id}`}
              key={w.id}
            >
              <WorkspaceCard
                workspaceId={w.workspace.id}
                imageUrl={w.workspace.imageUrl}
                description={w.workspace.description}
                name={w.workspace.name}
              />
            </Link>
          );
        })}
        <h2 className="text-xl tracking-tight font-semibold text-wrap mt-4">
          Other Workspaces
        </h2>
        {joinedWorkspaces.map((w) => {
          return (
            <Link
              className="my-1"
              href={`/workspaces/${w.workspace.id}`}
              key={w.id}
            >
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
