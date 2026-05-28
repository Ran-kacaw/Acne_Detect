require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')

const authRoutes = require('./routes/auth')
const detectRoutes = require('./routes/detect')
const historyRoutes = require('./routes/history')
const contactRoutes = require('./routes/contact')
const favoriteRoutes = require('./routes/favorites')
const productRoutes = require('./routes/products')

const app = express()
const PORT = process.env.PORT || 5000

const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.set('trust proxy', 1)

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true)
      return callback(new Error(`CORS ditolak untuk origin: ${origin}`))
    },
    credentials: true,
  })
)

app.use(express.json({ limit: process.env.JSON_LIMIT || '10mb' }))
app.use(express.urlencoded({ extended: true }))

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

app.use('/api/auth', authRoutes)
app.use('/api/detect', detectRoutes)
app.use('/api/history', historyRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/favorites', favoriteRoutes)
app.use('/api/products', productRoutes)

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'acnedetect-backend',
    timestamp: new Date().toISOString(),
  })
})

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.method} ${req.path} tidak ditemukan` })
})

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err)

  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ message: 'File terlalu besar. Maksimal 5MB atau sesuai MAX_FILE_SIZE.' })
  }

  if (err.message && err.message.includes('Format file')) {
    return res.status(400).json({ message: err.message })
  }

  if (err.message && err.message.includes('CORS')) {
    return res.status(403).json({ message: err.message })
  }

  return res.status(500).json({ message: 'Terjadi kesalahan server' })
})

app.listen(PORT, () => {
  console.log(`AcneDetect API running on port ${PORT}`)
  console.log(`Allowed client origins: ${allowedOrigins.join(', ')}`)
})

module.exports = app
