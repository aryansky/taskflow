import { auth } from "@/lib/auth";
import { requireWorkspaceMember } from "@/lib/workspace/guards";
import { getWorkspaceWithTasks } from "@/lib/workspace/queries";
import { notFound, redirect } from "next/navigation";
import WorkspacesLayoutWrapper from "./_components/WorkspacesLayoutWrapper";
import {
  getMobileWorkspaceNavItems,
  getWorkspaceNavItems,
} from "@/lib/navigation";

export default async function WorkspaceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session) redirect("/api/auth/signin");
  const { id } = await params;

  const workspace = await getWorkspaceWithTasks(id);
  if (!workspace) notFound();

  await requireWorkspaceMember(workspace.id);

  return (
    <WorkspacesLayoutWrapper
      user={session.user}
      workspaceId={workspace.id}
      sidebarItems={getWorkspaceNavItems(workspace.id)}
      mobileNavItems={getMobileWorkspaceNavItems(workspace.id)}
    >
      {children}
    </WorkspacesLayoutWrapper>
  );
}
