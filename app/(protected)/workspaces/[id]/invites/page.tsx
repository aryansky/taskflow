import { requireWorkspaceMember } from "@/lib/workspace/guards";
import { notFound } from "next/navigation";
import CreateInviteDialog from "../_components/CreateInviteDialog";
import Invites from "../_components/Invites";
import { getWorkspace } from "@/lib/workspace/queries";
import MainContainer from "@/components/ui/layout/main-container";
import { auth } from "@/lib/auth";

export default async function InvitesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const { id } = await params;
  const workspace = await getWorkspace(id);
  if (!workspace) notFound();

  const membership = await requireWorkspaceMember(workspace.id);

  const canInvite = membership.role === "OWNER" || membership.role === "ADMIN";

  return (
    <MainContainer
      backPath={`/workspaces/${workspace.id}`}
      user={session!.user}
      heading="Invites"
      breadcrumbs={[
        { title: "workspaces", href: "/workspaces" },
        { title: `${workspace.name}`, href: `/workspaces/${workspace.id}` },
        { title: "Invites", href: `/workspaces/${workspace.id}/invites` },
      ]}
      actions={canInvite && <CreateInviteDialog workspaceId={workspace.id} />}
    >
      <Invites workspaceId={workspace.id} />
    </MainContainer>
  );
}
