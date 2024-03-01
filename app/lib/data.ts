import { sql } from '@vercel/postgres';
import { User, UserProfile, VehicleDetails, VehicleCard } from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchOwnedVehicles (ownerId:string, filterBy:string) {
  noStore();
    // Add noStore() here to prevent the response from being cached.
    // This is equivalent to in fetch(..., {cache: 'no-store'}).
    if(!filterBy){
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
        const vehicles = await sql<VehicleCard>`SELECT id, make, model, image FROM vehicles WHERE owner_id = ${ownerId} AND current = ${true ? filterBy === "current" : false}`
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