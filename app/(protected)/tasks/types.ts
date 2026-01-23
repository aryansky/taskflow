export type TaskState = {
  errors?: {
    title?: string[];
    description?: string[];
    assignedToEmail?: string[];
    dueDate?: string[];
  };
  success?: {
    redirectPath: string;
  };
};
