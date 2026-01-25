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
  if (!comments) {
    return <h3>No Comments yet.</h3>;
  }
  return (
    <div>
      {comments.map((comment) => {
        return (
          <Comment
            key={comment.id}
            text={comment.text}
            userEmail={comment.user.email}
          />
        );
      })}
    </div>
  );
}
