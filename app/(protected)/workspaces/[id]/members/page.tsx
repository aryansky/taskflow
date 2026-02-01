import PageTitle from "@/components/ui/page-title";
import { requireWorkspaceMember } from "@/lib/guards/requireWorkspaceMember";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import MemberCard from "../../_components/MemberCard";

export default async function Members({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const workspace = await prisma.workspace.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
    },
  });

  if (!workspace) notFound();

  await requireWorkspaceMember(workspace.id);

  const allMembers = await prisma.workspaceMember.findMany({
    where: { workspaceId: workspace.id },
    include: { user: true },
  });

  const owner = allMembers.find((m) => m.role === "OWNER");
  const admins = allMembers.filter((m) => m.role === "ADMIN");
  const members = allMembers.filter((m) => m.role === "MEMBER");

  return (
    <div className="max-w-3xl lg:max-w-5xl mx-auto p-6">
      <PageTitle>{workspace.name} members</PageTitle>
      <hr />
      <section className="my-6 max-w-xl">
        <div className="prose dark:prose-invert my-4">
          <h2>Owner</h2>
        </div>
        {owner ? (
          <MemberCard member={owner} />
        ) : (
          <p className="text-sm text-muted-foreground">
            No owner found for this workspace
          </p>
        )}
        <hr className="my-4" />
        <div className="prose dark:prose-invert my-4">
          <h2>Admins</h2>
        </div>
        {admins.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No admin found for this workspace
          </p>
        ) : (
          admins.map((admin) => {
            return <MemberCard key={admin.id} member={admin} />;
          })
        )}
        <hr className="my-4" />
        <div className="prose dark:prose-invert my-4">
          <h2>Members</h2>
        </div>
        {members.map((member) => {
          return <MemberCard key={member.id} member={member} />;
        })}
      </section>
    </div>
  );
}
