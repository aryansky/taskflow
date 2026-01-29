import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import CommentActions from "./CommentActions";

export default function Comment({
  text,
  userEmail,
  commentId,
  showCommentActions = false,
}: {
  text: string;
  userEmail: string;
  commentId: string;
  showCommentActions?: boolean;
}) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardDescription>
          <p className="text-foreground">{text}</p>
          <small>By {userEmail}</small>
        </CardDescription>
        <CardAction>
          {showCommentActions && (
            <div>
              <CommentActions commentId={commentId} />
            </div>
          )}
        </CardAction>
      </CardHeader>
    </Card>
  );
}
