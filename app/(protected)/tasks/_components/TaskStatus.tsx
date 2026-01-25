import { Badge } from "@/components/ui/badge";
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
      overdue: {
        true: "bg-red-700",
        false: "",
      },
    },
    compoundVariants: [
      {
        status: "DONE",
        overdue: true,
        className: "bg-green-500", // DONE overrides overdue
      },
    ],
    defaultVariants: {
      status: "TBD",
      overdue: false,
    },
  }
);

const statusTextMap: Record<Status, string> = {
  TBD: "OPEN",
  IN_PROGRESS: "ONGOING",
  DONE: "COMPLETED",
};

export default function TaskStatus({
  status,
  isOverdue = false,
}: {
  status: Status;
  isOverdue?: boolean;
}) {
  return (
    <Badge
      variant={"default"}
      className={statusVariants({ status, overdue: isOverdue })}
    >
      {isOverdue && status !== "DONE" ? "OVERDUE" : statusTextMap[status]}
    </Badge>
  );
}
