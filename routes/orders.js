import express from 'express'
import { fetchOrders, deleteOrder } from '../controllers/orders.js'

const router = express.Router()

router.post('/', fetchOrders)
router.post('/delete', deleteOrder)

export default router