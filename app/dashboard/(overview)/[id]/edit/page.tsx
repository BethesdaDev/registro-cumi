import Form from '@/app/ui/entradas/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
import { InternoField, InvoiceForm } from '@/app/lib/definitions';
import { notFound } from 'next/navigation';
 
export default async function Page({ params }: { params: { id: string } }) {

    const id = params.id;
    const [invoice, customers] : [InvoiceForm | undefined , InternoField[] | undefined] = await Promise.all([
        fetchInvoiceById(id),
        fetchCustomers(),
      ]);

    if (!invoice) {
        notFound();
    }

    return (
        <main>
        <Breadcrumbs
            breadcrumbs={[
            { label: 'Internos', href: '/dashboard/invoices' },
            {
                label: 'Edit Invoice',
                href: `/dashboard/invoices/${id}/edit`,
                active: true,
            },
            ]}
        />
        <Form invoice={invoice!} customers={customers} />
        </main>
    );
}