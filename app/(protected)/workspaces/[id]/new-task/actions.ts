"use server";

import prisma from "@/lib/prisma";
import { forbidden } from "next/navigation";
import { z } from "zod";
import { TaskState } from "@/app/(protected)/tasks/types";
import { createTaskSchema } from "@/app/(protected)/tasks/schema";
import { requireWorkspaceMember } from "@/lib/guards/requireWorkspaceMember";

export async function createTask(
  data: z.infer<typeof createTaskSchema>,
  workspaceId: string,
): Promise<TaskState> {
  const parsed = createTaskSchema.safeParse(data);
  const membership = await requireWorkspaceMember(workspaceId);
  if (membership.role !== "ADMIN" && membership.role !== "OWNER") forbidden();

  if (!parsed.success) {
    return { errors: z.flattenError(parsed.error).fieldErrors };
  }

  if (parsed.data.dueDate) {
    const tomorrow = new Date();
    tomorrow.setHours(0, 0, 0, 0);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const dueDate = new Date(parsed.data.dueDate);
    dueDate.setHours(0, 0, 0, 0);

    if (dueDate < tomorrow) {
      return { errors: { dueDate: ["Due date must be from tomorrow onward"] } };
    }
  }

  const assignedToUser = await prisma.user.findUnique({
    where: {
      email: parsed.data.assignedToEmail,
      memberships: {
        some: {
          workspaceId: workspaceId,
        },
      },
    },
  });
  if (!assignedToUser) {
    return {
      errors: { assignedToEmail: ["User not found in this workspace"] },
    };
  }

  const task = await prisma.task.create({
    data: {
      title: parsed.data.title,
      description: parsed.data.description,
      dueDate: parsed.data.dueDate,
      assignedTo: { connect: { id: assignedToUser.id } },
      createdBy: { connect: { id: membership.userId } },
      workspace: { connect: { id: workspaceId } },
    },
  });

  return {
    success: {
      redirectPath: `/tasks/${task.id}`,
    },
  };
}
