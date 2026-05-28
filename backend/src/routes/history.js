const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
const { getHistory, saveHistory, deleteHistory } = require('../controllers/historyController')

// Semua route history membutuhkan autentikasi
router.use(authMiddleware)

router.get('/', getHistory)
router.post('/', saveHistory)
router.delete('/:id', deleteHistory)

module.exports = router