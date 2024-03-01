import { sql } from '@vercel/postgres';
import { User, UserProfile, VehicleDetails, VehicleCard } from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchOwnedVehicles (ownerId:string, filterBy:string) {
  noStore();
    // Add noStore() here to prevent the response from being cached.
    // This is equivalent to in fetch(..., {cache: 'no-store'}).
    if(filterBy === 'all'){
      try {
        console.log('Fetching owned vehicles...');
        const vehicles = await sql<VehicleCard>`SELECT id, make, model, image FROM vehicles WHERE owner_id = ${ownerId}`
        return vehicles.rows;
      } catch (error) {
        console.error('Database Error:', error);
        // throw new Error('Failed to fetch vehicle data.');
      }
    } else {
      try {
        console.log('Fetching filtered vehicles...');
        const vehicles = await sql<VehicleCard>`SELECT id, make, model, image FROM vehicles WHERE owner_id = ${ownerId} AND current = ${true ? filterBy === "" : false}`
        return vehicles.rows;
      } catch (error) {
        console.error('Database Error:', error);
        // throw new Error('Failed to fetch vehicle data.');
      }
    }
}


export async function fetchVehicleById(id:string){
  noStore();
  try {
    console.log('Fetching owned vehicles...');
    const vehicle = await sql<VehicleDetails>`SELECT * FROM vehicles WHERE id = ${id}`
    return vehicle.rows[0];

  } catch (error) {
    console.error('Database Error:', error);
    // throw new Error('Failed to fetch vehicle data.');
  }
}

export async function fetchUserProfileById(id:string){
  noStore();
  try {
    console.log('Fetching owned vehicles...');
    const user = await sql<UserProfile>`SELECT id, first_name, last_name, username, profile_pic FROM users WHERE id = ${id}`
    return user.rows[0];

  } catch (error) {
    console.error('Database Error:', error);
    // throw new Error('Failed to fetch vehicle data.');
  }
}

export async function fetchTaxMot(vrm:string){
  try {
    //First query API
    const res = await fetch(`
    https://uk1.ukvehicledata.co.uk/api/datapackage/MotHistoryAndTaxStatusData?v=2&api_nullitems=1&auth_apikey=90c37424-9799-4426-a462-c6c71b0d2c32&user_tag=&key_VRM=${vrm}`);
    const resJson = await res.json();

    //If not successful, return error
    if(resJson.Response?.StatusCode !== "Success") return {error: resJson.Response.StatusMessage}
    
    //Otherwise, lets try to add to DB
    else {
  //     await sql`INSERT INTO vehicles (owner_id, vrm, make, model, colour, image, year, description, current)
  //     VALUES (${ownerId}, ${vrm}, ${Make}, ${Model}, ${Colour}, ${image}, ${YearOfManufacture}, ${description}, ${current})
  // `;
    return resJson.Response.DataItems.VehicleStatus;
    }

  } catch (error) {
    console.error(error);
    return {
      error: "Error occured, Please try again",
    };
  }
}