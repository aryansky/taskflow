import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import TaskActions from "../_components/TaskActions";
import TaskStatus from "../_components/TaskStatus";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CreateCommentForm from "../_components/CreateCommentForm";
import CommentList from "../_components/CommentList";
import { Calendar } from "lucide-react";
import { requireWorkspaceMember } from "@/lib/workspace/guards";
import MainContainer from "@/components/ui/layout/main-container";
import { auth } from "@/lib/auth";

export default async function TaskView({
  params,
}: {
  params: Promise<{ taskId: string }>;
}) {
  const session = await auth();
  const { taskId } = await params;
  const task = await prisma.task.findUnique({
    where: { id: taskId },
    include: {
      assignedTo: { select: { id: true, name: true, email: true } },
      createdBy: { select: { id: true, name: true, email: true } },
      workspace: { select: { name: true, id: true } },
    },
  });
  if (!task) notFound();

  const membership = await requireWorkspaceMember(task.workspaceId);

  const isOverdue = task.dueDate && new Date() > task.dueDate;

  const canEditTask =
    membership.role === "OWNER" ||
    membership.role === "ADMIN" ||
    membership.userId === task.createdById;

  const canUpdateStatus =
    membership.role === "OWNER" ||
    membership.role === "ADMIN" ||
    membership.userId === task.assignedToId;

  return (
    <MainContainer
      breadcrumbs={[
        { title: "workspaces", href: "/workspaces" },
        {
          title: `${task.workspace.name}`,
          href: `/workspaces/${task.workspace.id}`,
        },
        { title: task.title, href: `/tasks/${task.id}` },
      ]}
      backPath={`/workspaces/${task.workspace.id}`}
      user={session!.user}
    >
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
            {canEditTask && (
              <Link href={`/tasks/${taskId}/edit`}>
                <Button className="bg-amber-500 hover:bg-amber-600">
                  Edit
                </Button>
              </Link>
            )}
            {canUpdateStatus && (
              <TaskActions taskId={taskId} status={task.status} />
            )}
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
    </MainContainer>
  );
}
