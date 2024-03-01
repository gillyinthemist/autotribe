'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Button } from '../button';
import clsx from 'clsx';
import { useState } from 'react';

export default function FilterButtons() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [filter, setFilter] = useState('')
  
  function handleChange(filterBy: string = '') {
    console.log();
    //create an instance of the CURRENT search params
    const params = new URLSearchParams(searchParams);
    //Then add the search parameter as 'query' to the instance if exists
    if (filterBy) {
      params.set('filter', filterBy);
      setFilter(filterBy)
    } else {
      params.delete('filter');
      setFilter('')
    }
    //then replace the route in the URL with the new instance with the new query
    replace(`${pathname}?${params.toString()}`);
  }
  return (
    <div className="flex gap-2">
      <Button onClick={() => handleChange('')} className={clsx({"text-night bg-white" : filter === ''})}>Currently Owned</Button>
      <Button onClick={() => handleChange('previous')} className={clsx({"text-night bg-white" : filter === 'previous'})}>Previously Owned</Button>
      <Button onClick={() => handleChange('all')} className={clsx({"text-night bg-white" : filter === 'all'})}>All</Button>
    </div>
  );
}
