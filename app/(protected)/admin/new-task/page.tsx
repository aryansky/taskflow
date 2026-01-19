import { Button } from "@/components/ui/button";
import { createTask } from "./actions";

export default async function NewTask() {
  return (
    <div>
      <h1>Create Task</h1>
      <form action={createTask}>
        <input name="title" placeholder="Title" required />
        <textarea name="description" required />
        <input
          name="assignedToEmail"
          type="email"
          placeholder="Assignee email"
          required
        />
        <Button type="submit">Create</Button>
      </form>
    </div>
  );
}
