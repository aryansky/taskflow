import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import StatCard from "./_components/StatCard";
export default async function Dashboard() {
  const session = await auth();
  const assignedUserTasks = await prisma.task.findMany({
    where: { assignedToId: session!.user.id },
  });
  const completedTaskCount = assignedUserTasks.filter(
    (t) => t.status === "DONE"
  ).length;

  const overdueTaskCount = assignedUserTasks.filter(
    (t) => t.status !== "DONE" && t.dueDate && t.dueDate < new Date()
  ).length;

  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="my-8">
        <h1 className="text-4xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your assigned tasks</p>
      </header>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard label="Tasks Assigned" value={assignedUserTasks.length} />
        <StatCard label="Tasks Completed" value={completedTaskCount} />
        <StatCard label="Tasks Overdue" value={overdueTaskCount} />
      </section>
    </div>
  );
}
