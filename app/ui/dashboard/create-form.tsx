'use client';

import { InternoField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { registrarInterno } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

export default function Form() {

  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(registrarInterno, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Nombre */}
        <div className="mb-4">
          <label htmlFor="nombre" className="mb-2 block text-sm font-medium">
            Nombre
          </label>
          <div className="relative mt-2 rounded-md">
              <input
                id="nombre"
                name="nombre"
                placeholder="Ingrese nombre"
                required={true}
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="amount-error"
              />
          </div>
          {state.errors?.nombre ? (
            <div
              id="customer-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors.nombre.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>
        
        {/* Apellido Paterno */}
        <div className="mb-4">
          <label htmlFor="apellido_paterno" className="mb-2 block text-sm font-medium">
            Apellido paterno
          </label>
          <div className="relative mt-2 rounded-md">
              <input
                id="apellido_paterno"
                name="apellido_paterno"
                placeholder="Ingrese apellido paterno"
                required={true}
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="amount-error"
              />
          </div>
          {state.errors?.apellido_paterno ? (
            <div
              id="customer-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors.apellido_paterno.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>

        {/* Apellido materno */}
        <div className="mb-4">
          <label htmlFor="apellido_materno" className="mb-2 block text-sm font-medium">
            Apellido materno
          </label>
          <div className="relative mt-2 rounded-md">
              <input
                id="apellido_materno"
                name="apellido_materno"
                placeholder="Ingrese apellido materno"
                required={true}
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="amount-error"
              />
          </div>
          {state.errors?.apellido_materno ? (
            <div
              id="customer-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors.apellido_materno.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>
        
        {/* Fecha de nacimiento */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Fecha
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="fecha_nacimiento"
                name="fecha_nacimiento"
                required={true}
                type="date"
                className="peer block rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="amount-error"
              />
              <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
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
          href="/dashboard"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Registrar</Button>
      </div>
    </form>
  );
}
