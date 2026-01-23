import z from "zod";

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  assignedToEmail: z.email("Invalid email"),
  dueDate: z.date().optional(),
});

export const createTaskSchema = taskSchema;
export const updateTaskSchema = taskSchema;
