import PageContainer from "@/components/ui/layout/page-container";
import { auth } from "@/lib/auth";
import {
  getMobileWorkspaceNavItems,
  getWorkspaceNavItems,
} from "@/lib/navigation";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

export default async function TasksLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ taskId: string }>;
}) {
  const session = await auth();
  if (!session) redirect("/api/auth/signin");
  const { taskId } = await params;
  const task = await prisma.task.findUnique({
    where: { id: taskId },
    select: {
      workspace: { select: { name: true, id: true } },
    },
  });
  if (!task) notFound();

  return (
    <PageContainer
      user={session.user}
      backPath={`/workspaces/${task.workspace.id}`}
      sidebarItems={getWorkspaceNavItems(task.workspace.id)}
      mobileNavItems={getMobileWorkspaceNavItems(task.workspace.id)}
    >
      {children}
    </PageContainer>
  );
}
