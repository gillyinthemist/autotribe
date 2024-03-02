'use client';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { Button } from '../button';
import { createVehicle } from '@/app/lib/actions';
import { numberPlate } from '../fonts';
import { CldUploadButton, CloudinaryUploadWidgetInfo } from 'next-cloudinary';
import { useState } from 'react';

export default function Form() {
  const initialState = { error: null };
  const [state, dispatch] = useFormState(createVehicle, initialState);
  const [imageURL, setImageURL] = useState('');

  return (
    <form
      action={dispatch}
      className="flex w-full flex-col items-center gap-4 md:max-w-xl"
    >
      <input
        id="vrm"
        name="vrm"
        className={`${numberPlate.className} w-full rounded-lg bg-yellow-400 p-1 text-center text-7xl uppercase text-black`}
        type="text"
        placeholder="Enter Reg"
      />
      <div>{state.error && <p>{state.error}</p>}</div>
      <CldUploadButton
        uploadPreset="srzwfbhg"
        onSuccess={(res) => setImageURL((res.info as CloudinaryUploadWidgetInfo).secure_url)}
      />
      {imageURL && (
        <input
          id="image"
          name="image"
          className="rounded-lg p-3 text-night"
          type="url"
          placeholder="Enter image URL"
          value={imageURL}
          readOnly
        />
      )}

      <div className="self-center">
        <Button type="submit">Add Vehicle</Button>
      </div>
    </form>
  );
}
