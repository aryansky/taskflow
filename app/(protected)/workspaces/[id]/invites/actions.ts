"use server";

import { requireWorkspaceMember } from "@/lib/guards/requireWorkspaceMember";
import prisma from "@/lib/prisma";
import { inviteSchema } from "../../schema";
import z from "zod";
import { InviteReturnState } from "../../types";

export async function createInvite(
  data: z.infer<typeof inviteSchema>,
  workspaceId: string,
): Promise<InviteReturnState> {
  const membership = await requireWorkspaceMember(workspaceId);
  if (membership.role !== "OWNER" && membership.role !== "ADMIN")
    throw new Error("Invariant violation: invite creation not allowed");

  const parsed = inviteSchema.safeParse(data);
  if (!parsed.success) {
    return {
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  });
  if (!user) {
    return { errors: { email: ["User does not exist"] } };
  }

  const isAlreadyMember = await prisma.workspaceMember.findUnique({
    where: {
      userId_workspaceId: {
        userId: user.id,
        workspaceId,
      },
    },
  });
  if (isAlreadyMember) {
    return { errors: { email: ["User is already a member of the workspace"] } };
  }

  const activeInvite = await prisma.workspaceInvite.findFirst({
    where: {
      workspaceId,
      sentToId: user.id,
      status: "PENDING",
      expiresAt: { gt: new Date() },
    },
  });

  if (activeInvite) {
    return { errors: { email: ["Invite already sent"] } };
  }

  const expiresAt = new Date();
  expiresAt.setHours(0, 0, 0, 0);
  expiresAt.setDate(expiresAt.getDate() + 7);

  await prisma.workspaceInvite.create({
    data: {
      workspace: {
        connect: { id: workspaceId },
      },
      invitedBy: {
        connect: { id: membership.userId },
      },
      sentTo: {
        connect: { id: user.id },
      },
      expiresAt,
    },
  });

  return {
    success: true,
  };
}
