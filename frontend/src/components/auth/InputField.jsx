import React from 'react'

const InputField = ({ label, error, register, name, type = 'text', placeholder }) => {
  return (
    <div className="mb-4">
      <label className="block text-label font-medium text-text mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={`w-full px-4 py-2.5 border rounded-lg text-sm outline-none transition focus:ring-2 focus:ring-teal-light ${
          error ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:ring-teal-xlight'
        }`}
      />
      {error && <p className="text-red-500 text-tiny mt-1">{error.message}</p>}
    </div>
  )
}

export default InputField

