'use client';
import AddEntry from '../diary/add-entry';
import ListEntries from '../diary/list-entries';
import { Button } from '../button';
import { useState } from 'react';
import clsx from 'clsx';

export default function VehicleDiary({ id, entries }: any) {
  const [filter, setFilter] = useState(true);

  function handleClick(event: any) {
    if (event.target.value === 'done') setFilter(true);
    else setFilter(false);
  }

  return (
    <div className="flex flex-grow flex-col rounded-lg bg-brown p-5">
      <div className="flex justify-center gap-2 p-4">
        <Button
          value={'done'}
          onClick={handleClick}
          className={clsx({ 'bg-white text-night': filter })}
        >
          Work Completed
        </Button>
        <Button
          value={'todo'}
          onClick={handleClick}
          className={clsx({ 'bg-white text-night': !filter })}
        >
          Work Needed
        </Button>
      </div>
      <AddEntry id={id} />
      <ListEntries
        entries={entries.filter((entry: any) => entry.complete === filter)}
      />
    </div>
  );
}
