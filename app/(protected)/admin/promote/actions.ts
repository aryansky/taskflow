"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import z from "zod";
import { promoteToAdminSchema } from "./schema";

interface PromoteToAdminResult {
  errors?: {
    userEmail?: string[];
  };
  success?: {
    email: string;
  };
}

export async function promoteToAdmin(data: {
  userEmail: string;
}): Promise<PromoteToAdminResult> {
  const session = await auth();
  if (session!.user.role !== "ADMIN") throw new Error("FORBIDDEN");

  const parsed = promoteToAdminSchema.safeParse(data);

  if (!parsed.success) {
    return {
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      email: parsed.data.userEmail,
    },
  });

  if (!user) {
    return {
      errors: {
        userEmail: ["No user found"],
      },
    };
  }

  if (user.role === "ADMIN") {
    return {
      errors: {
        userEmail: ["User is already an admin"],
      },
    };
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      role: "ADMIN",
    },
  });

  return {
    success: {
      email: user.email,
    },
  };
}
