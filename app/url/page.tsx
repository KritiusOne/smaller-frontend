'use client';

import { FormEvent, useRef, useState } from 'react';
import type { IURL } from '@src/types/IURL';
import { createShortURL } from '@/src/service/urlService';

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
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      setIsSubmitting(true);
  
      const res = await createShortURL((originalURLRef.current as HTMLInputElement).value, alias);

      if(res.status >= 200 && res.status <= 299){
        setSuccess('URL lista para crearse correctamente');
        setError('');
      }
    } catch {
      setSuccess('')
      setError('Error al crear la URL corta');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-shell py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <p className="kicker">Acortador</p>
          <h1 className="mt-2 text-3xl font-bold text-[#1a1919] sm:text-4xl">Crear nueva URL</h1>
          <p className="mt-2 text-[#4f4a4a]">
            Ingresa la URL original y, si quieres, define un alias personalizado.
          </p>
        </div>

        <div className="glass-panel overflow-hidden">
          <div className="border-b border-[#b5b0b0] bg-[#f2dfd9] px-6 py-5">
            <h2 className="text-xl font-semibold text-[#1a1919]">Formulario de acortamiento</h2>
            <p className="mt-1 text-sm text-[#4f4a4a]">Solo necesitas URL original y alias opcional.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            <div>
              <label htmlFor="originalURL" className="mb-2 block text-sm font-semibold text-[#353131]">
                URL original
              </label>
              <input
                id="originalURL"
                type="url"
                required
                placeholder="https://ejemplo.com/mi-link"
                className="field"
                ref={originalURLRef}
              />
              <p className="mt-2 text-xs text-[#696363]">Debe incluir el protocolo, por ejemplo: https://</p>
            </div>

            <div>
              <label htmlFor="alias" className="mb-2 block text-sm font-semibold text-[#353131]">
                Alias (opcional)
              </label>
              <input
                id="alias"
                type="text"
                placeholder="mi-campana-2026"
                className="field"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
              />
              <p className="mt-2 text-xs text-[#696363]">
                Permitido: letras, numeros, guiones (-) y guion bajo (_).
              </p>
            </div>


            {error && (
              <div className="rounded-lg border border-[#f99fb9] bg-[#fde7ed] px-4 py-3 text-sm text-[#600620]">
                {error}
              </div>
            )}

            {success && (
              <div className="rounded-lg border border-[#c4d4cd] bg-[#f0f4f2] px-4 py-3 text-sm text-[#2b3b34]">
                {success}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              <a
                href="/profile"
                className="btn-outline px-6 py-3 text-center text-sm font-semibold"
              >
                Cancelar
              </a>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-solid px-6 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-50"
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