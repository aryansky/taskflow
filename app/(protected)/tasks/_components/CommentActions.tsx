import { Button } from "@/components/ui/button";
import { deleteComment } from "../[taskId]/comments/actions";

export default function CommentActions({ commentId }: { commentId: string }) {
  return (
    <form action={deleteComment.bind(null, commentId)}>
      <Button size="sm" variant={"destructive"}>
        Delete
      </Button>
    </form>
  );
}
