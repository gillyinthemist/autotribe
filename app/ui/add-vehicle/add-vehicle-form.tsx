'use client';
import { useFormState } from 'react-dom';
import { Button } from '../button';
import { createVehicle } from '@/app/lib/actions';
import { KeyIcon, ClockIcon } from '@heroicons/react/24/outline';
import { useUpload } from '@/app/hooks/use-upload';
import UploadImage from '../upload-image/upload-image';
import { useSearchParams } from 'next/navigation';


export default function Form() {
  const searchParams = useSearchParams();
  const vrm = searchParams.get('vrm') || '';
  const upload = useUpload();
  const initialState = { error: null };
  const [state, dispatch] = useFormState(createVehicle, initialState);

  return (
    <form
      action={dispatch}
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

        <h2 className="text-night text-lg font-semibold">Is this a current or previously owned car?</h2>
        <div className='flex gap-4'>
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
        <h2 className="text-night text-lg font-semibold">Write a description for your car</h2>
        <input
					type='text'
          id="description"
          name="description"
          placeholder='Describe your car, what you refer to it as, or the special features'
					className='w-full h-10 text-sm p-1 bg-white text-night pl-2 border border-raisin rounded-lg'
          defaultValue={""}
				/>

      </div>

      <UploadImage u={upload} />

      <div>{state.error && <p>{state.error}</p>}</div>
      <div className="mt-5 self-center">
        <Button type="submit">Add Vehicle</Button>
      </div>
    </form>
  );
}
