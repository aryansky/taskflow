import CommentActions from "./CommentActions";

export default function Comment({
  text,
  userEmail,
  commentId,
}: {
  text: string;
  userEmail: string;
  commentId: string;
}) {
  return (
    <div className="border rounded p-4 m-2 flex justify-between">
      <div>
        <p>{text}</p>
        <small>By {userEmail}</small>
      </div>
      <div>
        <CommentActions commentId={commentId} />
      </div>
    </div>
  );
}
