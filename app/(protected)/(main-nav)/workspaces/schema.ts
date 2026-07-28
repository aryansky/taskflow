import z from "zod";

const workspaceSchema = z.object({
  name: z
    .string()
    .min(2, "Must be at least 2 characters")
    .max(32, "Must be less than 32 characters"),
});

export const createWorkspaceSchema = workspaceSchema;
