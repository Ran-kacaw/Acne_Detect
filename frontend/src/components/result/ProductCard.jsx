import React, { useState } from 'react'
import { Heart, Copy, CheckCircle, ChevronUp, Info } from 'lucide-react'

const getProductIcon = (jenisProduk) => {
  const iconProps = { width: 36, height: 36, fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }

  switch (jenisProduk) {
    case 'Cleanser':
      return (
        <svg {...iconProps} viewBox="0 0 36 36">
          <rect x="10" y="14" width="16" height="18" rx="4" stroke="currentColor" strokeWidth="1.8" />
          <path d="M14 14V11C14 9.895 14.895 9 16 9H20C21.105 9 22 9.895 22 11V14" stroke="currentColor" strokeWidth="1.8" />
          <rect x="17" y="5" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <path d="M16 20h4M16 24h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )

    case 'Serum':
      return (
        <svg {...iconProps} viewBox="0 0 36 36">
          <rect x="13" y="14" width="10" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
          <path d="M18 5 L18 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="18" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M29 9l.8 1.6L31.4 11l-1.6.8L29 13.4l-.8-1.6L26.6 11l1.6-.8z" fill="currentColor" />
          <circle cx="18" cy="24" r="2" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      )

    case 'Sunscreen':
      return (
        <svg {...iconProps} viewBox="0 0 36 36">
          <rect x="11" y="12" width="14" height="20" rx="4" stroke="currentColor" strokeWidth="1.8" />
          <rect x="14" y="8" width="8" height="4" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="18" cy="5" r="1.5" fill="currentColor" />
          <path d="M18 1v2M18 8v-1M23 3l-1 1.5M13 3l1 1.5M25 6h-2M11 6h-2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M14 19h8M14 23h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      )

    case 'Moisturizer':
      return (
        <svg {...iconProps} viewBox="0 0 36 36">
          <ellipse cx="18" cy="26" rx="12" ry="6" stroke="currentColor" strokeWidth="1.8" />
          <path d="M6 26v-4c0-3.314 5.373-6 12-6s12 2.686 12 6v4" stroke="currentColor" strokeWidth="1.8" />
          <ellipse cx="18" cy="22" rx="12" ry="4" stroke="currentColor" strokeWidth="1.5" />
          <path d="M14 19h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      )

    case 'Night Cream':
      return (
        <svg {...iconProps} viewBox="0 0 36 36">
          <ellipse cx="18" cy="26" rx="12" ry="6" stroke="currentColor" strokeWidth="1.8" />
          <path d="M6 26v-4c0-3.314 5.373-6 12-6s12 2.686 12 6v4" stroke="currentColor" strokeWidth="1.8" />
          <path d="M21 8 C18 8 16 10 16 13 C16 16 18 18 21 18 C19 18 17 16.5 17 14.5 C17 11.5 19 9 21 8Z" fill="currentColor" opacity="0.8" />
        </svg>
      )

    case 'Spot Treatment':
      return (
        <svg {...iconProps} viewBox="0 0 36 36">
          <rect x="14" y="16" width="8" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
          <path d="M16 16v-3l2-4 2 4v3" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="26" cy="10" r="5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="26" cy="10" r="2" fill="currentColor" />
          <path d="M26 5V4M26 16V15M21 10H20M32 10H31" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      )

    case 'Essence':
      return (
        <svg {...iconProps} viewBox="0 0 36 36">
          <rect x="12" y="12" width="12" height="20" rx="3" stroke="currentColor" strokeWidth="1.8" />
          <rect x="15" y="8" width="6" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M28 6l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" fill="currentColor" />
          <path d="M15 18h6M15 22h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      )

    default:
      return (
        <svg {...iconProps} viewBox="0 0 36 36">
          <rect x="12" y="10" width="12" height="24" rx="6" stroke="currentColor" strokeWidth="1.8" />
          <rect x="15" y="6" width="6" height="4" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M27 8 C27 8 31 5 29 2 C26 3 25 6 27 8Z" fill="currentColor" opacity="0.7" />
          <path d="M15 20h6M15 24h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      )
  }
}

const getProductColor = (jenisProduk) => {
  const colors = {
    Cleanser: '#3b82f6',
    Essence: '#8b5cf6',
    'Gel Moisturizer': '#10b981',
    Moisturizer: '#6ee7b7',
    'Night Cream': '#6366f1',
    Serum: '#a78bfa',
    'Spot Treatment': '#f59e0b',
    Sunscreen: '#fbbf24',
    Toner: '#14b8a6',
  }

  return colors[jenisProduk] || '#14b8a6'
}

const ProductCard = ({ product }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [copied, setCopied] = useState(false)

  const jenisProduk = product.jenis_produk || product.category || 'Toner'
  const productName = product.nama_produk || product.name || 'Produk Skincare'
  const bahanAktif = product.bahan_aktif || product.ingredients || 'Bahan aktif'
  const deskripsi = product.deskripsi || product.description || 'Deskripsi produk belum tersedia.'
  const rating = product.rating || product.recommendation_score || '-'

  const shortDescription =
    deskripsi.length > 55 ? `${deskripsi.substring(0, 55)}...` : deskripsi

  const handleCopyName = (e) => {
    e.stopPropagation()
    navigator.clipboard.writeText(productName)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="group card-yellow p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div
          className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-gray-100 group-hover:scale-110 transition-transform duration-300"
          style={{ color: getProductColor(jenisProduk) }}
        >
          {getProductIcon(jenisProduk)}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation()
            setIsSaved(!isSaved)
          }}
          className={`p-1.5 rounded-lg transition ${
            isSaved
              ? 'bg-red-100 text-red-500'
              : 'bg-gray-100 text-text-muted hover:bg-gray-200'
          }`}
        >
          <Heart size={16} fill={isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>

      <h4 className="text-sm font-semibold text-text mt-3 mb-1 line-clamp-1">
        {productName}
      </h4>

      <div className="mb-2">
        <span className="text-tiny font-medium text-teal bg-teal-xlight px-2 py-0.5 rounded-full">
          ✨ {bahanAktif}
        </span>
      </div>

      <p className="text-text-muted text-xs mb-2 line-clamp-2">
        {isExpanded ? deskripsi : shortDescription}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-yellow text-xs">⭐</span>
          <span className="text-xs text-text font-medium">{rating}</span>
        </div>

        <span className="text-tiny text-text-muted bg-gray-100 px-2 py-0.5 rounded-full">
          {jenisProduk}
        </span>
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full mt-3 flex items-center justify-center gap-1 bg-gray-50 text-text-muted py-1.5 rounded-lg text-xs font-medium hover:bg-gray-100 transition"
      >
        {isExpanded ? (
          <>
            <ChevronUp size={14} />
            Sembunyikan
          </>
        ) : (
          <>
            <Info size={12} />
            Detail
          </>
        )}
      </button>

      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-tiny font-medium text-text-muted">Nama Produk</span>

            <button
              onClick={handleCopyName}
              className="flex items-center gap-1 text-tiny bg-gray-100 px-2 py-1 rounded-lg hover:bg-gray-200 transition"
            >
              {copied ? <CheckCircle size={12} className="text-green-500" /> : <Copy size={12} />}
              {copied ? 'Tersalin' : 'Salin'}
            </button>
          </div>

          <div>
            <p className="text-tiny font-medium text-text-muted mb-1">✨ Bahan Aktif</p>
            <p className="text-xs text-text leading-relaxed bg-gray-50 p-2 rounded-lg">
              {bahanAktif}
            </p>
          </div>

          {product.usage && (
            <div>
              <p className="text-tiny font-medium text-text-muted mb-1">💡 Cara Penggunaan</p>
              <p className="text-xs text-text leading-relaxed">{product.usage}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ProductCard