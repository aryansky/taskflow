interface InviteCardProps {
  email: string;
  createdAt: Date;
  status: InviteStatus;
  expiresAt: Date;
  imageUrl: string | null;
  respondedAt?: Date;
}
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { InviteStatus } from "@/lib/generated/prisma/enums";
import { UserRound } from "lucide-react";
import InviteHover from "./InviteHover";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

export const inviteStatusVariants = cva(
  "pointer-events-none transition-colors text-white",
  {
    variants: {
      status: {
        PENDING: "bg-amber-500 dark:bg-amber-600",
        ACCEPTED: "bg-green-600",
        REJECTED: "bg-red-800 dark:bg-red-900",
      },
      expired: {
        true: "bg-slate-600",
        false: "",
      },
    },
    compoundVariants: [
      {
        status: "ACCEPTED",
        expired: true,
        className: "bg-green-600", // Response overrides expired
      },
      {
        status: "REJECTED",
        expired: true,
        className: "bg-red-800 dark:bg-red-900", // Response overrides expired
      },
    ],
    defaultVariants: {
      status: "PENDING",
      expired: false,
    },
  },
);

export default function InviteCard({
  email,
  createdAt,
  expiresAt,
  status,
  imageUrl,
  respondedAt,
}: InviteCardProps) {
  const expired = expiresAt < new Date();

  return (
    <div className="bg-neutral-200 dark:bg-neutral-900 max-w-xl rounded-md flex justify-between items-center gap-4 p-3 m-1">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage
            key={imageUrl ?? undefined}
            src={imageUrl ?? undefined}
            alt={"User avatar"}
          />
          <AvatarFallback>
            <UserRound />
          </AvatarFallback>
        </Avatar>
        <p>{email}</p>
      </div>
      <div className="flex gap-2">
        <Badge className={cn(inviteStatusVariants({ status, expired }))}>
          {expired ? "EXPIRED" : status}
        </Badge>
        <InviteHover
          createdAt={createdAt}
          expiresAt={expiresAt}
          respondedAt={respondedAt}
        />
      </div>
    </div>
  );
}
