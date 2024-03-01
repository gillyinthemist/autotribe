import Vehicles from '@/app/ui/garage/vehicles';
import FilterButtons from '@/app/ui/garage/filter-buttons';
import AddButtons from '@/app/ui/garage/add-buttons';


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
      <FilterButtons/>
      <Vehicles filterBy={filter}/>
    </main>
  );
}
