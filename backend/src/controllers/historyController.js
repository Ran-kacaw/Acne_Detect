const pool = require('../config/db')

const parseConfidenceNumber = (value) => {
  if (value === undefined || value === null) return 0

  if (typeof value === 'string') {
    return parseFloat(value.replace('%', '').trim()) || 0
  }

  if (typeof value === 'number') {
    return value <= 1 ? value * 100 : value
  }

  return 0
}

const getHistory = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT
        id,
        image_url AS "imageUrl",
        acne_level AS "acneLevel",
        acne_label AS "acneLabel",
        acne_deskripsi AS "acneDeskripsi",
        confidence,
        confidence_pct AS "confidencePct",
        probabilities,
        saran_dokter AS "saranDokter",
        skin_type AS "skinType",
        rekomendasi,
        created_at AS date
      FROM detection_history
      WHERE user_id = $1
      ORDER BY created_at DESC`,
      [req.user.id]
    )

    res.json(rows)
  } catch (err) {
    console.error('Get history error:', err)
    res.status(500).json({ message: 'Gagal mengambil riwayat' })
  }
}

const saveHistory = async (req, res) => {
  const acne = req.body.acne || {}

  const imageUrl = req.body.imageUrl || req.body.image_url

  const acneLevel = acne.acne_level ?? req.body.acneLevel ?? 0
  const acneLabel = acne.acne_label || req.body.acneLabel || `Tingkat ${acneLevel}`
  const acneDeskripsi = acne.acne_deskripsi || req.body.acneDeskripsi || ''
  const confidence = parseConfidenceNumber(
    acne.confidence_pct || acne.confidence || req.body.confidence
  )
  const confidencePct =
    acne.confidence_pct || req.body.confidencePct || `${confidence.toFixed(2)}%`

  const probabilities = acne.probabilities || {}
  const saranDokter = acne.saran_dokter ?? req.body.saranDokter ?? acneLevel === 3
  const skinType = req.body.jenis_kulit || req.body.skinType || 'Berminyak'
  const rekomendasi = req.body.rekomendasi || req.body.products || []

  if (!imageUrl) {
    return res.status(400).json({
      message: 'Data tidak lengkap: imageUrl kosong',
    })
  }

  try {
    const { rows } = await pool.query(
      `INSERT INTO detection_history (
        user_id,
        image_url,
        acne_level,
        acne_label,
        acne_deskripsi,
        confidence,
        confidence_pct,
        probabilities,
        saran_dokter,
        skin_type,
        rekomendasi
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      RETURNING id, created_at AS date`,
      [
        req.user.id,
        imageUrl,
        acneLevel,
        acneLabel,
        acneDeskripsi,
        confidence,
        confidencePct,
        JSON.stringify(probabilities),
        saranDokter,
        skinType,
        JSON.stringify(rekomendasi),
      ]
    )

    res.status(201).json({
      message: 'Riwayat berhasil disimpan',
      id: rows[0].id,
      date: rows[0].date,
    })
  } catch (err) {
    console.error('Save history error:', err)
    res.status(500).json({
      message: err.message || 'Gagal menyimpan riwayat',
    })
  }
}

const deleteHistory = async (req, res) => {
  try {
    const { rowCount } = await pool.query(
      'DELETE FROM detection_history WHERE id = $1 AND user_id = $2',
      [req.params.id, req.user.id]
    )

    if (rowCount === 0) {
      return res.status(404).json({ message: 'Riwayat tidak ditemukan' })
    }

    res.json({ message: 'Riwayat berhasil dihapus' })
  } catch (err) {
    console.error('Delete history error:', err)
    res.status(500).json({ message: 'Gagal menghapus riwayat' })
  }
}

module.exports = { getHistory, saveHistory, deleteHistory }