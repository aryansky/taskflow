"use server";

import prisma from "@/lib/prisma";
import { Status } from "@/lib/generated/prisma/client";
import { revalidatePath } from "next/cache";
import z from "zod";
import { updateTaskSchema } from "./schema";
import { TaskState } from "./types";
import { requireWorkspaceMember } from "@/lib/guards/requireWorkspaceMember";
import { forbidden } from "next/navigation";

export async function updateTaskStatus(taskId: string, newStatus: Status) {
  const task = await prisma.task.findUnique({ where: { id: taskId } });
  if (!task) throw new Error("TASK_NOT_FOUND");

  const membership = await requireWorkspaceMember(task.workspaceId);

  const canUpdateStatus =
    membership.role === "OWNER" ||
    membership.role === "ADMIN" ||
    membership.userId === task.assignedToId;

  if (!canUpdateStatus) forbidden();

  await prisma.task.update({
    where: { id: taskId },
    data: { status: newStatus },
  });

  revalidatePath(`/workspaces/${task.workspaceId}`);
  revalidatePath(`/tasks/${taskId}`);
}

export async function updateTask(
  taskId: string,
  data: z.infer<typeof updateTaskSchema>,
): Promise<TaskState> {
  const task = await prisma.task.findUnique({ where: { id: taskId } });
  if (!task) throw new Error("TASK_NOT_FOUND");

  const membership = await requireWorkspaceMember(task.workspaceId);

  const canEditTask =
    membership.role === "OWNER" ||
    membership.role === "ADMIN" ||
    membership.userId === task.createdById;

  if (!canEditTask) forbidden();

  const parsed = updateTaskSchema.safeParse(data);
  if (!parsed.success) {
    return { errors: z.flattenError(parsed.error).fieldErrors };
  }

  await prisma.task.update({
    where: {
      id: task.id,
    },
    data: {
      title: parsed.data.title,
      description: parsed.data.description,
      dueDate: parsed.data.dueDate,
    },
  });

  return {
    success: {
      redirectPath: `/tasks/${taskId}`,
    },
  };
}

export async function deleteTask(taskId: string) {
  const task = await prisma.task.findUnique({
    where: { id: taskId },
    select: { workspaceId: true, assignedToId: true, createdById: true },
  });
  if (!task) throw new Error("TASK_NOT_FOUND");

  const membership = await requireWorkspaceMember(task.workspaceId);

  const canDeleteTask =
    membership.role === "OWNER" ||
    membership.role === "ADMIN" ||
    membership.userId === task.createdById;

  if (!canDeleteTask) forbidden();

  await prisma.task.delete({
    where: { id: taskId },
  });

  return {
    success: {
      redirectPath: `/workspaces/${task.workspaceId}`,
    },
  };
}
