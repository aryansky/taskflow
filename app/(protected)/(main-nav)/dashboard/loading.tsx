import MainContainer from "@/components/ui/layout/main-container";
import StatCardSkeleton from "./_components/StatCardSkeleton";

export default function Loading() {
  return (
    <MainContainer
      breadcrumbs={[{ title: "Dashboard", href: "/dashboard" }]}
      heading="Dashboard"
      description="Overview of your assigned tasks"
    >
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </section>
    </MainContainer>
  );
}
