import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import StatCard from "./_components/StatCard";
import MainContainer from "@/components/ui/layout/main-container";
export default async function Dashboard() {
  const session = await auth();
  const assignedUserTasks = await prisma.task.findMany({
    where: { assignedToId: session!.user.id },
  });
  const completedTaskCount = assignedUserTasks.filter(
    (t) => t.status === "DONE",
  ).length;

  const overdueTaskCount = assignedUserTasks.filter(
    (t) => t.status !== "DONE" && t.dueDate && t.dueDate < new Date(),
  ).length;

  return (
    <MainContainer
      breadcrumbs={[{ title: "Dashboard", href: "/dashboard" }]}
      heading="Dashboard"
      user={session!.user}
      description="Overview of your assigned tasks"
    >
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard label="Tasks Assigned" value={assignedUserTasks.length} />
        <StatCard label="Tasks Completed" value={completedTaskCount} />
        <StatCard label="Tasks Overdue" value={overdueTaskCount} />
      </section>
    </MainContainer>
  );
}
