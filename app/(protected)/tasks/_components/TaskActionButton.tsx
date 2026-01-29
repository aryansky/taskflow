"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

export function TaskActionButton({
  className,
  label,
}: {
  className: string;
  label: string;
}) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} className={className} type="submit">
      {label}
    </Button>
  );
}
