interface InviteCardProps {
  invitedByEmail: string;
  workspaceName: string;
  createdAt: Date;
  status: InviteStatus;
  expiresAt: Date;
  respondedAt?: Date | null;
  inviteId: string;
  isActive?: boolean;
}

import { InviteStatus } from "@/lib/generated/prisma/enums";
import InviteHover from "../../workspaces/_components/InviteHover";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import InviteActions from "./InviteActions";
import { Badge } from "@/components/ui/badge";
import { inviteStatusVariants } from "../../workspaces/_components/InviteCard";

export default function ReceivedInviteCard({
  invitedByEmail,
  inviteId,
  workspaceName,
  createdAt,
  status,
  expiresAt,
  respondedAt,
  isActive = false,
}: InviteCardProps) {
  const expired = expiresAt < new Date();

  return (
    <Card className="w-full max-w-xl my-4">
      <CardHeader>
        <CardTitle>Invited to {workspaceName}</CardTitle>
        <CardDescription>by {invitedByEmail}</CardDescription>
        <CardAction className="flex gap-2 items-center">
          {isActive ? (
            <InviteActions inviteId={inviteId} />
          ) : (
            <Badge className={inviteStatusVariants({ status, expired })}>
              {expired ? "EXPIRED" : status}
            </Badge>
          )}
          <InviteHover
            createdAt={createdAt}
            expiresAt={expiresAt}
            respondedAt={respondedAt ?? undefined}
          />
        </CardAction>
      </CardHeader>
    </Card>
  );
}
