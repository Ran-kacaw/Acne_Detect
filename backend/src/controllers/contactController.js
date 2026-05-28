const pool = require('../config/db')

const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Nama, email, dan pesan wajib diisi' })
    }

    const result = await pool.query(
      `INSERT INTO contact_us (name, email, message)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, email, message]
    )

    res.status(201).json({
      message: 'Pesan berhasil dikirim',
      data: result.rows[0],
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Gagal menyimpan pesan' })
  }
}

module.exports = { createContact }