import { sql } from '@vercel/postgres';
import { User, Vehicle } from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchOwnedVehicles (ownerId:string, filterBy:string) {
  noStore();
    // Add noStore() here to prevent the response from being cached.
    // This is equivalent to in fetch(..., {cache: 'no-store'}).
    if(!filterBy){
      try {
        console.log('Fetching owned vehicles...');
        const vehicles = await sql<Vehicle>`SELECT * FROM vehicles WHERE owner_id = ${ownerId}`
        return vehicles.rows;
      } catch (error) {
        console.error('Database Error:', error);
        // throw new Error('Failed to fetch vehicle data.');
      }
    } else {
      try {
        console.log('Fetching filtered vehicles...');
        const vehicles = await sql<Vehicle>`SELECT * FROM vehicles WHERE owner_id = ${ownerId} AND current = ${true ? filterBy === "current" : false}`
        return vehicles.rows;
      } catch (error) {
        console.error('Database Error:', error);
        // throw new Error('Failed to fetch vehicle data.');
      }
    }
    
}