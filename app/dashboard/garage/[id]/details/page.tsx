import { fetchVehicleById } from "@/app/lib/data";
import VehicleDetail from "@/app/ui/vehicle-detail";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const vehicle = await fetchVehicleById(id);

  if (!vehicle) {
    notFound();
  }
  return (
    <main>
      <VehicleDetail vehicle={vehicle}/>
    </main>
  );
}
