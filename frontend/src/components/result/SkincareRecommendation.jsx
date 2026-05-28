import React from 'react'
import ProductCard from './ProductCard'
import ScrollReveal from '../shared/ScrollReveal'

const SkincareRecommendation = ({ products }) => {
  const limitedProducts = products?.slice(0, 5) || []

  if (limitedProducts.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <span className="text-2xl">🧴</span>
        </div>

        <p className="text-text-muted text-sm">
          Belum ada rekomendasi skincare saat ini.
        </p>
      </div>
    )
  }

  return (
    <ScrollReveal>
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-section-title font-semibold text-text">
            Rekomendasi Skincare
          </h3>

          <span className="text-tiny text-text-muted bg-gray-100 px-2 py-1 rounded-full">
            {limitedProducts.length} produk
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {limitedProducts.map((product, i) => (
            <ScrollReveal key={product.id || i} delay={i * 80}>
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </ScrollReveal>
  )
}

export default SkincareRecommendation