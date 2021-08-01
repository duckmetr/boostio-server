import express from 'express'
import { fetchOrders } from '../controllers/orders.js'

const router = express.Router()

router.post('/', fetchOrders)

export default router