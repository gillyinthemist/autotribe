import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { date } from "zod";


export default function DisplayEntry({entry} : any) {
  let date = new Date(Date.now());
  
  if(entry.complete) date = entry.date_completed;
  else date = entry.date_added;

  const displayDate = date.toLocaleDateString();

  return (
    <div className="flex bg-mag justify-between w-full rounded-lg p-3">
      <p className="text-night">{`${displayDate}`}</p>

      <p className="text-night place-self-end">{`${entry.complete}`}</p>
      <p className="text-night">{entry.entry}</p>
    </div>
  );
}
