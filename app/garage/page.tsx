import Vehicles from '@/app/garage/vehicles';
import FilterButtons from '@/app/garage/filter-buttons';
import Breadcrumbs from '@/app/ui/navigation/breadcrumbs';
import { Metadata } from 'next';
import { auth } from '@/auth';
import { Suspense } from 'react';
import VehiclesSkeleton from '@/app/ui/skeletons/vehicles-skeleton';

export const metadata: Metadata = {
  title: 'My Garage | Autotribe',
  description: 'View and manage your vehicle collection',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    filter?: string;
  };
}) {
  const filter = searchParams?.filter || '';
  const session = await auth();
  const username = session?.user?.name || 'Your';

  return (
    <main className="flex min-h-screen flex-col pb-10">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <Breadcrumbs
            breadcrumbs={[{ label: 'Garage', href: '/garage', active: true }]}
          />
        </div>

        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-white md:text-4xl">
            {username}&apos;s Garage
          </h1>
          <p className="text-gray-300">
            Manage your vehicles and keep track of their details.
          </p>
        </div>

        <div className="mb-8">
          <FilterButtons />
        </div>

        <Suspense fallback={<VehiclesSkeleton />}>
          <Vehicles filterBy={filter} />
        </Suspense>
      </div>
    </main>
  );
}
