import StatCardSkeleton from "./_components/StatCardSkeleton";

export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="my-8">
        <h1 className="text-4xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your assigned tasks</p>
      </header>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </section>
    </div>
  );
}
