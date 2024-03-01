import Image from 'next/image';
import { VehicleDetails } from '../../lib/definitions';
import { numberPlate } from '../fonts';
import { fetchTaxMot } from '@/app/lib/data';

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
          fill={true}
          className="h-full w-full object-cover object-left"
        />
      </div>
      <div className="aspect-[5/1] rounded-lg bg-yellow-400 p-1">
        <p
          className={`${numberPlate.className} text-center text-7xl uppercase text-black`}
        >
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
      {vehicle.current && (
        <div className="flex flex-row gap-2 w-full">
          <div className="flex flex-col basis-1/2 gap-2 rounded-xl bg-grey p-5 text-center">
            <p>
              <strong>MOT Status</strong>
            </p>
            {motAndTax.VehicleHasCurrentMot ? <p>{motAndTax.DaysUntilNextMotIsDue} days remaining</p> : <p>Expired</p>}
          </div>
          <div className="flex flex-col basis-1/2 gap-2 rounded-xl bg-grey p-5 text-center">
            <p>
              <strong>Tax Status</strong>
            </p>
            {motAndTax.MotVed.VedCurrentlyValid ? <p>{motAndTax.MotVed.VedDaysRemaining} days remaining</p> : <p>SORN</p>}
          </div>
        </div>
      )}
    </div>
  );
}
