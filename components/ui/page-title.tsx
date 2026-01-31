import { ReactNode } from "react";

export default function PageTitle({ children }: { children?: ReactNode }) {
  return (
    <h1 className="text-4xl tracking-tight font-semibold text-wrap mb-6">
      {children}
    </h1>
  );
}
