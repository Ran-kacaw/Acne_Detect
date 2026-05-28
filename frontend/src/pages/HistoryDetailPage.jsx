import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/landing/Navbar'
import Footer from '../components/landing/Footer'
import ResultCard from '../components/result/ResultCard'
import AcneSummary from '../components/result/AcneSummary'
import SkincareRecommendation from '../components/result/SkincareRecommendation'
import PageTransition from '../components/shared/PageTransition'
import { useHistory } from '../hooks/useHistory'
import { ArrowLeft, Heart, History } from 'lucide-react'

const formatDate = (date) => {
  if (!date) return null

  return new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const HistoryDetailPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { fetchHistoryById } = useHistory()
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadDetail = async () => {
      try {
        const data = await fetchHistoryById(id)
        setResult(data)
      } finally {
        setLoading(false)
      }
    }

    loadDetail()
  }, [id])

  if (loading) {
    return (
      <div
        className="min-h-screen flex flex-col"
        style={{
          background:
            'linear-gradient(to bottom, #3c8b89, #2a6360 120px, #f0f7f7 120px)',
        }}
      >
        <Navbar />

        <div className="max-w-4xl mx-auto px-4 py-8 w-full">
          <div className="card-yellow p-8 text-center shadow-sm text-text-muted">
            Memuat detail riwayat...
          </div>
        </div>

        <Footer />
      </div>
    )
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f0f7f7] to-[#e6f3f3]">
        <Navbar />

        <PageTransition>
          <div className="max-w-3xl mx-auto px-4 py-8 text-center">
            <div className="card-yellow p-8 shadow-sm">
              <p className="text-text-muted text-sm mb-4">
                Data riwayat tidak ditemukan.
              </p>

              <button
                onClick={() => navigate('/history')}
                className="bg-teal text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-teal-dark transition"
              >
                Kembali ke History
              </button>
            </div>
          </div>
        </PageTransition>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background:
          'linear-gradient(to bottom, #3c8b89, #2a6360 120px, #f0f7f7 120px)',
      }}
    >
      <Navbar />

      <PageTransition>
        <div className="flex justify-center px-4 py-8">
          <div className="w-full max-w-4xl">
            <div className="card-yellow shadow-sm p-6">
              <div className="flex items-center justify-between gap-3 mb-6">
                <button
                  onClick={() => navigate('/history')}
                  className="flex items-center gap-2 text-text-muted text-sm hover:text-text transition"
                >
                  <ArrowLeft size={18} />
                  Kembali
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate('/history')}
                    className="flex items-center gap-1 bg-teal text-white px-3 py-1.5 rounded-full text-tiny font-medium hover:bg-teal-dark transition"
                  >
                    <History size={14} />
                    History
                  </button>

                  <button
                    onClick={() => navigate('/favorites')}
                    className="flex items-center gap-1 bg-pink-100 text-pink-600 px-3 py-1.5 rounded-full text-tiny font-medium hover:bg-pink-200 transition"
                  >
                    <Heart size={14} />
                    Favorite
                  </button>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                  <ResultCard
                    imageUrl={result.imageUrl}
                    severity={result.acneLabel || result.severity}
                    severityDescription={
                      result.acneDeskripsi || result.severityDescription
                    }
                    confidence={result.confidencePct || result.confidence}
                  />
                </div>

                <div className="md:w-1/2">
                  <AcneSummary
                    severity={result.acneLabel || result.severity}
                    severityLevel={result.acneLevel || result.severityLevel}
                    severityLabel={result.acneLabel || result.severityLabel}
                    confidence={result.confidencePct || result.confidence}
                    skinType={result.skinType}
                    date={formatDate(result.date)}
                    saranDokter={result.saranDokter}
                    masalahKulit={result.masalahKulit || result.masalah_kulit || []}
                  />
                </div>
              </div>

              <div className="mt-10">
                <SkincareRecommendation
                  products={result.rekomendasi || result.products || []}
                />
              </div>
            </div>
          </div>
        </div>
      </PageTransition>

      <Footer />
    </div>
  )
}

export default HistoryDetailPage