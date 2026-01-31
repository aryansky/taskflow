interface WorkspaceCardProps {
  name: string;
  workspaceId: string;
  role: WorkspaceRole;
}

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WorkspaceRole } from "@/lib/generated/prisma/enums";
import Link from "next/link";

export default function WorkspaceCard({
  name,
  workspaceId,
  role,
}: WorkspaceCardProps) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardAction>
          <Button asChild variant="secondary">
            <Link href={`/workspaces/${workspaceId}`}>View</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Badge>{role}</Badge>
      </CardContent>
    </Card>
  );
}
