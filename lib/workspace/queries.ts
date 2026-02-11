import prisma from "../prisma";

export function getUserWorkspaceMemberships(userId: string) {
  return prisma.workspaceMember.findMany({
    where: {
      userId,
    },
    include: {
      workspace: true,
    },
  });
}

export function getWorkspaceWithTasks(workspaceId: string) {
  return prisma.workspace.findUnique({
    where: { id: workspaceId },
    include: {
      tasks: {
        include: {
          assignedTo: { select: { email: true } },
          createdBy: { select: { email: true } },
        },
      },
    },
  });
}

export function getWorkspace(workspaceId: string) {
  return prisma.workspace.findUnique({
    where: { id: workspaceId },
  });
}

export async function getMembers(workspaceId: string) {
  const allMembers = await prisma.workspaceMember.findMany({
    where: { workspaceId },
    include: { user: true },
  });

  const owner = allMembers.find((m) => m.role === "OWNER");
  const admins = allMembers.filter((m) => m.role === "ADMIN");
  const members = allMembers.filter((m) => m.role === "MEMBER");

  return {
    owner,
    admins,
    members,
  };
}
