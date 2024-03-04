import DisplayEntry from "./display-entry";
import { DiaryEntry } from "@/app/lib/types";


export default function ListEntries({entries} : any) {
  
  return (
    <div className="flex flex-col items-center rounded-lg mt-4 gap-3">
      {entries.sort((a:DiaryEntry,b:DiaryEntry) => {
        if (a.complete) return b.date_completed.getTime() - a.date_completed.getTime()
        else return a.date_added.getTime() - b.date_added.getTime()
      } ).map((entry:DiaryEntry) => <DisplayEntry key={entry.id} entry={entry}/>)}
    </div>
  );
}
