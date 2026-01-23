"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Status } from "@/lib/generated/prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";
import { updateTaskSchema } from "./schema";
import { TaskState } from "./types";

export async function updateTaskStatus(taskId: string, newStatus: Status) {
  const session = await auth();
  const userId = session!.user.id;

  const task = await prisma.task.findUnique({
    where: { id: taskId },
  });

  if (!task) {
    throw new Error("TASK_NOT_FOUND");
  }

  if (
    session!.user.role !== "ADMIN" &&
    task.assignedToId !== userId &&
    task.createdById !== userId
  ) {
    throw new Error("FORBIDDEN");
  }

  await prisma.task.update({
    where: { id: taskId },
    data: { status: newStatus },
  });

  revalidatePath("/tasks");
  revalidatePath(`/tasks/${taskId}`);
}

export async function updateTask(
  taskId: string,
  data: z.infer<typeof updateTaskSchema>
): Promise<TaskState> {
  const session = await auth();
  const userId = session!.user.id;
  const task = await prisma.task.findUnique({ where: { id: taskId } });
  if (!task) throw new Error("TASK_NOT_FOUND");

  if (
    session!.user.role !== "ADMIN" &&
    userId !== task.assignedToId &&
    userId !== task.createdById
  ) {
    throw new Error("FORBIDDEN");
  }

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
  const session = await auth();
  const userId = session!.user.id;
  const task = await prisma.task.findUnique({ where: { id: taskId } });
  if (!task) throw new Error("TASK_NOT_FOUND");

  if (
    session!.user.role !== "ADMIN" &&
    userId !== task.assignedToId &&
    userId !== task.createdById
  ) {
    throw new Error("FORBIDDEN");
  }

  await prisma.task.delete({
    where: { id: taskId },
  });

  redirect("/tasks");
}
