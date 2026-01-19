"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Status } from "@/lib/generated/prisma/client";
import { revalidatePath } from "next/cache";

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
