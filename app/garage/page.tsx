import Vehicles from '@/app/garage/vehicles';
import FilterButtons from '@/app/garage/filter-buttons';
import Breadcrumbs from '@/app/ui/navigation/breadcrumbs';
import { Metadata } from 'next';
import { auth } from "@/auth"


export const metadata: Metadata = {
  title: 'My Garage',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    filter?: string;
  };
}) {
  const filter = searchParams?.filter || '';

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[{ label: 'Garage', href: '/garage', active: true }]}
      />
      <div className="flex flex-col items-center gap-10">
        <FilterButtons />
        <Vehicles filterBy={filter} />
      </div>
    </main>
  );
}
