"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

export function DeleteCommentButton() {
  const { pending } = useFormStatus();

  return (
    <Button size="sm" variant="destructive" disabled={pending}>
      Delete
    </Button>
  );
}
