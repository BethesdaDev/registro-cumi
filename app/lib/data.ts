import { sql } from '@vercel/postgres';
import {
  InvoiceForm,
  LatestInvoiceRaw,
  User,
  Revenue,
  InternoField,
  InternosTable,
  EntradasTable,
  SalidasTable,
} from './definitions';
import { formatCurrency } from './utils';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchRevenue() {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
  try {
    const data = await sql<Revenue>`SELECT * FROM revenue`;

    // console.log('Data fetch complete after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  noStore();
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  noStore();
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to card data.');
  }
}

export async function fetchFilteredEntradas( query: string, currentPage: number,) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const entradas = await sql<EntradasTable>`
      SELECT
        i.nombre, 
        i.apellido_paterno, 
        i.apellido_materno,
        e.date
      FROM internos AS i
      INNER JOIN entradas AS e
      ON i.id = e.interno_id
      WHERE
        i.nombre ILIKE ${`%${query}%`} OR
        i.apellido_paterno ILIKE ${`%${query}%`} OR
        i.apellido_materno ILIKE ${`%${query}%`} OR
        e.date::text ILIKE ${`%${query}%`}
      ORDER BY date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return entradas.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch entradas.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredSalidas( query: string, currentPage: number,) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const entradas = await sql<SalidasTable>`
      SELECT
        i.nombre, 
        i.apellido_paterno, 
        i.apellido_materno,
        s.date
      FROM internos AS i
      INNER JOIN salidas AS s
      ON i.id = s.interno_id
      WHERE
        i.nombre ILIKE ${`%${query}%`} OR
        i.apellido_paterno ILIKE ${`%${query}%`} OR
        i.apellido_materno ILIKE ${`%${query}%`} OR
        s.date::text ILIKE ${`%${query}%`}
      ORDER BY date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return entradas.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch salidas.');
  }
}


export async function fetchSalidasPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM salidas
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of salidas.');
  }
}

export async function fetchEntradasPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM entradas
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  noStore();
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
  }
}

export async function fetchInternos() {
  noStore();

  try {
    const data = await sql<InternoField>`
      SELECT
        id,
        nombre,
        apellido_paterno,
        apellido_materno
      FROM internos
      ORDER BY nombre ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all internos.');
  }
}

export async function fetchInternosPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM internos
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchFilteredInternos(query: string, currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const data = await sql<InternosTable>`
		SELECT
		  id,
		  nombre,
		  apellido_paterno,
		  apellido_materno,
		  fecha_nacimiento
		FROM internos
		WHERE
		  nombre ILIKE ${`%${query}%`} OR
      apellido_paterno ILIKE ${`%${query}%`} OR
      apellido_materno ILIKE ${`%${query}%`}
		GROUP BY id, nombre, apellido_paterno, apellido_materno, fecha_nacimiento
		ORDER BY nombre ASC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch internos table.');
  }
}

export async function getUser(email: string) {
  noStore();
  try {
    const user = await sql`SELECT * from USERS where username=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
