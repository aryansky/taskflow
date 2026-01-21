import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import TaskCard from "../components/TaskCard";

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
    <TaskCard
      className="mx-auto"
      title={task.title}
      description={task.description}
      status={task.status}
      assignedToEmail={task.assignedTo.email}
      createdByEmail={task.createdBy.email}
      createdAt={task.createdAt}
      dueDate={task.dueDate}
      taskId={task.id}
      showActions
    />
  );
}
