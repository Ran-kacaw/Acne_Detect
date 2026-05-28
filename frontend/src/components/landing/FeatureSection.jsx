import React from 'react'
import { Target, ShoppingBag, History, ShieldCheck } from 'lucide-react'
import ScrollReveal from '../shared/ScrollReveal'

const features = [
  {
    icon: <Target size={24} />,
    title: 'Deteksi Akurat',
    desc: 'Menggunakan model AI terbaru untuk mendeteksi jerawat dengan tingkat akurasi tinggi.',
  },
  {
    icon: <ShoppingBag size={24} />,
    title: 'Rekomendasi Produk',
    desc: 'Dapatkan saran produk skincare yang sesuai dengan jenis dan tingkat keparahan jerawat Anda.',
  },
  {
    icon: <History size={24} />,
    title: 'Riwayat Lengkap',
    desc: 'Simpan dan pantau perkembangan kondisi kulit Anda dari waktu ke waktu.',
  },
  {
    icon: <ShieldCheck size={24} />,
    title: 'Data Aman',
    desc: 'Foto dan data Anda dienkripsi dan tidak akan dibagikan ke pihak ketiga.',
  },
]

const FeatureSection = () => {
  return (
    <section
      className="relative overflow-hidden rounded-2xl border-[1.5px] border-[#c4a800] py-10 px-6"
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

      <div className="relative z-10 max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="text-section-title md:text-2xl font-semibold text-text text-center mb-10">
            Fitur Unggulan
          </h2>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div
                className="relative overflow-hidden rounded-2xl p-6 flex gap-4 items-start hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer border border-[rgba(196,168,0,0.22)]"
                style={{ background: 'linear-gradient(145deg, #fefcf7 0%, #fcf9f0 60%, #f8f4e8 100%)' }}
              >
                <div
                  className="pointer-events-none absolute -bottom-8 -right-8 h-40 w-40 rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(240,215,90,0.12) 0%, rgba(240,215,90,0.04) 55%, transparent 72%)' }}
                />
                <div className="relative z-10 flex gap-4 items-start w-full">
                  <div className="w-10 h-10 bg-teal-xlight rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-teal transition-all duration-300">
                    <span className="text-teal group-hover:text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      {f.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-text mb-1">{f.title}</h3>
                    <p className="text-text-muted text-xs leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeatureSection
