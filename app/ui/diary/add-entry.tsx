'use client';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

import { useState,useRef } from 'react';
import { Button } from '../button';
import clsx from 'clsx';
import { createEntry } from '@/app/lib/actions';

export default function AddEntry({ id }: {id: string}) {
  const [showForm, setShowForm] = useState(false);
  const [complete, setComplete] = useState(false);

  const formRef =  useRef<HTMLFormElement>(null);

  function handleAdd() {
    setShowForm(!showForm);
  }

  function handleComplete() {
    setComplete(!complete);
  }

  function submit(formData:FormData) {
    createEntry(formData)
    //reset form and bring back the add button
    setShowForm(!showForm);
    formRef.current?.reset();
  }

  return (
    <div className="flex flex-col items-center rounded-lg bg-mag p-3">
      {!showForm && (
        <PlusCircleIcon
          height={40}
          width={40}
          onClick={handleAdd}
          className="text-raisin hover:cursor-pointer hover:text-dun"
        />
      )}
      {showForm && (
        <form action={submit} ref={formRef} className="flex w-full flex-row items-center justify-between gap-2 md:flex-row">
          <div className="flex-grow">
          <input
              type="text"
              id="vehicle_id"
              name="vehicle_id"
              value={id}
              readOnly
              hidden
            />
            <input
              type="text"
              id="entry"
              name="entry"
              placeholder="Describe work, press completed if already carried out and select date, then enter to submit"
              className="h-10 w-full rounded-lg border border-raisin bg-white p-1 pl-2 text-sm text-night"
              defaultValue={''}
            />
          </div>
          <div className="flex items-center gap-1">
            <label
              className={clsx(
                { 'bg-white text-night': complete },
                'focus-visible:outline-bg-grey flex h-10 items-center rounded-lg bg-raisin px-4 text-sm font-medium transition-colors hover:bg-grey focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:bg-grey aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
              )}
            >
              Completed?
              <input
                type="checkbox"
                id="completed"
                name="complete"
                onClick={handleComplete}
                className="h-10 rounded-lg border border-raisin bg-white text-sm text-night"
                value={1}
                hidden
              />
            </label>
            {complete && (
              <input
                name="date_completed"
                type="date"
                className="h-10 w-full rounded-lg border border-raisin bg-white p-1 pl-2 text-sm text-night"
                required
              ></input>
            )}
          </div>
          <button type="submit">
            <PlusCircleIcon
              height={40}
              width={40}
              className="hover:cursor-pointer text-night hover:text-dun"
            />
          </button>
        </form>
      )}
    </div>
  );
}
