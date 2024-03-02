'use client';
import { useFormState } from 'react-dom';
import { Button } from '../button';
import { createVehicle } from '@/app/lib/actions';
import { numberPlate } from '../fonts';
import { useState } from 'react';
import { useUpload } from '@/app/hooks/use-upload';
import UploadImage from '../upload-image/upload-image';
import EnterReg from './enter-reg';
import { useSearchParams } from 'next/navigation';


export default function Form() {
  const searchParams = useSearchParams();
  const vrm = searchParams.get('vrm') || '';
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
        type="text"
        value={vrm}
        hidden
        readOnly
      />
      
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
      
      <div>{state.error && <p>{state.error}</p>}</div>
      <div className="self-center mt-5">
        <Button type="submit">Add Vehicle</Button>
      </div>

    </form>
  );
}
