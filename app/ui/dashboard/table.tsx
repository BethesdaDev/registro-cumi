import Image from 'next/image';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredEntradas, fetchFilteredInternos } from '@/app/lib/data';
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/buttons';

export default async function InternosTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const internos = await fetchFilteredInternos(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {internos?.map((interno) => (
              <div
                key={interno.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{interno.nombre}</p>
                    </div>
                    <p className="text-sm text-gray-500">{interno.apellido_paterno}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Nombre
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Apellido paterno
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Apellido materno
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Fecha de nacimiento
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {internos?.map((interno) => (
                <tr
                  key={interno.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{interno.nombre}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {interno.apellido_paterno}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {interno.apellido_materno}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {interno.fecha_nacimiento}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}