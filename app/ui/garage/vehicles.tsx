import { Card } from '@/app/ui/garage/card';
import { fetchOwnedVehicles } from '@/app/lib/data';
import Link from 'next/link';

export default async function Vehicles({ filterBy }: { filterBy: string }) {
  const ownerId = '410544b2-4001-4271-9855-fec4b6a6442a';
  const vehicles = await fetchOwnedVehicles(ownerId, filterBy);
  return (
    <div className="flex flex-wrap justify-center gap-10">
      {vehicles?.length === 0 && <h2>No vehicles here...</h2>}

      {vehicles &&
        vehicles.map((vehicle) => {
          return <Card key={vehicle.id} vehicle={vehicle} />;
        })}
    </div>
  );
}
