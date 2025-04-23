import { CSSProperties } from 'react';

export default function VehiclesSkeleton() {
  // Create an array of 4 items to show as skeleton placeholders
  const skeletons = Array.from({ length: 4 }, (_, i) => i);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {skeletons.map((i) => (
        <div
          key={i}
          className="flex h-[300px] w-full flex-col overflow-hidden rounded-xl bg-gray-800"
        >
          <div className="relative flex-grow animate-pulse bg-gray-700">
            <div className="absolute inset-0">
              {/* Placeholder for image */}
              <div className="h-full w-full bg-gray-700" />
            </div>
          </div>
          <div className="h-[50px] animate-pulse bg-gray-800 p-3">
            <div className="mx-auto h-4 w-3/4 rounded bg-gray-700" />
          </div>
        </div>
      ))}
    </div>
  );
}
