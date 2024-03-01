import Image from 'next/image';
import { VehicleDetails } from '../../lib/definitions';
import { numberPlate } from '../fonts';

export default function VehicleOverview({
  vehicle,
}: {
  vehicle: VehicleDetails | undefined;
}) {
  return (
    <div className=" flex basis-1/4 flex-col gap-4 p-6">
      <div className="relative h-[400px] overflow-hidden rounded-xl">
        <Image
          alt="car"
          src={vehicle?.image || ''}
          fill={true}
          className="h-full w-full object-cover object-left"
        />
      </div>
      <div className="aspect-[5/1] bg-yellow-400 p-1 rounded-lg">
        <p className= {`${numberPlate.className} text-7xl text-center uppercase text-black`}>
          {vehicle?.vrm}
        </p>
      </div>
      <div className="flex flex-col gap-4 rounded-xl text-center bg-grey p-6">
        <p>
          <strong>Description</strong>
        </p>
        <p> {vehicle?.description}</p>
      </div>
      <div className="flex flex-col gap-4 rounded-xl bg-grey p-6">
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
      <div className="flex flex-col gap-4 rounded-xl text-center bg-grey p-6">
        <p>
          <strong>MOT</strong>
        </p>
        <p> {vehicle?.mot}</p>
      </div>
      <div className="flex flex-col gap-4 rounded-xl text-center bg-grey p-6">
        <p>
          <strong>Tax</strong>
        </p>
        <p> {vehicle?.tax}</p>
      </div>
    </div>
  );
}
