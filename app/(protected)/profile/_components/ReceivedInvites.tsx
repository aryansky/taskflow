import prisma from "@/lib/prisma";
import ReceivedInviteCard from "./ReceivedInviteCard";

export default async function ReceivedInvites({
  sentToId,
}: {
  sentToId: string;
}) {
  const receivedInvites = await prisma.workspaceInvite.findMany({
    where: { sentToId },
    include: {
      invitedBy: {
        select: { email: true },
      },
      workspace: {
        select: { name: true },
      },
    },
    orderBy: [{ status: "asc" }, { expiresAt: "asc" }],
  });

  const activeInvites = receivedInvites.filter(
    (i) => i.status === "PENDING" && i.expiresAt > new Date(),
  );
  const otherInvites = receivedInvites.filter(
    (i) => i.status !== "PENDING" || i.expiresAt < new Date(),
  );

  return (
    <section className="max-w-xl my-6">
      <div className="prose dark:prose-invert my-4">
        <h2>Pending Invites</h2>
      </div>
      {activeInvites.length === 0 ? (
        <p className="text-sm text-muted-foreground">No active invites</p>
      ) : (
        activeInvites.map((invite) => {
          return (
            <ReceivedInviteCard
              key={invite.id}
              invitedByEmail={invite.invitedBy.email}
              workspaceName={invite.workspace.name}
              inviteId={invite.id}
              {...invite}
              isActive
            />
          );
        })
      )}
      <hr className="my-4" />
      <div className="prose dark:prose-invert my-6">
        <h2>Invite History</h2>
      </div>
      {otherInvites.length === 0 ? (
        <p className="text-sm text-muted-foreground">No other invites</p>
      ) : (
        otherInvites.map((invite) => {
          return (
            <ReceivedInviteCard
              key={invite.id}
              invitedByEmail={invite.invitedBy.email}
              workspaceName={invite.workspace.name}
              inviteId={invite.id}
              {...invite}
            />
          );
        })
      )}
    </section>
  );
}
