"use server";

import prisma from "@/lib/prisma";
import z from "zod";
import { promoteToAdminSchema } from "./schema";
import { requireWorkspaceMember } from "@/lib/guards/requireWorkspaceMember";

interface PromoteToAdminResult {
  errors?: { userEmail?: string[] };
  success?: { email: string };
}

export async function promoteToAdmin(
  data: {
    userEmail: string;
  },
  workspaceId: string,
): Promise<PromoteToAdminResult> {
  const membership = await requireWorkspaceMember(workspaceId);
  if (membership.role !== "OWNER")
    throw new Error("Invariant violation: action not allowed");

  const parsed = promoteToAdminSchema.safeParse(data);
  if (!parsed.success) {
    return {
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.userEmail },
  });
  if (!user) {
    return {
      errors: {
        userEmail: ["User not found in this workspace"],
      },
    };
  }
  const member = await prisma.workspaceMember.findUnique({
    where: {
      userId_workspaceId: { userId: user.id, workspaceId },
    },
  });
  if (!member) {
    return {
      errors: { userEmail: ["User not found in this workspace"] },
    };
  }

  if (member.role === "ADMIN") {
    return { errors: { userEmail: ["User is already an admin"] } };
  } else if (member.role === "OWNER") {
    return { errors: { userEmail: ["User is the owner of workspace"] } };
  }

  await prisma.workspaceMember.update({
    where: {
      userId_workspaceId: {
        userId: user.id,
        workspaceId: workspaceId,
      },
    },
    data: {
      role: "ADMIN",
    },
  });

  return {
    success: {
      email: user.email,
    },
  };
}
