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
        <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
          Correo electrónico
        </label>
        <input
          id="email"
          type="email"
          required
          value={credentials.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          placeholder="tu@email.com"
        />
        {errors.email && (
          <p className="mt-2 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="displayName" className="block text-sm font-medium text-black mb-2">
          Nombre de usuario
        </label>
        <input
          id="displayName"
          type="text"
          required
          value={credentials.displayName}
          onChange={(e) => handleChange('displayName', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          placeholder="Tu nombre de usuario"
        />
        {errors.displayName && (
          <p className="mt-2 text-sm text-red-600">{errors.displayName}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-black mb-2">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          required
          value={credentials.password}
          onChange={(e) => handleChange('password', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="mt-2 text-sm text-red-600">{errors.password}</p>
        )}
      </div>

      {submitError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {submitError}
        </div>
      )}

      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
          {successMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Creando cuenta...' : 'Crear cuenta'}
      </button>
    </form>
  )
}