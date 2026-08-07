interface TaskCardProps {
  taskId: string;
  title: string;
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
import { Calendar } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function TaskCard({
  taskId,
  title,
  assignedToEmail,
  dueDate,
  status,
  showActions = false,
}: TaskCardProps) {
  const isOverdue = dueDate && dueDate < new Date();
  return (
    // <div className="w-full flex p-6 border last-of-type:rounded-b-2xl bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-900 transition">
    //   <div className="w-full">
    //     <div className="flex justify-between items-center w-full">
    //       <h3 className="leading-none font-semibold text-md">{title}</h3>
    //     </div>
    //     <p className="text-xs text-neutral-400 mt-1 max-w-4xl line-clamp-2">
    //       Assigned to {assignedToEmail}
    //     </p>
    //     <TaskStatus status={status} isOverdue={isOverdue ?? undefined} />
    //   </div>
    //   <div>
    //     <span className="flex gap-1 items-center">
    //       <Calendar size={20} /> Due:{" "}
    //       {dueDate ? dueDate.toLocaleDateString() : "—"}
    //     </span>
    //     {showActions && <TaskActions status={status} taskId={taskId} />}
    //   </div>
    // </div>
    <Card className="w-full rounded-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Assigned to {assignedToEmail}</CardDescription>
        <CardAction>
          <TaskStatus status={status} isOverdue={isOverdue ?? undefined} />
        </CardAction>
      </CardHeader>
      {/* <CardContent>
        <p>Hello</p>
      </CardContent> */}
      <CardFooter className="flex-col gap-2 border-t">
        {/* <Button className="w-full">View</Button> */}
        <Link
          href={`/tasks/${taskId}`}
          className={cn(buttonVariants({ variant: "default" }), "w-full")}
        >
          View
        </Link>
      </CardFooter>
    </Card>
  );
}
