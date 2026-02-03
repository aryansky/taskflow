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

  return (
    <section className="mx-w-xl my-6">
      {workspaceInvites.length === 0 ? (
        <p className="text-sm text-muted-foreground">No invites</p>
      ) : (
        workspaceInvites.map((invite) => {
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
