import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from '../../utils/validators'
import { useAppStore } from '../../store/useAppStore'
import { api, USE_MOCK } from '../../utils/api'
import InputField from './InputField'
import PasswordToggle from './PasswordToggle'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(registerSchema) })

  const setUser = useAppStore((s) => s.setUser)
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      if (USE_MOCK) {
        await new Promise((r) => setTimeout(r, 800))

        const user = {
          id: '1',
          name: data.name,
          email: data.email,
          token: 'mock-token',
        }

        localStorage.setItem('token', user.token)
        localStorage.setItem('user', JSON.stringify(user))
        setUser(user)

        toast.success('Registrasi berhasil!')
        navigate('/')
        return
      }

      const { data: res } = await api.post('/api/auth/register', data)

      localStorage.setItem('token', res.token)
      localStorage.setItem('user', JSON.stringify(res.user))

      setUser({ ...res.user, token: res.token })

      toast.success('Registrasi berhasil!')
      navigate('/')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registrasi gagal')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        label="Nama Lengkap"
        name="name"
        placeholder="Nama Anda"
        register={register}
        error={errors.name}
      />

      <InputField
        label="Email"
        name="email"
        placeholder="email@example.com"
        register={register}
        error={errors.email}
      />

      <PasswordToggle
        label="Password"
        name="password"
        placeholder="Minimal 8 karakter"
        register={register}
        error={errors.password}
      />

      <PasswordToggle
        label="Konfirmasi Password"
        name="confirmPassword"
        placeholder="Ulangi password"
        register={register}
        error={errors.confirmPassword}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="
          w-full
          bg-[#2f7f79]
          text-white
          py-3
          rounded-[11px]
          font-bold
          text-sm
          hover:bg-[#276d68]
          active:scale-95
          transition-all
          disabled:opacity-60
          mt-2
        "
      >
        {isSubmitting ? 'Memuat...' : 'Daftar'}
      </button>
    </form>
  )
}

export default RegisterForm