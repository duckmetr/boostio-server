import express from 'express'
import { createProfile, fetchProfile } from '../controllers/profile.js'

const router = express.Router()

router.post('/', fetchProfile)
router.post('/create', createProfile)

export default router