import PageTitle from "@/components/ui/page-title";
import { requireWorkspaceMember } from "@/lib/guards/requireWorkspaceMember";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import CreateInviteDialog from "../../_components/CreateInviteDialog";
import Invites from "../../_components/Invites";

export default async function InvitesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workspace = await prisma.workspace.findUnique({
    where: { id },
  });
  if (!workspace) notFound();
  const membership = await requireWorkspaceMember(workspace.id);

  const canInvite = membership.role === "OWNER" || membership.role === "ADMIN";

  return (
    <div className="max-w-5xl mx-auto p-6">
      <PageTitle>Invites</PageTitle>
      {canInvite && <CreateInviteDialog workspaceId={workspace.id} />}
      <Invites workspaceId={workspace.id} />
    </div>
  );
}
