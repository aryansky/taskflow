interface RequireTaskAccessProps {
  membershipRole: WorkspaceRole;
  userId: string;
  assignedToId: string;
  createdById: string;
}

import { forbidden } from "next/navigation";
import { WorkspaceRole } from "../generated/prisma/enums";

export function requireTaskAccess({
  membershipRole,
  userId,
  assignedToId,
  createdById,
}: RequireTaskAccessProps) {
  const isPrivileged = membershipRole === "ADMIN" || membershipRole === "OWNER";

  const isTaskStakeholder = userId === assignedToId || userId === createdById;

  if (!isPrivileged && !isTaskStakeholder) {
    forbidden();
  }
}
