import prisma from "@/lib/prisma";
import { forbidden, notFound } from "next/navigation";
import UpdateTaskForm from "../../_components/UpdateTaskForm";
import { requireWorkspaceMember } from "@/lib/guards/requireWorkspaceMember";

export default async function EditTask({
  params,
}: {
  params: Promise<{ taskId: string }>;
}) {
  const { taskId } = await params;
  const task = await prisma.task.findUnique({
    where: { id: taskId },
    include: {
      assignedTo: { select: { email: true } },
    },
  });
  if (!task) notFound();

  const membership = await requireWorkspaceMember(task.workspaceId);

  const canEditTask =
    membership.role === "OWNER" ||
    membership.role === "ADMIN" ||
    membership.userId === task.createdById;

  if (!canEditTask) forbidden();

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-4xl tracking-tight font-bold text-center mb-4">
        Edit Task
      </h1>
      <UpdateTaskForm
        taskId={task.id}
        title={task.title}
        description={task.description}
        dueDate={task.dueDate}
        assignedToEmail={task.assignedTo.email}
      />
    </div>
  );
}
