import { formatDateToLocal } from '@/app/lib/utils';
import { fetchFilteredEntradas } from '@/app/lib/data';

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const entradas = await fetchFilteredEntradas(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
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
                  Fecha
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {entradas?.map((entrada) => (
                <tr
                  key={entrada.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{entrada.nombre}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {entrada.apellido_paterno}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {entrada.apellido_materno}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(entrada.date)}
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
