import prisma from "@/lib/prisma";
import InviteCard from "./InviteCard";

export default async function Invites({
  workspaceId,
}: {
  workspaceId: string;
}) {
  const workspaceInvites = await prisma.workspaceInvite.findMany({
    where: {
      workspaceId: workspaceId,
    },
    include: {
      sentTo: {
        select: {
          email: true,
          imageUrl: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const activeInvites = workspaceInvites.filter(
    (i) => i.status === "PENDING" && i.expiresAt > new Date(),
  );
  const inviteHistory = workspaceInvites.filter(
    (i) => i.status !== "PENDING" || i.expiresAt < new Date(),
  );

  return (
    <section className="max-w-xl my-6">
      <div className="prose dark:prose-invert my-4">
        <h2>Active Invites</h2>
      </div>
      {activeInvites.length === 0 ? (
        <p className="text-sm text-muted-foreground">No active invites</p>
      ) : (
        activeInvites.map((invite) => {
          return (
            <InviteCard
              imageUrl={invite.sentTo.imageUrl}
              key={invite.id}
              email={invite.sentTo.email}
              createdAt={invite.createdAt}
              status={invite.status}
              expiresAt={invite.expiresAt}
              respondedAt={invite.respondedAt ?? undefined}
            />
          );
        })
      )}
      <hr className="my-4" />
      <div className="prose dark:prose-invert my-4">
        <h2>Invite History</h2>
      </div>
      {inviteHistory.length === 0 ? (
        <p className="text-sm text-muted-foreground">No other invites</p>
      ) : (
        inviteHistory.map((invite) => {
          return (
            <InviteCard
              imageUrl={invite.sentTo.imageUrl}
              key={invite.id}
              email={invite.sentTo.email}
              createdAt={invite.createdAt}
              status={invite.status}
              expiresAt={invite.expiresAt}
              respondedAt={invite.respondedAt ?? undefined}
            />
          );
        })
      )}
    </section>
  );
}
