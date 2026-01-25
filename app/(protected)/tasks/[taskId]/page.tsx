import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import TaskActions from "../_components/TaskActions";
import TaskStatus from "../_components/TaskStatus";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CreateCommentForm from "../_components/CreateCommentForm";
import CommentList from "../_components/CommentList";

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
  if (!task) {
    return (
      <div className="prose flex justify-center mt-8">
        <h1>No task found.</h1>
      </div>
    );
  }

  const isOverdue = task.dueDate && new Date() > task.dueDate;

  if (
    session!.user.role !== "ADMIN" &&
    session!.user.id !== task.assignedToId &&
    session!.user.id !== task.createdById
  ) {
    redirect("/forbidden");
  }

  return (
    <div className="flex flex-col items-center w-full">
      <article className="prose dark:prose-invert mt-8">
        <div className="flex justify-between items-center">
          <h1 className="flex justify-between items-center mb-0 w-xl">
            {task.title}
          </h1>
          <div className="w-20">
            <TaskStatus
              status={task.status}
              isOverdue={isOverdue ?? undefined}
            />
          </div>
        </div>

        <p>{task.description}</p>
        <p className="lead-sm">
          Assigned to: {task.assignedTo.email}
          <br />
          Created by: {task.createdBy.email}
        </p>
        <div className="flex justify-between items-center">
          <h4>Due: {task.dueDate ? task.dueDate.toLocaleDateString() : "-"}</h4>
          <div className="flex gap-2">
            <Link href={`/tasks/${taskId}/edit`}>
              <Button className="bg-amber-500 hover:bg-amber-600">Edit</Button>
            </Link>
            <TaskActions taskId={taskId} status={task.status} />
          </div>
        </div>
      </article>
      <hr className="w-full mt-8" />
      <div className="w-xl prose dark:prose-invert m-4">
        <h2 className="">Comments</h2>
      </div>
      <div className="w-xl">
        <CreateCommentForm taskId={task.id} />
      </div>
      <div className="w-xl">
        <CommentList taskId={task.id} />
      </div>
    </div>
  );
}
