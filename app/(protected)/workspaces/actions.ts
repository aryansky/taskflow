"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { createWorkspaceSchema } from "./schema";
import { WorkspaceReturnState } from "./types";

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
