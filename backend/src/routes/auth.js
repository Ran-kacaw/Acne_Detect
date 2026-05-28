const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const { register, login, getMe } = require('../controllers/authController')
const authMiddleware = require('../middleware/auth')

router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('Nama wajib diisi'),
    body('email').isEmail().withMessage('Email tidak valid'),
    body('password').isLength({ min: 8 }).withMessage('Password minimal 8 karakter'),
  ],
  register
)

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email tidak valid'),
    body('password').notEmpty().withMessage('Password wajib diisi'),
  ],
  login
)

router.get('/me', authMiddleware, getMe)

module.exports = router
