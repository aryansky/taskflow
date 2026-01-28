import TaskCardSkeleton from "./_components/TaskCardSkeleton";

export default function AllTasksLoader() {
  return (
    <div className="max-w-3xl lg:max-w-5xl mx-auto p-6">
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <TaskCardSkeleton key={i} />
        ))}
      </section>
    </div>
  );
}
