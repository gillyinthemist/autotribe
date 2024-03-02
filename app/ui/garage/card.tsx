import Image from 'next/image';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteVehicle } from '@/app/lib/actions';

export function Card({ vehicle }: any) {
  const deleteVehicleWithId = deleteVehicle.bind(null, vehicle.id);

  return (
    <div className="flex h-[300px] w-[300px] flex-col overflow-hidden rounded-xl">
      <div className="relative flex-grow">
        <Link href={`garage/${vehicle.id}/details`}>
          <Image
            alt="car"
            src={vehicle.image}
            fill={true}
            className="h-full w-full object-cover object-left"
          />
        </Link>
        <form action={deleteVehicleWithId}>
          <button>
            <XMarkIcon className="absolute right-1 top-1 z-40 h-10 w-10 text-raisin drop-shadow-lg hover:text-dun" />
          </button>
        </form>
      </div>
      <div className="z-10 h-[50px] bg-raisin p-3 text-center">
        <p>
          {vehicle.make} {vehicle.model} {vehicle.year}
        </p>
      </div>
    </div>
  );
}
