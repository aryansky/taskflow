"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import EditWorkspaceForm from "./EditWorkspaceForm";
import { useState } from "react";
import { Edit } from "lucide-react";

export default function EditWorkspaceDialog({
  workspaceId,
  workspaceName,
}: {
  workspaceId: string;
  workspaceName: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size={"icon-lg"}>
          <Edit />
        </Button>
      </DialogTrigger>
      <EditWorkspaceForm
        workspaceName={workspaceName}
        workspaceId={workspaceId}
        onSuccess={() => setOpen(false)}
      />
    </Dialog>
  );
}
