interface WorkspaceCardProps {
  name: string;
  workspaceId: string;
  imageUrl: string | null;
  description: string | null;
}

import { Badge } from "@/components/ui/badge";
import WorkspaceImage from "./WorkspaceImage";
import prisma from "@/lib/prisma";
import { UserRound, UsersRound } from "lucide-react";

export default async function WorkspaceCard({
  workspaceId,
  name,
  imageUrl,
  description,
}: WorkspaceCardProps) {
  const memberCount = await prisma.workspaceMember.count({
    where: { workspaceId },
  });

  return (
    <div className="w-full flex p-6 rounded-lg bg-card hover:bg-black/10">
      <div className="w-[75] h-[50] mr-2">
        <WorkspaceImage size={50} imageUrl={imageUrl} />
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <div className="flex justify-between items-center w-full">
          <h3 className="leading-none font-semibold text-md">{name}</h3>
        </div>

        {description && (
          <p className="text-xs text-neutral-400 mt-1 max-w-4xl line-clamp-2">
            {description}
          </p>
        )}
      </div>
      <div>
        <Badge className="">
          {memberCount} {memberCount === 1 ? <UserRound /> : <UsersRound />}
        </Badge>
      </div>
    </div>
  );
}
