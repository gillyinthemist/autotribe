const { db } = require('@vercel/postgres');
const { vehicles } = require('../app/lib/placeholder-data.js');

async function seedVehicles(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "vehicles" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS vehicles (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        owner_id UUID NOT NULL,
        vrm VARCHAR(255) NOT NULL,
        make VARCHAR(255) NOT NULL,
        model VARCHAR(255) NOT NULL,
        colour VARCHAR(255) NOT NULL,
        images VARCHAR(1000) ARRAY NOT NULL,
        description VARCHAR(255) NOT NULL,
        current BOOLEAN NOT NULL
      );
    `;

    console.log(`Created "vehicles" table`);

    // Insert data into the "vehicles" table
    const insertedVehicles = await Promise.all(
      vehicles.map(
        (vehicle) => client.sql`
        INSERT INTO vehicles (id, owner_id, vrm, make, model, colour, images, description, current)
        VALUES (${vehicle.id}, ${vehicle.owner_id}, ${vehicle.vrm}, ${vehicle.make}, ${vehicle.model}, ${vehicle.colour}, ${vehicle.images}, ${vehicle.description}, ${vehicle.current})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedVehicles.length} vehicles`);

    return {
      createTable,
      vehicles: insertedVehicles,
    };
  } catch (error) {
    console.error('Error seeding vehicles:', error);
    throw error;
  }
}


async function main() {
  const client = await db.connect();

  await seedVehicles(client);
  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
