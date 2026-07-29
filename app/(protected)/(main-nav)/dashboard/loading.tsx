import StatCardSkeleton from "./_components/StatCardSkeleton";

export default function Loading() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatCardSkeleton />
      <StatCardSkeleton />
      <StatCardSkeleton />
    </section>
  );
}
