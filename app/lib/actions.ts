'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// const AddVehicleFormSchema = z.object({
//   id: z.string(),
//   ownerId: z.string(),
//   vrm: z.coerce.string(),
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

export async function createVehicle(formData: FormData) {
  const vehicle = Object.fromEntries(formData.entries());
  vehicle.vrm = vehicle.vrm.toString().toUpperCase();
  console.log(vehicle);

  const ownerId = '410544b2-4001-4271-9855-fec4b6a6442a';

  try {
    if (typeof vehicle.image !== 'string' || vehicle.image === '') {
      console.log(
        'No image uploaded so fetching from UKVD API for:',
        vehicle.vrm,
        '...',
      );

      const resImage = await fetch(
        `https://uk1.ukvehicledata.co.uk/api/datapackage/VehicleImageData?v=2&api_nullitems=1&auth_apikey=90c37424-9799-4426-a462-c6c71b0d2c32&user_tag=&key_VRM=${vehicle.vrm}`,
      );
      const resImageJson = await resImage.json();
      vehicle.image =
        resImageJson.Response.DataItems.VehicleImages.ImageDetailsList[0].ImageUrl;
      console.log('Image URL successfully retrieved:', vehicle.image);
    }
    await sql`INSERT INTO vehicles (owner_id, vrm, make, model, colour, image, year, description, current)
      VALUES (${ownerId}, ${vehicle.vrm}, ${vehicle.make as string}, ${vehicle.model as string}, ${vehicle.colour as string}, ${vehicle.image as string}, ${vehicle.year as string}, ${vehicle.description as string}, ${vehicle.current as string})
   `;
    console.log('Successfully added to DB: ', vehicle.vrm);
  } catch (error) {
    console.error(error);
    return {
      error: 'Error occured, Please try again',
    };
  }
  revalidatePath('/garage');
  redirect('/garage');
}

export async function deleteVehicle(id: string) {
  try {
    await sql`DELETE FROM vehicles WHERE id = ${id}`;
    revalidatePath('/garage');
    return { message: 'Deleted Car.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Vehicle.' };
  }
}


export async function deleteEntry(entry_id: string, vehicle_id: string) {
  try {
    await sql`DELETE FROM entries WHERE id = ${entry_id}`;
    revalidatePath(`/garage/${vehicle_id}/details`);
    return { message: 'Deleted Entry.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Entry' };
  }
}