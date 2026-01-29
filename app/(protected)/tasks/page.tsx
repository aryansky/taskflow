import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import TaskCard from "./_components/TaskCard";
import Link from "next/link";

export default async function AllTaskView() {
  const session = await auth();
  const userId = session!.user.id;

  const tasks =
    session!.user.role === "ADMIN"
      ? await prisma.task.findMany({
          include: {
            assignedTo: { select: { email: true } },
            createdBy: { select: { email: true } },
          },
          orderBy: { createdAt: "desc" },
        })
      : await prisma.task.findMany({
          where: {
            OR: [{ createdById: userId }, { assignedToId: userId }],
          },
          include: {
            assignedTo: { select: { email: true } },
            createdBy: { select: { email: true } },
          },
          orderBy: { createdAt: "desc" },
        });

  if (tasks.length === 0) {
    return (
      <div className="prose dark:prose-invert flex justify-center mt-8">
        <h2>No tasks</h2>
      </div>
    );
  }

  return (
    <div className="max-w-3xl lg:max-w-5xl mx-auto p-6">
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {tasks.map((task) => {
          return (
            <Link href={`/tasks/${task.id}`} key={task.id}>
              <TaskCard
                {...task}
                taskId={task.id}
                assignedToEmail={task.assignedTo.email}
                createdByEmail={task.createdBy.email}
              />
            </Link>
          );
        })}
      </section>
    </div>
  );
}
