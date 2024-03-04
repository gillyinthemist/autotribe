'use server';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

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
        `https://uk1.ukvehicledata.co.uk/api/datapackage/VehicleImageData?v=2&api_nullitems=1&auth_apikey=${process.env.UKVD_API_KEY}&user_tag=&key_VRM=${vehicle.vrm}`,
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

export async function createEntry(formData: FormData) {
  const entry = Object.fromEntries(formData.entries());
  const added = new Date(Date.now()).toISOString();

  if (!entry.complete) entry.complete = 'false';

  try {
    await sql`INSERT INTO entries (vehicle_id, date_added, date_completed, entry, complete)
    VALUES(${entry.vehicle_id as string}, ${added}, ${entry.date_completed as string}, ${entry.entry as string}, ${entry.complete as string})
    `;
  } catch (error) {
    console.log(error);
    return { message: 'Database Error' };
  }

  revalidatePath(`/garage/${entry.vehicle_id}/details`);
}

export async function updateVehicle(id: string, formData: FormData) {
  const vehicle = Object.fromEntries(formData.entries());
  console.log(vehicle);

  //If image not updated, then dont pass it into SQL
  if (typeof vehicle.image !== 'string' || vehicle.image === '') {
    console.log('updating without image..');
    try {
      await sql`
          UPDATE vehicles SET vrm = ${vehicle.vrm as string}, make = ${vehicle.make as string}, model=${vehicle.model as string}, colour=${vehicle.colour as string}, year=${vehicle.year as string}, description=${vehicle.description as string}, current=${vehicle.current as string}
          WHERE id = ${id}
        `;
    } catch (error) {
      console.log(error);
      return { message: 'Database Error: Failed to Update vehicle.' };
    }
  } else {
    //else update image url
    try {
      await sql`
      UPDATE vehicles SET vrm = ${vehicle.vrm as string}, make = ${vehicle.make as string}, model=${vehicle.model as string}, colour=${vehicle.colour as string}, image=${vehicle.image}, year=${vehicle.year as string}, description=${vehicle.description as string}, current=${vehicle.current as string}
      WHERE id = ${id}
        `;
    } catch (error) {
      console.log(error);
      return { message: 'Database Error: Failed to Update vehicle.' };
    }
  }

  revalidatePath(`/garage/${id}/details`);
  revalidatePath('/garage');
  redirect(`/garage/${id}/details`);
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
