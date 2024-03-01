'use client';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { Button } from '../button';
import { createVehicle } from '@/app/lib/actions';

export default function Form() {
  const initialState = {error: null};
  const [state, dispatch] = useFormState(createVehicle, initialState);

  return (
    <form action={dispatch} className="flex flex-col gap-4">
      <input
        id="vrm"
        name="vrm"
        className="text-night"
        type="text"
        placeholder="Enter Reg"
      />
    <input
        id="image"
        name="image"
        className="text-night"
        type="url"
        placeholder="Enter image URL"
      />
      <div>{state.error && <p>{state.error}</p>}</div>
      <Button type="submit">Add Vehicle</Button>
    </form>
  );
}
