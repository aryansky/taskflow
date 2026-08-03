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
    <>
      <div className="w-full flex p-6 rounded my-1 bg-neutral-200 dark:bg-slate-800 hover:scale-102 transition">
        <div className=" w-[75] h-[50]">
          <WorkspaceImage imageUrl={imageUrl} />
        </div>
        <div className="w-full">
          <div className="flex justify-between items-center w-full mb-2">
            <h3 className="leading-none font-semibold ">{name}</h3>
            <Badge className="bg-green-600 dark:bg-green-400">
              {memberCount} {memberCount === 1 ? <UserRound /> : <UsersRound />}
            </Badge>
          </div>

          {description && (
            <p className="text-xs text-neutral-400 max-w-sm">{description}</p>
          )}
        </div>
      </div>
    </>
  );
}
