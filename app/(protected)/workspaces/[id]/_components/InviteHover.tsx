import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Info } from "lucide-react";

export default function InviteHover({
  createdAt,
  expiresAt,
  respondedAt,
}: {
  createdAt: Date;
  expiresAt: Date;
  respondedAt?: Date;
}) {
  const now = new Date();
  const remainingMs = expiresAt.getTime() - now.getTime();
  const remainingDays = Math.ceil(remainingMs / (1000 * 60 * 60 * 24));

  return (
    <HoverCard openDelay={10} closeDelay={100}>
      <HoverCardTrigger asChild>
        <Button variant={"secondary"} className="hover:cursor-help">
          <Info size={48} />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="flex w-fit flex-col gap-0.5 prose dark:prose-invert">
        <small>Created at {createdAt.toLocaleDateString()}</small>
        {respondedAt ? (
          <>
            <small className="font-semibold">
              Responded at {respondedAt.toLocaleDateString()}
            </small>
          </>
        ) : (
          <>
            <small>Expires at {expiresAt.toLocaleDateString()}</small>
            <small className="font-semibold">
              {remainingDays > 1 && `${remainingDays} days left`}
              {remainingDays === 1 && "Expiring today"}
              {remainingDays <= 0 && "Expired"}
            </small>
          </>
        )}
      </HoverCardContent>
    </HoverCard>
  );
}
