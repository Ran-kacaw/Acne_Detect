import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/landing/Navbar'
import Footer from '../components/landing/Footer'
import HistoryList from '../components/history/HistoryList'
import PageTransition from '../components/shared/PageTransition'
import { useHistory } from '../hooks/useHistory'
import { Heart } from 'lucide-react'

const HistoryPage = () => {
  const { historyList, loading, deleteHistory } = useHistory()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen mesh-bg flex flex-col">
      <Navbar />

      <main className="flex-1">
        <PageTransition>
          <section className="flex justify-center px-4 pt-8 pb-16">
            <div className="w-full max-w-[676px]">
              <div
                className="
                  relative overflow-hidden
                  rounded-[20px]
                  shadow-xl
                  px-6 py-6
                  border-[1.5px] border-[#c4a800]
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

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-5">
                    <h1 className="text-[23px] font-bold text-[#102c2b] leading-tight">
                      Riwayat Deteksi
                    </h1>
                    <button
                      onClick={() => navigate('/favorites')}
                      className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-pink-50 text-pink-500 border border-pink-200 hover:bg-pink-100 hover:scale-105 active:scale-95 transition-all duration-200"
                    >
                      <Heart size={16} className="fill-pink-500" />
                      Favorit
                    </button>
                  </div>

                  <HistoryList
                    historyList={historyList}
                    loading={loading}
                    onDelete={deleteHistory}
                  />
                </div>
              </div>
            </div>
          </section>
        </PageTransition>
      </main>

      <Footer />
    </div>
  )
}

export default HistoryPage
