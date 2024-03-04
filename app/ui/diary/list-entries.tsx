import { PlusCircleIcon } from "@heroicons/react/24/outline";
import DisplayEntry from "./display-entry";
import { DiaryEntry } from "@/app/lib/definitions";


export default function ListEntries({entries} : any) {

  return (
    <div className="flex flex-col items-center rounded-lg p-3 gap-3">
      {entries.map((entry:DiaryEntry) => <DisplayEntry key={entry.id} entry={entry}/>)}
    </div>
  );
}
