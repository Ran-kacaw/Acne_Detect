const pool = require('../config/db')

// GET /api/products
const getProducts = async (req, res) => {
  try {
    const { severity, category } = req.query
    let query = `SELECT id, name, description, category, ingredients, usage_instruction as usage, rating, image_url as image
                 FROM products`
    const params = []
    const conditions = []

    if (severity) {
      params.push(severity)
      conditions.push(`$${params.length} = ANY(for_severity)`)
    }
    if (category) {
      params.push(category)
      conditions.push(`category = $${params.length}`)
    }

    if (conditions.length) query += ' WHERE ' + conditions.join(' AND ')
    query += ' ORDER BY rating DESC'

    const { rows } = await pool.query(query, params)
    res.json(rows)
  } catch (err) {
    console.error('Get products error:', err)
    res.status(500).json({ message: 'Gagal mengambil produk' })
  }
}

// GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, name, description, category, ingredients, usage_instruction as usage, rating, image_url as image, for_severity
       FROM products WHERE id = $1`,
      [req.params.id]
    )
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Produk tidak ditemukan' })
    }
    res.json(rows[0])
  } catch (err) {
    console.error('Get product error:', err)
    res.status(500).json({ message: 'Gagal mengambil produk' })
  }
}

module.exports = { getProducts, getProductById }
