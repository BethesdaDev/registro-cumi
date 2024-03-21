import Form from '@/app/ui/entradas/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchInternos } from '@/app/lib/data';
 
export default async function Page() {
  const customers = await fetchInternos();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Entradas', href: '/dashboard/entradas' },
          {
            label: 'Registrar entradas',
            href: '/dashboard/entradas/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}