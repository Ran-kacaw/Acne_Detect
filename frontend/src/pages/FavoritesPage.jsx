import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/landing/Navbar'
import Footer from '../components/landing/Footer'
import PageTransition from '../components/shared/PageTransition'
import { getFavoriteProducts, deleteFavoriteProduct } from '../utils/api'
import {
  ArrowLeft,
  Trash2,
  Copy,
  Check,
  AlertTriangle,
  ExternalLink,
  Star,
  Tag,
  Droplets,
  Info,
  Sparkles,
} from 'lucide-react'

const parseJsonSafe = (value) => {
  if (!value) return null
  if (typeof value === 'object') return value

  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

const getFavoriteProductData = (item) => {
  const parsedProductData = parseJsonSafe(item.product_data)
  const parsedProduct = parseJsonSafe(item.product)

  return parsedProductData || parsedProduct || item.product || item.productData || item
}

const getProductName = (product) => {
  if (product.brand && product.produk) return `${product.brand} - ${product.produk}`
  return product.name || product.produk || product.nama_produk || 'Produk Skincare'
}

const getProductIngredient = (product) => {
  return product.bahan_aktif || product.ingredients || product.ingredient || '-'
}

const getProductDescription = (product) => {
  return (
    product.catatan ||
    product.description ||
    product.deskripsi ||
    'Rekomendasi skincare untuk kulit Anda.'
  )
}

const getProductType = (product) => {
  return product.jenis_produk || product.category || product.type || 'Skincare'
}

const getProductSkinType = (product, item) => {
  return (
    item.jenis_kulit ||
    item.skinType ||
    product.untuk_kulit ||
    product.skinType ||
    product.jenis_kulit ||
    '-'
  )
}

const getProductLevel = (product, item) => {
  const rawLevel =
    item.acne_level ??
    item.acneLevel ??
    product.level_utama ??
    product.acne_level ??
    product.acneLevel ??
    0

  const level = Number(rawLevel)
  return Number.isFinite(level) ? level : 0
}

const getProductScore = (product, item) => {
  const raw =
    item.final_score ??
    item.recommendation_score ??
    product.final_score ??
    product.recommendation_score ??
    product.skor_dataset ??
    product.rating

  const numeric = Number(raw)

  if (!Number.isFinite(numeric)) return null
  if (numeric <= 1) return Math.round(numeric * 100)
  if (numeric <= 5) return Math.round((numeric / 5) * 100)
  if (numeric <= 10) return Math.round(numeric * 10)

  return Math.min(Math.round(numeric), 100)
}

const getProductWarning = (product) => {
  const warning = product.peringatan || product.warning || product.warning1 || '-'
  const text = String(warning).trim()

  if (!text || text === '-' || text.toLowerCase() === 'nan') return null
  return text
}

const getProductImage = (product, item) => {
  const image =
    item.image_url ||
    item.imageUrl ||
    item.image ||
    item.gambar ||
    item.foto ||
    item.foto_produk ||
    item.product_image ||
    item.thumbnail ||
    product.image_url ||
    product.imageUrl ||
    product.image ||
    product.gambar ||
    product.foto ||
    product.foto_produk ||
    product.product_image ||
    product.thumbnail ||
    null

  if (!image) return null

  const cleanImage = String(image).trim()
  if (!cleanImage || cleanImage === '-' || cleanImage.toLowerCase() === 'nan') return null

  return cleanImage
}

const getProductSearchLink = (product) => {
  const productName = getProductName(product)
  const encodedName = encodeURIComponent(productName)
  return `https://www.tokopedia.com/search?st=product&q=${encodedName}`
}

const splitIngredient = (value) => {
  if (!value || value === '-') return []

  return String(value)
    .split(/,|\+|;/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 2)
}

const truncateText = (text, max = 90) => {
  if (!text) return ''

  const cleanText = String(text).trim()
  return cleanText.length > max ? `${cleanText.slice(0, max)}...` : cleanText
}

const getUsageHint = (productType, acneLevel) => {
  const type = String(productType || '').toLowerCase()

  if (type.includes('cleanser') || type.includes('face wash') || type.includes('facial wash')) {
    return 'Gunakan pagi dan malam sebagai langkah awal. Hindari menggosok wajah terlalu keras.'
  }

  if (type.includes('sunscreen') || type.includes('sun screen') || type.includes('spf')) {
    return 'Gunakan pagi/siang sebagai langkah terakhir. Ulangi jika banyak berkeringat atau di luar ruangan.'
  }

  if (type.includes('moisturizer') || type.includes('cream') || type.includes('gel')) {
    return 'Gunakan setelah toner/serum untuk membantu menjaga kelembapan dan skin barrier.'
  }

  if (type.includes('serum') || type.includes('essence') || type.includes('ampoule')) {
    return acneLevel >= 2
      ? 'Gunakan bertahap. Jika kulit terasa perih atau kering, kurangi frekuensinya.'
      : 'Gunakan setelah wajah bersih. Mulai dari frekuensi rendah agar kulit beradaptasi.'
  }

  if (type.includes('spot')) {
    return 'Gunakan hanya pada area jerawat. Hentikan jika muncul iritasi berat.'
  }

  if (type.includes('toner')) {
    return 'Gunakan setelah membersihkan wajah. Jangan terlalu banyak layer jika kulit sedang sensitif.'
  }

  return 'Gunakan bertahap dan perhatikan reaksi kulit. Jangan mencampur terlalu banyak bahan aktif sekaligus.'
}

const getProductVisual = (productType) => {
  const type = String(productType || '').toLowerCase()

  const sameTheme = {
    bg: 'linear-gradient(135deg, #FFF8E7 0%, #F3E7C7 55%, #EAF7F3 100%)',
    chipBg: '#EEF7F4',
    chipText: '#1E8B72',
    chipBorder: '#CFE5DC',
  }

  if (type.includes('cleanser') || type.includes('face wash') || type.includes('facial wash')) {
    return { emoji: '🫧', label: 'Cleanser', ...sameTheme }
  }

  if (type.includes('toner')) {
    return { emoji: '💧', label: 'Toner', ...sameTheme }
  }

  if (type.includes('serum') || type.includes('essence') || type.includes('ampoule')) {
    return { emoji: '✨', label: 'Serum', ...sameTheme }
  }

  if (type.includes('moisturizer') || type.includes('cream') || type.includes('gel')) {
    return { emoji: '🧴', label: 'Moisturizer', ...sameTheme }
  }

  if (type.includes('sunscreen') || type.includes('sun screen') || type.includes('spf')) {
    return { emoji: '☀️', label: 'Sunscreen', ...sameTheme }
  }

  if (type.includes('spot')) {
    return { emoji: '🎯', label: 'Spot Treatment', ...sameTheme }
  }

  if (type.includes('mask')) {
    return { emoji: '🧖', label: 'Mask', ...sameTheme }
  }

  if (type.includes('exfol') || type.includes('peel')) {
    return { emoji: '🧪', label: 'Exfoliator', ...sameTheme }
  }

  return { emoji: '🌿', label: 'Skincare', ...sameTheme }
}

const buildMatchReasons = (product, item) => {
  const reasons = []
  const productLevel = getProductLevel(product, item)
  const skinType = getProductSkinType(product, item)
  const ingredient = getProductIngredient(product)

  if (Number.isFinite(productLevel)) {
    reasons.push(`Sesuai level jerawat ${productLevel}`)
  }

  if (skinType && skinType !== '-') {
    reasons.push(`Cocok untuk kulit ${skinType}`)
  }

  if (ingredient && ingredient !== '-') {
    reasons.push(`Mengandung ${ingredient}`)
  }

  return reasons.slice(0, 3)
}

const cardSurfaceStyle = {
  background: 'linear-gradient(180deg, #FFFDF7 0%, #FFF8E7 100%)',
  border: '1px solid #E6D9B8',
  boxShadow: '0 10px 24px rgba(114, 88, 35, 0.10)',
}

const topBannerStyle = {
  background: 'linear-gradient(180deg, #FFF8E7 0%, #F3E7C7 100%)',
  border: '1px solid #E6D9B8',
}

const DeleteFavoriteModal = ({ productName, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-[999] bg-black/40 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
        <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle size={24} />
        </div>

        <h2 className="text-lg font-bold text-center text-text mb-2">
          Hapus Produk Favorit?
        </h2>

        <p className="text-sm text-text-muted text-center mb-6">
          Produk <span className="font-semibold text-text">{productName}</span> akan dihapus dari daftar favorit.
        </p>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-text-muted text-sm font-semibold hover:bg-gray-50 transition"
          >
            Batal
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  )
}

const FavoritesPage = () => {
  const navigate = useNavigate()
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)
  const [copiedId, setCopiedId] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [expandedProduct, setExpandedProduct] = useState(null)

  const loadFavorites = async () => {
    try {
      const res = await getFavoriteProducts()
      setFavorites(res.data || [])
    } catch (error) {
      console.error('Get favorite products error:', error.response?.data || error)
      setFavorites([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadFavorites()
  }, [])

  const openDeleteModal = (item) => {
    setDeleteTarget(item)
  }

  const closeDeleteModal = () => {
    setDeleteTarget(null)
  }

  const handleConfirmDelete = async () => {
    if (!deleteTarget?.id) return

    try {
      await deleteFavoriteProduct(deleteTarget.id)
      setFavorites((prev) => prev.filter((item) => item.id !== deleteTarget.id))
      setDeleteTarget(null)
    } catch (error) {
      console.error('Delete favorite error:', error.response?.data || error)
    }
  }

  const handleCopy = async (item) => {
    const product = getFavoriteProductData(item)
    const productName = getProductName(product)
    const productType = getProductType(product)
    const ingredient = getProductIngredient(product)
    const skinType = getProductSkinType(product, item)
    const acneLevel = getProductLevel(product, item)
    const productLink = getProductSearchLink(product)

    const copyText = `${productName}
Jenis: ${productType}
Bahan aktif: ${ingredient}
Cocok untuk: kulit ${skinType}, level jerawat ${acneLevel}
Cari di e-commerce: ${productLink}`

    try {
      await navigator.clipboard.writeText(copyText)
      setCopiedId(item.id)
      setTimeout(() => setCopiedId(null), 1500)
    } catch (error) {
      console.error('Copy error:', error)
    }
  }

  return (
    <div className="min-h-screen mesh-bg flex flex-col">
      <Navbar />

      <PageTransition>
        <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/80 text-sm mb-6 hover:text-white transition"
          >
            <ArrowLeft size={16} />
            Kembali
          </button>

          <section
            className="relative overflow-hidden shadow-xl p-6 md:p-8 rounded-[22px] border-[1.5px] border-[#c4a800]"
            style={{
              background:
                'linear-gradient(145deg, #fefcf7 0%, #fdf9ee 55%, #fbf4e0 100%)',
            }}
          >
            <div
              className="pointer-events-none absolute -bottom-16 -right-16 h-72 w-72 rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(240,215,90,0.18) 0%, rgba(240,215,90,0.06) 55%, transparent 72%)',
              }}
            />

            <div
              className="pointer-events-none absolute -top-12 right-14 h-44 w-44 rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(60,139,137,0.07) 0%, transparent 65%)',
              }}
            />

            <div className="relative z-10">
              <div className="flex items-start gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-[#EEF7F4] text-teal flex items-center justify-center border border-teal/20">
                  <Sparkles size={22} />
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-text">
                    Produk Favorit
                  </h1>
                  <p className="text-sm text-text-muted">
                    {favorites.length} produk tersimpan
                  </p>
                </div>
              </div>

              {loading ? (
                <div className="text-center py-20 text-text-muted">
                  Memuat produk favorit...
                </div>
              ) : favorites.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-2xl bg-[#EEF7F4] text-teal mx-auto flex items-center justify-center mb-4 border border-teal/20">
                    <Sparkles size={34} />
                  </div>

                  <h2 className="text-lg font-bold text-text mb-2">
                    Belum Ada Favorit
                  </h2>

                  <p className="text-sm text-text-muted mb-6">
                    Tap ikon favorit pada produk rekomendasi untuk menyimpannya.
                  </p>

                  <button
                    onClick={() => navigate('/detect')}
                    className="bg-teal text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-teal-dark transition"
                  >
                    Mulai Deteksi
                  </button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 items-start">
                  {favorites.map((item, index) => {
                    const product = getFavoriteProductData(item)
                    const rank = item.rank || product.rank || index + 1
                    const isTopPick = rank === 1
                    const isCopied = copiedId === item.id
                    const productName = getProductName(product)
                    const productType = getProductType(product)
                    const productSkinType = getProductSkinType(product, item)
                    const productLevel = getProductLevel(product, item)
                    const productDescription = getProductDescription(product)
                    const productWarning = getProductWarning(product)
                    const productScore = getProductScore(product, item)
                    const ingredients = splitIngredient(getProductIngredient(product))
                    const searchLink = getProductSearchLink(product)
                    const visual = getProductVisual(productType)
                    const productImage = getProductImage(product, item)
                    const matchReasons = buildMatchReasons(product, item)
                    const isExpanded = expandedProduct === item.id

                    return (
                      <article
                        key={item.id || `${productName}-${rank}`}
                        className="rounded-[24px] p-4 flex flex-col overflow-visible self-start transition-all duration-300"
                        style={cardSurfaceStyle}
                      >
                        <div
                          className="rounded-[20px] p-4 mb-4 relative overflow-hidden min-h-[190px]"
                          style={topBannerStyle}
                        >
                          <div
                            className="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full opacity-80"
                            style={{
                              background:
                                'radial-gradient(circle, rgba(241,216,160,0.65) 0%, rgba(241,216,160,0.14) 60%, transparent 75%)',
                            }}
                          />

                          <div
                            className="pointer-events-none absolute -bottom-8 -left-8 h-24 w-24 rounded-full opacity-80"
                            style={{
                              background:
                                'radial-gradient(circle, rgba(200,236,224,0.80) 0%, rgba(200,236,224,0.14) 60%, transparent 75%)',
                            }}
                          />

                          <div className="relative z-10">
                            <div className="flex items-start justify-between gap-3 mb-4">
                              <div className="flex flex-wrap items-center gap-2">
                                <span
                                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                                    isTopPick
                                      ? 'bg-[#1E8B72] text-white'
                                      : 'bg-white border border-[#DDEAE5] text-[#4F6B66]'
                                  }`}
                                >
                                  <Star
                                    size={12}
                                    className={isTopPick ? 'fill-white' : ''}
                                  />
                                  {isTopPick ? 'Terbaik' : `#${rank}`}
                                </span>

                                {productScore !== null && (
                                  <span
                                    className="inline-flex px-3 py-1 rounded-full text-xs font-bold border"
                                    style={{
                                      background: '#FFF6E6',
                                      color: '#B97816',
                                      borderColor: '#F2DEB0',
                                    }}
                                  >
                                    Match {productScore}%
                                  </span>
                                )}
                              </div>

                              <button
                                type="button"
                                onClick={() => openDeleteModal(item)}
                                className="p-2 rounded-full bg-white/90 border border-[#E4ECE9] hover:bg-red-50 transition shrink-0"
                                aria-label="Hapus produk favorit"
                                title="Hapus produk favorit"
                              >
                                <Trash2 size={18} className="text-red-500" />
                              </button>
                            </div>

                            <div className="flex items-center gap-4">
                              <div
                                className="h-24 w-24 rounded-[22px] flex items-center justify-center shrink-0 border border-white/80 shadow-sm overflow-hidden bg-white"
                                style={{ background: visual.bg }}
                              >
                                {productImage ? (
                                  <img
                                    src={productImage}
                                    alt={productName}
                                    className="w-full h-full object-contain p-2"
                                  />
                                ) : (
                                  <span
                                    aria-hidden="true"
                                    className="text-[42px] leading-none"
                                  >
                                    {visual.emoji}
                                  </span>
                                )}
                              </div>

                              <div className="min-w-0 flex-1">
                                <span
                                  className="inline-flex px-3 py-1 rounded-full text-[11px] font-bold border mb-2"
                                  style={{
                                    background: visual.chipBg,
                                    color: visual.chipText,
                                    borderColor: visual.chipBorder,
                                  }}
                                >
                                  {visual.label}
                                </span>

                                <h3
                                  className="font-bold text-[15px] leading-snug text-text"
                                  style={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                  }}
                                >
                                  {productName}
                                </h3>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-teal/10 text-teal border border-teal/20">
                            <Tag size={12} />
                            {truncateText(productType, 18)}
                          </span>

                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-[#FFF6E5] text-[#B97816] border border-[#F2DEB0]">
                            <Droplets size={12} />
                            Kulit {truncateText(productSkinType, 16)}
                          </span>
                        </div>

                        <div
                          className="rounded-2xl p-3 border mb-3"
                          style={{
                            background: '#FFFDF7',
                            borderColor: '#E6D9B8',
                          }}
                        >
                          <p className="text-xs font-bold uppercase text-text mb-1">
                            Fungsi
                          </p>

                          <p
                            className="text-sm text-text-muted leading-relaxed"
                            style={{
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }}
                          >
                            {productDescription}
                          </p>
                        </div>

                        {ingredients.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {ingredients.map((itemIngredient) => (
                              <span
                                key={itemIngredient}
                                className="px-2.5 py-1 rounded-full text-xs bg-white border border-[#E4ECE8] text-text-muted"
                              >
                                {truncateText(itemIngredient, 18)}
                              </span>
                            ))}
                          </div>
                        )}

                        {!isExpanded && (
                          <div className="mt-4 pt-3 border-t border-[#E6EFEC]">
                            <div className="flex items-center justify-between mb-3 text-xs text-text-muted">
                              <span>Target level {productLevel}</span>
                              <span>{visual.label}</span>
                            </div>

                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => setExpandedProduct(item.id)}
                                className="flex-1 py-2.5 rounded-xl bg-[#EEF7F4] text-teal text-sm font-semibold hover:bg-[#E2F2EC] transition"
                              >
                                Lihat Detail
                              </button>

                              <button
                                type="button"
                                onClick={() => handleCopy(item)}
                                className="px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
                                aria-label="Salin produk"
                              >
                                {isCopied ? <Check size={16} /> : <Copy size={16} />}
                              </button>

                              <a
                                href={searchLink}
                                target="_blank"
                                rel="noreferrer"
                                className="px-4 rounded-xl bg-teal text-white hover:bg-teal-dark transition flex items-center justify-center"
                                aria-label="Cari produk"
                              >
                                <ExternalLink size={16} />
                              </a>
                            </div>
                          </div>
                        )}

                        {isExpanded && (
                          <div className="mt-4 rounded-[22px] border border-[#E6D9B8] bg-[#FFFDF7] p-4">
                            <div className="space-y-4">
                              <div>
                                <p className="text-xs font-bold uppercase mb-1 text-text">
                                  Kenapa cocok?
                                </p>

                                <div className="space-y-1.5 mt-2">
                                  {matchReasons.map((reason) => (
                                    <p
                                      key={reason}
                                      className="text-sm text-text-muted flex gap-2"
                                    >
                                      <Check
                                        size={14}
                                        className="text-teal shrink-0 mt-0.5"
                                      />
                                      <span>{reason}</span>
                                    </p>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <p className="text-xs font-bold uppercase mb-1 text-text">
                                  Deskripsi
                                </p>

                                <p className="text-sm text-text-muted leading-relaxed">
                                  {productDescription}
                                </p>
                              </div>

                              <div>
                                <p className="text-xs font-bold uppercase mb-1 text-text">
                                  Bahan Aktif
                                </p>

                                <p className="text-sm text-text-muted leading-relaxed">
                                  {getProductIngredient(product)}
                                </p>
                              </div>

                              <div className="rounded-2xl border border-[#D7ECE5] bg-[#EFF8F5] p-4">
                                <p className="text-xs font-bold uppercase mb-1 text-teal flex items-center gap-1">
                                  <Info size={13} />
                                  Saran Pemakaian
                                </p>

                                <p className="text-sm text-text-muted leading-relaxed">
                                  {getUsageHint(productType, productLevel)}
                                </p>
                              </div>

                              {productWarning && (
                                <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-red-600">
                                  <p className="text-xs font-bold uppercase mb-1">
                                    Peringatan
                                  </p>

                                  <p className="text-sm leading-relaxed">
                                    {productWarning}
                                  </p>
                                </div>
                              )}

                              <div className="grid grid-cols-2 gap-3 pt-2">
                                <button
                                  type="button"
                                  onClick={() => setExpandedProduct(null)}
                                  className="py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition"
                                >
                                  Tutup
                                </button>

                                <a
                                  href={searchLink}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="py-3 rounded-xl bg-teal text-white font-semibold hover:bg-teal-dark transition inline-flex items-center justify-center gap-2"
                                >
                                  <ExternalLink size={16} />
                                  Cari Produk
                                </a>
                              </div>
                            </div>
                          </div>
                        )}
                      </article>
                    )
                  })}
                </div>
              )}
            </div>
          </section>
        </main>
      </PageTransition>

      <Footer />

      {deleteTarget && (
        <DeleteFavoriteModal
          productName={getProductName(getFavoriteProductData(deleteTarget))}
          onClose={closeDeleteModal}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  )
}

export default FavoritesPage