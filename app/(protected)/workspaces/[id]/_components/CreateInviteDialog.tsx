"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import CreateInviteForm from "./CreateInviteForm";

export default function CreateInviteDialog({
  workspaceId,
}: {
  workspaceId: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Invite people</Button>
      </DialogTrigger>
      <CreateInviteForm
        onSuccess={() => setOpen(false)}
        workspaceId={workspaceId}
      />
    </Dialog>
  );
}
