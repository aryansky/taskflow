import { auth } from "@/lib/auth";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { requireWorkspaceMember } from "@/lib/workspace/guards";
import { getWorkspaceWithTasks } from "@/lib/workspace/queries";
import { buttonVariants } from "@/components/ui/button";
import EditWorkspaceDialog from "./_components/EditWorkspaceDialog";
import TaskCard from "../../tasks/_components/TaskCard";
import MainContainer from "@/components/ui/layout/main-container";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

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

  const isOwnerOrAdmin =
    membership.role === "ADMIN" || membership.role === "OWNER";

  const workspaceTasks = isOwnerOrAdmin
    ? workspace.tasks
    : workspace.tasks.filter(
        (task) => task.assignedTo.email === session.user.email,
      );

  return (
    <MainContainer
      breadcrumbs={[
        { title: "workspaces", href: "/workspaces" },
        { title: `${workspace.name}`, href: `/workspaces/${workspace.id}` },
      ]}
      backPath={"/workspaces"}
      user={session.user}
      heading={workspace.name}
      workspaceImage={workspace.imageUrl ?? undefined}
      showWorkspaceImage={true}
      description={workspace.description ?? undefined}
      actions={
        membership.role === "OWNER" && (
          <EditWorkspaceDialog
            workspaceDescription={workspace.description}
            workspaceImageUrl={workspace.imageUrl}
            workspaceName={workspace.name}
            workspaceId={workspace.id}
          />
        )
      }
    >
      <section className="flex flex-col my-6">
        <div className="flex gap-4 items-center justify-between border rounded-2xl py-2 px-6 mt-8 bg-card text-card-foreground">
          <h2 className="font-bold text-2xl">Tasks</h2>
          <div className="flex items-center gap-2">
            <Input placeholder="Search" disabled className="max-w-xs" />
            {isOwnerOrAdmin && (
              <Link
                href={`/workspaces/${workspace.id}/new-task`}
                className={buttonVariants({ variant: "default", size: "sm" })}
              >
                <Plus /> New Task
              </Link>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-4">
          {workspaceTasks.length === 0 ? (
            <h2 className="text-xl font-semibold my-6">No tasks found</h2>
          ) : (
            workspaceTasks.map((task) => {
              return (
                // <Link href={`/tasks/${task.id}`} key={task.id}>
                <TaskCard
                  {...task}
                  key={task.id}
                  taskId={task.id}
                  assignedToEmail={task.assignedTo.email}
                  createdByEmail={task.createdBy.email}
                />
                // </Link>
              );
            })
          )}
        </div>
      </section>
    </MainContainer>
  );
}
