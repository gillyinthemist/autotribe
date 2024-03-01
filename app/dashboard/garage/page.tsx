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
      <h1 className={`mb-4 text-xl md:text-2xl`}>
        My Garage
      </h1>
      <div className="flex flex-col items-center gap-10">
        <FilterButtons/>
        <Vehicles filterBy={filter}/>
      </div>
      
    </main>
  );
}
