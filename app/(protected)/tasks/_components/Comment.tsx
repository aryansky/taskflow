import CommentActions from "./CommentActions";

export default function Comment({
  text,
  userEmail,
}: {
  text: string;
  userEmail: string;
}) {
  return (
    <div className="border rounded p-4 m-2 flex justify-between">
      <div>
        <p>{text}</p>
        <small>By {userEmail}</small>
      </div>
      <div>
        <CommentActions />
      </div>
    </div>
  );
}
