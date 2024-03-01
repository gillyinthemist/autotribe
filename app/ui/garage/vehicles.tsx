import { Card } from '@/app/ui/garage/card';
import { fetchOwnedVehicles } from '@/app/lib/data';
import Link from 'next/link';

export default async function Vehicles({ filterBy }: { filterBy: string }) {
  const ownerId = '410544b2-4001-4271-9855-fec4b6a6442a';
  const vehicles = await fetchOwnedVehicles(ownerId, filterBy);
  return (
    <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
      {vehicles?.map((vehicle) => {
        return (
          <Link
            key={vehicle.id}
            href={`/dashboard/garage/${vehicle.id}/details`}
          >
            <Card make={vehicle.make} model={vehicle.model} image={vehicle.image} />
          </Link>
        );
      })}
    </div>
  );
}
