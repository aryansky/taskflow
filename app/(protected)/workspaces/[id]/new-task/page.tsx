import { requireWorkspaceMember } from "@/lib/workspace/guards";
import CreateTaskForm from "./CreateTaskForm";
import { forbidden, notFound } from "next/navigation";
import { getWorkspace } from "@/lib/workspace/queries";
import MainContainer from "@/components/ui/layout/main-container";

export default async function NewTask({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workspace = await getWorkspace(id);
  if (!workspace) notFound();

  const membership = await requireWorkspaceMember(workspace.id);

  if (membership.role !== "OWNER" && membership.role !== "ADMIN") forbidden();

  return (
    <MainContainer
      breadcrumbs={[
        { title: "workspaces", href: "/workspaces" },
        { title: `${workspace.name}`, href: `/workspaces/${workspace.id}` },
        {
          title: "new task",
          href: `/workspaces/${workspace.id}/new-task`,
        },
      ]}
    >
      <div className="max-w-2xl mt-4">
        <h1 className="text-4xl tracking-tight font-bold  mb-12">
          Create Task for {workspace.name}
        </h1>
        <CreateTaskForm workspaceId={workspace.id} />
      </div>
    </MainContainer>
  );
}
