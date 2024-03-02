'use client';
import { useDebouncedCallback } from 'use-debounce';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';

import { numberPlate } from '../fonts';

export default function EnterReg({className} : {className: string | undefined} ) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  
  const handleReg = useDebouncedCallback((vrm:string) => {
    console.log(`Searching... ${vrm}`);
    //create an instance of the CURRENT search params
    const params = new URLSearchParams(searchParams);
    //Then add the search parameter as 'vrm' to the instance if exists
    if (vrm) {
      //remove spaces
      vrm = vrm.replace(/\s/g, '');
      params.set('vrm', vrm);
    } else {
      params.delete('vrm');
    }
    //then replace the route in the URL with the new instance with the new query
    replace(`${pathname}?${params.toString()}`);
  },300);

  return (
      <input
        id="vrm"
        name="vrm"
        className={clsx(`${numberPlate.className} w-full rounded-lg active bg-yellow-400 focus:outline-none md:max-w-xl p-1 text-center text-7xl uppercase text-black`, className)}
        type="text"
        autoComplete='off'
        onChange={e => handleReg(e.target.value)}
        placeholder="Enter Reg"/>
  );
}
