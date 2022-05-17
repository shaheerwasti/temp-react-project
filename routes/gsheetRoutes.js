import express from 'express'
const router = express.Router()

import rateLimiter from 'express-rate-limit'
const apiLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: 'Too many requests from this IP, please try again after 15 minutes',
})

import { TVRfetch } from '../controllers/serviceWorkerController.js'
import { GetCoordinates, ListOfAddresses } from '../controllers/geoCoderController.js'

import authenticateUser from '../middleware/auth.js'

router.route('/tvr/').post(apiLimiter, TVRfetch)

router.route('/geoCoder/').get(apiLimiter, GetCoordinates)
router.route('/ListOfAddr/').post(apiLimiter, ListOfAddresses)

export default router