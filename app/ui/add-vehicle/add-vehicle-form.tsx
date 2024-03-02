'use client';
import { useFormState } from 'react-dom';
import { Button } from '../button';
import { createVehicle } from '@/app/lib/actions';
import { numberPlate } from '../fonts';
import { useState } from 'react';
import { useUpload } from '@/app/hooks/use-upload';
import UploadImage from '../upload-image/upload-image';


export default function Form() {
  const u = useUpload();
  const initialState = { error: null };
  const [state, dispatch] = useFormState(createVehicle, initialState);

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

      {u.image?.secure_url! && (
        <input
          id="image"
          name="image"
          className="rounded-lg p-3 text-night"
          type="url"
          placeholder="Enter image URL"
          hidden
          value={u.image?.secure_url!}
          readOnly
        />
      )}

      <UploadImage u={u}/>
      
      <div className="self-center">
        <Button type="submit">Add Vehicle</Button>
      </div>

    </form>
  );
}
