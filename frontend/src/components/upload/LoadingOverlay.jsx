import React from 'react'
import { Camera, Loader2, ScanFace, Sparkles } from 'lucide-react'

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 bg-black/45 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <style>
        {`
          @keyframes scanMove {
            0% {
              transform: translateY(-120%);
              opacity: 0;
            }
            15% {
              opacity: 1;
            }
            50% {
              opacity: 1;
            }
            100% {
              transform: translateY(420%);
              opacity: 0;
            }
          }

          @keyframes softFloat {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-8px);
            }
          }

          @keyframes glowPulse {
            0%, 100% {
              opacity: 0.35;
              transform: scale(1);
            }
            50% {
              opacity: 0.75;
              transform: scale(1.08);
            }
          }

          @keyframes dotPulse {
            0%, 80%, 100% {
              opacity: 0.35;
              transform: scale(0.85);
            }
            40% {
              opacity: 1;
              transform: scale(1.15);
            }
          }
        `}
      </style>

      <div
        className="relative w-full max-w-[390px] overflow-hidden rounded-[28px] border border-[#E6D9B8] p-5 shadow-2xl"
        style={{
          background:
            'linear-gradient(145deg, #FFFDF7 0%, #FFF8E7 52%, #F3E7C7 100%)',
        }}
      >
        <div
          className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(240,215,90,0.22) 0%, rgba(240,215,90,0.08) 55%, transparent 72%)',
            animation: 'glowPulse 2.6s ease-in-out infinite',
          }}
        />

        <div
          className="pointer-events-none absolute -top-12 right-10 h-44 w-44 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(60,139,137,0.16) 0%, transparent 65%)',
            animation: 'glowPulse 3s ease-in-out infinite',
          }}
        />

        <div className="relative z-10">
          <div className="relative h-56 overflow-hidden rounded-[24px] border border-[#E6D9B8] bg-[#FDF6E6] flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFFDF7] via-[#F3E7C7] to-[#EAF7F3]" />

            <div
              className="absolute left-0 right-0 h-20"
              style={{
                top: 0,
                background:
                  'linear-gradient(to bottom, transparent 0%, rgba(43,138,129,0.16) 45%, rgba(43,138,129,0.50) 50%, rgba(43,138,129,0.16) 55%, transparent 100%)',
                animation: 'scanMove 2.2s ease-in-out infinite',
              }}
            />

            <div className="absolute inset-5 rounded-[22px] border border-white/70" />
            <div className="absolute inset-10 rounded-[20px] border border-[#2B8A81]/20" />

            <div
              className="relative z-10 flex h-28 w-28 items-center justify-center rounded-[30px] border border-white/80 bg-white/65 shadow-sm"
              style={{
                animation: 'softFloat 2.8s ease-in-out infinite',
              }}
            >
              <div className="absolute inset-0 rounded-[30px] bg-[#2B8A81]/10 animate-ping" />
              <ScanFace size={54} className="relative z-10 text-[#2B8A81]" />
            </div>

            <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/85 px-3 py-1.5 text-xs font-bold text-[#2B8A81] border border-[#D7ECE5]">
              <Camera size={13} />
              Foto diproses
            </div>

            <div className="absolute right-4 bottom-4 flex items-center gap-2 rounded-full bg-white/85 px-3 py-1.5 text-xs font-bold text-[#B97816] border border-[#F2DEB0]">
              <Sparkles size={13} />
              AI Scan
            </div>
          </div>

          <div className="mt-5 text-center">
            <div className="flex items-center justify-center gap-2 text-[#1E8B72] font-bold">
              <Loader2 size={18} className="animate-spin" />
              <span>Mendeteksi area jerawat...</span>
            </div>

            <p className="mt-2 text-sm text-[#5E746F] leading-relaxed">
              Mohon tunggu sebentar, AI sedang menganalisis foto dan menyiapkan rekomendasi skincare.
            </p>

            <div className="mt-4 flex justify-center gap-2">
              {[0, 1, 2].map((item) => (
                <span
                  key={item}
                  className="h-2.5 w-2.5 rounded-full bg-[#2B8A81]"
                  style={{
                    animation: 'dotPulse 1.2s ease-in-out infinite',
                    animationDelay: `${item * 0.18}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingOverlay