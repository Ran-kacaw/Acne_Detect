import React from 'react'
import { FlaskConical, Calendar, AlertTriangle, ScanFace } from 'lucide-react'

const AcneSummary = ({
  severity,
  severityLevel,
  severityLabel,
  confidence,
  skinType,
  date,
  saranDokter,
  masalahKulit = [],
}) => {
  const getLevelIcon = () => {
    if (severityLevel === 0) return '🟢'
    if (severityLevel === 1) return '🔵'
    if (severityLevel === 2) return '🟠'
    return '🔴'
  }

  const getLevelColor = () => {
    if (severityLevel === 0) return 'bg-green-100 text-green-700'
    if (severityLevel === 1) return 'bg-blue-100 text-blue-700'
    if (severityLevel === 2) return 'bg-yellow-100 text-yellow-700'
    return 'bg-red-100 text-red-700'
  }

  const confidenceValue = parseFloat(confidence) || 0

  return (
    <div className="space-y-4">
      <div className="card-yellow p-5 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${getLevelColor()}`}
          >
            <span className="text-2xl">{getLevelIcon()}</span>
          </div>

          <div>
            <p className="text-xs text-text-muted">Tingkat Keparahan</p>
            <p className="text-xl font-bold text-text">{severity}</p>
            <p className="text-tiny text-text-muted">{severityLabel}</p>
          </div>
        </div>

        {confidenceValue > 0 && (
          <div className="mt-3">
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

        {masalahKulit.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <ScanFace size={16} className="text-teal" />
              <p className="text-xs font-semibold text-text">Masalah Kulit</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {masalahKulit.map((item, i) => (
                <span
                  key={i}
                  className="px-2 py-1 rounded-full text-xs font-medium"
                  style={{
                    background: 'rgba(60,139,137,0.12)',
                    color: '#2a6360',
                    border: '1px solid rgba(60,139,137,0.3)',
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {skinType && (
          <div className="card-yellow p-3 shadow-sm flex items-center gap-3">
            <div className="w-8 h-8 bg-teal-xlight rounded-full flex items-center justify-center">
              <FlaskConical size={16} className="text-teal" />
            </div>

            <div>
              <p className="text-tiny text-text-muted">Jenis Kulit</p>
              <p className="text-sm font-medium text-text">{skinType}</p>
            </div>
          </div>
        )}

        {date && (
          <div className="card-yellow p-3 shadow-sm flex items-center gap-3">
            <div className="w-8 h-8 bg-teal-xlight rounded-full flex items-center justify-center">
              <Calendar size={16} className="text-teal" />
            </div>

            <div>
              <p className="text-tiny text-text-muted">Tanggal Deteksi</p>
              <p className="text-sm font-medium text-text">{date}</p>
            </div>
          </div>
        )}
      </div>

      {saranDokter && (
        <div className="bg-red-50 rounded-xl p-3 flex items-start gap-2 border border-red-200">
          <AlertTriangle size={16} className="text-red-500 shrink-0 mt-0.5" />
          <p className="text-xs text-red-700">
            Tingkat keparahan jerawat Anda tergolong berat. Disarankan untuk
            berkonsultasi dengan dokter kulit untuk penanganan yang tepat.
          </p>
        </div>
      )}
    </div>
  )
}

export default AcneSummary