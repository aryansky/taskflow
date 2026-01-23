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
}

import TaskStatus from "./TaskStatus";
import { Status } from "@/lib/generated/prisma/enums";
import TaskActions from "./TaskActions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
}: TaskCardProps) {
  return (
    <Card className="w-100 h-full hover:shadow-md transition">
      <CardHeader className="flex flex-row items-start justify-between gap-2">
        <div>
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription className="text-sm">
            Assigned to {assignedToEmail}
          </CardDescription>
        </div>

        <TaskStatus status={status} />
      </CardHeader>

      <CardContent className="text-sm text-muted-foreground">
        {description}
      </CardContent>

      <CardFooter className="flex justify-between text-sm">
        <span>Due: {dueDate ? dueDate.toLocaleDateString() : "—"}</span>
        {showActions && <TaskActions status={status} taskId={taskId} />}
      </CardFooter>
    </Card>
  );
}
