import { useState, useEffect, useCallback } from 'react'
import { useAppStore } from '../store/useAppStore'
import { api, USE_MOCK } from '../utils/api'
import toast from 'react-hot-toast'

export const useHistory = () => {
  const [loading, setLoading] = useState(false)
  const { historyList, setHistory, addToHistory, removeFromHistory, detectionResult } = useAppStore()

  const fetchHistory = useCallback(async () => {
    setLoading(true)
    try {
      if (USE_MOCK) {
        setLoading(false)
        return
      }
      const { data } = await api.get('/api/history')
      setHistory(data)
    } catch (error) {
      toast.error('Gagal memuat riwayat')
    } finally {
      setLoading(false)
    }
  }, [setHistory])

  const saveResult = async () => {
    if (!detectionResult) {
      toast.error('Tidak ada hasil deteksi')
      return
    }

    if (!detectionResult.imageUrl) {
      console.error('imageUrl missing:', detectionResult)
      toast.error('URL gambar tidak ditemukan')
      return
    }

    const newRecord = {
      id: Date.now().toString(),
      imageUrl: detectionResult.imageUrl,
      date: new Date().toISOString(),
      severity: detectionResult.severity,
      confidence: detectionResult.confidence,
      products: detectionResult.products,
    }

    addToHistory(newRecord)
    toast.success('Disimpan ke riwayat!')

    if (!USE_MOCK) {
      try {
        await api.post('/api/history', {
          imageUrl: detectionResult.imageUrl,
          severity: detectionResult.severity,
          confidence: detectionResult.confidence,
          products: detectionResult.products,
        })
      } catch (error) {
        removeFromHistory(newRecord.id)
        toast.error('Gagal menyimpan riwayat')
        console.error('Save error:', error.response?.data || error.message)
      }
    }
  }

  const deleteHistory = async (id) => {
    removeFromHistory(id)
    toast.success('Riwayat dihapus')
    if (!USE_MOCK) {
      try {
        await api.delete(`/api/history/${id}`)
      } catch (error) {
        toast.error('Gagal menghapus riwayat')
      }
    }
  }

  useEffect(() => {
    fetchHistory()
  }, [fetchHistory])

  return { historyList, loading, fetchHistory, saveResult, deleteHistory }
}