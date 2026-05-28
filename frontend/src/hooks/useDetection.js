import { useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { detectAcne, USE_MOCK } from '../utils/api'
import { mockDetectionResult } from '../mock/mockData'
import toast from 'react-hot-toast'

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

const normalizeResult = (data, fallbackImage, jenisKulit) => {
  const acne = data.acne || {}
  const products = data.rekomendasi || data.products || []

  return {
    ...data,
    imageUrl: data.imageUrl || fallbackImage,
    imagePath: data.imagePath,

    acne,
    acneLevel: data.acneLevel ?? acne.acne_level ?? 0,
    acneLabel: data.acneLabel || acne.acne_label || `Tingkat ${acne.acne_level ?? 0}`,
    acneDeskripsi: data.acneDeskripsi || acne.acne_deskripsi || '',

    severity: acne.acne_label || data.severity,
    severityLevel: data.acneLevel ?? acne.acne_level ?? data.severityLevel ?? 0,
    severityLabel: acne.acne_label || data.severityLabel,
    severityDescription: acne.acne_deskripsi || data.severityDescription,

    confidence: acne.confidence_pct || data.confidencePct || data.confidence || acne.confidence,
    confidencePct: acne.confidence_pct || data.confidencePct,
    saranDokter: acne.saran_dokter ?? data.saranDokter ?? false,

    skinType: data.jenis_kulit || data.skinType || jenisKulit,
    jenis_kulit: data.jenis_kulit || jenisKulit,

    masalahKulit: data.masalah_kulit || data.masalahKulit || [],
    products,
    rekomendasi: products,

    date: data.date || new Date().toISOString(),
  }
}

export const useDetection = () => {
  const [loading, setLoading] = useState(false)
  const { setResult } = useAppStore()

  const detect = async (file, jenis_kulit = 'Berminyak') => {
    setLoading(true)

    try {
      const imageBase64 = await fileToBase64(file)

      if (USE_MOCK) {
        const result = normalizeResult(
          {
            ...mockDetectionResult,
            imageUrl: imageBase64,
            jenis_kulit,
          },
          imageBase64,
          jenis_kulit
        )

        setResult(result)
        toast.success('Deteksi berhasil!')
        return result
      }

      const formData = new FormData()
      formData.append('image', file)
      formData.append('jenis_kulit', jenis_kulit)

      const { data } = await detectAcne(formData)
      const result = normalizeResult(data, imageBase64, jenis_kulit)

      setResult(result)
      toast.success('Deteksi berhasil!')
      return result
    } catch (error) {
      const detail = error.response?.data?.detail
      const msg =
        error.response?.data?.message ||
        (typeof detail === 'string' ? detail : detail?.message) ||
        error.message ||
        'Terjadi kesalahan saat mendeteksi'

      toast.error(msg)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return { detect, loading }
}
