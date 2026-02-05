import { Check, X } from "lucide-react";
import { inviteResponse } from "../invites/actions";
import { InviteActionButton } from "./InviteActionButton";

export default function InviteActions({ inviteId }: { inviteId: string }) {
  return (
    <>
      <form action={inviteResponse.bind(null, "ACCEPTED", inviteId)}>
        <InviteActionButton>
          <Check />
        </InviteActionButton>
      </form>
      <form action={inviteResponse.bind(null, "REJECTED", inviteId)}>
        <InviteActionButton isDestructive>
          <X />
        </InviteActionButton>
      </form>
    </>
  );
}
