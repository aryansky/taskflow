"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

export function InviteActionButton({
  className,
  children,
  isDestructive,
}: {
  className?: string;
  children: ReactNode;
  isDestructive?: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      variant={isDestructive ? "destructive" : "default"}
      className={className}
      type="submit"
    >
      {children}
    </Button>
  );
}
