import { auth } from "@/lib/auth";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { requireWorkspaceMember } from "@/lib/workspace/guards";
import { getWorkspaceWithTasks } from "@/lib/workspace/queries";
import { Button } from "@/components/ui/button";
import EditWorkspaceDialog from "./_components/EditWorkspaceDialog";
import TaskCard from "../../tasks/_components/TaskCard";
import MainContainer from "@/components/ui/layout/main-container";

export default async function Workspace({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session) redirect("/api/auth/signin");
  const { id } = await params;

  const workspace = await getWorkspaceWithTasks(id);
  if (!workspace) notFound();

  const membership = await requireWorkspaceMember(workspace.id);

  return (
    <MainContainer
      breadcrumbs={[
        { title: "workspaces", href: "/workspaces" },
        { title: `${workspace.name}`, href: `/workspaces/${workspace.id}` },
      ]}
      backPath={"/workspaces"}
      user={session.user}
      heading={workspace.name}
      actions={
        <div className="flex gap-4 p-4 pb-0">
          {membership.role === "OWNER" && (
            <EditWorkspaceDialog
              workspaceDescription={workspace.description}
              workspaceImageUrl={workspace.imageUrl}
              workspaceName={workspace.name}
              workspaceId={workspace.id}
            />
          )}
          <Button asChild>
            <Link href={`/workspaces/${workspace.id}/invites`}>Invites</Link>
          </Button>
          <Button asChild>
            <Link href={`/workspaces/${workspace.id}/members`}>members</Link>
          </Button>
          <Button asChild>
            <Link href={`/workspaces/${workspace.id}/new-task`}>new task</Link>
          </Button>
          <Button asChild>
            <Link href={`/workspaces/${workspace.id}/promote`}>promote</Link>
          </Button>
        </div>
      }
    >
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
        {workspace.tasks.length === 0 ? (
          <h2 className="text-2xl font-semibold my-6">No tasks found</h2>
        ) : (
          workspace.tasks.map((task) => {
            return (
              <Link href={`/tasks/${task.id}`} key={task.id}>
                <TaskCard
                  {...task}
                  taskId={task.id}
                  assignedToEmail={task.assignedTo.email}
                  createdByEmail={task.createdBy.email}
                />
              </Link>
            );
          })
        )}
      </section>
    </MainContainer>
  );
}
