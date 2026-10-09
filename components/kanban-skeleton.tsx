// components/kanban-skeleton.tsx
export function KanbanSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto p-6 animate-pulse">
        {/* Header Skeleton */}
        <div className="mb-6 space-y-2">
          <div className="h-9 w-48 rounded-md bg-gray-200" />
          <div className="h-4 w-64 rounded-md bg-gray-100" />
        </div>

        {/* Board Columns Skeleton */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {[1, 2, 3, 4].map((col) => (
            <div
              key={col}
              className="flex flex-col rounded-xl border border-gray-100 bg-gray-50/70 p-4"
            >
              {/* Column Header */}
              <div className="mb-4 flex items-center justify-between">
                <div className="h-5 w-28 rounded bg-gray-200" />
                <div className="h-5 w-6 rounded-full bg-gray-200" />
              </div>

              {/* Card Skeletons */}
              <div className="space-y-3">
                {[1, 2, 3].map((card) => (
                  <div
                    key={card}
                    className="space-y-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                  >
                    <div className="h-4 w-3/4 rounded bg-gray-200" />
                    <div className="h-3 w-1/2 rounded bg-gray-100" />
                    <div className="mt-3 flex justify-between pt-2">
                      <div className="h-3 w-16 rounded bg-gray-100" />
                      <div className="h-5 w-12 rounded-full bg-gray-100" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}