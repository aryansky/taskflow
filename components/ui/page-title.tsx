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
        className,
        "text-4xl tracking-tight font-semibold text-wrap mb-6",
      )}
    >
      {children}
    </h1>
  );
}
