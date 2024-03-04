import { deleteEntry } from '@/app/lib/actions';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '../../../ui/button';

export default function DisplayEntry({ entry }: any) {
  let date = new Date(Date.now());

  if (entry.complete) date = entry.date_completed;
  else date = entry.date_added;

  const displayDate = date.toLocaleDateString();

  const deleteEntryWithId = deleteEntry.bind(null, entry.id, entry.vehicle_id);

  return (
    <div className="flex w-full items-center justify-between gap-1 rounded-lg border-2 border-mag p-3">
      <p className="flex-grow ">{entry.entry}</p>
      <p className="">{entry.complete ? 'Carried out:' : 'Added:'}</p>
      <p className="px-3">{`${displayDate}`}</p>
      <form action={deleteEntryWithId}>
        <Button>
          <TrashIcon className="" height={20} width={20}></TrashIcon>
        </Button>
      </form>
    </div>
  );
}
