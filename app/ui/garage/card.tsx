import Image from 'next/image';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function Card({ vehicle }: any) {
  return (
    <div className="flex flex-col w-[300px] h-[300px] rounded-xl overflow-hidden">
      <div className="flex-grow relative">
      <Link href={`garage/${vehicle.id}/details`}>
      <Image
        alt="car"
        src={vehicle.image}
        fill={true}
        className="object-cover object-left w-full h-full"
      />
      </Link>
      <Link href={"/"}>
        <XMarkIcon className="h-10 w-10 absolute top-0 right-0 z-40"/>
      </Link>
      
      </div>
      <div className="h-[50px] bg-raisin p-3 text-center z-10">
        <p>{vehicle.make} {vehicle.model}</p>
        
      </div>
    </div>
  );
}

