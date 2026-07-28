"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import RemoveMemberForm from "./RemoveMemberForm";

export default function RemoveMemberDialog({
  workspaceId,
}: {
  workspaceId: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size={"lg"}>
          Remove members
        </Button>
      </DialogTrigger>
      <RemoveMemberForm
        onSuccess={() => setOpen(false)}
        workspaceId={workspaceId}
      />
    </Dialog>
  );
}
