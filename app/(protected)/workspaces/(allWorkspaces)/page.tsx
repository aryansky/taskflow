import PageTitle from "@/components/ui/page-title";
import CreateWorkspaceDialog from "../_components/CreateWorkspaceDialog";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import WorkspaceCard from "../_components/WorkspaceCard";
import { getUserWorkspaceMemberships } from "@/lib/workspace/queries";

export default async function AllWorkspaces() {
  const session = await auth();
  if (!session) redirect("/api/auth/signin");

  const memberships = await getUserWorkspaceMemberships(session.user.id);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <PageTitle>All Workspaces</PageTitle>
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
    </div>
  );
}
