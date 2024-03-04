import Image from 'next/image';
import { VehicleDetails } from '../../../lib/types';
import { numberPlate } from '../../../ui/fonts';
import { fetchTaxMot } from '@/app/lib/data';
import { PencilIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default async function VehicleOverview({
  vehicle,
}: {
  vehicle: VehicleDetails;
}) {
  let motAndTax = {
    VehicleHasCurrentMot: false,
    DaysUntilNextMotIsDue: 0,
    NextMotDueDate: '01/01/2000',
    MotVed: {
      VedCurrentlyValid: false,
      VedExpiryDate: null,
      VedDaysRemaining: null,
    },
    error: false,
  };

  if (vehicle.current) {
    motAndTax = await fetchTaxMot(vehicle.vrm);
  }

  return (
    <div className=" flex basis-1/4 flex-col gap-4">
      <div className="relative aspect-square overflow-hidden  rounded-xl">
        <Image
          alt="car"
          src={vehicle?.image || ''}
          height={300}
          width={300}
          className="h-full w-full object-cover"
        />
        <Link href={`/garage/${vehicle.id}/edit`}>
          <PencilIcon className="absolute right-2 top-2 z-40 h-8 w-8 text-raisin drop-shadow-lg hover:text-dun" />
        </Link>
      </div>
      <div className="flex items-center justify-center rounded-lg bg-yellow-400 p-1">
        <p className={`${numberPlate.className} text-7xl uppercase text-black`}>
          {vehicle?.vrm}
        </p>
      </div>
      <div className="flex flex-col gap-2 rounded-xl bg-grey p-5 text-center">
        <p>
          <strong>Description</strong>
        </p>
        <p> {vehicle?.description}</p>
      </div>
      <div className="flex flex-col gap-2 rounded-xl bg-grey p-5">
        <p>
          <strong>Make:</strong> {vehicle?.make}
        </p>
        <p>
          <strong>Model:</strong> {vehicle?.model}
        </p>
        <p>
          <strong>Year:</strong> {vehicle?.year}
        </p>
        <p>
          <strong>Colour:</strong> {vehicle?.colour}
        </p>
      </div>
      {vehicle.current && !motAndTax.error && (
        <div className="flex w-full flex-row gap-2">
          <div className="flex basis-1/2 flex-col gap-2 rounded-xl bg-grey p-5 text-center">
            <p>
              <strong>MOT Status</strong>
            </p>
            {motAndTax.VehicleHasCurrentMot ? (
              <p>{motAndTax.DaysUntilNextMotIsDue} days remaining</p>
            ) : (
              <p>Expired</p>
            )}
          </div>
          <div className="flex basis-1/2 flex-col gap-2 rounded-xl bg-grey p-5 text-center">
            <p>
              <strong>Tax Status</strong>
            </p>
            {motAndTax.MotVed.VedCurrentlyValid ? (
              <p>{motAndTax.MotVed.VedDaysRemaining} days remaining</p>
            ) : (
              <p>SORN</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
