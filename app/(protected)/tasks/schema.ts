import z from "zod";

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  assignedToEmail: z.email("Invalid email"),
  dueDate: z.date().nullable(),
});

export const commentSchema = z.object({
  text: z
    .string()
    .min(1, "Comment text cannot be empty")
    .max(1000, "Comment cannot exceed 1000 characters"),
});

export const createTaskSchema = taskSchema;
export const updateTaskSchema = taskSchema;
