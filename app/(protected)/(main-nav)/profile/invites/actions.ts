"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function inviteResponse(
  response: "ACCEPTED" | "REJECTED",
  inviteId: string,
) {
  const session = await auth();
  if (!session) throw new Error("UNAUTHENTICATED");
  const userId = session.user.id;

  await prisma.$transaction(async (tx) => {
    const invite = await tx.workspaceInvite.findUnique({
      where: { id: inviteId },
    });

    if (!invite) throw new Error("INVITE_NOT_FOUND");
    if (invite.sentToId !== userId) throw new Error("UNAUTHORIZED");
    if (invite.status !== "PENDING")
      throw new Error("INVITE_ALREADY_RESPONDED");

    if (response === "ACCEPTED") {
      await tx.workspaceMember.create({
        data: {
          workspaceId: invite.workspaceId,
          userId: invite.sentToId,
        },
      });
    }

    await tx.workspaceInvite.update({
      where: { id: invite.id },
      data: { status: response, respondedAt: new Date() },
    });
  });

  revalidatePath("/profile/invites");
}
