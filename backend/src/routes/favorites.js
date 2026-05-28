const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
const {
  getFavorites,
  saveFavorite,
  deleteFavorite,
} = require('../controllers/favoriteController')

router.use(authMiddleware)

router.get('/', getFavorites)
router.post('/', saveFavorite)
router.delete('/:id', deleteFavorite)

module.exports = router