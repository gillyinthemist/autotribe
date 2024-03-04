import { ListBulletIcon } from "@heroicons/react/24/outline";
import AddEntry from "../diary/add-entry";
import DisplayEntry from "../diary/display-entry";
import ListEntries from "../diary/list-entries";
import { fetchDiaryEntries } from "@/app/lib/data";


export default async function VehicleDiary({id} : {id: string}) {
  const entries = await fetchDiaryEntries(id);
  return (
    <div className="flex flex-col flex-grow bg-brown rounded-lg p-5">
      <p>Diary Goes here</p>
      <AddEntry id={id}/>
      <ListEntries entries={entries}/>
    </div>
  );
}
