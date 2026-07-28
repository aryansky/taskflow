import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function StatCardSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <Skeleton className="h-10 w-6" />
        <CardTitle className="text-xl font-semibold text-muted-foreground">
          <Skeleton className="h-6 w-48" />
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
