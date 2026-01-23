import { Button } from "@/components/ui/button";
import { updateTaskStatus } from "../actions";
import { Status } from "@/lib/generated/prisma/enums";
import { ReactNode } from "react";

export default function TaskActions({
  taskId,
  status,
}: {
  taskId: string;
  status: Status;
}) {
  const statusUpdateButtonMap: Record<Status, ReactNode | null> = {
    TBD: (
      <form action={updateTaskStatus.bind(null, taskId, "IN_PROGRESS")}>
        <Button className="bg-blue-500 hover:bg-blue-600" type="submit">
          Start
        </Button>
      </form>
    ),
    IN_PROGRESS: (
      <form action={updateTaskStatus.bind(null, taskId, "DONE")}>
        <Button className="bg-green-500 hover:bg-green-600" type="submit">
          Complete
        </Button>
      </form>
    ),
    DONE: null,
  };

  return <>{statusUpdateButtonMap[status]}</>;
}
