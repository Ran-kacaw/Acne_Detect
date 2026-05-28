import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#2a6360] to-[#1e4a48] text-white py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div>
          <div className="flex items-center gap-1 font-semibold text-lg mb-3">
            <span className="text-white">Acne</span>
            <span className="text-yellow">Detect</span>
          </div>
          <p className="text-sm text-white/70 leading-relaxed">
            Smart acne detection platform to help users identify acne severity
            and get skincare recommendations.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li> <Link to="/" className="hover:text-yellow transition">Home</Link></li>
            <li> <Link to="/history" className="hover:text-yellow transition">History</Link></li>
            <li> <Link to="/about" className="hover:text-yellow transition">About Us</Link></li>
            <li> <Link to="/contact" className="hover:text-yellow transition">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li>Email: acnedetect@gmail.com</li>
            <li>Instagram: @acnedetect</li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-8 pt-5 border-t border-white/10">
        <p className="text-xs text-white/60 text-center">
          © {new Date().getFullYear()} AcneDetect. Hak cipta dilindungi.
        </p>
      </div>
    </footer>
  )
}

export default Footer
