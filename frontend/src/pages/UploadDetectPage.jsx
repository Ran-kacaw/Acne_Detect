import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Upload,
  CheckCircle,
  Droplet,
  HeartPulse,
  ArrowLeft,
  Sparkles,
  Zap,
  Shield,
  Wind,
} from 'lucide-react'
import Navbar from '../components/landing/Navbar'
import Footer from '../components/landing/Footer'
import ImagePreview from '../components/upload/ImagePreview'
import DetectButton from '../components/upload/DetectButton'
import LoadingOverlay from '../components/upload/LoadingOverlay'
import PageTransition from '../components/shared/PageTransition'
import { useDetection } from '../hooks/useDetection'

const skinTypeOptions = [
  {
    label: 'Normal',
    Icon: CheckCircle,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    borderColor: 'border-emerald-200',
    activeBg: 'bg-emerald-50',
    description: 'Kulit seimbang, tidak terlalu berminyak atau kering',
  },
  {
    label: 'Berminyak',
    Icon: Droplet,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    borderColor: 'border-blue-200',
    activeBg: 'bg-blue-50',
    description: 'Produksi minyak berlebih, pori-pori terlihat',
  },
  {
    label: 'Kering',
    Icon: Wind,
    iconBg: 'bg-sky-100',
    iconColor: 'text-sky-600',
    borderColor: 'border-sky-200',
    activeBg: 'bg-sky-50',
    description: 'Kulit terasa kaku, bersisik, atau kasar',
  },
  {
    label: 'Kombinasi',
    Icon: Sparkles,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    borderColor: 'border-purple-200',
    activeBg: 'bg-purple-50',
    description: 'Area T-zone berminyak, pipi normal/kering',
  },
  {
    label: 'Sensitif',
    Icon: HeartPulse,
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600',
    borderColor: 'border-rose-200',
    activeBg: 'bg-rose-50',
    description: 'Mudah kemerahan, gatal, atau iritasi',
  },
]

const UploadDetectPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [file, setFile] = useState(null)
  const [skinType, setSkinType] = useState('Berminyak')
  const { detect, loading } = useDetection()

  useEffect(() => {
    if (location.state?.file) {
      setFile(location.state.file)
    }
  }, [location])

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0]
    if (!selected) return
    setFile(selected)
  }

  const handleDetect = async () => {
    if (!file) return
    try {
      await detect(file, skinType)
      navigate('/result')
    } catch {
      // error handled in hook
    }
  }

  const getActiveSkinOption = () => {
    return skinTypeOptions.find(opt => opt.label === skinType)
  }

  const activeOption = getActiveSkinOption()

  return (
    <div className="min-h-screen mesh-bg flex flex-col">
      <Navbar />

      <main className="flex-1">
        <PageTransition>
          <div className="max-w-4xl mx-auto px-4 py-10">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-white/80 text-sm mb-6 hover:text-white transition group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition" />
              Kembali
            </button>

            <div
              className="relative overflow-hidden shadow-xl p-6 md:p-8 rounded-[16px] border-[1.5px] border-[#c4a800]"
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

              <div className="relative z-10">
                {/* Header */}
                <div className="mb-8 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal/10 text-teal text-xs font-semibold mb-3">
                    <Zap size={12} />
                    AI-Powered Analysis
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-text mb-2">
                    Deteksi Jerawat
                  </h1>
                  <p className="text-sm text-text-muted">
                    Unggah foto wajah Anda untuk analisis AI yang akurat
                  </p>
                </div>

                {/* Upload Area */}
                {!file ? (
                  <label className="block border-2 border-dashed border-teal/40 rounded-2xl p-12 text-center cursor-pointer hover:bg-teal/5 transition-all duration-300 group mb-8">
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      onChange={handleFileChange}
                    />

                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-teal to-teal-dark text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Upload size={32} />
                    </div>

                    <p className="font-bold text-text mb-1 text-lg">
                      Klik atau seret foto ke sini
                    </p>
                    <p className="text-xs text-text-muted">
                      JPG, PNG, JPEG · Maks 5MB
                    </p>
                  </label>
                ) : (
                  <div className="mb-8">
                    <ImagePreview file={file} onRemove={() => setFile(null)} />
                  </div>
                )}

                {/* Skin Type Selection */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-bold text-text">
                      Pilih Jenis Kulit
                    </h2>
                    {activeOption && (
                      <span className="text-xs text-text-muted hidden sm:block">
                        {activeOption.description}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {skinTypeOptions.map(({ label, Icon, iconBg, iconColor, borderColor, activeBg, description }) => {
                      const active = skinType === label

                      return (
                        <button
                          key={label}
                          type="button"
                          onClick={() => setSkinType(label)}
                          className={`
                            relative group rounded-xl p-4 text-center transition-all duration-200
                            ${active
                              ? `${activeBg} border-2 ${borderColor} shadow-md scale-[1.02]`
                              : 'bg-white/50 border-2 border-transparent hover:border-teal/20 hover:shadow-md hover:scale-[1.01]'
                            }
                          `}
                        >
                          {/* Tooltip on hover */}
                          <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap">
                            <div className="bg-gray-800 text-white text-xs rounded-lg px-2 py-1">
                              {description}
                            </div>
                          </div>

                          <div className={`
                            w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 transition-all duration-200
                            ${active ? iconBg : 'bg-gray-100 group-hover:bg-gray-200'}
                          `}>
                            <Icon size={24} className={active ? iconColor : 'text-gray-500'} />
                          </div>

                          <span className={`
                            text-xs font-semibold transition-colors duration-200
                            ${active ? iconColor : 'text-text-muted'}
                          `}>
                            {label}
                          </span>

                          {/* Active indicator dot */}
                          {active && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-yellow ring-2 ring-white"></div>
                          )}
                        </button>
                      )
                    })}
                  </div>

                  {/* Mobile description */}
                  <div className="mt-3 text-center sm:hidden">
                    <p className="text-xs text-text-muted bg-white/50 rounded-lg p-2">
                      {activeOption?.description}
                    </p>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="mb-6 p-4 rounded-xl bg-teal/5 border border-teal/10">
                  <div className="flex items-start gap-3">
                    <Shield size={18} className="text-teal mt-0.5" />
                    <div>
                      <p className="text-xs text-text-muted">
                        <span className="font-semibold text-teal">Tips:</span> Gunakan foto dengan pencahayaan
                        yang baik dan wajah tanpa filter untuk hasil analisis yang lebih akurat.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Detect Button */}
                <DetectButton
                  onClick={handleDetect}
                  disabled={!file}
                  loading={loading}
                />
              </div>
            </div>
          </div>
        </PageTransition>
      </main>

      <Footer />

      {loading && <LoadingOverlay />}
    </div>
  )
}

export default UploadDetectPage
