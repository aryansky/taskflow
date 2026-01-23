import { Button } from "@/components/ui/button";
import { Status } from "@/lib/generated/prisma/enums";
import { cva } from "class-variance-authority";

export const statusVariants = cva(
  "pointer-events-none transition-colors text-white",
  {
    variants: {
      status: {
        TBD: "bg-gray-700",
        IN_PROGRESS: "bg-blue-500",
        DONE: "bg-green-500",
      },
    },
    defaultVariants: {
      status: "TBD",
    },
  }
);

const statusTextMap: Record<Status, string> = {
  TBD: "OPEN",
  IN_PROGRESS: "ONGOING",
  DONE: "COMPLETED",
};

export default function TaskStatus({ status }: { status: Status }) {
  return (
    <Button variant={"default"} className={statusVariants({ status })}>
      {statusTextMap[status]}
    </Button>
  );
}
