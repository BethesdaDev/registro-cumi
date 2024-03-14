import Form from '@/app/ui/dashboard/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
 
export default async function Page() {
  const customers = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Internos', href: '/dashboard/' },
          {
            label: 'Registrar interno',
            href: '/dashboard/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}