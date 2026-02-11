import PageTitle from "@/components/ui/page-title";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import TaskCard from "../../tasks/_components/TaskCard";
import { requireWorkspaceMember } from "@/lib/workspace/guards";
import EditWorkspaceDialog from "../_components/EditWorkspaceDialog";
import { getWorkspaceWithTasks } from "@/lib/workspace/queries";

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

  if (workspace.tasks.length === 0) {
    return (
      <div className="max-w-3xl lg:max-w-5xl mx-auto p-6">
        <PageTitle>{workspace.name}</PageTitle>
        <hr />
        <h2 className="text-2xl font-semibold my-6">No tasks found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-3xl lg:max-w-5xl mx-auto p-6">
      <PageTitle className="flex gap-4 items-center">
        {workspace.name}{" "}
        {membership.role === "OWNER" && (
          <EditWorkspaceDialog
            workspaceName={workspace.name}
            workspaceId={workspace.id}
          />
        )}
      </PageTitle>
      <hr />
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
        {workspace.tasks.map((task) => {
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
        })}
      </section>
    </div>
  );
}
