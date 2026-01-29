import { Skeleton } from "@/components/ui/skeleton";

import CommentSkeleton from "../_components/CommentSkeleton";

export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <article className="prose dark:prose-invert mx-auto">
        <div className="flex justify-between items-center w-full">
          <Skeleton className="h-8 w-96" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="my-4 flex flex-col gap-1">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/4" />
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <Skeleton className="h-3 w-48" />
          <Skeleton className="h-3 w-48" />
        </div>
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-30 mb-2" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-12 mb-2" />
            <Skeleton className="h-6 w-12 mb-2" />
          </div>
        </div>
      </article>
      <hr className="w-full border mt-8" />
      <section className="max-w-2xl mx-auto">
        <Skeleton className="h-6 w-36 my-4" />
        <div>
          <Skeleton />
        </div>

        <div className="grid grid-cols-1 gap-4">
          <CommentSkeleton />
          <CommentSkeleton />
          <CommentSkeleton />
        </div>
      </section>
    </div>
  );
}
