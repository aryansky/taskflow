import PageTitle from "@/components/ui/page-title";
import { requireWorkspaceMember } from "@/lib/workspace/guards";
import { notFound } from "next/navigation";
import CreateInviteDialog from "../../_components/CreateInviteDialog";
import Invites from "../../_components/Invites";
import { getWorkspace } from "@/lib/workspace/queries";

export default async function InvitesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workspace = await getWorkspace(id);
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
