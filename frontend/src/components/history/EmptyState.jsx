import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Clock3 } from 'lucide-react'

const EmptyState = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-20 h-20 bg-teal-xlight rounded-full flex items-center justify-center mb-4">
        <Clock3 size={36} className="text-teal" />
      </div>

      <h3 className="text-sm font-semibold text-text mb-1">
        Belum Ada Riwayat
      </h3>

      <p className="text-text-muted text-xs mb-6 max-w-xs">
        Mulai deteksi jerawat pertama Anda untuk melihat riwayat di sini.
      </p>

      <button
        onClick={() => navigate('/detect')}
        className="bg-teal text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-teal-dark transition"
      >
        Mulai Deteksi
      </button>
    </div>
  )
}

export default EmptyState