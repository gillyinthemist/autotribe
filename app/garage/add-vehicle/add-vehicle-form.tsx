'use client';
import { useFormState } from 'react-dom';
import { Button } from '../../ui/button';
import { createVehicle } from '@/app/lib/actions';
import { KeyIcon, ClockIcon } from '@heroicons/react/24/outline';
import { useUpload } from '@/app/hooks/use-upload';
import UploadImage from '../../ui/upload-image/upload-image';
import { useSearchParams } from 'next/navigation';

export default function Form({ newVehicle }: any) {
  const searchParams = useSearchParams();
  const vrm = searchParams.get('vrm') || '';
  const upload = useUpload();
  // const [state, dispatch] = useFormState(createVehicle, initialState);

  return (
    <form
      action={createVehicle}
      className="flex w-full flex-col items-center gap-4 md:max-w-xl"
    >
      <input id="vrm" name="vrm" type="text" value={vrm} hidden readOnly />

      <input
        id="image"
        name="image"
        type="url"
        hidden
        value={upload.image?.secure_url || ''}
        readOnly
      />

      <div className="flex w-full flex-col items-center gap-4 rounded-lg bg-mag p-6">
        <h2 className="text-lg font-semibold text-night">Vehicle Details:</h2>
        <div className="flex flex-row gap-0 flex-wrap items-center justify-center">
          <label className="font-semibold text-night">Make:</label>
          <input
            type="text"
            name="make"
            className="w-0 border-raisin bg-transparent bg-white text-sm text-night"
            value={newVehicle.make}
            readOnly
          />
          <p className="text-night pl-1 pr-2">{newVehicle.make}</p>
          <label className="font-semibold text-night">Model:</label>
          <input
            type="text"
            name="model"
            className="w-0 border-raisin bg-transparent bg-white text-sm text-night"
            value={newVehicle.model}
            readOnly
          />
          <p className="text-night pl-1 pr-2">{newVehicle.model}</p>

          <label className="font-semibold text-night">Colour:</label>
          <input
            type="text"
            name="colour"
            className="w-0 border-raisin bg-transparent bg-white text-sm text-night"
            value={newVehicle.colour}
            readOnly
          />
          <p className="text-night pl-1 pr-2">{newVehicle.colour}</p>

          <label className="font-semibold text-night">Year:</label>
          <input
            type="text"
            name="year"
            className="w-0 border-raisin bg-transparent bg-white text-sm text-night"
            value={newVehicle.year}
            readOnly
          />
          <p className="text-night pl-1 pr-2">{newVehicle.year}</p>
        </div>
      </div>

      <div className="flex w-full flex-col items-center gap-4 rounded-lg bg-mag p-6">
        <h2 className="text-lg font-semibold text-night">
          Is this a current or previously owned car?
        </h2>
        <div className="flex gap-4">
          <div className="flex items-center">
            <input
              id="current"
              name="current"
              className="h-5 w-5 cursor-pointer border-grey bg-raisin text-night focus:ring-2"
              type="radio"
              value="true"
              defaultChecked
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

      <div className="flex w-full flex-col items-center gap-4 rounded-lg bg-mag p-6">
        <h2 className="text-lg font-semibold text-night">
          Write a description for your car
        </h2>
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Describe your car, what you refer to it as, or the special features"
          className="h-10 w-full rounded-lg border border-raisin bg-white p-1 pl-2 text-sm text-night"
          defaultValue={''}
        />
      </div>

      <UploadImage u={upload} />

      <div className="mt-5 self-center">
        <Button type="submit">Add Vehicle</Button>
      </div>
    </form>
  );
}
