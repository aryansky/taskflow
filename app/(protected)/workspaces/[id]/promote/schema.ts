import z from "zod";

export const promoteToAdminSchema = z.object({
  userEmail: z.email("Enter a valid email address"),
});
