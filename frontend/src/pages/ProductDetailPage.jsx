import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { mockProducts } from '../mock/mockData'
import Navbar from '../components/landing/Navbar'
import PageTransition from '../components/shared/PageTransition'
import { ArrowLeft, Star, ShoppingBag } from 'lucide-react'

const ProductDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = mockProducts.find((p) => p.id === id)

  if (!product) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <p className="text-text-muted">Produk tidak ditemukan</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <PageTransition>
        <div className="max-w-2xl mx-auto px-4 py-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-text-muted text-sm mb-6 hover:text-text transition"
          >
            <ArrowLeft size={18} /> Kembali
          </button>

          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-gray-100 h-64 flex items-center justify-center">
              {product.image ? (
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <ShoppingBag size={48} className="text-gray-300" />
              )}
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-teal-xlight text-teal-dark text-tiny px-2 py-0.5 rounded-full font-medium">
                  {product.category}
                </span>
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-yellow fill-yellow" />
                  <span className="text-xs text-text font-medium">{product.rating}</span>
                </div>
              </div>
              <h1 className="text-lg font-semibold text-text mb-2">{product.name}</h1>
              <p className="text-text-muted text-sm mb-4">{product.description}</p>

              <div className="space-y-3">
                <div>
                  <h3 className="text-xs font-semibold text-text mb-1">Bahan Aktif</h3>
                  <p className="text-text-muted text-xs">{product.ingredients}</p>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-text mb-1">Cara Penggunaan</h3>
                  <p className="text-text-muted text-xs">{product.usage}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </div>
  )
}

export default ProductDetailPage
