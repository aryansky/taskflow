import PageTitle from "@/components/ui/page-title";
import { auth } from "@/lib/auth";
import ReceivedInvites from "../_components/ReceivedInvites";

export default async function ReceivedInvitesPage() {
  const session = await auth();
  const user = session!.user;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <PageTitle>Received Invites</PageTitle>
      <hr />
      <ReceivedInvites sentToId={user.id} />
    </div>
  );
}
