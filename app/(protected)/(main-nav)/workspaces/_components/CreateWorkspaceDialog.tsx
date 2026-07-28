"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import CreateWorkspaceForm from "./CreateWorkspaceForm";
import { useState } from "react";

export default function CreateWorkspaceDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create Workspace</Button>
      </DialogTrigger>
      <CreateWorkspaceForm onSuccess={() => setOpen(false)} />
    </Dialog>
  );
}
