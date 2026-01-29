import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CommentSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardDescription>
          <Skeleton className="h-4 w-96 mb-2" />
          <Skeleton className="h-3 w-48" />
        </CardDescription>
        <CardAction>
          <Skeleton className="h-8 w-16" />
        </CardAction>
      </CardHeader>
    </Card>
  );
}
