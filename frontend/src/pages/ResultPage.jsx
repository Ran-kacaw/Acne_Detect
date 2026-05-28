import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/landing/Navbar'
import Footer from '../components/landing/Footer'
import PageTransition from '../components/shared/PageTransition'
import { useAppStore } from '../store/useAppStore'
import {
  saveHistory as saveHistoryApi,
  saveFavoriteProduct,
} from '../utils/api'
import {
  ArrowLeft,
  Bookmark,
  User,
  Calendar,
  Circle,
  Sparkles,
  Camera,
  Heart,
  Copy,
  Check,
  ExternalLink,
  ShieldAlert,
  Tag,
  Droplets,
  Info,
  Star,
} from 'lucide-react'

const getConfidencePercent = (value) => {
  if (value === null || value === undefined || value === '') return 0

  let percent = 0

  if (typeof value === 'string') {
    percent = parseFloat(value.replace('%', '').trim()) || 0
  } else if (typeof value === 'number') {
    percent = value <= 1 ? value * 100 : value
  }

  return Math.max(0, Math.min(percent, 100))
}


const normalizeBoolean = (value, fallback = false) => {
  if (typeof value === 'boolean') return value
  if (typeof value === 'string') {
    const cleanValue = value.trim().toLowerCase()
    if (['true', 'ya', 'yes', '1'].includes(cleanValue)) return true
    if (['false', 'tidak', 'no', '0'].includes(cleanValue)) return false
  }

  return fallback
}


const getMasalahKulit = (level) => {
  if (level === 0) return ['Kulit normal', 'Pencegahan jerawat']
  if (level === 1) return ['Jerawat ringan', 'Komedo', 'Pori tersumbat']
  if (level === 2) return ['Jerawat', 'Pori besar', 'Kusam', 'Bekas jerawat']
  return ['Jerawat berat', 'Peradangan', 'Bekas jerawat']
}

const getSeverityInfo = (level) => {
  if (level === 0) {
    return {
      label: 'Tidak ada jerawat / sangat ringan',
      badge: 'bg-green-50 text-green-600 border-green-200',
      description: 'Kulit dalam kondisi baik. Fokus pada perawatan dan pencegahan.',
    }
  }

  if (level === 1) {
    return {
      label: 'Jerawat Ringan',
      badge: 'bg-blue-50 text-blue-600 border-blue-200',
      description: 'Beberapa komedo atau jerawat kecil. Butuh perawatan rutin.',
    }
  }

  if (level === 2) {
    return {
      label: 'Jerawat Sedang',
      badge: 'bg-orange-50 text-orange-600 border-orange-200',
      description: 'Jerawat cukup banyak. Perlu bahan aktif yang lebih targeted.',
    }
  }

  return {
    label: 'Jerawat Berat',
    badge: 'bg-red-50 text-red-600 border-red-200',
    description: 'Jerawat parah dan meluas. Skincare intensif dan konsultasi dokter disarankan.',
  }
}

const getRecommendedProductCount = (level, totalProducts) => {
  if (level === 0) return Math.min(3, totalProducts)
  if (level === 1) return Math.min(5, totalProducts)
  if (level === 2) return Math.min(6, totalProducts)
  return Math.min(6, totalProducts)
}

const getCareFocus = (level) => {
  if (level === 0) {
    return {
      title: 'Fokus perawatan: jaga skin barrier dan cegah jerawat muncul',
      text: 'Pilih produk yang ringan, melembapkan, dan tidak terlalu agresif. Eksfoliasi atau bahan aktif kuat tidak perlu dipakai berlebihan.',
      priorities: ['hidrasi', 'barrier care', 'sunscreen', 'pencegahan'],
    }
  }

  if (level === 1) {
    return {
      title: 'Fokus perawatan: kontrol minyak dan jerawat ringan',
      text: 'Gunakan bahan aktif ringan seperti niacinamide, tea tree, atau salicylic acid secara bertahap. Jangan memakai terlalu banyak produk aktif sekaligus.',
      priorities: ['oil control', 'anti-acne ringan', 'pori tersumbat', 'bekas ringan'],
    }
  }

  if (level === 2) {
    return {
      title: 'Fokus perawatan: jerawat sedang dan bekas jerawat',
      text: 'Utamakan produk yang membantu mengurangi jerawat, menenangkan iritasi, dan mendukung perbaikan skin barrier. Pakai bertahap agar kulit tidak semakin iritasi.',
      priorities: ['anti-acne targeted', 'soothing', 'barrier repair', 'bekas jerawat'],
    }
  }

  return {
    title: 'Fokus perawatan: dukungan sementara sebelum konsultasi dokter',
    text: 'Untuk jerawat berat, skincare hanya membantu mendukung kondisi kulit. Hindari bahan aktif keras tanpa pengawasan dan pertimbangkan konsultasi ke dokter kulit.',
    priorities: ['soothing', 'barrier repair', 'hindari iritasi', 'konsultasi dokter'],
  }
}

const getProductName = (product) => {
  if (product.brand && product.produk) return `${product.brand} - ${product.produk}`
  return product.name || product.produk || product.nama_produk || 'Produk Skincare'
}

const getProductIngredient = (product) => {
  return product.bahan_aktif || product.ingredients || '-'
}

const getProductDescription = (product) => {
  return product.catatan || product.description || product.deskripsi || 'Rekomendasi skincare untuk kulit Anda.'
}

const getProductType = (product) => {
  return product.jenis_produk || product.category || product.type || 'Skincare'
}

const getProductSkinType = (product, fallbackSkinType) => {
  return product.untuk_kulit || product.skinType || fallbackSkinType || '-'
}

const getProductLevel = (product, fallbackLevel) => {
  const level = product.level_utama ?? product.acne_level ?? fallbackLevel
  const normalizedLevel = Number(level)

  return Number.isFinite(normalizedLevel) ? normalizedLevel : Number(fallbackLevel) || 0
}

const getProductWarning = (product) => {
  const warning = product.peringatan || product.warning || product.warning1 || '-'
  const text = String(warning).trim()

  if (!text || text === '-' || text.toLowerCase() === 'nan') return null
  return text
}

const getProductScore = (product) => {
  const raw =
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

const getProductSearchLink = (product) => {
  const productName = getProductName(product)
  const encodedName = encodeURIComponent(productName)
  return `https://www.tokopedia.com/search?st=product&q=${encodedName}`
}

const getProductImage = (product) => {
  const image =
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

const splitIngredient = (value) => {
  if (!value || value === '-') return []

  return String(value)
    .split(/,|\+|;/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 4)
}

const truncateText = (text, max = 90) => {
  if (!text) return ''

  const cleanText = String(text).trim()
  return cleanText.length > max ? `${cleanText.slice(0, max)}...` : cleanText
}

const getUsageHint = (productType, acneLevel) => {
  const type = String(productType || '').toLowerCase()

  if (type.includes('cleanser') || type.includes('face wash') || type.includes('facial wash')) {
    return 'Gunakan saat pagi dan malam sebagai langkah awal. Pilih cara pakai yang lembut, jangan menggosok wajah terlalu keras.'
  }

  if (type.includes('sunscreen') || type.includes('sun screen') || type.includes('spf')) {
    return 'Gunakan pagi/siang sebagai langkah terakhir. Ulangi pemakaian jika banyak berkeringat atau beraktivitas di luar ruangan.'
  }

  if (type.includes('moisturizer') || type.includes('cream') || type.includes('gel')) {
    return 'Gunakan setelah toner/serum untuk menjaga kelembapan dan membantu skin barrier tetap stabil.'
  }

  if (type.includes('serum') || type.includes('essence') || type.includes('ampoule')) {
    return acneLevel >= 2
      ? 'Gunakan bertahap, mulai sedikit dulu. Jika kulit terasa perih atau kering, kurangi frekuensinya.'
      : 'Gunakan setelah wajah bersih. Mulai dari frekuensi rendah agar kulit beradaptasi.'
  }

  if (type.includes('spot')) {
    return 'Gunakan hanya pada area jerawat, bukan seluruh wajah. Hentikan jika muncul rasa terbakar atau iritasi berat.'
  }

  if (type.includes('toner')) {
    return 'Gunakan setelah membersihkan wajah. Pilih yang menenangkan dan jangan terlalu banyak layer jika kulit sedang sensitif.'
  }

  return 'Gunakan bertahap dan perhatikan reaksi kulit. Jangan langsung mencampur terlalu banyak bahan aktif dalam satu waktu.'
}

const buildMatchReasons = (product, acneLevel, skinType) => {
  const reasons = []
  const productSkinType = String(getProductSkinType(product, '')).toLowerCase()
  const normalizedSkinType = String(skinType || '').toLowerCase()
  const productLevel = getProductLevel(product, acneLevel)
  const ingredient = getProductIngredient(product)

  if (productLevel === acneLevel) {
    reasons.push(`Sesuai level jerawat ${acneLevel}`)
  }

  if (productSkinType && normalizedSkinType && productSkinType === normalizedSkinType) {
    reasons.push(`Cocok untuk kulit ${skinType}`)
  }

  if (ingredient && ingredient !== '-') {
    reasons.push(`Mengandung ${ingredient}`)
  }

  return reasons.slice(0, 3)
}

const sameProductVisualTheme = {
  bg: 'linear-gradient(135deg, #FFF8E7 0%, #F3E7C7 55%, #EAF7F3 100%)',
  chipBg: '#F3F8F4',
  chipText: '#1E8B72',
  chipBorder: '#CFE5DC',
}

const getProductVisual = (productType) => {
  const type = String(productType || '').toLowerCase()

  if (type.includes('cleanser') || type.includes('face wash') || type.includes('facial wash')) {
    return {
      emoji: '🫧',
      label: 'Cleanser',
      ...sameProductVisualTheme,
    }
  }

  if (type.includes('toner')) {
    return {
      emoji: '💧',
      label: 'Toner',
      ...sameProductVisualTheme,
    }
  }

  if (type.includes('serum') || type.includes('essence') || type.includes('ampoule')) {
    return {
      emoji: '✨',
      label: 'Serum',
      ...sameProductVisualTheme,
    }
  }

  if (type.includes('moisturizer') || type.includes('cream') || type.includes('gel')) {
    return {
      emoji: '🧴',
      label: 'Moisturizer',
      ...sameProductVisualTheme,
    }
  }

  if (type.includes('sunscreen') || type.includes('sun screen') || type.includes('spf')) {
    return {
      emoji: '☀️',
      label: 'Sunscreen',
      ...sameProductVisualTheme,
    }
  }

  if (type.includes('spot')) {
    return {
      emoji: '🎯',
      label: 'Spot Treatment',
      ...sameProductVisualTheme,
    }
  }

  if (type.includes('mask')) {
    return {
      emoji: '🧖',
      label: 'Mask',
      ...sameProductVisualTheme,
    }
  }

  if (type.includes('exfol') || type.includes('peel')) {
    return {
      emoji: '🧪',
      label: 'Exfoliator',
      ...sameProductVisualTheme,
    }
  }

  return {
    emoji: '🌿',
    label: 'Skincare',
    ...sameProductVisualTheme,
  }
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

const ResultPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { detectionResult, historyList = [] } = useAppStore()

  const [historySaved, setHistorySaved] = React.useState(false)
  const [copiedProductId, setCopiedProductId] = React.useState(null)
  const [favoriteProducts, setFavoriteProducts] = React.useState({})
  const [expandedProduct, setExpandedProduct] = React.useState(null)

  const isFromHistory = !!id
  const result = isFromHistory
    ? historyList.find((item) => String(item.id) === String(id))
    : detectionResult

  if (!result) {
    return (
      <div className="min-h-screen mesh-bg flex flex-col">
        <Navbar />

        <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-10 text-center">
          <div className="card-yellow p-8 shadow-sm relative overflow-hidden">
            <div
              className="pointer-events-none absolute -bottom-8 -right-8 h-40 w-40 rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(240,215,90,0.12) 0%, rgba(240,215,90,0.04) 55%, transparent 72%)',
              }}
            />

            <div className="relative z-10">
              <p className="text-text-muted text-sm mb-4">
                Data hasil deteksi tidak ditemukan.
              </p>

              <button
                onClick={() => navigate('/detect')}
                className="bg-teal text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-teal-dark transition"
              >
                Mulai Deteksi Baru
              </button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  const acne = result.acne || {}
  const acneLevel = Number(result.acneLevel ?? acne.acne_level ?? 0) || 0
  const severityInfo = getSeverityInfo(acneLevel)
  const careFocus = getCareFocus(acneLevel)

  const acneLabel =
    result.acneLabel ||
    acne.acne_label ||
    `Tingkat ${acneLevel} - ${severityInfo.label}`

  const acneDescription =
    result.acneDeskripsi ||
    acne.acne_deskripsi ||
    severityInfo.description

  const confidence = getConfidencePercent(
    result.confidencePct ||
      acne.confidence_pct ||
      result.confidence ||
      acne.confidence
  )

  const skinType = result.jenis_kulit || result.skinType || 'Berminyak'
  const products = Array.isArray(result.rekomendasi)
    ? result.rekomendasi
    : Array.isArray(result.products)
      ? result.products
      : []
  const maxProducts = getRecommendedProductCount(acneLevel, products.length)
  const displayedProducts = products.slice(0, maxProducts)

  const masalahKulit = getMasalahKulit(acneLevel)
  const needsDoctor = normalizeBoolean(
    acne.saran_dokter ?? result.saranDokter,
    acneLevel === 3
  )

  const date = result.date
    ? new Date(result.date).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })

  const handleSaveHistory = async () => {
    if (historySaved || isFromHistory) return

    try {
      await saveHistoryApi({
        imageUrl: result.imageUrl,
        acne: result.acne,
        jenis_kulit: result.jenis_kulit || skinType,
        rekomendasi: result.rekomendasi || products,
      })

      setHistorySaved(true)
    } catch (error) {
      console.error('Save history error:', error.response?.data || error)
    }
  }

  const handleCopyProduct = (product, index) => {
    const productName = getProductName(product)
    const productLink = getProductSearchLink(product)
    const ingredient = getProductIngredient(product)
    const productType = getProductType(product)

    const copyText = `${productName}
Jenis: ${productType}
Bahan aktif: ${ingredient}
Cocok untuk: kulit ${skinType}, level jerawat ${acneLevel}
Cari di e-commerce: ${productLink}`

    navigator.clipboard.writeText(copyText).then(() => {
      setCopiedProductId(index)
      setTimeout(() => setCopiedProductId(null), 1500)
    })
  }

  const handleSaveFavorite = async (product, index) => {
    try {
      await saveFavoriteProduct({
        ...product,
        acne_level: acneLevel,
        jenis_kulit: skinType,
        alasan_rekomendasi: buildMatchReasons(product, acneLevel, skinType),
      })

      setFavoriteProducts((prev) => ({
        ...prev,
        [index]: true,
      }))
    } catch (error) {
      console.error('Save favorite error:', error.response?.data || error)
    }
  }

  const isProductFavorite = (index) => {
    return !!favoriteProducts[index]
  }

  return (
    <div className="min-h-screen mesh-bg flex flex-col">
      <Navbar />

      <PageTransition>
        <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white/80 text-sm mb-6 hover:text-white transition"
          >
            <ArrowLeft size={16} />
            Kembali
          </button>

          <div className="grid md:grid-cols-[300px_1fr] gap-6 mb-8">
            <div className="card-yellow p-4 shadow-sm relative overflow-hidden">
              <div
                className="pointer-events-none absolute -bottom-8 -right-8 h-40 w-40 rounded-full"
                style={{
                  background:
                    'radial-gradient(circle, rgba(240,215,90,0.12) 0%, rgba(240,215,90,0.04) 55%, transparent 72%)',
                }}
              />

              <div className="relative z-10">
                <div className="h-64 rounded-xl overflow-hidden bg-teal/30 flex items-center justify-center">
                  {result.imageUrl ? (
                    <img
                      src={result.imageUrl}
                      alt="Hasil deteksi"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={56} className="text-white/80" />
                  )}
                </div>

                <div className="flex justify-center mt-4">
                  <span className="px-4 py-2 rounded-full bg-teal/10 text-teal text-xs font-semibold border border-teal/20 inline-flex items-center gap-1">
                    <Camera size={13} />
                    Hasil Deteksi
                  </span>
                </div>
              </div>
            </div>

            <div className="card-yellow p-6 shadow-sm relative overflow-hidden">
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
                <h1 className="text-xl font-bold text-text mb-4">
                  Hasil Analisis AI
                </h1>

                <div className="mb-4">
                  <p className="text-xs font-bold text-text-muted uppercase mb-2">
                    ▣ Level Jerawat
                  </p>

                  <span
                    className={`inline-flex px-4 py-2 rounded-full text-sm font-bold border ${severityInfo.badge}`}
                  >
                    {acneLabel}
                  </span>
                </div>

                <div className="flex gap-1 mb-3">
                  <div className="h-2 flex-1 rounded-full bg-green-500" />
                  <div className="h-2 flex-1 rounded-full bg-yellow" />
                  <div className="h-2 flex-1 rounded-full bg-orange-500" />
                  <div className="h-2 flex-1 rounded-full bg-gray-200" />
                </div>

                <p className="text-sm text-text-muted mb-4">
                  {acneDescription}
                </p>

                <div className="mb-4">
                  <p className="text-xs font-bold text-text-muted uppercase mb-2">
                    ⚕ Butuh Pengawasan Dokter
                  </p>

                  <span
                    className={`inline-flex px-4 py-2 rounded-full text-sm font-bold border ${
                      needsDoctor
                        ? 'bg-red-50 text-red-600 border-red-200'
                        : 'bg-green-50 text-green-600 border-green-200'
                    }`}
                  >
                    {needsDoctor
                      ? 'Ya - Perlu konsultasi dokter'
                      : 'Tidak - Bisa ditangani mandiri'}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-bold text-text-muted uppercase mb-2">
                    ⓘ Masalah Kulit
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {masalahKulit.map((item, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-teal/10 text-teal border border-teal/20"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-bold text-text-muted uppercase mb-1">
                    ⓘ Akurasi AI
                  </p>

                  <h2 className="text-3xl font-extrabold text-text mb-2">
                    {confidence.toFixed(2)}%
                  </h2>

                  <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                    <div
                      className="h-full bg-teal rounded-full"
                      style={{ width: `${confidence}%` }}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-text-muted mb-5">
                  <span className="flex items-center gap-2">
                    <Calendar size={15} />
                    Tanggal <strong className="text-text">{date}</strong>
                  </span>

                  <span className="flex items-center gap-2">
                    <Circle size={15} />
                    Jenis Kulit <strong className="text-text">{skinType}</strong>
                  </span>
                </div>

                {!isFromHistory && (
                  <button
                    onClick={handleSaveHistory}
                    disabled={historySaved}
                    className={`w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition ${
                      historySaved
                        ? 'bg-teal/20 text-teal cursor-not-allowed'
                        : 'bg-teal text-white hover:bg-teal-dark'
                    }`}
                  >
                    <Bookmark
                      size={18}
                      className={historySaved ? 'fill-teal text-teal' : ''}
                    />
                    {historySaved ? 'Tersimpan di History' : 'Simpan ke History'}
                  </button>
                )}
              </div>
            </div>
          </div>

          <section>
            <div className="card-yellow p-5 shadow-sm mb-5">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-teal uppercase mb-2">
                    Rekomendasi berdasarkan hasil analisis
                  </p>

                  <h2 className="text-xl font-bold text-text mb-2">
                    {careFocus.title}
                  </h2>

                  <p className="text-sm text-text-muted leading-relaxed max-w-3xl">
                    {careFocus.text}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 md:justify-end">
                  <span className="px-3 py-1 rounded-full bg-teal/10 text-teal border border-teal/20 text-xs font-bold">
                    Level {acneLevel}
                  </span>

                  <span className="px-3 py-1 rounded-full bg-orange-50 text-orange-600 border border-orange-200 text-xs font-bold">
                    Kulit {skinType}
                  </span>

                  <span className="px-3 py-1 rounded-full bg-gray-100 text-text-muted text-xs font-bold">
                    {displayedProducts.length} produk dipilih
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {careFocus.priorities.map((priority) => (
                  <span
                    key={priority}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/70 text-xs font-medium text-text-muted border border-gray-100"
                  >
                    <Sparkles size={12} />
                    {priority}
                  </span>
                ))}
              </div>
            </div>

            {needsDoctor && (
              <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 flex gap-3 text-red-700">
                <ShieldAlert size={20} className="shrink-0 mt-0.5" />

                <p className="text-sm leading-relaxed">
                  Hasil menunjukkan jerawat berat. Produk di bawah hanya sebagai dukungan perawatan kulit. Untuk terapi utama, sebaiknya konsultasi dengan dokter kulit.
                </p>
              </div>
            )}

            {displayedProducts.length === 0 ? (
              <div className="card-yellow p-8 text-center shadow-sm">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🧴</span>
                </div>

                <p className="text-text-muted text-sm">
                  Belum ada rekomendasi skincare yang cocok untuk hasil analisis ini.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 items-start">
                {displayedProducts.map((product, index) => {
                  const rank = product.rank || index + 1
                  const isTopPick = rank === 1
                  const isFavorite = isProductFavorite(index)
                  const isCopied = copiedProductId === index
                  const productName = getProductName(product)
                  const productType = getProductType(product)
                  const productSkinType = getProductSkinType(product, skinType)
                  const productLevel = getProductLevel(product, acneLevel)
                  const productDescription = getProductDescription(product)
                  const productScore = getProductScore(product)
                  const ingredients = splitIngredient(getProductIngredient(product))
                  const searchLink = getProductSearchLink(product)
                  const visual = getProductVisual(productType)
                  const productImage = getProductImage(product)

                  return (
                    <article
                      key={`${productName}-${rank}`}
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
                                <Star size={12} className={isTopPick ? 'fill-white' : ''} />
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
                              onClick={() => handleSaveFavorite(product, index)}
                              className="p-2 rounded-full bg-white/90 border border-[#E4ECE9] hover:bg-pink-50 transition shrink-0"
                              aria-label="Tambah ke favorit"
                            >
                              <Heart
                                size={18}
                                className={
                                  isFavorite
                                    ? 'fill-red-500 text-red-500'
                                    : 'text-gray-400'
                                }
                              />
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
                          Kulit {productSkinType}
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
                          {ingredients.slice(0, 2).map((item) => (
                            <span
                              key={item}
                              className="px-2.5 py-1 rounded-full text-xs bg-white border border-[#E4ECE8] text-text-muted"
                            >
                              {truncateText(item, 18)}
                            </span>
                          ))}
                        </div>
                      )}

                      {expandedProduct !== index && (
                        <div className="mt-4 pt-3 border-t border-[#E6EFEC]">
                          <div className="flex items-center justify-between mb-3 text-xs text-text-muted">
                            <span>Target level {productLevel}</span>
                            <span>{visual.label}</span>
                          </div>

                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => setExpandedProduct(index)}
                              className="flex-1 py-2.5 rounded-xl bg-[#EEF7F4] text-teal text-sm font-semibold hover:bg-[#E2F2EC] transition"
                            >
                              Lihat Detail
                            </button>

                            <button
                              type="button"
                              onClick={() => handleCopyProduct(product, index)}
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

                      {expandedProduct === index && (
                        <div className="mt-4 rounded-[22px] border border-[#E6D9B8] bg-[#FFFDF7] p-4">
                          <div className="space-y-4">
                            <div>
                              <p className="text-xs font-bold uppercase mb-1 text-text">
                                Kenapa cocok?
                              </p>

                              <div className="space-y-1.5 mt-2">
                                {buildMatchReasons(product, acneLevel, skinType).map((reason) => (
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
                                {getProductDescription(product)}
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

                            <div className="rounded-2xl border border-[#E6D9B8] bg-[#FFF8E7] p-4">
                              <p className="text-xs font-bold uppercase mb-1 text-teal flex items-center gap-1">
                                <Info size={13} />
                                Saran Pemakaian
                              </p>

                              <p className="text-sm text-text-muted leading-relaxed">
                                {getUsageHint(productType, acneLevel)}
                              </p>
                            </div>

                            {getProductWarning(product) && (
                              <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-red-600">
                                <p className="text-xs font-bold uppercase mb-1">
                                  Peringatan
                                </p>

                                <p className="text-sm leading-relaxed">
                                  {getProductWarning(product)}
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
          </section>
        </main>
      </PageTransition>

      <Footer />
    </div>
  )
}

export default ResultPage