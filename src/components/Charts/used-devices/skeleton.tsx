export function UsedDevicesSkeleton() {
  return (
    <div className="grid grid-cols-1 grid-rows-[auto_1fr] gap-9 rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="h-8 w-36 animate-pulse rounded bg-gray-2 dark:bg-gray-dark"></div>
        <div className="h-8 w-24 animate-pulse rounded bg-gray-2 dark:bg-gray-dark"></div>
      </div>
      <div className="grid place-items-center">
        <div className="relative h-48 w-48 animate-pulse rounded-full bg-gray-2 dark:bg-gray-dark">
          <div className="absolute inset-8 rounded-full bg-white dark:bg-gray-dark"></div>
        </div>
      </div>
    </div>
  );
}
