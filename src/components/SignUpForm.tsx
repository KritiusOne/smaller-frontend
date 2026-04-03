'use client'

import { useState } from "react"
import { authService } from "@/src/service/authService"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { setAuthCookie } from "../helpers/auth/cookies"
import { useUserStore } from "../zustand/userState"

type SignUpCredentials = {
  email: string
  password: string
  displayName: string
}

type FormErrors = Partial<SignUpCredentials>

interface SignUpFormProps {
  router: AppRouterInstance;
}
export const SignUpForm = ({ router }: SignUpFormProps) => {
  const [credentials, setCredentials] = useState<SignUpCredentials>({
    email: '',
    password: '',
    displayName: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitError, setSubmitError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const {logIn} = useUserStore();
  


  const validate = () => {
    const nextErrors: FormErrors = {}

    if (!credentials.email.trim()) {
      nextErrors.email = 'El correo es obligatorio'
    }

    if (!credentials.displayName.trim()) {
      nextErrors.displayName = 'El nombre de usuario es obligatorio'
    }

    if (!credentials.password.trim()) {
      nextErrors.password = 'La contraseña es obligatoria'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleChange = (field: keyof SignUpCredentials, value: string) => {
    setCredentials((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
    setSubmitError('')
    setSuccessMessage('')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitError('')
    setSuccessMessage('')

    if (!validate()) {
      return
    }

    setLoading(true)
    try {
      const response = await authService.SignUp(
        credentials.email.trim(),
        credentials.password,
        credentials.displayName.trim()
      )

      if (!response) {
        setSubmitError('No se pudo completar el registro. Intenta nuevamente.')
        return
      }
      console.log(response)
      logIn(response.user.firebaseUid, response.user.name, response.user.email);
      setAuthCookie(response.token);
      setSuccessMessage('Cuenta creada exitosamente. Redirigiendo...')
      router.push("/profile")
      setErrors({})
      return
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : 'Ocurrió un error inesperado al registrar la cuenta.'
      setSubmitError(message)
    } finally {
      setLoading(false)
    }
  }

  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#353131]">
          Correo electrónico
        </label>
        <input
          id="email"
          type="email"
          required
          value={credentials.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className="field"
          placeholder="tu@email.com"
        />
        {errors.email && (
          <p className="mt-2 text-sm text-[#600620]">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="displayName" className="mb-2 block text-sm font-semibold text-[#353131]">
          Nombre de usuario
        </label>
        <input
          id="displayName"
          type="text"
          required
          value={credentials.displayName}
          onChange={(e) => handleChange('displayName', e.target.value)}
          className="field"
          placeholder="Tu nombre de usuario"
        />
        {errors.displayName && (
          <p className="mt-2 text-sm text-[#600620]">{errors.displayName}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-semibold text-[#353131]">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          required
          value={credentials.password}
          onChange={(e) => handleChange('password', e.target.value)}
          className="field"
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="mt-2 text-sm text-[#600620]">{errors.password}</p>
        )}
      </div>

      {submitError && (
        <div className="rounded-lg border border-[#f99fb9] bg-[#fde7ed] px-4 py-3 text-sm text-[#600620]">
          {submitError}
        </div>
      )}

      {successMessage && (
        <div className="rounded-lg border border-[#c4d4cd] bg-[#f0f4f2] px-4 py-3 text-sm text-[#2b3b34]">
          {successMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-solid w-full py-3 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? 'Creando cuenta...' : 'Crear cuenta'}
      </button>
    </form>
  )
}