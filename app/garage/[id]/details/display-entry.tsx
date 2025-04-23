'use client';

import { deleteEntry } from '@/app/lib/actions';
import {
  TrashIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function DisplayEntry({ entry }: any) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  let date = new Date(Date.now());
  if (entry.complete) date = entry.date_completed;
  else date = entry.date_added;

  const displayDate = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const deleteEntryWithId = deleteEntry.bind(null, entry.id, entry.vehicle_id);

  async function handleDelete() {
    try {
      setIsDeleting(true);
      await deleteEntryWithId();
    } catch (error) {
      console.error('Error deleting entry:', error);
      setIsDeleting(false); // Reset state if error occurs
    }
  }

  return (
    <div
      className={`group flex w-full flex-col overflow-hidden rounded-lg bg-gray-800 transition-all duration-200 sm:flex-row ${
        isDeleting ? 'opacity-50' : 'hover:bg-gray-700/50'
      } mb-1`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Status indicator on the left */}
      <div
        className={`${
          entry.complete
            ? 'bg-green-500/20 text-green-400'
            : 'bg-blue-500/20 text-blue-400'
        } flex items-center justify-center px-3`}
      >
        {entry.complete ? (
          <CheckCircleIcon className="h-4 w-4" />
        ) : (
          <ClockIcon className="h-4 w-4" />
        )}
      </div>

      <div className="flex flex-1 flex-col px-3 py-2 sm:flex-row sm:items-center sm:gap-4">
        {/* Entry description */}
        <div className="flex-1">
          <p className="text-sm font-medium text-white">{entry.entry}</p>
        </div>

        {/* Date information */}
        <div className="mt-1 flex items-center gap-1 text-xs text-gray-400 sm:mt-0">
          <CalendarIcon className="h-3.5 w-3.5" />
          <span className="font-medium text-gray-300">{displayDate}</span>
        </div>
      </div>

      {/* Delete button */}
      <form action={handleDelete} className="flex">
        <button
          type="submit"
          disabled={isDeleting}
          aria-label="Delete entry"
          className={`flex items-center justify-center px-2 text-gray-500 transition-colors hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50 ${
            isHovered ? 'opacity-100' : 'opacity-0 sm:opacity-0'
          }`}
        >
          {isDeleting ? (
            <svg
              className="h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <TrashIcon className="h-4 w-4" />
          )}
        </button>
      </form>
    </div>
  );
}
