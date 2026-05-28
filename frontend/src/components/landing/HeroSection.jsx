import React from 'react'
import { ArrowRight } from 'lucide-react'

const HeroSection = ({ navigate }) => {
  return (
    <div className="relative overflow-hidden px-6 py-16 text-center">
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
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-yellow bg-white/70 text-[#2a6360] text-xs font-semibold mb-5">
          ✨ Powered by AI
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5">
          <span className="text-yellow">Deteksi Jerawat</span>
          <br />
          dengan AI Cerdas
        </h1>

        <p className="max-w-2xl mx-auto text-text-muted text-sm md:text-base mb-8">
          Unggah foto wajah Anda dan biarkan AI kami menganalisis kondisi
          kulit, mendeteksi jerawat, dan memberikan rekomendasi skincare yang
          tepat.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate('/detect')}
            className="inline-flex items-center justify-center gap-2 bg-teal text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-teal-dark transition"
          >
            Coba Sekarang
            <ArrowRight size={18} />
          </button>

          <button
            onClick={() => navigate('/about')}
            className="inline-flex items-center justify-center border border-teal text-teal px-8 py-3 rounded-full font-semibold hover:bg-teal hover:text-white transition"
          >
            Pelajari Lebih
          </button>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
