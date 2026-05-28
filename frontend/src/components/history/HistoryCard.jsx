import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trash2, Calendar, Image as ImageIcon } from 'lucide-react'
import SeverityBadge from '../result/SeverityBadge'
import DeleteHistoryModal from './DeleteHistoryModal'

const HistoryCard = ({ item, onDelete }) => {
  const navigate = useNavigate()
  const [showDelete, setShowDelete] = useState(false)
  const [imgError, setImgError] = useState(false)

  const formattedDate = item.date
    ? new Date(item.date).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '-'

  const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  const fullImageUrl =
    item.imageUrl?.startsWith('http') || item.imageUrl?.startsWith('data:')
      ? item.imageUrl
      : `${BASE_URL}${item.imageUrl}`

  const skinType = item.skinType || item.jenis_kulit || '-'
  const confidence = item.confidencePct || item.confidence || null
  const label = item.acneLabel || item.severity || `Tingkat ${item.acneLevel || 0}`

  const handleOpenDelete = (e) => {
    e.stopPropagation()
    setShowDelete(true)
  }

  const handleConfirmDelete = async () => {
    await onDelete(item.id)
    setShowDelete(false)
  }

  return (
    <>
      <div
        onClick={() => navigate(`/history/${item.id}`)}
        className="
          group relative overflow-hidden
          rounded-[12px]
          px-4 py-4
          flex items-center gap-4
          cursor-pointer
          transition-all duration-300
          hover:-translate-y-1 hover:shadow-md
          border border-[rgba(196,168,0,0.22)]
        "
        style={{ background: 'linear-gradient(145deg, #fefcf7 0%, #fcf9f0 60%, #f8f4e8 100%)' }}
      >
        {/* Orb: bottom right */}
        <div
          className="pointer-events-none absolute -bottom-8 -right-8 h-40 w-40 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(240,215,90,0.12) 0%, rgba(240,215,90,0.04) 55%, transparent 72%)' }}
        />

        <div className="relative z-10 w-[60px] h-[60px] rounded-[10px] overflow-hidden shrink-0 bg-[#a8cecb] flex items-center justify-center">
          {!imgError && item.imageUrl ? (
            <img
              src={fullImageUrl}
              alt="Riwayat deteksi"
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <ImageIcon size={25} className="text-white/90" />
          )}
        </div>

        <div className="relative z-10 flex-1 min-w-0">
          <div className="mb-2">
            <SeverityBadge severity={label} />
          </div>

          <div className="flex items-center gap-3 flex-wrap text-[11px] text-[#5e7775]">
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {formattedDate}
            </span>

            <span>{skinType}</span>

            {confidence && (
              <span>
                🎯 {typeof confidence === 'number' ? `${confidence}%` : confidence}
              </span>
            )}
          </div>
        </div>

        <div className="relative z-20 flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleOpenDelete}
            className="
              flex items-center gap-1
              bg-[#dff4f3]
              text-[#26706d]
              px-3 py-1.5
              rounded-full
              text-[12px] font-semibold
              hover:bg-red-50
              hover:text-red-500
              transition
            "
          >
            <Trash2 size={13} />
            Hapus
          </button>
        </div>
      </div>

      {showDelete && (
        <DeleteHistoryModal
          onClose={() => setShowDelete(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  )
}

export default HistoryCard
