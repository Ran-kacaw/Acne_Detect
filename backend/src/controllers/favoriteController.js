const pool = require('../config/db')

const makeProductKey = (product) => {
  const brand = product.brand || ''
  const produk = product.produk || product.name || ''
  const bahanAktif = product.bahan_aktif || product.ingredients || ''

  return `${brand}-${produk}-${bahanAktif}`
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

const getFavorites = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT 
        id,
        product_key AS "productKey",
        product_data AS product,
        created_at AS date
       FROM favorite_products
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [req.user.id]
    )

    res.json(rows)
  } catch (err) {
    console.error('Get favorites error:', err)
    res.status(500).json({ message: 'Gagal mengambil produk favorit' })
  }
}

const saveFavorite = async (req, res) => {
  try {
    const product = req.body.product || req.body

    if (!product || (!product.produk && !product.name)) {
      return res.status(400).json({
        message: 'Data produk tidak lengkap',
      })
    }

    const productKey = makeProductKey(product)

    const { rows } = await pool.query(
      `INSERT INTO favorite_products 
        (user_id, product_key, product_data)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, product_key)
       DO UPDATE SET product_data = EXCLUDED.product_data
       RETURNING id, product_key AS "productKey", product_data AS product, created_at AS date`,
      [req.user.id, productKey, JSON.stringify(product)]
    )

    res.status(201).json({
      message: 'Produk berhasil disimpan ke favorit',
      data: rows[0],
    })
  } catch (err) {
    console.error('Save favorite error:', err)
    res.status(500).json({ message: 'Gagal menyimpan produk favorit' })
  }
}

const deleteFavorite = async (req, res) => {
  try {
    const { id } = req.params

    const { rowCount } = await pool.query(
      `DELETE FROM favorite_products
       WHERE id = $1 AND user_id = $2`,
      [id, req.user.id]
    )

    if (rowCount === 0) {
      return res.status(404).json({ message: 'Produk favorit tidak ditemukan' })
    }

    res.json({ message: 'Produk favorit berhasil dihapus' })
  } catch (err) {
    console.error('Delete favorite error:', err)
    res.status(500).json({ message: 'Gagal menghapus produk favorit' })
  }
}

module.exports = {
  getFavorites,
  saveFavorite,
  deleteFavorite,
}