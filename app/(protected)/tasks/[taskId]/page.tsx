import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

export default async function TaskView({
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
  if (!task) notFound();

  if (
    session!.user.role !== "ADMIN" &&
    session!.user.id !== task.assignedToId &&
    session!.user.id !== task.createdById
  ) {
    redirect("/forbidden");
  }

  return (
    <div>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>Assigned to {task.assignedTo.email}</p>
      <p>Created by {task.createdBy.email}</p>
      <p>
        Due date: {task.dueDate ? task.dueDate.toLocaleDateString() : "N/A"}
      </p>
    </div>
  );
}
