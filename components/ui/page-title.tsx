import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function PageTitle({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <h1
      className={cn(
        "text-3xl tracking-tight font-semibold text-wrap ",
        className,
      )}
    >
      {children}
    </h1>
  );
}
