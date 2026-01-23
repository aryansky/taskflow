interface TaskCardProps {
  taskId: string;
  title: string;
  description: string;
  assignedToEmail: string;
  createdByEmail: string;
  createdAt: Date;
  dueDate: Date | null;
  status: Status;
  showActions?: boolean;
  className?: string;
}

import { Button } from "@/components/ui/button";
import TaskDescription from "./TaskDescription";
import TaskHeader from "./TaskHeader";
import TaskMeta from "./TaskMeta";
import TaskStatus from "./TaskStatus";
import { Status } from "@/lib/generated/prisma/enums";
import clsx from "clsx";
import TaskActions from "./TaskActions";

export default function TaskCard({
  taskId,
  title,
  description,
  assignedToEmail,
  createdAt,
  createdByEmail,
  dueDate,
  status,
  showActions = false,
  className,
}: TaskCardProps) {
  return (
    <div
      className={clsx(
        "flex flex-col items-center bg-gray-100 p-4 rounded",
        className
      )}
    >
      <div className="flex gap-5 m-4 w-fit">
        <TaskHeader taskTitle={title} />
        <TaskStatus status={status} />
      </div>
      <div className="m-4 mt-0 flex flex-col items-center w-fit">
        <TaskDescription
          className="text-wrap w-md p-4 rounded"
          taskDescription={description}
        />
        <TaskMeta
          assignedToEmail={assignedToEmail}
          createdByEmail={createdByEmail}
          createdAt={createdAt}
        />
        <div className="flex gap-2">
          <Button
            variant={"outline"}
            className="pointer-events-none transition-colors"
          >
            Due Date: {dueDate ? dueDate.toLocaleDateString() : "N/A"}
          </Button>
          {showActions && <TaskActions status={status} taskId={taskId} />}
        </div>
      </div>
    </div>
  );
}
