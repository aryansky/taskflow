"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { z } from "zod";
import { TaskState } from "@/app/(protected)/tasks/types";
import { createTaskSchema } from "@/app/(protected)/tasks/schema";

export async function createTask(
  data: z.infer<typeof createTaskSchema>
): Promise<TaskState> {
  const session = await auth();

  if (!session) redirect("/api/auth/signin");
  if (session.user.role !== "ADMIN") redirect("/forbidden");

  const parsed = createTaskSchema.safeParse(data);
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
      return {
        errors: {
          dueDate: ["Due date must be from tomorrow onward"],
        },
      };
    }
  }

  const assignedToUser = await prisma.user.findUnique({
    where: { email: parsed.data.assignedToEmail },
  });
  if (!assignedToUser) {
    return {
      errors: {
        assignedToEmail: ["User Not Found"],
      },
    };
  }

  const task = await prisma.task.create({
    data: {
      title: parsed.data.title,
      description: parsed.data.description,
      assignedTo: {
        connect: {
          id: assignedToUser.id,
        },
      },
      createdBy: {
        connect: {
          id: session.user.id,
        },
      },
      dueDate: parsed.data.dueDate,
    },
  });

  return {
    success: {
      redirectPath: `/tasks/${task.id}`,
    },
  };
}
