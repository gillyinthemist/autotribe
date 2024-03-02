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

export async function createVehicle(prevState: State, formData: FormData){
  const vrm = formData.get('vrm')?.toString().toUpperCase();
  const current = formData.get('current');
  const desc = formData.get('description');
  let image = formData.get('image');

  console.log(`Data from form:, REG: ${vrm}, current: ${current}, desc: ${desc}, image: ${image}`)
  //Hard coded for dev:
  const ownerId = "410544b2-4001-4271-9855-fec4b6a6442a";

  console.log("Retrieiving data from UKVD API for:", vrm, '...');
  try {
    //First query API
    const res = await fetch(`https://uk1.ukvehicledata.co.uk/api/datapackage/VehicleData?v=2&api_nullitems=1&auth_apikey=90c37424-9799-4426-a462-c6c71b0d2c32&user_tag=&key_VRM=${vrm}`);
    const resJson = await res.json();

    //If not successful, return error
    if(resJson.Response?.StatusCode !== "Success") return {error: resJson.Response.StatusMessage}
    //Otherwise, lets try to add to DB
    else {
      if(image === '') {
        console.log("No image uploaded so fetching from UKVD API for:", vrm, '...');
        const resImage = await fetch(`https://uk1.ukvehicledata.co.uk/api/datapackage/VehicleImageData?v=2&api_nullitems=1&auth_apikey=90c37424-9799-4426-a462-c6c71b0d2c32&user_tag=&key_VRM=${vrm}`);
        const resImageJson = await resImage.json();
        image = resImageJson.Response.DataItems.VehicleImages.ImageDetailsList[0].ImageUrl;
        console.log("Image URL successfully retrieved:", image);
      }
      const { Make, Model, Colour, YearOfManufacture } = resJson.Response.DataItems.VehicleRegistration;
      await sql`INSERT INTO vehicles (owner_id, vrm, make, model, colour, image, year, description, current)
      VALUES (${ownerId}, ${vrm}, ${Make}, ${Model}, ${Colour}, ${image as string}, ${YearOfManufacture}, ${desc as string}, ${current as string})
  `;
      console.log('Successfully added to DB: ', vrm, YearOfManufacture, Make, Model, Colour);
    }

  } catch (error) {
    console.error(error);
    return {
      error: "Error occured, Please try again",
    };
  }

  

  revalidatePath('/dashboard/garage');
  redirect('/dashboard/garage');
  
  
}