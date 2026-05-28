import React from 'react'
import Navbar from '../components/landing/Navbar'
import Footer from '../components/landing/Footer'
import PageTransition from '../components/shared/PageTransition'
import { Upload, Clock, Star, CheckSquare, UserRound } from 'lucide-react'

const steps = [
  {
    step: '1',
    icon: <Upload size={21} />,
    title: 'Upload Foto',
    desc: 'Unggah foto wajah dengan kualitas baik untuk analisis optimal',
  },
  {
    step: '2',
    icon: <Clock size={21} />,
    title: 'Analisis AI',
    desc: 'CNN mendeteksi tingkat keparahan jerawat Level 0–3',
  },
  {
    step: '3',
    icon: <Star size={21} />,
    title: 'Hasil Deteksi',
    desc: 'Dapatkan level, akurasi, dan deskripsi kondisi kulit',
  },
  {
    step: '4',
    icon: <CheckSquare size={21} />,
    title: 'Rekomendasi',
    desc: 'Terima rekomendasi produk skincare terbaik',
  },
]

const teamMembers = [
  {
    role: 'Full-Stack Developer',
    desc: 'Mengembangkan aplikasi web dengan teknologi modern',
  },
  {
    role: 'Data Scientist',
    desc: 'Membangun dan mengoptimasi model CNN untuk deteksi acne',
  },
  {
    role: 'AI Engineer',
    desc: 'Merancang sistem rekomendasi produk skincare machine learning',
  },
]

const Panel = ({ children, className = '' }) => {
  return (
    <div
      className={`
        relative overflow-hidden
        rounded-[15px]
        shadow-sm
        border-[1.5px] border-[#c4a800]
        ${className}
      `}
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
      <div className="relative z-10">{children}</div>
    </div>
  )
}

const SectionTitle = ({ title }) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="w-2 h-2 rounded-full bg-[#3a918d]" />
      <h2 className="text-[14px] font-bold text-[#102c2b]">{title}</h2>
    </div>
  )
}

const AboutPage = () => {
  return (
    <div className="min-h-screen mesh-bg flex flex-col">
      <Navbar />

      <main className="flex-1">
        <PageTransition>
          <section className="flex justify-center px-4 pt-8 pb-16">
            <div className="w-full max-w-[633px] space-y-5">
              <Panel className="px-8 py-8 text-center">
                <h1 className="text-[25px] font-bold text-[#102c2b] mb-3">
                  About AcneDetect
                </h1>

                <p className="text-[13px] leading-6 text-[#617273] max-w-[460px] mx-auto">
                  Platform deteksi acne berbasis AI yang membantu pengguna
                  mengidentifikasi tingkat keparahan jerawat Level 0–3 dan
                  mendapatkan rekomendasi skincare yang sesuai dengan kondisi
                  kulit.
                </p>
              </Panel>

              <Panel className="px-6 py-5">
                <SectionTitle title="Mengapa Kami Membangun Ini" />

                <p className="text-[12px] leading-6 text-[#617273]">
                  Acne merupakan masalah kulit yang umum dialami banyak orang.
                  Banyak pengguna kesulitan memahami tingkat keparahan jerawat
                  dan memilih produk skincare yang sesuai. AcneDetect membantu
                  proses tersebut dengan analisis AI dan rekomendasi skincare
                  berdasarkan hasil deteksi.
                </p>
              </Panel>

              <Panel className="px-6 py-5">
                <SectionTitle title="Cara Kerja" />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                  {steps.map((item) => (
                    <div
                      key={item.step}
                      className="
                        relative overflow-hidden
                        rounded-[12px]
                        min-h-[175px]
                        px-4 pt-7 pb-5
                        text-center
                        border border-[rgba(196,168,0,0.22)]
                      "
                      style={{ background: 'linear-gradient(145deg, #fefcf7 0%, #fcf9f0 60%, #f8f4e8 100%)' }}
                    >
                      {/* Card orb */}
                      <div
                        className="pointer-events-none absolute -bottom-8 -right-8 h-40 w-40 rounded-full"
                        style={{ background: 'radial-gradient(circle, rgba(240,215,90,0.12) 0%, rgba(240,215,90,0.04) 55%, transparent 72%)' }}
                      />

                      <div
                        className="
                          absolute top-0 right-0
                          w-6 h-6 rounded-bl-full
                          bg-[#3a918d]
                          text-white text-[11px] font-bold
                          flex items-center justify-center
                          pl-1 pb-1
                        "
                      >
                        {item.step}
                      </div>

                      <div className="relative z-10">
                        <div className="w-[44px] h-[44px] bg-[#3a918d] text-white rounded-[12px] flex items-center justify-center mx-auto mb-3">
                          {item.icon}
                        </div>

                        <h3 className="text-[12px] font-bold text-[#102c2b] mb-2">
                          {item.title}
                        </h3>

                        <p className="text-[10px] leading-4 text-[#8a999d]">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>

              <Panel className="px-6 py-5">
                <SectionTitle title="Tim Kami" />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  {teamMembers.map((member) => (
                    <div
                      key={member.role}
                      className="
                        relative overflow-hidden
                        rounded-[12px]
                        min-h-[145px]
                        px-5 pt-5 pb-4
                        text-center
                        border border-[rgba(196,168,0,0.22)]
                      "
                      style={{ background: 'linear-gradient(145deg, #fefcf7 0%, #fcf9f0 60%, #f8f4e8 100%)' }}
                    >
                      {/* Card orb */}
                      <div
                        className="pointer-events-none absolute -bottom-8 -right-8 h-40 w-40 rounded-full"
                        style={{ background: 'radial-gradient(circle, rgba(240,215,90,0.12) 0%, rgba(240,215,90,0.04) 55%, transparent 72%)' }}
                      />

                      <div className="relative z-10">
                        <div className="w-[50px] h-[50px] bg-[#e9f6f5] text-[#3a918d] rounded-[14px] flex items-center justify-center mx-auto mb-3">
                          <UserRound size={22} />
                        </div>

                        <h3 className="text-[12px] font-bold text-[#102c2b] mb-2">
                          {member.role}
                        </h3>

                        <p className="text-[10px] leading-4 text-[#8a999d]">
                          {member.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>
          </section>
        </PageTransition>
      </main>

      <Footer />
    </div>
  )
}

export default AboutPage
