import PageTitle from "@/components/ui/page-title";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { forbidden, notFound, redirect } from "next/navigation";
import TaskCard from "../../tasks/_components/TaskCard";

export default async function Workspace({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session) redirect("/api/auth/signin");

  const { id } = await params;

  const workspace = await prisma.workspace.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
    },
  });

  if (!workspace) notFound();

  const membership = await prisma.workspaceMember.findUnique({
    where: {
      userId_workspaceId: {
        userId: session.user.id,
        workspaceId: workspace.id,
      },
    },
    include: {
      workspace: {
        include: {
          tasks: {
            include: {
              assignedTo: { select: { email: true } },
              createdBy: { select: { email: true } },
            },
          },
        },
      },
    },
  });

  if (!membership) forbidden();

  if (membership.workspace.tasks.length === 0) {
    return (
      <div className="max-w-3xl lg:max-w-5xl mx-auto p-6">
        <PageTitle>{workspace.name}</PageTitle>
        <hr />
        <h2 className="text-2xl font-semibold my-6">No tasks found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-3xl lg:max-w-5xl mx-auto p-6">
      <PageTitle>{workspace.name}</PageTitle>
      <hr />
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
        {membership.workspace.tasks.map((task) => {
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
