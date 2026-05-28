import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import AuthLayout from '../components/auth/AuthLayout'
import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'
import PageTransition from '../components/shared/PageTransition'

const AuthPage = () => {
  const location = useLocation()
  const isLogin = location.pathname === '/login'
  const [mode, setMode] = useState(isLogin ? 'login' : 'register')

  useEffect(() => {
    setMode(isLogin ? 'login' : 'register')
  }, [isLogin])

  return (
    <AuthLayout>
      <PageTransition>
        <div className="text-center mb-7">
          <h1 className="text-[22px] font-bold text-[#102c2b] mb-1">
            Acne <span className="text-[#3a918d]">Detect</span>
          </h1>

          <p className="text-[#9aa5b5] text-[12px]">
            Smart acne detection platform
          </p>
        </div>

        <div className="bg-[#eef7f7] rounded-[11px] p-1 mb-6 grid grid-cols-2">
          <Link
            to="/login"
            onClick={() => setMode('login')}
            className={`
              text-center py-2 rounded-[9px] text-[13px] font-bold transition-all
              ${
                mode === 'login'
                  ? 'bg-white text-[#06423f] shadow-sm'
                  : 'text-[#9aa5b5]'
              }
            `}
          >
            Masuk
          </Link>

          <Link
            to="/register"
            onClick={() => setMode('register')}
            className={`
              text-center py-2 rounded-[9px] text-[13px] font-bold transition-all
              ${
                mode === 'register'
                  ? 'bg-white text-[#06423f] shadow-sm'
                  : 'text-[#9aa5b5]'
              }
            `}
          >
            Daftar
          </Link>
        </div>

        {mode === 'login' ? <LoginForm /> : <RegisterForm />}
      </PageTransition>
    </AuthLayout>
  )
}

export default AuthPage