import express from 'express'
const router = express.Router()

import rateLimiter from 'express-rate-limit'
const apiLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: 'Too many requests from this IP, please try again after 15 minutes',
})

import { GSSD, dataDrilling, murcury } from '../controllers/graphController.js'
import authenticateUser from '../middleware/auth.js'

router.route('/').get(apiLimiter, GSSD)
router.route('/murcury').get(apiLimiter, murcury)
router.route('/rawData').get(apiLimiter, dataDrilling)


export default router