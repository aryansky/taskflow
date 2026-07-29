import { requireWorkspaceMember } from "@/lib/workspace/guards";
import { notFound } from "next/navigation";
import { getMembers, getWorkspace } from "@/lib/workspace/queries";
import MemberCard from "../_components/MemberCard";
import LeaveWorkspaceDialog from "../_components/LeaveWorkspaceDialog";
import RemoveMemberDialog from "../_components/RemoveMemberDialog";
import MainContainer from "@/components/ui/layout/main-container";
import { auth } from "@/lib/auth";

export default async function Members({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const { id } = await params;
  const workspace = await getWorkspace(id);
  if (!workspace) notFound();

  const membership = await requireWorkspaceMember(workspace.id);

  const members = await getMembers(workspace.id);

  return (
    <MainContainer
      breadcrumbs={[
        { title: "workspaces", href: "/workspaces" },
        { title: `${workspace.name}`, href: `/workspaces/${workspace.id}` },
        { title: "Members", href: `/workspaces/${workspace.id}/members` },
      ]}
      backPath={`/workspaces/${workspace.id}`}
      user={session!.user}
      heading="Members"
    >
      <section className="my-6 max-w-xl">
        <div className="prose dark:prose-invert my-4">
          <h2>Owner</h2>
        </div>
        {members.owner ? (
          <MemberCard member={members.owner} />
        ) : (
          <p className="text-sm text-muted-foreground">
            No owner found for this workspace
          </p>
        )}
        <hr className="my-4" />
        <div className="prose dark:prose-invert my-4">
          <h2>Admins</h2>
        </div>
        {members.admins.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No admin found for this workspace
          </p>
        ) : (
          members.admins.map((admin) => {
            return <MemberCard key={admin.id} member={admin} />;
          })
        )}
        <hr className="my-4" />
        <div className="prose dark:prose-invert my-4">
          <h2>Members</h2>
        </div>
        {members.members.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No members found for this workspace
          </p>
        ) : (
          members.members.map((member) => {
            return <MemberCard key={member.id} member={member} />;
          })
        )}
      </section>
      <footer>
        {membership.role !== "OWNER" && (
          <LeaveWorkspaceDialog workspaceId={workspace.id} />
        )}
        {(membership.role === "OWNER" || membership.role === "ADMIN") && (
          <RemoveMemberDialog workspaceId={membership.workspaceId} />
        )}
      </footer>
    </MainContainer>
  );
}
