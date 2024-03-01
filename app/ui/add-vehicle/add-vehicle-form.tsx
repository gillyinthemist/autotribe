'use client';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { Button } from '../button';
import { createVehicle } from '@/app/lib/actions';

export default function Form() {
  const initialState = { error: null };
  const [state, dispatch] = useFormState(createVehicle, initialState);

  return (
    <form action={dispatch}>
      <input
        id="vrm"
        name="vrm"
        className="text-night"
        type="text"
        placeholder="Enter Reg"
      />
      <div>{state.error && <p>{state.error}</p>}</div>
      <Button type="submit">Add Vehicle</Button>
    </form>
  );
}
