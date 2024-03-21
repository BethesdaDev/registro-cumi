// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  username: string;
  password: string;
};

export type Interno = {
  id: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  fecha_nacimiento: string
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type SalidasTable = {
  id: string;
  interno_id: string;
  date: string;
};

export type EntradasTable = {
  id: string;
  interno_id: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  date: string;
};

export type InternosTable = {
  id: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  fecha_nacimiento: string
};

export type FormattedInternosTable = {
  id: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  fecha_nacimiento: string
};

export type InternoField = {
  id: string;
  interno_id: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};
