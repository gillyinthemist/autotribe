'use client';

import Image from 'next/image';
import { VehicleDetails } from '../../../lib/types';
import { numberPlate } from '../../../ui/fonts';
import { fetchTaxMot } from '@/app/lib/data';
import {
  PencilIcon,
  CalendarIcon,
  SwatchIcon,
  TagIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';

export default function VehicleOverview({
  vehicle,
  motAndTax,
}: {
  vehicle: VehicleDetails;
  motAndTax?: any;
}) {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <div className="flex flex-col gap-5 rounded-xl bg-gray-800 p-5 shadow-lg">
      {/* Vehicle image section */}
      <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-700">
        {/* Loading skeleton */}
        {imageLoading && (
          <div className="absolute inset-0 flex animate-pulse items-center justify-center bg-gray-700">
            <span className="sr-only">Loading...</span>
          </div>
        )}

        {/* Vehicle image */}
        <Image
          alt={`${vehicle.make} ${vehicle.model}`}
          src={vehicle?.image || ''}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`h-full w-full object-cover transition duration-200 ${
            imageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          quality={90}
          priority
          onLoadingComplete={() => setImageLoading(false)}
        />

        {/* Edit button */}
        <Link
          href={`/garage/${vehicle.id}/edit`}
          className="absolute right-3 top-3 z-40 rounded-full bg-black/50 p-2 text-white shadow-lg transition-colors hover:bg-blue-500"
        >
          <PencilIcon className="h-5 w-5" />
        </Link>
      </div>

      {/* License plate */}
      <div className="flex items-center justify-center rounded-lg bg-yellow-400 p-2 shadow-md">
        <p
          className={`${numberPlate.className} text-center text-5xl uppercase text-black sm:text-6xl`}
        >
          {vehicle?.vrm}
        </p>
      </div>

      {/* Vehicle description */}
      <div className="flex flex-col gap-3 rounded-xl bg-gray-700 p-4">
        <div className="flex items-center gap-2 border-b border-gray-600 pb-2">
          <InformationCircleIcon className="h-5 w-5 text-gray-400" />
          <h2 className="text-lg font-medium text-white">Description</h2>
        </div>
        <p className="text-gray-300">
          {vehicle?.description || 'No description provided'}
        </p>
      </div>

      {/* Vehicle details */}
      <div className="flex flex-col gap-3 rounded-xl bg-gray-700 p-4">
        <div className="flex items-center gap-2 border-b border-gray-600 pb-2">
          <TagIcon className="h-5 w-5 text-gray-400" />
          <h2 className="text-lg font-medium text-white">Vehicle Details</h2>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <div className="flex flex-col">
            <span className="text-sm text-gray-400">Make</span>
            <span className="font-medium text-white">{vehicle?.make}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-gray-400">Model</span>
            <span className="font-medium text-white">{vehicle?.model}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-gray-400">Year</span>
            <span className="font-medium text-white">{vehicle?.year}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-gray-400">Color</span>
            <span className="font-medium text-white">{vehicle?.colour}</span>
          </div>
        </div>
      </div>

      {/* MOT and Tax info - Show only for current vehicles */}
      {vehicle.current && motAndTax && !motAndTax.error && (
        <div className="flex flex-col gap-3 rounded-xl bg-gray-700 p-4">
          <div className="flex items-center gap-2 border-b border-gray-600 pb-2">
            <CalendarIcon className="h-5 w-5 text-gray-400" />
            <h2 className="text-lg font-medium text-white">MOT & Tax Status</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* MOT Status */}
            <div className="flex flex-col rounded-lg bg-gray-800 p-3">
              <span className="text-sm text-gray-400">MOT Status</span>
              {motAndTax.VehicleHasCurrentMot ? (
                <div className="flex items-center gap-2">
                  <span className="text-lg font-medium text-green-400">
                    Valid
                  </span>
                  <span className="text-xs text-gray-400">
                    ({motAndTax.DaysUntilNextMotIsDue} days)
                  </span>
                </div>
              ) : (
                <span className="text-lg font-medium text-red-400">
                  Expired
                </span>
              )}
            </div>

            {/* Tax Status */}
            <div className="flex flex-col rounded-lg bg-gray-800 p-3">
              <span className="text-sm text-gray-400">Tax Status</span>
              {motAndTax.MotVed.VedCurrentlyValid ? (
                <div className="flex items-center gap-2">
                  <span className="text-lg font-medium text-green-400">
                    Valid
                  </span>
                  <span className="text-xs text-gray-400">
                    ({motAndTax.MotVed.VedDaysRemaining} days)
                  </span>
                </div>
              ) : (
                <span className="text-lg font-medium text-yellow-400">
                  SORN
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
