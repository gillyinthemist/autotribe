import { Card } from '@/app/garage/card';
import { fetchOwnedVehicles } from '@/app/lib/data';
import { auth } from '@/auth';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default async function Vehicles({ filterBy }: { filterBy: string }) {
  // get the client session
  const session = await auth();
  //set ownerId based on user.id
  const ownerId = session!.user!.id || '';

  const vehicles = await fetchOwnedVehicles(ownerId, filterBy);

  // Empty state with call-to-action
  if (!vehicles || vehicles.length === 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center space-y-6 rounded-xl bg-gray-800/50 p-10 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-700">
          <PlusCircleIcon className="h-10 w-10 text-gray-400" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-medium text-white">No vehicles yet</h2>
          <p className="text-gray-400">
            {filterBy
              ? `No ${filterBy.toLowerCase()} vehicles found.`
              : 'Start building your garage by adding your first vehicle.'}
          </p>
        </div>
        <Link
          href="/garage/add-vehicle"
          className="mt-4 rounded-md bg-blue-500 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-600"
        >
          Add a Vehicle
        </Link>
      </div>
    );
  }

  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {vehicles.map((vehicle) => (
        <Card key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
}
