import prisma from "@/lib/prisma";
import Comment from "./Comment";

export default async function CommentList({ taskId }: { taskId: string }) {
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
    <div>
      {comments.map((comment) => {
        return (
          <Comment
            key={comment.id}
            text={comment.text}
            userEmail={comment.user.email}
            commentId={comment.id}
          />
        );
      })}
    </div>
  );
}
