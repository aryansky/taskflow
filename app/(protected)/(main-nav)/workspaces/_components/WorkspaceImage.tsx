"use client";

import { useEffect, useState } from "react";

export default function WorkspaceImage({
  imageUrl,
  size,
}: {
  imageUrl: string | null;
  size: number;
}) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  // Effects only run on the client-side after the component has mounted
  useEffect(() => {
    setImageSrc(imageUrl);
  }, [imageUrl]);

  return (
    <img
      src={imageSrc || "/default-workspace.png"}
      alt="Workspace preview"
      className="rounded-full"
      style={{ width: `${size}px`, height: `${size}px` }}
      onError={() => setImageSrc("/default-workspace.png")}
    />
  );
}
