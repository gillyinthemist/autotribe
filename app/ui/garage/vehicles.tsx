import { Card } from '@/app/ui/garage/card';
import { fetchOwnedVehicles } from '@/app/lib/data';


export default async function Vehicles({filterBy} : {filterBy:string}) {
  const ownerId = "410544b2-4001-4271-9855-fec4b6a6442a";
  const vehicles = await fetchOwnedVehicles(ownerId , filterBy);
  return (
    <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
      {vehicles?.map(vehicle => <Card key={vehicle.id} vrm={vehicle.vrm} image={vehicle.images[0]}/>)}
    </div>
  );
}
