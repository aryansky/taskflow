import CreateTaskForm from "./CreateTaskForm";

export default async function NewTask() {
  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-4xl tracking-tight font-bold text-center mb-4">
        Create Task
      </h1>
      <CreateTaskForm />
    </div>
  );
}
