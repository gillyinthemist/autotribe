'use client';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { Button } from '../button';
import { createVehicle } from '@/app/lib/actions';
import { numberPlate } from '../fonts';

export default function Form() {
  const initialState = {error: null};
  const [state, dispatch] = useFormState(createVehicle, initialState);

  return (
    <form action={dispatch} className="flex flex-col items-center w-full gap-4 md:max-w-xl">
        <input
        id="vrm"
        name="vrm"
        className={`${numberPlate.className} rounded-lg w-full bg-yellow-400 p-1 text-center text-7xl uppercase text-black`}
        type="text"
        placeholder="Enter Reg"
      />
    <div>{state.error && <p>{state.error}</p>}</div>
    <input
        id="image"
        name="image"
        className="text-night p-3 rounded-lg"
        type="url"
        placeholder="Enter image URL"
      />
      <div className="self-center">
        <Button type="submit">Add Vehicle</Button>
      </div>
      
    </form>
  );
}
