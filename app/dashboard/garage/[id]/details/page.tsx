import { fetchTaxMot, fetchVehicleById } from '@/app/lib/data';
import Breadcrumbs from '@/app/ui/garage/breadcrumbs';
import VehicleDiary from '@/app/ui/vehicle-detail/vehicle-diary';
import VehicleOverview from '@/app/ui/vehicle-detail/vehicle-overview';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const vehicle = await fetchVehicleById(id);
  if (!vehicle) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Garage', href: '/dashboard/garage' },
          {
            label: 'Details',
            href: `/dashboard/garage/${id}/details`,
            active: true,
          },
        ]}
      />
      <div className="flex w-full flex-col flex-wrap gap-10 md:flex-row">
        {vehicle && (
          <>
            <VehicleOverview vehicle={vehicle} />
            <VehicleDiary vehicle={vehicle} />
          </>
        )}
      </div>
    </main>
  );
}
