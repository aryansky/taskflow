import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

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
    return <div>No tasks</div>;
  }

  return (
    <div>
      {tasks.map((task) => {
        return (
          <div key={task.id} className="border p-4 m-4">
            <a href={`/tasks/${task.id}`}>
              <h2 className="text-blue-500 underline">{task.title}</h2>
            </a>
            <p>Description: {task.description}</p>
            <p>Status: {task.status}</p>
            <p>Assigned to {task.assignedTo.email}</p>
            <p>Created by {task.createdBy.email}</p>
            <p>
              Due date:{" "}
              {task.dueDate ? task.dueDate.toLocaleDateString() : "N/A"}
            </p>
          </div>
        );
      })}
    </div>
  );
}
