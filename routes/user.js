import express from 'express'
import { fetchProfile, createProfile, signin, signup } from '../controllers/user.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/', auth, fetchProfile)
router.post('/create', createProfile)

//router.post('/signin', signin)
//router.post('/signup', signup)

export default router
