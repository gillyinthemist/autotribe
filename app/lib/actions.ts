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
  let image = formData.get('image')?.toString()
  //Hard coded for dev:
  const ownerId = "410544b2-4001-4271-9855-fec4b6a6442a"
  // const images = "https://cdn2.vdicheck.com/VehicleImages/Image.ashx?Id=D60EEA64-5825-4AC2-A761-B1F3AE2BF21D";
  const description = 'Testing API Call save to DB'
  const current = false;
  console.log(vrm);
  try {
    //First query API
    const res = await fetch(`https://uk1.ukvehicledata.co.uk/api/datapackage/VehicleData?v=2&api_nullitems=1&auth_apikey=90c37424-9799-4426-a462-c6c71b0d2c32&user_tag=&key_VRM=${vrm}`);
    const resJson = await res.json();

    //If not successful, return error
    if(resJson.Response?.StatusCode !== "Success") return {error: resJson.Response.StatusMessage}
    
    //Otherwise, lets try to add to DB
    else {
      if(image == "") {
        const resImage = await fetch(`https://uk1.ukvehicledata.co.uk/api/datapackage/VehicleImageData?v=2&api_nullitems=1&auth_apikey=90c37424-9799-4426-a462-c6c71b0d2c32&user_tag=&key_VRM=${vrm}`);
        const resImageJson = await resImage.json();
        image = resImageJson.Response.DataItems.VehicleImages.ImageDetailsList[0].ImageUrl;
        console.log(image)
      }
      const { Make, Model, Colour, YearOfManufacture } = resJson.Response.DataItems.VehicleRegistration;
      await sql`INSERT INTO vehicles (owner_id, vrm, make, model, colour, image, year, description, current)
      VALUES (${ownerId}, ${vrm}, ${Make}, ${Model}, ${Colour}, ${image}, ${YearOfManufacture}, ${description}, ${current})
  `;
      console.log(Make, Model, Colour, YearOfManufacture);
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