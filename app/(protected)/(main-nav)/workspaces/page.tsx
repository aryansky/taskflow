import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getUserWorkspaceMemberships } from "@/lib/workspace/queries";
import CreateWorkspaceDialog from "./_components/CreateWorkspaceDialog";
import WorkspaceCard from "./_components/WorkspaceCard";
import MainContainer from "@/components/ui/layout/main-container";

export default async function AllWorkspaces() {
  const session = await auth();
  if (!session) redirect("/api/auth/signin");

  const memberships = await getUserWorkspaceMemberships(session.user.id);

  return (
    <MainContainer
      breadcrumbs={[{ title: "Workspaces", href: "/workspaces" }]}
      heading="All Workspaces"
      user={session.user}
    >
      <CreateWorkspaceDialog />
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
        {memberships.map((w) => {
          return (
            <WorkspaceCard
              key={w.id}
              name={w.workspace.name}
              workspaceId={w.workspace.id}
              role={w.role}
            />
          );
        })}
      </section>
    </MainContainer>
  );
}
