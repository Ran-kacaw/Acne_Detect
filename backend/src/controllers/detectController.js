const path = require('path')
const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')

const FASTAPI_URL = (process.env.FASTAPI_URL || 'http://localhost:8000').replace(/\/$/, '')
const DEFAULT_SKIN_TYPE = process.env.DEFAULT_SKIN_TYPE || 'Berminyak'
const MAX_RECOMMENDATIONS = Number(process.env.MAX_RECOMMENDATIONS || 5)

const getPublicBaseUrl = (req) => {
  if (process.env.PUBLIC_API_URL) return process.env.PUBLIC_API_URL.replace(/\/$/, '')
  return `${req.protocol}://${req.get('host')}`
}

const normalizeProduct = (product = {}) => ({
  ...product,
  id: product.id || product.rank || `${product.brand || ''}-${product.produk || product.name || ''}`,
  name: product.name || product.produk || product.nama_produk || 'Produk Skincare',
  produk: product.produk || product.name || product.nama_produk || 'Produk Skincare',
  category: product.category || product.jenis_produk || product.type || 'Skincare',
  jenis_produk: product.jenis_produk || product.category || product.type || 'Skincare',
  ingredients: product.ingredients || product.bahan_aktif || '-',
  bahan_aktif: product.bahan_aktif || product.ingredients || '-',
  description: product.description || product.catatan || product.deskripsi || 'Rekomendasi skincare berdasarkan hasil deteksi.',
  catatan: product.catatan || product.description || product.deskripsi || '',
  recommendation_score: product.recommendation_score || product.final_score || product.skor_dataset || 0,
})

const callAIAnalyze = async ({ filePath, filename, mimetype, jenisKulit }) => {
  const formData = new FormData()

  formData.append('file', fs.createReadStream(filePath), {
    filename,
    contentType: mimetype || 'image/jpeg',
  })

  const response = await axios.post(`${FASTAPI_URL}/acne/analyze`, formData, {
    params: {
      jenis_kulit: jenisKulit,
      top_n: MAX_RECOMMENDATIONS,
    },
    headers: formData.getHeaders(),
    timeout: Number(process.env.AI_TIMEOUT_MS || 60000),
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  })

  return response.data
}

const detect = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'File gambar wajib diunggah dengan field name: image' })
    }

    const jenisKulit = req.body.jenis_kulit || req.body.skin_type || DEFAULT_SKIN_TYPE
    const filePath = req.file.path || path.join(__dirname, '..', '..', 'uploads', req.file.filename)
    const imagePath = `/uploads/${req.file.filename}`
    const imageUrl = `${getPublicBaseUrl(req)}${imagePath}`

    const aiResult = await callAIAnalyze({
      filePath,
      filename: req.file.originalname || req.file.filename,
      mimetype: req.file.mimetype,
      jenisKulit,
    })

    const acne = aiResult.acne || {}
    const rekomendasi = (aiResult.rekomendasi || []).map(normalizeProduct)

    return res.json({
      success: true,
      imageUrl,
      imagePath,
      filename: req.file.filename,
      originalFilename: req.file.originalname,
      inference_time_ms: aiResult.inference_time_ms,
      acne,
      jenis_kulit: aiResult.jenis_kulit || jenisKulit,
      total_rekomendasi: rekomendasi.length,
      rekomendasi,

      // alias agar frontend lama tetap aman
      acneLevel: acne.acne_level,
      acneLabel: acne.acne_label,
      acneDeskripsi: acne.acne_deskripsi,
      acnePenyebab: acne.acne_penyebab,
      confidence: acne.confidence,
      confidencePct: acne.confidence_pct,
      saranDokter: acne.saran_dokter,
      skinType: aiResult.jenis_kulit || jenisKulit,
      products: rekomendasi,
      date: new Date().toISOString(),
    })
  } catch (err) {
    console.error('Detect error:', err.response?.data || err.message)

    const status = err.response?.status || 500
    return res.status(status >= 400 && status < 600 ? status : 500).json({
      message: 'Gagal menganalisis gambar dengan AI',
      detail: err.response?.data?.detail || err.response?.data || err.message,
      fastapi_url: FASTAPI_URL,
    })
  }
}

const checkAIHealth = async (req, res) => {
  try {
    const [health, info] = await Promise.allSettled([
      axios.get(`${FASTAPI_URL}/health`, { timeout: 10000 }),
      axios.get(`${FASTAPI_URL}/acne/info`, { timeout: 10000 }),
    ])

    return res.json({
      backend: 'ok',
      fastapi_url: FASTAPI_URL,
      fastapi_health: health.status === 'fulfilled' ? health.value.data : null,
      acne_info: info.status === 'fulfilled' ? info.value.data : null,
      error: health.status === 'rejected' ? health.reason.message : undefined,
    })
  } catch (err) {
    return res.status(503).json({
      backend: 'ok',
      fastapi_url: FASTAPI_URL,
      ai: 'error',
      message: err.message,
    })
  }
}

module.exports = { detect, checkAIHealth }
