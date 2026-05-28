import React from 'react'

const ResultCard = ({ imageUrl, severity, severityDescription, confidence }) => {
  const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  const fullImageUrl =
    imageUrl?.startsWith('http') || imageUrl?.startsWith('data:')
      ? imageUrl
      : `${BASE_URL}${imageUrl}`

  const getBadgeColor = (sev) => {
    if (sev === 'Mild' || sev?.includes('0')) return 'bg-green-100 text-green-700'
    if (sev === 'Moderate' || sev?.includes('2')) return 'bg-yellow-100 text-yellow-700'
    if (sev?.includes('1')) return 'bg-blue-100 text-blue-700'
    return 'bg-red-100 text-red-700'
  }

  const confidenceValue = parseFloat(confidence) || 0

  return (
    <div className="card-yellow shadow-sm overflow-hidden">
      <div className="relative">
        <img
          src={fullImageUrl}
          alt="Hasil deteksi"
          className="w-full h-64 object-cover"
          onError={(e) => {
            e.target.src =
              'https://via.placeholder.com/400x300?text=Foto+Tidak+Tersedia'
          }}
        />

        <div className="absolute top-4 right-4">
          <span
            className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getBadgeColor(
              severity
            )}`}
          >
            {severity}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-text mb-2">Hasil Deteksi</h3>

        <p className="text-text-muted text-sm leading-relaxed">
          {severityDescription}
        </p>

        {confidenceValue > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal rounded-full transition-all duration-500"
                  style={{ width: `${confidenceValue}%` }}
                />
              </div>

              <span className="text-xs font-medium text-teal">
                {confidence}
                {String(confidence).includes('%') ? '' : '%'}
              </span>
            </div>

            <p className="text-tiny text-text-muted mt-1">Akurasi AI</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ResultCard