import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Card>
      <CardHeader className="flex items-start justify-between gap-2">
        <div>
          <Skeleton className="h-4 w-65 mb-2 dark:opacity-50" />
          <Skeleton className="h-3 w-50 dark:opacity-50" />
        </div>
        <Skeleton className="h-4 w-12 dark:opacity-50" />
      </CardHeader>

      <CardFooter className="flex justify-between text-sm">
        <Skeleton className="h-6 w-30 mb-2 dark:opacity-50" />
      </CardFooter>
    </Card>
  );
}
