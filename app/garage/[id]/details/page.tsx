import {
  fetchDiaryEntries,
  fetchVehicleById,
  fetchTaxMot,
} from '@/app/lib/data';
import Breadcrumbs from '@/app/ui/navigation/breadcrumbs';
import VehicleDiary from '@/app/garage/[id]/details/vehicle-diary';
import VehicleOverview from '@/app/garage/[id]/details/vehicle-overview';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Vehicle Details | Autotribe',
  description: 'View and manage your vehicle details and maintenance history',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const vehicle = await fetchVehicleById(id);
  const entries = await fetchDiaryEntries(id);

  if (!vehicle) {
    notFound();
  }

  // Fetch MOT and tax data if the vehicle is currently owned
  let motAndTax = {
    VehicleHasCurrentMot: false,
    DaysUntilNextMotIsDue: 0,
    NextMotDueDate: '01/01/2000',
    MotVed: {
      VedCurrentlyValid: false,
      VedExpiryDate: null,
      VedDaysRemaining: null,
    },
    error: false,
  };

  if (vehicle.current && vehicle.vrm) {
    motAndTax = await fetchTaxMot(vehicle.vrm);
  }

  return (
    <main className="flex min-h-screen flex-col pb-10">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6 flex flex-col space-y-4">
          {/* Back to garage link */}
          <Link
            href="/garage"
            className="flex w-fit items-center gap-1 text-sm text-gray-300 transition-colors hover:text-white"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            <span>Back to garage</span>
          </Link>

          {/* Breadcrumbs */}
          <Breadcrumbs
            breadcrumbs={[
              { label: 'Garage', href: '/garage' },
              {
                label: 'Details',
                href: `/garage/${id}/details`,
                active: true,
              },
              {
                label: 'Edit Vehicle',
                href: `/garage/${id}/edit`,
              },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Vehicle information side */}
          <div className="lg:col-span-1">
            <Suspense
              fallback={
                <div className="h-64 w-full animate-pulse rounded-xl bg-gray-700"></div>
              }
            >
              <VehicleOverview vehicle={vehicle} motAndTax={motAndTax} />
            </Suspense>
          </div>

          {/* Maintenance diary side */}
          <div className="lg:col-span-2">
            <Suspense
              fallback={
                <div className="h-64 w-full animate-pulse rounded-xl bg-gray-700"></div>
              }
            >
              <VehicleDiary id={vehicle.id} entries={entries} />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
