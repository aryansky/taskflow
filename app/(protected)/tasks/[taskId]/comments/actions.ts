"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import z from "zod";
import { commentSchema } from "../../schema";
import { requireWorkspaceMember } from "@/lib/workspace/guards";

interface CreateCommentResult {
  errors?: {
    text?: string[];
  };
  success?: true;
}

export async function createComment(
  taskId: string,
  data: z.infer<typeof commentSchema>,
): Promise<CreateCommentResult> {
  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
  });
  if (!task) throw new Error("TASK_NOT_FOUND");
  const membership = await requireWorkspaceMember(task.workspaceId);

  const parsed = commentSchema.safeParse(data);
  if (!parsed.success) {
    return {
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }

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
          id: membership.userId,
        },
      },
    },
  });

  revalidatePath(`/tasks/${taskId}`);
  return {
    success: true,
  };
}

export async function deleteComment(commentId: string) {
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    include: {
      task: { select: { workspaceId: true, id: true } },
    },
  });
  if (!comment) throw new Error("NO_COMMENT_FOUND");

  const membership = await requireWorkspaceMember(comment.task.workspaceId);

  const canDeleteComment =
    comment.userId === membership.userId ||
    membership.role === "ADMIN" ||
    membership.role === "OWNER";

  if (!canDeleteComment) {
    throw new Error("FORBIDDEN");
  }

  await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });

  revalidatePath(`/tasks/${comment.task.id}`);
}
