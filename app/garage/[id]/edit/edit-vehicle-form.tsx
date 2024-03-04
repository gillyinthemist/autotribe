'use client';
import { Button } from '../../../ui/button';
import { KeyIcon, ClockIcon, PencilIcon } from '@heroicons/react/24/outline';
import { useUpload } from '@/app/hooks/use-upload';
import UploadImage from '../../../ui/upload-image/upload-image';
import { VehicleDetails } from '@/app/lib/types';
import { numberPlate } from '../../../ui/fonts';
import clsx from 'clsx';
import { updateVehicle } from '@/app/lib/actions';

export default function EditVehicle({
  vehicle,
}: {
  vehicle: VehicleDetails | undefined;
}) {
  const upload = useUpload();

  function submit(formData: FormData) {
    updateVehicle(vehicle!.id, formData);
  }

  return (
    <form
      action={submit}
      className="flex w-full flex-col items-center gap-4 md:max-w-xl"
    >
      <input
        id="image"
        name="image"
        type="url"
        hidden
        value={upload.image?.secure_url || ''}
        readOnly
      />

      <div className="flex w-full flex-col items-center gap-4 rounded-lg bg-mag p-6">
        <UploadImage u={upload} />

        <input
          id="vrm"
          name="vrm"
          className={clsx(
            `${numberPlate.className} active w-full rounded-lg border-4 bg-yellow-400 p-1 text-center text-7xl uppercase text-black focus:outline-none md:max-w-xl`,
          )}
          type="text"
          autoComplete="off"
          defaultValue={vehicle!.vrm}
          placeholder="Enter Reg"
        />

        <div className="flex flex-wrap items-center justify-center gap-2">
          <label className="font-semibold text-night">Make:</label>
          <input
            type="text"
            name="make"
            className="h-10 rounded-lg border border-raisin bg-white p-1 pl-2 text-sm text-night"
            defaultValue={vehicle!.make}
          />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <label className="font-semibold text-night">Model:</label>
          <input
            type="text"
            name="model"
            className="h-10 rounded-lg border border-raisin bg-white p-1 pl-2 text-sm text-night"
            defaultValue={vehicle!.model}
          />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <label className="font-semibold text-night">Colour:</label>
          <input
            type="text"
            name="colour"
            className="h-10 rounded-lg border border-raisin bg-white p-1 pl-2 text-sm text-night"
            defaultValue={vehicle!.colour}
          />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <label className="font-semibold text-night">Year:</label>
          <input
            type="text"
            name="year"
            className="h-10 rounded-lg border border-raisin bg-white p-1 pl-2 text-sm text-night"
            defaultValue={vehicle!.year}
          />
        </div>
        <div className="flex w-full flex-wrap items-center justify-center gap-2">
          <label className="font-semibold text-night">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Describe your car, what you refer to it as, or the special features"
            className="h-10 w-full rounded-lg border border-raisin bg-white p-1 pl-2 text-sm text-night"
            defaultValue={vehicle!.description}
          />
        </div>
        <div className="flex gap-4">
          <div className="flex items-center">
            <input
              id="current"
              name="current"
              className="h-5 w-5 cursor-pointer border-grey bg-raisin text-night focus:ring-2"
              type="radio"
              value="true"
            />
            <label
              htmlFor="current"
              className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-xl bg-dun px-3 py-1.5 text-sm font-medium text-night"
            >
              <KeyIcon className="h-4 w-4" /> Current
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="previous"
              name="current"
              className="h-5 w-5 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
              type="radio"
              value="false"
              defaultChecked
            />
            <label
              htmlFor="previous"
              className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-xl bg-dun px-3 py-1.5 text-sm text-night"
            >
              <ClockIcon className="h-4 w-4" /> Previous
            </label>
          </div>
        </div>
      </div>

      <div className="mt-5 self-center">
        <Button type="submit">Update Vehicle</Button>
      </div>
    </form>
  );
}
