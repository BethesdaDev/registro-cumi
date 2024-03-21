const { db } = require('@vercel/postgres');
const {
  entradas,
  customers,
  salidas,
  users,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, username, password)
        VALUES (${user.id}, ${user.name}, ${user.username}, ${hashedPassword})
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

async function seedEntradas(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS entradas (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    interno_id UUID NOT NULL,
    date DATE NOT NULL
  );
`;

    console.log(`Created "invoices" table`);

    // Insert data into the "invoices" table
    const insertedInvoices = await Promise.all(
      entradas.map(
        (invoice) => client.sql`
        INSERT INTO entradas (interno_id, date)
        VALUES (${invoice.interno_id}, ${invoice.date})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedInvoices.length} invoices`);

    return {
      createTable,
      entradas: insertedInvoices,
    };
  } catch (error) {
    console.error('Error seeding invoices:', error);
    throw error;
  }
}

async function seedSalidas(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS salidas (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    interno_id UUID NOT NULL,
    date DATE NOT NULL
  );
`;

    console.log(`Created "invoices" table`);

    // Insert data into the "invoices" table
    const insertedInvoices = await Promise.all(
      salidas.map(
        (invoice) => client.sql`
        INSERT INTO salidas (interno_id, date)
        VALUES (${invoice.interno_id}, ${invoice.date})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedInvoices.length} invoices`);

    return {
      createTable,
      salidas: insertedInvoices,
    };
  } catch (error) {
    console.error('Error seeding invoices:', error);
    throw error;
  }
}

async function seedInternos(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "customers" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS internos (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        apellido_paterno VARCHAR(255) NOT NULL,
        apellido_materno VARCHAR(255) NOT NULL,
        fecha_nacimiento VARCHAR(225) NOT NULL
      );
    `;

    console.log(`Created "internos" table`);

    // Insert data into the "customers" table
    const insertedCustomers = await Promise.all(
      customers.map(
        (customer) => client.sql`
        INSERT INTO internos (id, nombre, apellido_paterno, apellido_materno, fecha_nacimiento)
        VALUES (${customer.id}, ${customer.nombre}, ${customer.apellido_paterno}, ${customer.apellido_materno}, ${customer.fecha_nacimiento})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedCustomers.length} internos`);

    return {
      createTable,
      customers: insertedCustomers,
    };
  } catch (error) {
    console.error('Error seeding internos:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedInternos(client);
  await seedEntradas(client);
  await seedSalidas(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
