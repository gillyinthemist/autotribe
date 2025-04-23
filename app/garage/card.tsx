'use client';

import Image from 'next/image';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteVehicle } from '@/app/lib/actions';
import { useState } from 'react';

export function Card({ vehicle }: any) {
  const deleteVehicleWithId = deleteVehicle.bind(null, vehicle.id);
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <div className="group flex h-[300px] w-full flex-col overflow-hidden rounded-xl transition duration-200 hover:shadow-xl sm:max-w-[300px]">
      <div className="relative flex-grow bg-gray-800">
        <Link href={`garage/${vehicle.id}/details`} className="block h-full">
          {/* Loading skeleton */}
          {imageLoading && (
            <div className="absolute inset-0 flex animate-pulse items-center justify-center bg-gray-700">
              <span className="sr-only">Loading...</span>
            </div>
          )}

          {/* Actual image */}
          <Image
            alt={`${vehicle.make} ${vehicle.model}`}
            src={vehicle.image}
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={80}
            className={`h-full w-full object-cover transition duration-300 group-hover:scale-105 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoadingComplete={() => setImageLoading(false)}
            priority={false}
          />
        </Link>

        <form action={deleteVehicleWithId}>
          <button type="submit" aria-label="Delete vehicle">
            <XMarkIcon className="absolute right-2 top-2 z-40 h-10 w-10 rounded-full bg-black/30 p-2 text-white opacity-0 shadow-lg transition-opacity duration-200 hover:bg-red-500 group-hover:opacity-100" />
          </button>
        </form>
      </div>

      <div className="z-10 h-[50px] bg-raisin p-3 text-center">
        <p className="truncate font-medium text-white">
          {vehicle.make} {vehicle.model} {vehicle.year}
        </p>
      </div>
    </div>
  );
}
