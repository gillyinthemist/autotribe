import { fetchDiaryEntries, fetchVehicleById } from '@/app/lib/data';
import Breadcrumbs from '@/app/ui/navigation/breadcrumbs';
import VehicleDiary from '@/app/garage/[id]/details/vehicle-diary';
import VehicleOverview from '@/app/garage/[id]/details/vehicle-overview';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Details',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const vehicle = await fetchVehicleById(id);
  const entries = await fetchDiaryEntries(id);

  if (!vehicle) {
    notFound();
  }
  return (
    <main>
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
      <div className="flex w-full flex-col flex-wrap gap-10 md:flex-row">
        <VehicleOverview vehicle={vehicle} />
        <VehicleDiary id={vehicle.id} entries={entries} />
      </div>
    </main>
  );
}
