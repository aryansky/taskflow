import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import UpdateTaskForm from "../../_components/UpdateTaskForm";

export default async function EditTask({
  params,
}: {
  params: Promise<{ taskId: string }>;
}) {
  const session = await auth();
  const { taskId } = await params;

  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
    include: {
      assignedTo: {
        select: { id: true, name: true, email: true },
      },
      createdBy: {
        select: { id: true, name: true, email: true },
      },
    },
  });
  if (!task) {
    return (
      <div className="prose flex justify-center mt-8">
        <h1>No task found.</h1>
      </div>
    );
  }

  if (
    session!.user.role !== "ADMIN" &&
    session!.user.id !== task.assignedToId &&
    session!.user.id !== task.createdById
  ) {
    redirect("/forbidden");
  }

  return (
    <div>
      <h1 className="text-4xl tracking-tight font-bold text-center m-4">
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
