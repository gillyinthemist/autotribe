const { db } = require('@vercel/postgres');
const { vehicles, users } = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');


async function seedVehicles(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`DROP TABLE vehicles`;

    // Create the "vehicles" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE vehicles (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        owner_id UUID NOT NULL,
        vrm VARCHAR(255) NOT NULL,
        make VARCHAR(255) NOT NULL,
        model VARCHAR(255) NOT NULL,
        colour VARCHAR(255) NOT NULL,
        image VARCHAR(1000) NOT NULL,
        year VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        current BOOLEAN NOT NULL
      );
    `;

    console.log(`Created "vehicles" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error seeding vehicles:', error);
    throw error;
  }
}

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`DROP TABLE users`;

    // Create the "vehicles" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        profile_pic VARCHAR(1000) NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
    INSERT INTO users (id, first_name, last_name, username, email, password, profile_pic)
    VALUES (${user.id}, ${user.first_name}, ${user.last_name}, ${user.username}, ${user.email}, ${hashedPassword}, ${user.profile_pic})
    ON CONFLICT (id) DO NOTHING;
  `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedVehicles(client);
  // await seedUsers(client);
  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
