'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';
import { OrderSchema } from './definitions';

const sql = postgres(process.env.POSTGRES_URL!);

export async function createOrder(formData: FormData) {
  const rawFormData = {
    customer_id: formData.get('customer_id'),
    status: formData.get('status'),
    items: [],
  };

  const validatedFields = OrderSchema.safeParse(rawFormData);
  
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Order.',
    };
  }

  const { customer_id, status } = validatedFields.data;
  const amountInCents = 0;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customer_id}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Order.',
    };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}
