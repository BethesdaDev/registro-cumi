'use client';

import { InternoField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { registrarEntrada } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

export default function Form({ customers }: { customers: InternoField[] }) {

  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(registrarEntrada, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Elegir interno
          </label>
          <div className="relative">
            <select
              id="nombre"
              name="nombre"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="customer-error"
            >
              <option value="" disabled>
                Seleccione interno
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {`${customer.nombre} ${customer.apellido_paterno} ${customer.apellido_materno}`}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          {state.errors?.interno_id ? (
            <div
              id="customer-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors.interno_id.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Fecha
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="date"
                name="date"
                type="date"
                className="peer block rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="amount-error"
              />
              <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          {state.errors?.date ? (
            <div
              id="customer-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors.date.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>
        {state.message ? (
          <div
            id="message-error"
            aria-live="polite"
            className="mt-2 text-sm text-red-500"
          >
            <p key={state.message}>{state.message}</p>
          </div>
        ) : null}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/entradas"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Registrar entrada</Button>
      </div>
    </form>
  );
}
