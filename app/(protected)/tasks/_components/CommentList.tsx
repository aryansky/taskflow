import prisma from "@/lib/prisma";
import Comment from "./Comment";
import { auth } from "@/lib/auth";

export default async function CommentList({ taskId }: { taskId: string }) {
  const session = await auth();
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
              comment.userId === session!.user.id ||
              session!.user.role === "ADMIN"
            }
          />
        );
      })}
    </div>
  );
}
