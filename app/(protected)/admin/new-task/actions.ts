"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function createTask(formData: FormData) {
  const session = await auth();
  if (!session) {
    throw new Error("UNAUTHORIZED");
  }

  if (session.user.role !== "ADMIN") {
    throw new Error("FORBIDDEN");
  }

  const title = formData.get("title");
  const description = formData.get("description");
  const assignedToEmail = formData.get("assignedToEmail");

  if (typeof title !== "string") {
    throw new Error("Invalid title");
  }

  if (typeof description !== "string") {
    throw new Error("Invalid description");
  }

  if (typeof assignedToEmail !== "string") {
    throw new Error("Invalid assignee");
  }
  const assignedToUser = await prisma.user.findUnique({
    where: {
      email: assignedToEmail,
    },
  });
  if (!assignedToUser) {
    throw new Error("No user found to assign to");
  }

  await prisma.task.create({
    data: {
      title,
      description,
      assignedTo: {
        connect: {
          id: assignedToUser.id,
        },
      },
      createdBy: {
        connect: {
          id: session.user.id,
        },
      },
    },
  });
}
