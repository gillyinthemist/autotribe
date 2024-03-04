import { sql } from '@vercel/postgres';
import { UserProfile, VehicleDetails, VehicleCard } from './definitions';

export async function fetchOwnedVehicles (ownerId:string, filterBy:string) {
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

export async function fetchDiaryEntries(id:string){
  try {
    console.log('Fetching diary entries by id...');
    const entries = await sql `SELECT * FROM entries WHERE vehicle_id = ${id}`
    // console.log('Fetched', entries.rows);
    return entries.rows;
  } catch (error) {
    console.error('Database Error:', error);
    // throw new Error('Failed to fetch vehicle data.');
  }
}

export async function fetchVehicleByReg(vrm:string) {
  try {
    //query API to see if its a valid reg using UKVD API endpoint and get response
    const res = await fetch(`https://uk1.ukvehicledata.co.uk/api/datapackage/VehicleData?v=2&api_nullitems=1&auth_apikey=90c37424-9799-4426-a462-c6c71b0d2c32&user_tag=&key_VRM=${vrm}`);
    const resJson = await res.json();
    
    let details = {}
    if (resJson.Response?.StatusCode === 'Success'){

      //Deconstruct response and make an object with result
      const { Make, Model, Colour, YearOfManufacture } = resJson.Response.DataItems?.VehicleRegistration;
      details = {
        make: Make,
        model: Model,
        colour: Colour,
        year: YearOfManufacture
      }
    }
    
    //return result and spread details in
    const result = {
      status: resJson.Response?.StatusCode,
      message: resJson.Response?.StatusMessage,
      ...details
    }
    return result;
} catch (error) {
  console.error('Failed to validate VRM:',error)
}

}

export async function fetchVehicleById(id:string){

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
    
    else {
    return resJson.Response.DataItems.VehicleStatus;
    }

  } catch (error) {
    console.error(error);
    return {
      error: "Error occured, Please try again",
    };
  }
}

