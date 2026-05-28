import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '../../utils/validators'
import { useAppStore } from '../../store/useAppStore'
import { api, USE_MOCK } from '../../utils/api'
import InputField from './InputField'
import PasswordToggle from './PasswordToggle'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) })

  const setUser = useAppStore((s) => s.setUser)
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      if (USE_MOCK) {
        await new Promise((r) => setTimeout(r, 800))
        const savedUser = localStorage.getItem('user')
        const parsedUser = savedUser ? JSON.parse(savedUser) : null
        const userName = (parsedUser && parsedUser.email === data.email) ? parsedUser.name : data.email.split('@')[0]
        const user = { id: '1', name: userName, email: data.email, token: 'mock-token' }
        localStorage.setItem('token', user.token)
        localStorage.setItem('user', JSON.stringify(user))
        setUser(user)
        toast.success('Login berhasil!')
        navigate('/')
        return
      }
      const { data: res } = await api.post('/api/auth/login', data)
      localStorage.setItem('token', res.token)
      localStorage.setItem('user', JSON.stringify(res.user))
      setUser({ ...res.user, token: res.token })
      toast.success('Login berhasil!')
      navigate('/')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login gagal')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField label="Email" name="email" placeholder="email@example.com" register={register} error={errors.email} />
      <PasswordToggle label="Password" name="password" placeholder="Minimal 8 karakter" register={register} error={errors.password} />
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-teal text-white py-2.5 rounded-lg font-medium text-sm hover:bg-teal-dark hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-60"
      >
        {isSubmitting ? 'Memuat...' : 'Masuk'}
      </button>
    </form>
  )
}

export default LoginForm

