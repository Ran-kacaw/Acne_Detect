import React from 'react'
import { Upload, Brain, Sparkles } from 'lucide-react'
import ScrollReveal from '../shared/ScrollReveal'

const steps = [
  {
    icon: <Upload size={28} />,
    title: 'Upload Foto',
    desc: 'Unggah foto wajah Anda dengan kualitas yang jelas untuk analisis optimal.',
  },
  {
    icon: <Brain size={28} />,
    title: 'Analisis AI',
    desc: 'Sistem AI kami akan mendeteksi dan menganalisis area jerawat pada wajah Anda.',
  },
  {
    icon: <Sparkles size={28} />,
    title: 'Rekomendasi',
    desc: 'Dapatkan rekomendasi skincare yang sesuai dengan kondisi kulit Anda.',
  },
]

const HowItWorksSection = () => {
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
            Cara Kerja
          </h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <ScrollReveal key={i} delay={i * 150}>
              <div
                className="relative overflow-hidden rounded-2xl p-6 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer border border-[rgba(196,168,0,0.22)]"
                style={{ background: 'linear-gradient(145deg, #fefcf7 0%, #fcf9f0 60%, #f8f4e8 100%)' }}
              >
                <div
                  className="pointer-events-none absolute -bottom-8 -right-8 h-40 w-40 rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(240,215,90,0.12) 0%, rgba(240,215,90,0.04) 55%, transparent 72%)' }}
                />
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-teal-xlight rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-teal group-hover:text-white transition-all duration-300">
                    <span className="text-teal group-hover:text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      {step.icon}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-text mb-2">{step.title}</h3>
                  <p className="text-text-muted text-xs leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection
