import Vehicles from '@/app/ui/garage/vehicles';
import FilterButtons from '@/app/ui/garage/filter-buttons';
import AddButtons from '@/app/ui/garage/add-buttons';
import Breadcrumbs from '@/app/ui/garage/breadcrumbs';

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
          { label: 'Garage', href: '/dashboard/garage', active:true },
        ]}
      />
      <div className="flex flex-col items-center gap-10">
        <FilterButtons/>
        <Vehicles filterBy={filter}/>
      </div>
      
    </main>
  );
}
