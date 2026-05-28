const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
const upload = require('../middleware/upload')
const { detect, checkAIHealth } = require('../controllers/detectController')

router.get('/health', checkAIHealth)
router.post('/', authMiddleware, upload.single('image'), detect)

module.exports = router
