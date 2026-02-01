interface MemberCardProps {
  member: {
    id: string;
    user: {
      name: string | null;
      email: string;
      imageUrl: string | null;
    };
  };
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { UserRound } from "lucide-react";

export default function MemberCard({ member }: MemberCardProps) {
  return (
    <div
      key={member.id}
      className="bg-neutral-200 dark:bg-neutral-900 max-w-xl rounded-md flex items-center gap-4 p-2 m-1"
    >
      <Avatar>
        <AvatarImage
          key={member.user.imageUrl ?? undefined}
          src={member.user.imageUrl ?? undefined}
          alt={member.user.name ?? "User avatar"}
        />
        <AvatarFallback>
          <UserRound />
        </AvatarFallback>
      </Avatar>
      <p>
        {member.user.name} - {member.user.email}
      </p>
    </div>
  );
}
