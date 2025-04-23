'use client';
import AddEntry from '../add-entry/add-entry';
import ListEntries from './list-entries';
import { useState } from 'react';
import clsx from 'clsx';
import {
  CheckCircleIcon,
  ClockIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';

export default function VehicleDiary({ id, entries }: any) {
  const [filter, setFilter] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  const completedEntries = entries.filter(
    (entry: any) => entry.complete === true,
  );
  const pendingEntries = entries.filter(
    (entry: any) => entry.complete === false,
  );

  function handleClick(newFilter: boolean) {
    setFilter(newFilter);
  }

  function toggleAddForm() {
    setShowAddForm(!showAddForm);
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-gray-800 p-5 shadow-lg">
      {/* Section header with Add button */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-white">Maintenance Records</h2>
          <p className="text-sm text-gray-400">
            Track all maintenance tasks for your vehicle
          </p>
        </div>
        <button
          onClick={toggleAddForm}
          className="flex items-center gap-2 rounded-full bg-blue-500 p-2 text-white transition-all hover:bg-blue-600 md:px-4 md:py-2"
        >
          <PlusCircleIcon className="h-5 w-5" />
          <span className="hidden md:inline">Add Record</span>
        </button>
      </div>

      {/* Add new maintenance entry - Shown only when button is clicked */}
      {showAddForm && (
        <div className="rounded-xl bg-gray-700 p-4 shadow-inner">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-medium text-white">
              New Maintenance Record
            </h3>
            <button
              onClick={toggleAddForm}
              className="rounded-full bg-gray-600 p-1 text-gray-300 hover:bg-gray-500 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <AddEntry id={id} onComplete={() => setShowAddForm(false)} />
        </div>
      )}

      {/* Filter tabs */}
      <div className="flex overflow-hidden rounded-t-xl bg-gray-700">
        <button
          onClick={() => handleClick(true)}
          className={clsx(
            'flex flex-1 items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all',
            {
              'bg-blue-500 text-white shadow-md': filter === true,
              'bg-transparent text-gray-300 hover:bg-gray-600/70 hover:text-white':
                filter !== true,
            },
          )}
        >
          <CheckCircleIcon className="h-5 w-5" />
          <span>Completed</span>
          <span
            className={`ml-1 rounded-full px-2 py-0.5 text-xs ${filter ? 'bg-blue-600' : 'bg-gray-600'}`}
          >
            {completedEntries.length}
          </span>
        </button>

        <button
          onClick={() => handleClick(false)}
          className={clsx(
            'flex flex-1 items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all',
            {
              'bg-blue-500 text-white shadow-md': filter === false,
              'bg-transparent text-gray-300 hover:bg-gray-600/70 hover:text-white':
                filter !== false,
            },
          )}
        >
          <ClockIcon className="h-5 w-5" />
          <span>Pending</span>
          <span
            className={`ml-1 rounded-full px-2 py-0.5 text-xs ${!filter ? 'bg-blue-600' : 'bg-gray-600'}`}
          >
            {pendingEntries.length}
          </span>
        </button>
      </div>

      {/* List of entries with panel styling */}
      <div className="-mt-4 flex-1 rounded-b-xl bg-gray-700 p-4 pt-8">
        <h3 className="mb-3 border-b border-gray-600 pb-2 text-lg font-medium text-white">
          {filter ? 'Completed Maintenance' : 'Pending Work'}
        </h3>

        {/* Show appropriate message if no entries */}
        {entries.filter((entry: any) => entry.complete === filter).length ===
        0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg bg-gray-800 py-8 text-center">
            <div className="rounded-full bg-gray-700 p-4">
              {filter ? (
                <CheckCircleIcon className="h-8 w-8 text-gray-500" />
              ) : (
                <ClockIcon className="h-8 w-8 text-gray-500" />
              )}
            </div>
            <p className="mt-3 text-gray-400">
              {filter
                ? 'No completed maintenance records yet'
                : 'No pending maintenance tasks'}
            </p>
            <button
              onClick={toggleAddForm}
              className="mt-4 flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
            >
              <PlusCircleIcon className="h-4 w-4" />
              <span>Add Your First Record</span>
            </button>
          </div>
        ) : (
          <ListEntries
            entries={entries.filter((entry: any) => entry.complete === filter)}
          />
        )}
      </div>
    </div>
  );
}
