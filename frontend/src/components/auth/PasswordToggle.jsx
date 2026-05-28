import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

const PasswordToggle = ({ register, name, label, error, placeholder }) => {
  const [show, setShow] = useState(false)

  return (
    <div className="mb-4">
      <label className="block text-label font-medium text-text mb-1">{label}</label>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          {...register(name)}
          className={`w-full px-4 py-2.5 border rounded-lg text-sm outline-none transition focus:ring-2 pr-10 ${
            error ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:ring-teal-xlight'
          }`}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && <p className="text-red-500 text-tiny mt-1">{error.message}</p>}
    </div>
  )
}

export default PasswordToggle

