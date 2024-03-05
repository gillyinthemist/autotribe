import { Card } from '@/app/garage/card';
import { fetchOwnedVehicles } from '@/app/lib/data';
import { auth } from '@/auth';

export default async function Vehicles({ filterBy }: { filterBy: string }) {
  // get the client session
  const session = await auth();
  //set ownerId based on user.id
  const ownerId = session!.user!.id || '';

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
