'use client';

import { FormEvent, useMemo, useRef, useState } from 'react';
import type { IURL } from '@src/types/IURL';
import { createShortURL } from '@/src/service/urlService';

type CreateURLFormData = Pick<IURL, 'originalURL' | 'alias'>;

const aliasPattern = /^[a-zA-Z0-9-_]+$/;

function CreateURL() {
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const originalURLRef = useRef(null);
  const [alias, setAlias] = useState('');


  const validateForm = () => {
    let originalURL = ''
    
    if(originalURLRef.current){
      originalURL = (originalURLRef.current as HTMLInputElement).value.trim();
    }
    if (!originalURL || originalURL.length === 0) {
      return 'La URL original es obligatoria';
    }

    try {
      const parsedUrl = new URL(originalURL);
      if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
        return 'La URL debe comenzar con http:// o https://';
      }
    } catch {
      return 'Ingresa una URL valida';
    }

    if (alias && !aliasPattern.test(alias)) {
      return 'El alias solo puede contener letras, numeros, guiones y guion bajo';
    }

    return null;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!originalURLRef.current){
      return;
    }
    console.log('Valor del input originalURL:', (originalURLRef.current as HTMLInputElement).value);
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);

    await createShortURL((originalURLRef.current as HTMLInputElement).value, alias);

    setSuccess('URL lista para crearse correctamente');
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Crear nueva URL</h1>
          <p className="mt-2 text-gray-600">
            Ingresa la URL original y, si quieres, define un alias personalizado.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-blue-50">
            <h2 className="text-xl font-semibold text-gray-900">Formulario de acortamiento</h2>
            <p className="text-sm text-gray-600 mt-1">Solo necesitas URL original y alias opcional.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            <div>
              <label htmlFor="originalURL" className="block text-sm font-medium text-black mb-2">
                URL original
              </label>
              <input
                id="originalURL"
                type="url"
                required
                placeholder="https://ejemplo.com/mi-link"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                ref={originalURLRef}
              />
              <p className="mt-2 text-xs text-gray-500">Debe incluir el protocolo, por ejemplo: https://</p>
            </div>

            <div>
              <label htmlFor="alias" className="block text-sm font-medium text-black mb-2">
                Alias (opcional)
              </label>
              <input
                id="alias"
                type="text"
                placeholder="mi-campana-2026"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
              />
              <p className="mt-2 text-xs text-gray-500">
                Permitido: letras, numeros, guiones (-) y guion bajo (_).
              </p>
            </div>

            <div className="rounded-lg border border-indigo-100 bg-indigo-50 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-indigo-700 font-semibold">Preview URL corta</p>
              <p className="mt-1 text-indigo-900 font-medium break-all">https://smaller.link/{alias || 'default'}</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                {success}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              <a
                href="/profile"
                className="px-6 py-3 text-center rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
              >
                Cancelar
              </a>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Creando URL...' : 'Crear URL'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateURL;