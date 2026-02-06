import prisma from "@/lib/prisma";
import Comment from "./Comment";
import { notFound } from "next/navigation";
import { requireWorkspaceMember } from "@/lib/guards/requireWorkspaceMember";

export default async function CommentList({ taskId }: { taskId: string }) {
  const task = await prisma.task.findUnique({
    where: { id: taskId },
  });
  if (!task) notFound();
  const membership = await requireWorkspaceMember(task.workspaceId);

  const comments = await prisma.comment.findMany({
    where: {
      taskId: taskId,
    },
    include: {
      user: {
        select: {
          email: true,
        },
      },
      task: { select: { workspaceId: true } },
    },
  });

  if (comments.length === 0) {
    return <p className="text-sm text-muted-foreground">No comments yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 my-6">
      {comments.map((comment) => {
        return (
          <Comment
            key={comment.id}
            text={comment.text}
            userEmail={comment.user.email}
            commentId={comment.id}
            showCommentActions={
              comment.userId === membership.userId ||
              membership.role === "ADMIN" ||
              membership.role === "OWNER"
            }
          />
        );
      })}
    </div>
  );
}
