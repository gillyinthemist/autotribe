'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import {
  KeyIcon,
  ClockIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';

export default function FilterButtons() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Initialize filter from URL or default to empty string (currently owned)
  const initialFilter = searchParams.get('filter') || '';
  const [filter, setFilter] = useState(initialFilter);

  // Update filter when URL changes
  useEffect(() => {
    setFilter(searchParams.get('filter') || '');
  }, [searchParams]);

  function handleChange(filterBy: string = '') {
    // Create an instance of the CURRENT search params
    const params = new URLSearchParams(searchParams.toString());

    // Then add the search parameter as 'filter' to the instance if exists
    if (filterBy) {
      params.set('filter', filterBy);
      setFilter(filterBy);
    } else {
      params.delete('filter');
      setFilter('');
    }

    // Then replace the route in the URL with the new instance with the new query
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex w-full flex-wrap gap-3">
      <button
        onClick={() => handleChange('')}
        className={clsx(
          'flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 sm:text-base',
          {
            'bg-blue-500 text-white shadow-md hover:bg-blue-600': filter === '',
            'bg-gray-700 text-gray-300 hover:bg-gray-600': filter !== '',
          },
        )}
      >
        <KeyIcon className="h-5 w-5" />
        <span>Currently Owned</span>
      </button>

      <button
        onClick={() => handleChange('previous')}
        className={clsx(
          'flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 sm:text-base',
          {
            'bg-blue-500 text-white shadow-md hover:bg-blue-600':
              filter === 'previous',
            'bg-gray-700 text-gray-300 hover:bg-gray-600':
              filter !== 'previous',
          },
        )}
      >
        <ClockIcon className="h-5 w-5" />
        <span>Previously Owned</span>
      </button>

      <button
        onClick={() => handleChange('all')}
        className={clsx(
          'flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 sm:text-base',
          {
            'bg-blue-500 text-white shadow-md hover:bg-blue-600':
              filter === 'all',
            'bg-gray-700 text-gray-300 hover:bg-gray-600': filter !== 'all',
          },
        )}
      >
        <Squares2X2Icon className="h-5 w-5" />
        <span>All Vehicles</span>
      </button>
    </div>
  );
}
