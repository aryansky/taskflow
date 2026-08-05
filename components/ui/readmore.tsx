"use client";

import { useState } from "react";

interface ReadMoreProps {
  text: string;
  amountOfWords?: number;
}

export const ReadMore = ({ text, amountOfWords = 36 }: ReadMoreProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const splittedText = text.split(" ");
  const itCanOverflow = splittedText.length > amountOfWords;
  const beginText = itCanOverflow
    ? splittedText.slice(0, amountOfWords - 1).join(" ")
    : text;
  const endText = splittedText.slice(amountOfWords - 1).join(" ");

  return (
    <p className="text-xs text-muted-foreground max-w-3xl">
      {beginText}
      {itCanOverflow && (
        <>
          {!isExpanded && <span>... </span>}
          <span
            className={`${!isExpanded && "hidden"}`}
            aria-hidden={!isExpanded}
          >
            {endText}
          </span>
          <span
            className="text-blue-400 ml-2 underline"
            role="button"
            tabIndex={0}
            aria-expanded={isExpanded}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "show less" : "read more"}
          </span>
        </>
      )}
    </p>
  );
};
