import { forbidden, redirect } from "next/navigation";
import { auth } from "../auth";
import prisma from "../prisma";

export async function requireWorkspaceMember(workspaceId: string) {
  const session = await auth();
  if (!session) redirect("/api/auth/signin");

  const member = await prisma.workspaceMember.findUnique({
    where: {
      userId_workspaceId: {
        userId: session.user.id,
        workspaceId,
      },
    },
  });

  if (!member) forbidden();

  return member;
}
