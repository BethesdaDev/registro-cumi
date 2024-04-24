'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
 
const REGEX = /asdfasdf/
const InvoiceSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  apellido_paterno: z.string(),
  apellido_materno: z.string(),
  fecha_nacimiento: z.string(),
});
 
 
const RegistrarInterno = InvoiceSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    nombre?: string[];
    apellido_paterno?: string[];
    apellido_materno?: string[];
    fecha_nacimiento?: string[];
  };
  message?: string | null;
};
 
export async function registrarInterno(prevState: State, formData: FormData) {
    
    // Validate form fields using Zod
    const validatedFields = RegistrarInterno.safeParse({
      nombre: formData.get('nombre'),
      apellido_paterno: formData.get('apellido_paterno'),
      apellido_materno: formData.get('apellido_materno'),
      fecha_nacimiento: formData.get('fecha_nacimiento')
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      console.log(validatedFields.error.flatten().fieldErrors);
      
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Campos faltantes, Error al registrar al interno',
      };
    }

    // Prepare data for insertion into the database
    const { nombre, apellido_paterno, apellido_materno, fecha_nacimiento } = validatedFields.data;
    const date = new Date().toISOString().split('T')[0];

    // Test it out:
    // console.log();
    // Insert data into the database
    try{
      await sql`
        INSERT INTO internos (nombre, apellido_paterno, apellido_materno, fecha_nacimiento)
        VALUES (${nombre}, ${apellido_paterno}, ${apellido_materno}, ${fecha_nacimiento})`;
        
    } catch (error) {
      console.error(error);
      return {
        message: 'Database Error: Failed to Register Interno.',
      };
    }
  
    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/dashboard');
    redirect('/dashboard');
}

const EntradaSalidaSchema = z.object({
  interno_id: z.string(),
  nombre: z.string(),
  apellido_paterno: z.string(),
  apellido_materno: z.string(),
  date: z.string()
});

export type EntradaSalidaState = {
  errors?: {
    interno_id?: string[];
    nombre?: string[];
    apellido_paterno?: string[];
    apellido_materno?: string[];
    date?: string[];
  };
  message?: string | null;
};

export async function registrarSalida(prevState: EntradaSalidaState, formData: FormData) {
    
    // Validate form fields using Zod
    const validatedFields = EntradaSalidaSchema.safeParse({
      interno_id: formData.get('nombre'),
      nombre: formData.get('nombre'),
      apellido_paterno: formData.get('nombre'),
      apellido_materno: formData.get('nombre'),
      date: formData.get('date')
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      console.log(validatedFields.error.flatten().fieldErrors);
      
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Campos faltantes, Error al registrar al interno',
      };
    }

    // Prepare data for insertion into the database
    const { interno_id, date } = validatedFields.data;
    // const date = new Date().toISOString().split('T')[0];

    // Test it out:
    // console.log();
    // Insert data into the database
    try{
      await sql`
        INSERT INTO entradas (interno_id, date)
        VALUES (${interno_id}, ${date})`;
        
    } catch (error) {
      console.error(error);
      return {
        message: 'Database Error: Failed to Register Entrada.',
      };
    }
  
    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/dashboard/entradas');
    redirect('/dashboard/entradas');
}

export async function registrarEntrada(prevState: EntradaSalidaState, formData: FormData) {
    
    // Validate form fields using Zod
    const validatedFields = EntradaSalidaSchema.safeParse({
      interno_id: formData.get('nombre'),
      nombre: formData.get('nombre'),
      apellido_paterno: formData.get('nombre'),
      apellido_materno: formData.get('nombre'),
      date: formData.get('date')
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      console.log(validatedFields.error.flatten().fieldErrors);
      
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Campos faltantes, Error al registrar al interno',
      };
    }

    // Prepare data for insertion into the database
    const { interno_id, date } = validatedFields.data;
    // const date = new Date().toISOString().split('T')[0];

    // Test it out:
    // console.log();
    // Insert data into the database
    try{
      await sql`
        INSERT INTO entradas (interno_id, date)
        VALUES (${interno_id}, ${date})`;
        
    } catch (error) {
      console.error(error);
      return {
        message: 'Database Error: Failed to Register Entrada.',
      };
    }
  
    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/dashboard/entradas');
    redirect('/dashboard/entradas');
}

// Use Zod to update the expected types
const UpdateInvoice = InvoiceSchema.omit({ id: true, date: true });
 
// ...
 
export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData
){

  // Validate form fields using Zod
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  /*
  // Prepare data for insertion into the database
  const { nombre, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  // Insert data into the database
  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }
  */
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  // throw new Error('Failed to Delete Invoice');
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
}

  
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', Object.fromEntries(formData));
  } catch (error) {
    if ((error as Error).message.includes('CredentialsSignin')) {
      return 'CredentialSignin';
    }
    console.error(error)
    throw error;
  }
}
