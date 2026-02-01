import prisma from "@/lib/prisma";
import { forbidden, notFound } from "next/navigation";
import TaskActions from "../_components/TaskActions";
import TaskStatus from "../_components/TaskStatus";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CreateCommentForm from "../_components/CreateCommentForm";
import CommentList from "../_components/CommentList";
import { Calendar } from "lucide-react";
import { requireWorkspaceMember } from "@/lib/guards/requireWorkspaceMember";
import { requireTaskAccess } from "@/lib/guards/requireTaskAccess";

export default async function TaskView({
  params,
}: {
  params: Promise<{ taskId: string }>;
}) {
  const { taskId } = await params;
  const task = await prisma.task.findUnique({
    where: { id: taskId },
    include: {
      assignedTo: { select: { id: true, name: true, email: true } },
      createdBy: { select: { id: true, name: true, email: true } },
      workspace: { select: { name: true } },
    },
  });
  if (!task) notFound();

  const isOverdue = task.dueDate && new Date() > task.dueDate;

  const membership = await requireWorkspaceMember(task.workspaceId);
  requireTaskAccess({
    userId: membership.userId,
    membershipRole: membership.role,
    assignedToId: task.assignedToId,
    createdById: task.createdById,
  });

  return (
    <div className="max-w-5xl mx-auto p-6">
      <article className="prose dark:prose-invert mx-auto">
        <div className="flex justify-between items-center w-full">
          <h1 className="flex justify-between items-center mb-0">
            {task.title}
          </h1>
          <div className="">
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
          <h4 className="flex gap-2">
            <Calendar /> Due:{" "}
            {task.dueDate ? task.dueDate.toLocaleDateString() : "-"}
          </h4>
          <div className="flex gap-2 not-prose">
            <Link href={`/tasks/${taskId}/edit`}>
              <Button className="bg-amber-500 hover:bg-amber-600">Edit</Button>
            </Link>
            <TaskActions taskId={taskId} status={task.status} />
          </div>
        </div>
      </article>
      <hr className="w-full border mt-8" />
      <section className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold my-6">Comments</h2>
        <div>
          <CreateCommentForm taskId={task.id} />
        </div>
        <div>
          <CommentList taskId={task.id} />
        </div>
      </section>
    </div>
  );
}
