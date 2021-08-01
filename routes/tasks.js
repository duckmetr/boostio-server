import express from 'express'
import { fetchTasks, createTask, likeTask } from '../controllers/tasks.js'

const router = express.Router()

router.post('/', fetchTasks)
router.post('/create', createTask)
router.post('/like', likeTask)

export default router