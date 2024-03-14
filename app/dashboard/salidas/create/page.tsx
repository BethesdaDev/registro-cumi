import Form from '@/app/ui/salidas/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchInternos } from '@/app/lib/data';
 
export default async function Page() {
  const customers = await fetchInternos();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}