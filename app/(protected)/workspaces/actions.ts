"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";
import {
  createWorkspaceSchema,
  removeMemberSchema,
  updateWorkspaceSchema,
} from "./schema";
import { WorkspaceReturnState } from "./types";
import { requireWorkspaceMember } from "@/lib/workspace/guards";
import { revalidatePath } from "next/cache";
import { forbidden, redirect } from "next/navigation";

export async function createWorkspace(
  data: z.infer<typeof createWorkspaceSchema>,
): Promise<WorkspaceReturnState> {
  const session = await auth();
  const user = session!.user;

  const parsed = createWorkspaceSchema.safeParse(data);
  if (!parsed.success) {
    return { errors: z.flattenError(parsed.error).fieldErrors };
  }

  const existingWorkspace = await prisma.workspaceMember.findMany({
    where: {
      userId: user.id,
      role: "OWNER",
      workspace: {
        name: parsed.data.name,
      },
    },
  });

  if (existingWorkspace.length !== 0) {
    return {
      errors: {
        name: ["You already have a workspace with that name"],
      },
    };
  }

  const workspace = await prisma.$transaction(async (tx) => {
    const workspace = await tx.workspace.create({
      data: {
        name: parsed.data.name,
      },
    });

    await tx.workspaceMember.create({
      data: {
        workspaceId: workspace.id,
        userId: user.id,
        role: "OWNER",
      },
    });

    return workspace;
  });

  return {
    success: {
      redirectPath: `/workspaces/${workspace.id}`,
    },
  };
}

export async function leaveWorkspace(workspaceId: string) {
  const membership = await requireWorkspaceMember(workspaceId);

  if (membership.role === "OWNER") {
    forbidden();
  }

  await prisma.workspaceMember.delete({
    where: {
      userId_workspaceId: {
        workspaceId: membership.workspaceId,
        userId: membership.userId,
      },
    },
  });

  revalidatePath("/workspaces");
  revalidatePath(`/workspaces/${workspaceId}`);
  revalidatePath(`/workspaces/${workspaceId}/members`);
  redirect("/workspaces");
}

export async function removeMember(
  workspaceId: string,
  data: {
    email: string;
  },
) {
  const membership = await requireWorkspaceMember(workspaceId);
  if (membership.role !== "OWNER" && membership.role !== "ADMIN") {
    return { errors: { email: ["UNAUTHORIZED"] } };
  }

  const parsed = removeMemberSchema.safeParse(data);
  if (!parsed.success) {
    return {
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  const memberToBeRemoved = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  });
  if (!memberToBeRemoved) {
    return { errors: { email: ["No member found"] } };
  }

  const membershipToBeRemoved = await prisma.workspaceMember.findUnique({
    where: {
      userId_workspaceId: {
        userId: memberToBeRemoved.id,
        workspaceId,
      },
    },
  });

  if (!membershipToBeRemoved) {
    return { errors: { email: ["No member found"] } };
  }
  if (membershipToBeRemoved.role === "OWNER") {
    return { errors: { email: ["Owner cannot be removed"] } };
  }
  if (membershipToBeRemoved.role === "ADMIN" && membership.role === "ADMIN") {
    return { errors: { email: ["You cannot remove an admin"] } };
  }

  await prisma.workspaceMember.delete({
    where: {
      userId_workspaceId: {
        userId: membershipToBeRemoved.userId,
        workspaceId: membership.workspaceId,
      },
    },
  });

  revalidatePath(`/workspaces/${workspaceId}/members`);

  return {
    success: true,
  };
}

export async function updateWorkspace(
  data: z.infer<typeof updateWorkspaceSchema>,
  workspaceId: string,
) {
  const membership = await requireWorkspaceMember(workspaceId);
  if (membership.role !== "OWNER") {
    forbidden();
  }

  const parsed = updateWorkspaceSchema.safeParse(data);
  if (parsed.error) {
    return {
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  await prisma.workspace.update({
    where: {
      id: workspaceId,
    },
    data: {
      name: parsed.data.name,
    },
  });

  return {
    success: true,
  };
}
