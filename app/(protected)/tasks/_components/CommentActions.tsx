"use client";
import { deleteComment } from "../[taskId]/comments/actions";
import { DeleteCommentButton } from "./DeleteCommentButton";

export default function CommentActions({ commentId }: { commentId: string }) {
  return (
    <form action={deleteComment.bind(null, commentId)}>
      <DeleteCommentButton />
    </form>
  );
}
