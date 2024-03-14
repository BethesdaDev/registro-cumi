import Form from '@/app/ui/dashboard/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchInternos } from '@/app/lib/data';
 
export default async function Page() {
  const internos = await fetchInternos();
 
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
      <Form />
    </main>
  );
}