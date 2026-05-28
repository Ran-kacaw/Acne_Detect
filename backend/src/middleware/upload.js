const fs = require('fs')
const path = require('path')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')

const uploadDir = path.resolve(process.env.UPLOAD_PATH || path.join(__dirname, '..', '..', 'uploads'))

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || '').toLowerCase() || '.jpg'
    cb(null, `${uuidv4()}${ext}`)
  },
})

const fileFilter = (req, file, cb) => {
  // Samakan dengan format yang diterima AI/FastAPI.
  // Untuk sekarang AI hanya menerima JPG/JPEG dan PNG.
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png']

  if (allowedMimeTypes.includes(file.mimetype)) {
    return cb(null, true)
  }

  return cb(new Error('Format file tidak didukung. Gunakan JPG, JPEG, atau PNG'), false)
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: Number(process.env.MAX_FILE_SIZE || 5 * 1024 * 1024),
  },
})

module.exports = upload