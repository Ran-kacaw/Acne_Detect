import React from 'react'

const AuthLayout = ({ children }) => {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background:
          'linear-gradient(135deg, #2c6d68 0%, #3b9892 50%, #27605c 100%)',
      }}
    >
      <div
        className="
          relative overflow-hidden
          w-full max-w-[400px]
          rounded-[22px]
          border-[1.5px] border-[#c4a800]
          shadow-2xl
          px-9 py-10
        "
        style={{ background: 'linear-gradient(145deg, #fefcf7 0%, #fdf9ee 55%, #fbf4e0 100%)' }}
      >
        {/* Orb: bottom right */}
        <div
          className="pointer-events-none absolute -bottom-16 -right-16 h-72 w-72 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(240,215,90,0.18) 0%, rgba(240,215,90,0.06) 55%, transparent 72%)' }}
        />
        {/* Orb: top right */}
        <div
          className="pointer-events-none absolute -top-12 right-14 h-44 w-44 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(60,139,137,0.07) 0%, transparent 65%)' }}
        />

        <div className="relative z-10">{children}</div>
      </div>
    </div>
  )
}

export default AuthLayout
