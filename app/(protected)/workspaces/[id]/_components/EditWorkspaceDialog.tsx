"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import EditWorkspaceForm from "./EditWorkspaceForm";
import { useState } from "react";
import { Edit } from "lucide-react";

export default function EditWorkspaceDialog({
  workspaceId,
  workspaceName,
  workspaceImageUrl,
  workspaceDescription,
}: {
  workspaceId: string;
  workspaceName: string;
  workspaceImageUrl: string | null;
  workspaceDescription: string | null;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size={"default"}>
          <Edit /> Edit
        </Button>
      </DialogTrigger>
      <EditWorkspaceForm
        workspaceName={workspaceName}
        workspaceId={workspaceId}
        workspaceDescription={workspaceDescription}
        workspaceImageUrl={workspaceImageUrl}
        onSuccess={() => setOpen(false)}
      />
    </Dialog>
  );
}
