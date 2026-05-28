import React from 'react'
import { Loader2 } from 'lucide-react'

const DetectButton = ({ onClick, disabled, loading }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="w-full bg-teal text-white py-3 rounded-xl font-semibold text-sm hover:bg-teal-dark transition disabled:opacity-60 flex items-center justify-center gap-2"
    >
      {loading ? (
        <>
          <Loader2 size={18} className="animate-spin" />
          Menganalisis...
        </>
      ) : (
        'Mulai Deteksi'
      )}
    </button>
  )
}

export default DetectButton

