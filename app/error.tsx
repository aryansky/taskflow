"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">500 – Error</h1>
      <p className="mt-2 text-gray-500">Something went wrong.</p>
      <Link href={"/"}>
        <Button className="m-2">Home</Button>
      </Link>
    </div>
  );
}
