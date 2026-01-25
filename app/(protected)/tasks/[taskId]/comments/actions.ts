"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import z from "zod";
import { commentSchema } from "../../schema";

interface CreateCommentResult {
  errors?: {
    text?: string[];
  };
  success?: true;
}

export async function createComment(
  taskId: string,
  data: z.infer<typeof commentSchema>
): Promise<CreateCommentResult> {
  const session = await auth();
  const userId = session!.user.id;

  const parsed = commentSchema.safeParse(data);

  if (!parsed.success) {
    return {
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
  });
  if (!task) throw new Error("TASK_NOT_FOUND");

  const canComment =
    session!.user.role === "ADMIN" ||
    userId === task.assignedToId ||
    userId === task.createdById;

  if (!canComment) throw new Error("FORBIDDEN");
  await prisma.comment.create({
    data: {
      text: parsed.data.text,
      task: {
        connect: {
          id: task.id,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  revalidatePath(`/tasks/${taskId}`);
  return {
    success: true,
  };
}
