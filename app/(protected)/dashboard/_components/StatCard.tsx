import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function StatCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <div className="text-3xl font-medium">{value}</div>
        <CardTitle className="text-xl font-semibold text-muted-foreground">
          {label}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
