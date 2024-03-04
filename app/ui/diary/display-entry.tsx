import { deleteEntry } from '@/app/lib/actions';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function DisplayEntry({ entry }: any) {
  let date = new Date(Date.now());

  if (entry.complete) date = entry.date_completed;
  else date = entry.date_added;

  const displayDate = date.toLocaleDateString();

  const deleteEntryWithId = deleteEntry.bind(null, entry.id, entry.vehicle_id);
  
  return (
    <div className="flex w-full justify-between gap-1 rounded-lg bg-mag p-3">
      <p className="flex-grow text-night">{entry.entry}</p>
      <p className="text-night">{entry.complete ? 'Carried out:' : 'Added:'}</p>
      <p className="text-night">{`${displayDate}`}</p>
      <form action={deleteEntryWithId}>
        <button>
          <TrashIcon className="text-night" height={20} width={20}></TrashIcon>
        </button>
      </form>
    </div>
  );
}
