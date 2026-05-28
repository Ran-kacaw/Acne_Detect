import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/landing/Navbar'
import HeroSection from '../components/landing/HeroSection'
import HowItWorksSection from '../components/landing/HowItWorksSection'
import FeatureSection from '../components/landing/FeatureSection'
import UploadPreviewSection from '../components/landing/UploadPreviewSection'
import Footer from '../components/landing/Footer'
import PageTransition from '../components/shared/PageTransition'

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen mesh-bg text-text flex flex-col">
      <Navbar />

      <PageTransition>
        <main className="max-w-6xl mx-auto w-full px-4 py-10 flex-1">
          {/* Hero Section - dengan card-yellow */}
          <section className="card-yellow shadow-xl mb-10">
            <HeroSection navigate={navigate} />
          </section>

          {/* Cara Kerja Section */}
          <section className="mb-10">
            <h2 className="text-white text-2xl font-bold mb-5">Cara Kerja</h2>
            <HowItWorksSection navigate={navigate} />
          </section>

          {/* Fitur Unggulan Section */}
          <section className="mb-10">
            <h2 className="text-white text-2xl font-bold mb-5">Fitur Unggulan</h2>
            <FeatureSection navigate={navigate} />
          </section>

          {/* Upload Preview Section */}
          <section className="mb-10">
            <UploadPreviewSection navigate={navigate} />
          </section>
        </main>
      </PageTransition>

      <Footer />
    </div>
  )
}

export default LandingPage