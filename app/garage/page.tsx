import Vehicles from '@/app/ui/garage/vehicles';
import FilterButtons from '@/app/ui/query/filter-buttons';
import AddButtons from '@/app/ui/navigation/add-buttons';
import Breadcrumbs from '@/app/ui/navigation/breadcrumbs';
import { Metadata } from 'next';


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
  const filter = searchParams?.filter || "";

  return (
    <main>
      {/* <AddButtons/> */}
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Garage', href: 'garage', active:true },
        ]}
      />
      <div className="flex flex-col items-center gap-10">
        <FilterButtons/>
        <Vehicles filterBy={filter}/>
      </div>
      
    </main>
  );
}
