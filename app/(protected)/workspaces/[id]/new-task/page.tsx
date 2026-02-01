import { requireWorkspaceMember } from "@/lib/guards/requireWorkspaceMember";
import CreateTaskForm from "./CreateTaskForm";
import prisma from "@/lib/prisma";
import { forbidden, notFound } from "next/navigation";

export default async function NewTask({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workspace = await prisma.workspace.findUnique({
    where: { id },
    select: { id: true, name: true },
  });
  if (!workspace) notFound();
  const membership = await requireWorkspaceMember(workspace.id);

  if (membership.role !== "OWNER" && membership.role !== "ADMIN") forbidden();

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-4xl tracking-tight font-bold text-center mb-4">
        Create Task for {workspace.name}
      </h1>
      <CreateTaskForm workspaceId={workspace.id} />
    </div>
  );
}
