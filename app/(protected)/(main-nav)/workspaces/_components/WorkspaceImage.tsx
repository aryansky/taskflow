"use client";

import { useEffect, useState } from "react";

export default function WorkspaceImage({
  imageUrl,
}: {
  imageUrl: string | null;
}) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  // Effects only run on the client-side after the component has mounted
  useEffect(() => {
    setImageSrc(imageUrl);
  }, [imageUrl]);

  return (
    <img
      src={imageSrc || "/default-workspace.png"}
      alt="image"
      className="rounded-full w-[50] h-[50]"
      onError={() => setImageSrc("/default-workspace.png")}
      onLoad={() => console.log("loaded")}
    />
  );
}
