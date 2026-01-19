import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { deleteTask, updateTask } from "../../actions";

export default async function EditTask({
  params,
}: {
  params: Promise<{ taskId: string }>;
}) {
  const session = await auth();
  const { taskId } = await params;

  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
    include: {
      assignedTo: {
        select: { id: true, name: true, email: true },
      },
      createdBy: {
        select: { id: true, name: true, email: true },
      },
    },
  });
  if (!task) notFound();

  if (
    session!.user.role !== "ADMIN" &&
    session!.user.id !== task.assignedToId &&
    session!.user.id !== task.createdById
  ) {
    redirect("/forbidden");
  }

  return (
    <div>
      <h1>Edit Task</h1>
      <form action={updateTask.bind(null, task.id)}>
        <input
          name="title"
          placeholder="Title"
          defaultValue={task.title}
          required
        />
        <textarea name="description" defaultValue={task.description} required />
        <input type="email" value={task.assignedTo.email} disabled />
        <Button type="submit">Save</Button>
      </form>
      <form action={deleteTask.bind(null, task.id)}>
        <Button variant="destructive" type="submit">
          Delete
        </Button>
      </form>
    </div>
  );
}
