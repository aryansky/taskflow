import z from "zod";

const workspaceSchema = z.object({
  name: z
    .string()
    .min(2, "Must be at least 2 characters")
    .max(32, "Must be less than 32 characters"),
});

export const inviteSchema = z.object({
  email: z.email("Enter a valid email address"),
});

export const promoteToAdminSchema = z.object({
  userEmail: z.email("Enter a valid email address"),
});

export const createWorkspaceSchema = workspaceSchema;
