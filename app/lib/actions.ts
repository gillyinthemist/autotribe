'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// const AddVehicleFormSchema = z.object({
//   id: z.string(),
//   ownerId: z.string(),
//   vrm: z.string(),
//   make: z.string(),
//   model: z.string(),
//   colour: z.string(),
//   images: z.array(z.string()),
//   description: z.string(),
//   current: z.boolean(),
// });

export type State = {  
  error?: string | null;
};

export async function createVehicle(prevState: State, formData: FormData){
  const vrm = formData.get('vrm');
  console.log(vrm);
  try {
    const res = await fetch("https://uk1.ukvehicledata.co.uk/api/datapackage/VehicleData?v=2&api_nullitems=1&auth_apikey=90c37424-9799-4426-a462-c6c71b0d2c32&user_tag=&key_VRM=e30asg");
    const resJson = await res.json();

    if(resJson.Response?.StatusCode !== "Success"){
      console.log(resJson.Response.StatusMessage);
      throw new Error()
    } else {
      const { Make, Model, Colour, YearOfManufacture } = resJson.Response.DataItems.VehicleRegistration;
      
      console.log(Make, Model, Colour, YearOfManufacture);
    }
  } catch (error) {
    return {
      error: "Invalid Reg",
    };
  }
  return {};
  
}