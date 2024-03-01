'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function FilterButtons() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleChange(filterBy: string = '') {
    console.log(`filter by... ${filterBy}`);
    //create an instance of the CURRENT search params
    const params = new URLSearchParams(searchParams);
    //Then add the search parameter as 'query' to the instance if exists
    if (filterBy) {
      params.set('filter', filterBy);
    } else {
      params.delete('filter');
    }
    //then replace the route in the URL with the new instance with the new query
    replace(`${pathname}?${params.toString()}`);
  }
  return (
    <div className="flex gap-2">
      <button onClick={() => handleChange('')}>All</button>
      <button onClick={() => handleChange('current')}>current</button>
      <button onClick={() => handleChange('previous')}>previous</button>
    </div>
  );
}
